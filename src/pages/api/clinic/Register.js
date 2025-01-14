import { hash } from "bcrypt";
import prisma from "../../../../prisma/client";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Метод не разрешен" });
    }

    const {clinicName, licenseNumber, address, coordinates, email, password} = req.body;

    if (!clinicName || !licenseNumber || !email || !password || !address || !coordinates) {
        return res.status(400).json({ message: "Все обязательные поля должны быть заполнены" });
    }


    try {
        const existingClinic = await prisma.hospital.findFirst({
            where: {
                OR: [{ email }, { licens: licenseNumber }],
            },
        });

        if (existingClinic) {
            return res.status(400).json({ message: "Учреждение с таким email или лицензией уже существует" });
        }

        const passwordHash = await hash(password, 10);

        const newClinic = await prisma.hospital.create({
            data: {
                name: clinicName,
                licens: licenseNumber,
                address,
                email,
                password_hash: passwordHash,
                cord_address: coordinates,
                type: 1,
                time: "",
                htime: "",
                phone: "",
            },
        });

        return res.status(201).json({ message: "Клиника успешно зарегистрирована", clinic: newClinic });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
}
