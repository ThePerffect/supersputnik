
import prisma from "../../../../prisma/client";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { medicId, schedule } = req.body;

        try {
            const updatedMedic = await prisma.medics.update({
                where: { id: medicId },
                data: { schedule: schedule.split(",").map(time => time.trim()) },
            });

            res.status(200).json(updatedMedic);
        } catch (error) {
            res.status(500).json({ error: "Не удалось обновить расписание" });
        }
    } else {
        res.status(405).json({ error: "Метод не разрешен" });
    }
}
