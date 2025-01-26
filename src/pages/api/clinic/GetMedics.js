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

        const medics = await prisma.medics.findMany({
            where: { cid: parseInt(id, 10) },
            select: {
                MfirstName: true,
                MlastName: true,
                MmiddleName: true,
                MbirthDate: true,
                prof: true,
                cid: true
            },
        });

        return res.status(200).json({ medics });
    } catch (error) {
        console.error("Ошибка при получении сотрудников:", error);
        return res.status(500).json({ error: "Не удалось загрузить сотрудников." });
    }
}
