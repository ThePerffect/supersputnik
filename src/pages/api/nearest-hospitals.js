import prisma from "../../../prisma/client"; // Настройте путь к вашему клиенту Prisma

const apiKey = '5b3ce3597851110001cf624873a77379f10446549d98760d8c87a40d'; // Ваш API-ключ
const openRouteServiceUrl = 'https://api.openrouteservice.org/v2/matrix/driving-car';

export default async function handler(req, res) {
    const { lat, lng } = req.query;
    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);

    if (isNaN(userLat) || isNaN(userLng)) {
        return res.status(400).json({ error: "Неверные координаты" });
    }

    try {
        // Извлекаем все больницы из базы данных
        const hospitals = await prisma.hospital.findMany();

        // Собираем массив координат больниц
        const hospitalLocations = hospitals.map(hospital => {
            const [hospitalLat, hospitalLng] = hospital.cord_address.split(',').map(Number);
            return [hospitalLng, hospitalLat]; // OpenRouteService ожидает [lng, lat]
        });

        // Добавляем координаты пользователя в массив
        const locations = [[userLng, userLat], ...hospitalLocations];

        // Формируем запрос к OpenRouteService для расчета матрицы расстояний
        const body = JSON.stringify({
            locations,
            metrics: ['distance'],
            units: 'm'
        });

        const response = await fetch(openRouteServiceUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json',
                'Authorization': apiKey
            },
            body
        });

        if (!response.ok) {
            throw new Error('Ошибка запроса к OpenRouteService');
        }

        const data = await response.json();
        const distances = data.distances[0].slice(1);

        const nearbyHospitals = hospitals
            .map((hospital, index) => ({
                ...hospital,
                distance: distances[index]
            }))
            .filter(hospital => hospital.distance <= 30000); // Фильтруем по радиусу

        return res.status(200).json({ hospitals: nearbyHospitals });
    } catch (error) {
        console.error("Ошибка при получении больниц:", error);
        return res.status(500).json({ error: "Ошибка при получении данных больниц" });
    }
}
