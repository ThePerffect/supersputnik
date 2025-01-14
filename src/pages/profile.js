'use client';

import {useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import '@/app/globals.css';
import Header from '../components/ui/Header';

export default function Profile() {
    const {data: session, update} = useSession();
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateBirthDate = (date) => {
        const today = new Date();
        const birth = new Date(date);
        const age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        const dayDiff = today.getDate() - birth.getDate();

        if (isNaN(birth)) {
            return "Введите корректную дату рождения.";
        }
        if (birth > today) {
            return "Дата рождения не может быть в будущем.";
        }
        if (age > 120) {
            return "Проверьте дату рождения — возраст не может быть более 120 лет.";
        }
        if (age < 0 || (age === 0 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
            return "Дата рождения не может быть в будущем.";
        }
        return "";
    };


    useEffect(() => {

        if (!session) return;

        const {user} = session;
        if (session.user.type !== "user"){
            router.push("/")
            return null;
        }
        setFirstName(user.firstName || '');
        setLastName(user.lastName || '');
        setMiddleName(user.middleName || '');
        setBirthDate(user.birthDate || '');
        setEmail(user.email || '');
    }, [session]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsSubmitting(true);

        const birthDateError = validateBirthDate(birthDate);
        if (birthDateError) {
            setError(birthDateError);
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch('/api/user/Update-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    middleName,
                    birthDate,
                    email,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Не удалось обновить данные.');
            }

            await update({
                firstName,
                lastName,
                middleName,
                birthDate,
                email,
            });

            setSuccess('Профиль успешно обновлен!');
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };




    return (
        <div className="bg-white flex">
            <Header />
            <div className="fixed top-0 left-0 h-screen bg-white flex flex-col mt-24 w-80 text-gray-800 overflow-y-auto">
                <h1 className="text-2xl ml-5 mb-3 font-bold">Настройки</h1>
                <div className="space-y-2 py-1 px-2">
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setPage(1);
                        }}
                        className="flex items-center px-4 py-2 bg-white rounded-2xl hover:bg-gray-200 transition duration-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 12l8.954-8.955a1.125 1.125 0 011.591 0L21.75 12M4.5 9.75v10.125a1.125 1.125 0 001.125 1.125h4.125v-4.875a1.125 1.125 0 011.125-1.125h2.25a1.125 1.125 0 011.125 1.125V21h4.125a1.125 1.125 0 001.125-1.125V9.75"
                            />
                        </svg>
                        <span className="ml-2">Основное</span>
                    </a>
                </div>
            </div>
            <div className="flex-grow ml-52">
                <div className="bg-white p-8 rounded-lg mt-20 w-[80%] mx-auto">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6">Профиль</h1>
                    {error && <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded">{error}</div>}
                    {success && (
                        <div className="mb-4 p-3 bg-green-100 text-green-700 border border-green-400 rounded">
                            {success}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6 text-gray-800">
                        <div>
                            <label htmlFor="firstName">Имя</label>
                            <input
                                id="firstName"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName">Фамилия</label>
                            <input
                                id="lastName"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="middleName">Отчество</label>
                            <input
                                id="middleName"
                                type="text"
                                value={middleName}
                                onChange={(e) => setMiddleName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="birthDate">Дата рождения</label>
                            <input
                                id="birthDate"
                                type="date"
                                value={birthDate || ''}
                                onChange={(e) => setBirthDate(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Почта</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}