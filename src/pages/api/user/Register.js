import { hash } from "bcrypt";
import prisma from "../../../../prisma/client";

const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
};

const isUniqueCode = async (code) => {
    const existingUser = await prisma.user.findUnique({
        where: { unique_code: code },
    });
    return existingUser === null; 
};

const generateUniqueCode = async () => {
    let uniqueCode = generateRandomCode();
    let codeIsUnique = await isUniqueCode(uniqueCode);

    while (!codeIsUnique) {
        uniqueCode = generateRandomCode();
        codeIsUnique = await isUniqueCode(uniqueCode);
    }

    return uniqueCode;
};

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }



    const { firstName, lastName, middleName, birthDate, email, password } = req.body;
    if (!firstName || !lastName || !birthDate || !email || !password) {
        return res.status(400).json({ message: "Все обязательные поля должны быть заполнены" });
    }
    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ message: "Пользователь с таким email уже существует" });
        }

        const passwordHash = await hash(password, 10);

        const uniqueUuid = await generateUniqueCode();
        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                middleName: middleName,
                birthDate: new Date(birthDate),
                email,
                password_hash: passwordHash,
                access_level: 1,
                unique_code: uniqueUuid,

            },
        });

        return res.status(201).json({ message: "Пользователь успешно создан", user: newUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
}
