import prisma from "../../../../prisma/client";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Метод не поддерживается" });
    }

    const { firstName, lastName, middleName, birthDate, email } = req.body;

    if (!email || !firstName || !lastName) {
        return res.status(400).json({ message: "Необходимо указать email, имя и фамилию" });
    }

    try {
        await prisma.user.update({
            where: { email },
            data: {
                firstName, lastName,
                middleName: middleName || null, birthDate: birthDate ? new Date(birthDate) : null, email
            },
        });

        return res.status(200).json({
            message: "Профиль обновлен успешно", body: {
                firstName, lastName, middleName, birthDate, email
            }
        });
    } catch (error) {
        console.error("Ошибка обновления профиля:", error);
        return res.status(500).json({ message: "Ошибка сервера" });
    }
}