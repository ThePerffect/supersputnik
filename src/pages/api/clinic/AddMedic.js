export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed. Use POST instead." });
    }

    try {

        const { id, spec, name, lastname, middlename, date } = req.body;

        if (!id || !spec || !name || !lastname || !date) {
            return res.status(400).json({ error: "Missing required fields." });
        }

        const newMedic = await prisma.medics.create({
            data: {
                cid: id,
                prof: spec,
                MfirstName: name,
                MlastName: lastname,
                MmiddleName: middlename || null,
                MbirthDate: new Date(date)
            },
        });

        return res.status(201).json(newMedic);
    } catch (error) {
        console.error("Ошибка при добавлении медика:", error); // Логируем ошибку
        return res.status(500).json({ error: "Ошибка на сервере. Проверьте входные данные.", details: error.message });
    }
}
