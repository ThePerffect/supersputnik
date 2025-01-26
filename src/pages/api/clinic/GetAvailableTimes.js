import prisma from "../../../../prisma/client";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Метод не поддерживается" });
    }

    const { clinicId, date } = req.query;

    if (!clinicId || !date) {
        return res.status(400).json({ message: "clinicId и date обязательны" });
    }

    try {
        const availableTimes = await getAvailableTimesForDate(parseInt(clinicId), date);
        return res.status(200).json(availableTimes);
    } catch (error) {
        console.error("Ошибка получения доступного времени:", error);
        return res.status(500).json({ message: "Ошибка сервера" });
    }
}

async function getAvailableTimesForDate(clinicId, date) {
    const allTimes = [
        "09:00", "09:30", "10:00", "10:30",
        "11:00", "11:30", "12:00", "12:30",
        "13:00", "13:30", "14:00", "14:30",
        "15:00", "15:30", "16:00", "16:30",
    ];

    const appointments = await prisma.appointment.findMany({
        where: {
            clinicId: clinicId,
            date: new Date(date),
        },
        select: {
            time: true,
        },
    });

    const takenTimes = appointments.map((appointment) => appointment.time);
    return allTimes.filter((time) => !takenTimes.includes(time));
}
