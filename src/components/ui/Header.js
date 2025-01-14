'use client';

import { useEffect, useState, useCallback } from 'react';
import { getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchSession = async () => {
            setLoading(true);
            const userSession = await getSession();
            setSession(userSession);
            setLoading(false);
        };
        fetchSession();
    }, []);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen((prev) => !prev);
    }, []);

    const handleLogout = useCallback(async () => {
        await signOut({ callbackUrl: '/' });
        localStorage.removeItem('currentPage');
    }, []);

    const goToProfileMed = useCallback(() => {
        router.push('/clinics/profile');
    }, [router]);


    return (
        <header className="fixed w-full flex p-5 justify-between items-center text-gray-800 backdrop-blur-3xl shadow-md z-30 h-[80px]">
            <div className="flex items-center">
                <h2 className="text-3xl font-bold">
                    <a href="/">WEB MED</a>
                </h2>
                <ul className="ml-7 hidden md:flex space-x-6 text-xl font-bold">
                    <li>
                        <a href="/" className="hover:text-blue-500">
                            Главная
                        </a>
                    </li>
                    <li>
                        <a href="#cels" className="hover:text-blue-500">
                            Консультация
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className="hover:text-blue-500">
                            О нас
                        </a>
                    </li>
                </ul>
            </div>
            <nav>
                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 border-solid"></div>
                    </div>
                ) : (
                    <ul className="hidden md:flex gap-5 text-white">
                        {!session ? (
                            <>
                                <li>
                                    <a
                                        href="/clinics/login"
                                        className="py-2.5 bg-white px-3 text-gray-800 rounded-2xl border-2 border-gray-300 opacity-80 hover:border-opacity-100 hover:border-blue-500"
                                    >
                                        Вход
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/clinics/registration"
                                        className="py-2.5 bg-white px-3 text-gray-800 rounded-2xl border-2 border-gray-300 opacity-80 hover:border-opacity-100 hover:border-blue-500"
                                    >
                                        Регистрация
                                    </a>
                                </li>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">

                                <div className="text-lg font-medium text-gray-800">
                                            <p>{session.user.name}</p>
                                </div>


                                <div className="relative">
                                    <button
                                        onClick={toggleMenu}
                                        className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center bg-white">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6 text-gray-600">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                                        </svg>
                                    </button>

                                    {isMenuOpen && (
                                        <div
                                            className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-300 z-10">
                                            <div

                                                onClick={goToProfileMed}


                                                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-lg cursor-pointer">
                                                Профиль
                                            </div>
                                            <div
                                                onClick={handleLogout}
                                                className="px-4 py-2 text-sm text-red-600  hover:bg-gray-100 hover:rounded-lg cursor-pointer">
                                                Выйти
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </ul>
                )}
            </nav>
        </header>
    );
}