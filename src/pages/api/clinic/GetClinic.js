import prisma from "../../../../prisma/client"; // Убедитесь, что путь корректен

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Метод не поддерживается." });
    }

    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ error: "Идентификатор больницы обязателен." });
        }

        const clinic = await prisma.Hospital.findMany({
            where: { id: parseInt(id, 10) },
            select: {
                name: true,
                address: true,
                phone: true,
                time: true,
                htime: true,
                type: true,
            },
        });



        return res.status(200).json({ clinic });
    } catch (error) {
        console.error("Ошибка при получении сотрудников:", error);
        return res.status(500).json({ error: "Не удалось загрузить сотрудников." });
    }
}
