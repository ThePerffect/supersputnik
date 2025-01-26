export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed. Use POST instead." });
    }

    try {
        const { id, spec, name, lastname, middlename, date, workStart, workEnd, workingDays } = req.body;

        if (!id || !spec || !name || !lastname || !date || !workStart || !workEnd || !workingDays) {
            return res.status(400).json({ error: "Missing required fields." });
        }

        const workingDaysString = workingDays.join(',');

        // Создаем медика и сразу создаем расписание в одном цикле
        const newMedic = await prisma.medics.create({
            data: {
                cid: id,
                prof: spec,
                MfirstName: name,
                MlastName: lastname,
                MmiddleName: middlename || null,
                MbirthDate: new Date(date),
            },
        });

        // Создание расписания для каждого дня
        for (let day of workingDays) {
            console.log({
                medicId: newMedic.id,
                    workStartTime: workStart,
                    workEndTime: workEnd,
                    days: day,
            },)
            await prisma.schedule.create({
                data: {
                    medicId: newMedic.id,
                    workStartTime: workStart,
                    workEndTime: workEnd,
                    days: day,
                },
            });
        }

        return res.status(201).json({
            medic: newMedic,
            message: "Medic and schedule created successfully."
        });
    } catch (error) {
        console.error("Ошибка при добавлении медика и расписания:", error);
        return res.status(500).json({
            error: "Ошибка на сервере. Проверьте входные данные.",
            details: error.message
        });
    }
}
