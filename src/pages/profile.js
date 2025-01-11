'use client';

import {useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';
import { useRouter } from "next/navigation";
import '@/app/globals.css';
import Header from '../components/ui/Header';

export default function Profile() {
    const {data: session, update} = useSession();
    const router = useRouter();
    const [isCopied, setIsCopied] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [page, setPage] = useState(1);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [uuid, setUUID] = useState('');
    const [invitations, setInvitations] = useState([]);

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
        setUUID(user.unique_code)
    }, [session]);

    useEffect(() => {
        let intervalId;

        if (page === 2 && uuid) {
            const fetchData = async () => {
                try {
                    const data = await fetchInvites(uuid);
                    setInvitations(data);
                } catch (error) {
                    console.error('Ошибка при получении приглашений:', error);
                }
            };

            fetchData();
            intervalId = setInterval(fetchData, 10000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [page, uuid]);

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

    const fetchInvites = async (uuid) => {
        try {
            if (!uuid) {
                throw new Error('UUID is required');
            }
            const response = await fetch(`/api/user/Invites?uuid=${uuid}`);
            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Failed to fetch invites: ${text}`);
            }
            const data = await response.json();
            setInvitations(data);
            console.log(data)
            return data;
        } catch (error) {
            console.error('Error fetching invites:', error);
            throw error;
        }
    };




    return (
        <div className="bg-white flex">
            <Header/>
            <div
                className="fixed top-0 left-0 h-screen bg-white flex flex-col mt-24 w-80 text-gray-800 transition-all duration-700 overflow-y-auto">
                <h1 className="text-2xl ml-5 mb-3 font-bold">Настройки</h1>

                <div className="space-y-2 py-1 px-2">
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        setPage(1);
                    }}>
                        <div
                            className="flex items-center px-4 py-2 bg-white rounded-2xl hover:bg-gray-200 transition duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                            </svg>
                            <span className="ml-2 overflow-hidden transition-all duration-300">
                                Основное
                            </span>
                        </div>
                    </a>

                </div>
                <div className="space-y-2 py-1 px-2">
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        setPage(2);
                    }}>
                        <div
                            className="flex items-center px-4 py-2 bg-white rounded-2xl hover:bg-gray-200 transition duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"/>
                            </svg>

                            <span className="ml-2 overflow-hidden transition-all duration-300">
                                Работа
                            </span>
                        </div>
                    </a>
                </div>
            </div>
            <div className='flex-grow ml-52'>
            {page === 1 ? (
                <div className="flex flex-col bg-white p-8 rounded-lg mt-20 w-[80%] mx-auto">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6">Профиль</h1>

                    {error && (
                        <div
                            className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded transition-all duration-300">
                            {error}
                        </div>
                    )}


                    {success && (
                        <div
                            className="mb-4 p-3 bg-green-100 text-green-700 border border-green-400 rounded transition-all duration-300">
                            {success}
                        </div>
                    )}

                    <form className="space-y-6 text-gray-800" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="firstName">Имя</label>
                            <input
                                id="firstName"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName">Фамилия</label>
                            <input
                                id="lastName"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="middleName">Отчество</label>
                            <input
                                id="middleName"
                                type="text"
                                value={middleName}
                                onChange={(e) => setMiddleName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="birthDate">Дата рождения</label>
                            <input
                                id="birthDate"
                                type="date"
                                value={birthDate ? new Date(birthDate).toISOString().split('T')[0] : ''}
                                onChange={(e) => setBirthDate(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Почта</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                        </button>
                    </form>

                    <h1 className="text-3xl font-semibold mt-10 text-gray-800 mb-6">Привязка аккаунта</h1>
                    <p className="text-gray-500 pr-[2%]">
                      <span
                          onClick={() => {
                              navigator.clipboard.writeText(session?.user.unique_code || 'Код отсутствует')
                                  .then(() => {
                                      setIsCopied(true);
                                      setTimeout(() => setIsCopied(false), 2000);
                                  })
                                  .catch((err) => {
                                      console.error('Ошибка при копировании кода: ', err);
                                  });
                          }}
                          className="inline-flex text-gray-800 w-100 px-3 py-1 bg-gray-300 mr-6 rounded-md cursor-pointer"
                      >
                        {session?.user.unique_code ? (
                            <>
                                {session?.user.unique_code}
                                {isCopied ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                         stroke="currentColor" className="w-5 h-5 m-0.5 ml-2 animate-fadeout">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"/>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                         stroke="currentColor" className="w-5 h-5 m-0.5 ml-2 animate-fadeout">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"/>
                                    </svg>
                                )}
                            </>
                        ) : 'Код отсутствует'}
                      </span>

                        Данный код используется работником медицинского учереждения для добавления в организацию
                    </p>
                    <p className='text-gray-500 mt-2'>Приглашения в медицинскую организацию вы можете найти в
                        разделе <a href="#" onClick={(e) => {
                            e.preventDefault();
                            setPage(2);
                        }}><span className='text-blue-400'>Работа</span></a></p>
                </div>
                ) : page === 2 ? (
                <div className="flex flex-col bg-white p-8 rounded-lg mt-20 w-[80%] mx-auto">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6">Работа</h1>
                    <div className="flex flex-wrap gap-6 ">
                        {invitations.map((invite) => (
                            <div
                                key={invite.id}
                                className="text-gray-800 border border-gray-300 shadow-lg rounded-lg p-4 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 bg-white hover:shadow-xl transition-shadow duration-300"
                            >
                                <h1 className="text-xl">Приглашение от {invite.clinic} </h1>
                                <div>
                                    <strong>Профессия:</strong> {invite.proffession}</div>
                                <div className="flex gap-2 mt-4">
                                    <button
                                        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
                                        onClick={() => handleAccept(invite.uuid)}
                                    >
                                        Принять
                                    </button>
                                    <button
                                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                                        onClick={() => handleReject(invite.uuid)}
                                    >
                                        Отклонить
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            ) : null}
            </div>


        </div>

    );


}
