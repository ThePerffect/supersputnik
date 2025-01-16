
import { useState, useEffect } from 'react';

export default function Chat({ chatId, userId }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch(`/api/chat/${chatId}`);
                const data = await res.json();
                setMessages(data);
            } catch (error) {
                console.error('Failed to load messages', error);
            }
        };

        fetchMessages();
    }, [chatId]);

    const handleSend = async () => {
        if (!newMessage.trim()) return;

        try {
            const res = await fetch(`/api/chat/${chatId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sender: `User ${userId}`, content: newMessage }),
            });

            if (!res.ok) throw new Error('Failed to send message');

            const message = await res.json();
            setMessages((prev) => [...prev, message]);
            setNewMessage('');
        } catch (error) {
            console.error('Failed to send message', error);
        }
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg) => (
                    <div key={msg.id} className="message">
                        <strong>{msg.sender}</strong>: {msg.content}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
}
