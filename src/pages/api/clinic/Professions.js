import prisma from "../../../../prisma/client";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const specializations = [
        'Терапевт',
        'Хирург',
        'Педиатр',
        'Стоматолог',
    ];

    try {
        const professions = await prisma.medics.findMany({
            select: {
                profession: true,
            },
            distinct: ['profession'],
        });

        const professionList = professions.map((medic) => medic.profession);

        const combinedList = [...new Set([...professionList, ...specializations])];
        res.status(200).json(combinedList);
    } catch (error) {
        console.error("Error fetching professions:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}