import prisma from "../../../../prisma/client";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Метод не поддерживается' });
    }


    const { id, name, address, cordAddress, email, phone, time, htime, type } = req.body;

    if (!id || !name || !address || !cordAddress || !email || !phone || !time || !htime || !type) {

        return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
    }

    try {
        await prisma.hospital.update({
            where: { id },
            data: {
                name,
                address,
                email,
                cord_address: cordAddress,
                type,
                phone,
                htime,
                time,
            },
        });



        return res.status(200).json({ message: 'Данные успешно обновлены'});
    } catch (error) {
        console.error("Ошибка при обновлении данных:", error);
        return res.status(500).json({
            message: 'Ошибка при обновлении данных',
            error: error.message,
            stack: error.stack,  // Логируем стек ошибки для более точного анализа
        });
    }
}
