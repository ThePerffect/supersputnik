// pages/api/appointment.js

import prisma from '../../../prisma/client';

export async function bookAppointment(req, res) {
    if (req.method === 'POST') {
        const { firstName, lastName, middleName, medicId, day, time } = req.body;

        // Проверяем, доступен ли этот слот в расписании медика
        const schedule = await prisma.schedule.findFirst({
            where: {
                medicId,
                days: { contains: day },
                workStartTime: { lte: time },
                workEndTime: { gte: time },
            },
        });

        if (!schedule) {
            return res.status(400).json({ error: 'This time is not available' });
        }

        const existingAppointment = await prisma.appointment.findFirst({
            where: {
                medicId,
                day,
                time,
            },
        });

        if (existingAppointment) {
            return res.status(400).json({ error: 'Slot is already booked' });
        }

        try {
            const appointment = await prisma.appointment.create({
                data: {
                    firstName,
                    lastName,
                    middleName,
                    medicId,
                    day,
                    time,
                },
            });
            return res.status(200).json(appointment);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to book appointment' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
