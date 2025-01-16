import React, { useState, useEffect } from 'react';

function SpecializationInput({ onSpecializationChange }) {
    const [specialization, setSpecialization] = useState('');
    const [professions, setProfessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfessions = async () => {
            try {
                const response = await fetch('/api/clinic/Professions');
                if (!response.ok) {
                    throw new Error('Не удалось загрузить список специализаций');
                }
                const data = await response.json();
                setProfessions(data);
            } catch (error) {
                console.error('Ошибка при загрузке специализаций:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfessions();
    }, []);

    const handleSpecializationChange = (e) => {
        const value = e.target.value;
        setSpecialization(value);
        if (onSpecializationChange) {
            onSpecializationChange(value);
        }
    };

    if (loading) {
        return <div className="text-sm text-gray-600">Загрузка специализаций...</div>;
    }

    if (error) {
        return <div className="text-sm text-red-600">Ошибка: {error}</div>;
    }

    return (
        <div>
            <label
                htmlFor="specialization"
                className="block text-sm font-medium text-gray-700"
            >
                Специализация
            </label>
            <input
                list="specializations"
                id="specialization"
                value={specialization}
                onChange={handleSpecializationChange}
                className="mt-1 text-gray-800 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Выберите или введите специализацию"
            />

            <datalist id="specializations">
                {Array.isArray(professions) &&
                    professions.map((profession, index) => (
                        <option key={index} value={profession} />
                    ))}
            </datalist>
        </div>
    );
}

export default SpecializationInput;