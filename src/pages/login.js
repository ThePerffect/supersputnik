
import { useState } from 'react';
import { signIn } from "next-auth/react"
import {router} from "next/client";
import "@/app/globals.css"
import {useNotification} from "@/components/default/Message";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { showNotification } = useNotification();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await signIn('user', {
                redirect: false,
                email,
                password,

            });

            if (result.error) {
                setError(result.error);
            } else {
                await router.push('/') ;
                showNotification("Успешная авторизация!", "success");

            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (

        <div className="flex justify-center items-center flex-col text-black h-screen bg-gray-100">
            <title>WEB MED - Вход</title>
            <div className='flex'>
                <a
                    href="/login"
                    className="block bg-white shadow-2xl w-48 p-2 text-center rounded-t-lg  transition duration-150"
                >
                    <span className='text-blue-700 font-medium text-sm'>Пользователь</span>
                </a>
                <a
                    href="clinics/login"
                    className="block bg-gray-200 shadow-2xl w-48 p-2 text-center rounded-t-lg hover:bg-gray-100 transition duration-150"
                >
                    <span className='text-blue-700 font-medium text-sm'>Учереждение</span>
                </a>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6">Вход</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Почта</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Пароль</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Войти
                    </button>
                </form>
                <div className='text-center mt-5'>
                    <a href="/registration" className='text-sm text-blue-700'>Ещё нет аккаунта?</a>
                </div>
            </div>
        </div>
    );
}