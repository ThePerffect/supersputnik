import prisma from "../../../prisma/client";

const apiKey = '5b3ce3597851110001cf624873a77379f10446549d98760d8c87a40d';
const openRouteServiceUrl = 'https://api.openrouteservice.org/v2/matrix/driving-car';

export default async function handler(req, res) {
    const { lat, lng, specialization } = req.query;
    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);

    if (isNaN(userLat) || isNaN(userLng)) {
        return res.status(400).json({ error: "Неверные координаты" });
    }

    try {
        const hospitals = await prisma.hospital.findMany();

        const hospitalLocations = hospitals.map(hospital => {
            const [hospitalLat, hospitalLng] = hospital.cord_address.split(',').map(Number);
            return [hospitalLng, hospitalLat];
        });

        const locations = [[userLng, userLat], ...hospitalLocations];

        const body = JSON.stringify({
            locations,
            metrics: ['distance'],
            units: 'm',
        });

        const response = await fetch(openRouteServiceUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json',
                'Authorization': apiKey,
            },
            body,
        });

        if (!response.ok) {
            throw new Error('Ошибка запроса к OpenRouteService');
        }

        const data = await response.json();
        const distances = data.distances[0].slice(1);

        let filteredHospitals = hospitals.map((hospital, index) => ({
            ...hospital,
            distance: distances[index],
        })).filter(hospital => hospital.distance <= 30000);

        if (specialization) {

            const hospitalsWithMedics = await Promise.all(
                filteredHospitals.map(async hospital => {
                    const medics = await prisma.medics.findMany({
                        where: {
                            cid: hospital.id,
                            prof: {
                                equals: specialization,

                            },
                        },
                        select: {
                            MfirstName: true,
                            MlastName: true,
                            MmiddleName: true,
                            MbirthDate: true,
                            prof: true,
                        },
                    });

                    if (medics.length > 0) {
                        return {
                            ...hospital,
                            medics,
                        };
                    }

                    return null;
                })
            );

            filteredHospitals = hospitalsWithMedics.filter(hospital => hospital !== null);
        }

        return res.status(200).json({ hospitals: filteredHospitals });
    } catch (error) {
        console.error("Ошибка при получении больниц:", error);
        return res.status(500).json({ error: "Ошибка при получении данных больниц" });
    }
}
