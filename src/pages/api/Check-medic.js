import prisma from "../../../prisma/client";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { uniqueCode } = req.query;

    if (!uniqueCode) {
        return res.status(400).json({ message: "Unique code is required" });
    }

    try {
        const medic = await prisma.user.findUnique({
            where: { unique_code: uniqueCode },
        });

        if (!medic) {
            return res.status(404).json({ message: "Medic not found" });
        }

        res.status(200).json(medic);
    } catch (error) {
        console.error("Error fetching medic:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
