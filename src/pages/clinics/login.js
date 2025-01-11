import { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useNotification } from "@/components/ui/Message";
import "@/app/globals.css";

export default function ClinicLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { showNotification } = useNotification();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await signIn('clinic', {
                redirect: false,
                email,
                password,
            });

            if (result.error) {
                setError(result.error);
            }else{
                showNotification("Успешная авторизация!", "success");
                await router.push('/clinics/profile') ;
            }
        } catch (error) {
            setError('Произошла ошибка. Попробуйте снова.');
        } finally {
            setLoading(false);

        }


    };

    return (
        <div className="flex justify-center items-center flex-col text-black h-screen bg-gray-100">
            <title>WEB MED - Вход для учреждений</title>
            <div className='flex'>
                <a
                    href="/login"
                    className="block bg-gray-200 shadow-2xl w-48 p-2 text-center rounded-t-lg hover:bg-gray-100 transition duration-150"
                >
                    <span className='text-blue-700 font-medium text-sm'>Пользователь</span>
                </a>
                <a
                    href="/clinics/login"
                    className="block bg-white shadow-2xl w-48 p-2 text-center rounded-t-lg"
                >
                    <span className='text-blue-700 font-medium text-sm'>Учреждение</span>
                </a>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6">Вход для учреждений</h1>
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
                        disabled={loading}
                    >
                        {loading ? "Вход..." : "Войти"}
                    </button>
                </form>
                <div className='text-center mt-5'>
                    <a href="/clinics/registration" className='text-sm text-blue-700'>Ещё нет аккаунта?</a>
                </div>
            </div>
        </div>
    );
}
