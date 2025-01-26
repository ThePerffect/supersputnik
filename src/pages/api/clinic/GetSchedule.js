import prisma from "../../../../prisma/client";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Метод не поддерживается" });
    }

    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: "Не указан ID сотрудника" });
    }

    try {
        const schedule = await prisma.schedule.findMany({
            where: { medicId: parseInt(id, 10) },
            select: {
                id: true,
                date: true,
                startTime: true,
                endTime: true,
                isAvailable: true,
            },
        });

        if (!schedule || schedule.length === 0) {
            return res.status(404).json({ error: "Расписание не найдено для данного сотрудника" });
        }

        return res.status(200).json({ schedule });
    } catch (error) {
        console.error("Ошибка при получении расписания:", error);
        return res.status(500).json({ error: "Ошибка сервера. Попробуйте позже." });
    }
}
