

import prisma from '../../../../prisma/client';

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const chat = await prisma.chat.findUnique({
                where: { id: parseInt(id) },
            });
            if (!chat) return res.status(404).json({ error: 'Chat not found' });
            res.status(200).json(chat.messages || []);
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    } else if (req.method === 'POST') {
        const { sender, content } = req.body;

        try {
            const chat = await prisma.chat.findUnique({
                where: { id: parseInt(id) },
            });

            if (!chat) return res.status(404).json({ error: 'Chat not found' });

            const newMessage = {
                id: Date.now(),
                sender,
                content,
                timestamp: new Date().toISOString(),
            };

            const updatedMessages = chat.messages ? [...chat.messages, newMessage] : [newMessage];

            await prisma.chat.update({
                where: { id: parseInt(id) },
                data: { messages: updatedMessages, updatedAt: new Date() },
            });

            res.status(201).json(newMessage);
        } catch (error) {
            res.status(500).json({ error: 'Failed to send message' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
