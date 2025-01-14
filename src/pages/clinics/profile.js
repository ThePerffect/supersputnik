'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/globals.css';
import Header from '../../components/ui/Header';
import AddressInputWithMap from '../../components/ui/AddressInputWithMap';
import {useNotification} from "@/components/ui/Message";
import SpecializationInput from "@/components/ui/SpecializationInput";
import InputField from "@/components/ui/InputField";


export default function HospitalProfile() {
    const { data: session, update } = useSession();
    const router = useRouter();
    const [specialization, setSpecialization] = useState("");
    const {showNotification } = useNotification();
    const [name, setName] = useState('');
    const [licens, setLicens] = useState('');
    const [address, setAddress] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [id, setId] = useState('');
    const [cordAddress, setCordAddress] = useState([]);
    const [type, setType] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [page, setPage] = useState(1);
    const [medic, setMedic] = useState([]);
    const [error, setError] = useState("");
    const [weekendStartTime, setWeekendStartTime] = useState("");
    const [weekendEndTime, setWeekendEndTime] = useState("");
    const [Mname, setMname] = useState("");
    const [Mlastname, setMlastname] = useState("");
    const [Mmiddlename, setMmiddlename] = useState("");
    const [Mdata, setBirthDate] = useState("");

    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!session) return;

            const { user } = session;

            if (user.type !== 'clinic') {
                router.push('/');
                return;
            }

            setId(user.id);
            setName(user.name || '');
            setLicens(user.licens || '');
            setAddress(user.address || '');
            setCordAddress(convertStringToCoords(user.coord));
            setEmail(user.email || '');
            setType(user.ctype);
            setPhone(user.phone);


            if (user.time) {
                const [start, end] = user.time.split('-');
                setStartTime(start);
                setEndTime(end);
            }
            if (user.htime) {
                const [start, end] = user.time.split('-');
                setWeekendStartTime(start);
                setWeekendEndTime(end);
            }

            console.log(id)
        };
        fetchUserData();
    }, [session]);

    useEffect(() => {
        if (id) {
            fetchMedics();
        }
    }, [id]);

    const convertStringToCoords = (cordAddress) => {


        return cordAddress.split(',').map(coord => parseFloat(coord.trim()));
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;

        const formattedValue = value
            .replace(/[^\d+]/g, '')
            .replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2)-$3-$4-$5');

        setPhone(formattedValue);
    };

    const fetchMedics = async () => {
        try {
            const response = await fetch(`/api/clinic/GetMedics?id=${id}`);
            if (!response.ok) {
                throw new Error('Не удалось загрузить сотрудников.');
            }
            const data = await response.json();
            setMedic(data.medics);
        } catch (error) {
            console.error(error.message);
        }
    };
    useEffect(() => {
        const savedPage = localStorage.getItem('currentPage');
        if (savedPage) {
            setPage(parseInt(savedPage, 10));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('currentPage', page.toString());
        if (page === 2) {
            fetchMedics();
        }
    }, [page]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsSubmitting(true);

        if (!name || !address || !cordAddress || !email || !phone || !type) {
            setError('Все поля обязательны для заполнения');
            setIsSubmitting(false);
            return;
        }

        const cordAddressString = cordAddress.join(',');

        try {
            const response = await fetch('/api/clinic/Update-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: session.user.id,
                    name,
                    address,
                    cordAddress: cordAddressString,
                    email,
                    phone,
                    time: `${startTime}-${endTime}`,
                    htime: `${weekendStartTime}-${weekendEndTime}`,
                    type,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Не удалось обновить данные больницы.');
            }

            await update({
                name,
                address,
                cordAddress,
                email,
                phone,
                time: `${startTime}-${endTime}`,
                htime: `${weekendStartTime}-${weekendEndTime}`,
                ctype: type,
            });

            setSuccess('Данные успешно обновлены!');
            showNotification("Данные успешно обновлены!", "success");

        } catch (error) {
            setError(error.message);
            showNotification("Произошла ошибка. Попробуйте снова.", "error");

        } finally {
            setIsSubmitting(false);
        }
    };



    const handleAddMedic = async () => {
        try {
            const response = await fetch('/api/clinic/AddMedic', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    spec: specialization,
                    name: Mname,
                    lastname: Mlastname,
                    middlename: Mmiddlename,
                    date: Mdata,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                showNotification("Сотрудник добавлен", "success");
                await fetchMedics();
            } else {
                const error = await response.json();
                console.error('Ошибка:', error.error || 'Неизвестная ошибка.');
                showNotification("Произошла ошибка!", "error");

            }
        } catch (err) {
            console.error('Ошибка при добавлении:', err.message);
            showNotification("Произошла ошибка!", "error");

        }
    };



    return (
        <div className="bg-white flex">
            <Header/>
            <title>{`${name} - Профиль`}</title>

            <div
                className="fixed top-0 left-0 h-screen bg-white flex flex-col mt-24 w-80 text-gray-800 transition-all duration-700 overflow-y-auto">
                <h1 className="text-2xl ml-5 mb-3 font-bold">Профиль</h1>
                <div className="space-y-2 px-2">
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setPage(1);
                        }}
                    >
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
                        Сотрудники
                    </span>
                        </div>
                    </a>
                </div>
            </div>

            <div className="flex-grow ml-80">
                {page === 1 ? (
                    <div className="flex flex-col bg-white p-8 rounded-lg mt-20 w-[80%] mx-auto">
                        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Данные больницы</h1>

                        {error &&
                            <div
                                className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded">{error}</div>}
                        {success && (
                            <div className="mb-4 p-3 bg-green-100 text-green-700 border border-green-400 rounded">
                                {success}
                            </div>
                        )}

                        <form className="space-y-6 text-gray-800" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name">Название учреждения</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="licens">Номер лицензии</label>
                                <input
                                    id="licens"
                                    type="text"
                                    disabled
                                    value={licens}
                                    onChange={(e) => setLicens(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                <AddressInputWithMap
                                    initialCoords={cordAddress}
                                    initialAddress={address}
                                    onAddressChange={setAddress}
                                    onCoordinatesChange={setCordAddress}
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Почта</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>

                            <div className="flex flex-col space-y-4">
                                {/* Часы работы */}
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor="start-time" className="text-gray-700 font-medium">Часы работы
                                        (будние дни)</label>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="time"
                                            id="start-time"
                                            className="w-24 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                            value={startTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                        />
                                        <span className="text-gray-500">—</span>
                                        <input
                                            type="time"
                                            id="end-time"
                                            className="w-24 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                            value={endTime}
                                            onChange={(e) => setEndTime(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Часы работы (выходные дни) */}
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor="weekend-start-time" className="text-gray-700 font-medium">Часы
                                        работы (выходные дни)</label>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="time"
                                            id="weekend-start-time"
                                            className="w-24 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                            value={weekendStartTime}
                                            onChange={(e) => setWeekendStartTime(e.target.value)}
                                        />
                                        <span className="text-gray-500">—</span>
                                        <input
                                            type="time"
                                            id="weekend-end-time"
                                            className="w-24 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                            value={weekendEndTime}
                                            onChange={(e) => setWeekendEndTime(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>


                            <div>
                                <label htmlFor="phone">Номер регистратуры</label>
                                <input
                                    id="phone"
                                    type="text"
                                    value={phone}
                                    placeholder="+7 XXX XXX XX XX"
                                    maxLength={16}
                                    onChange={handlePhoneChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="">Тип учреждения</label>
                                <div className="flex">
                                    <button
                                        className={`${
                                            type === 1 ? 'bg-blue-500 text-white' : 'bg-white'
                                        } mt-1 border p-2 rounded-l-xl transition duration-500 border-gray-500`}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            setType(1);
                                        }}
                                    >
                                        Государственное
                                    </button>
                                    <button
                                        className={`${
                                            type === 2 ? 'bg-blue-500 text-white' : 'bg-white'
                                        } mt-1 border p-2 rounded-r-xl transition duration-500 px-10 border-gray-500`}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            setType(2);
                                        }}
                                    >
                                        Частное
                                    </button>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                            </button>
                        </form>
                    </div>
                ) : page === 2 ? (
                    <div className="grid grid-cols-4 ">
                        <div className=" mt-20 col-span-2  bg-white p-6 rounded-lg ">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Добавить сотрудника</h2>
                            <form>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Имя</label>
                                    <input
                                        type="text"
                                        placeholder="Введите имя"
                                        onChange={(e) => setMname(e.target.value)}
                                        className="mt-1 text-gray-800 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div className='mt-3'>
                                    <label className="block text-sm font-medium text-gray-700">Фамилия</label>
                                    <input
                                        type="text"
                                        placeholder="Введите фамилию"
                                        onChange={(e) => setMlastname(e.target.value)}

                                        className="mt-1 text-gray-800 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>


                                <div className='mt-3'>
                                    <label className="block text-sm font-medium text-gray-700">Отчество</label>
                                    <input
                                        type="text"
                                        placeholder="Введите отчество"
                                        onChange={(e) => setMmiddlename(e.target.value)}

                                        className="mt-1 text-gray-800 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    <div className='mt-3 text-gray-800'>
                                        <InputField id="birthDate" label="Дата рождения" type="date"
                                                    onChange={setBirthDate}/>
                                    </div>
                                    <div className='mt-3'>
                                        <SpecializationInput onSpecializationChange={setSpecialization}/>
                                    </div>

                                    <button
                                        type="button"
                                        className="flex mt-3 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                        disabled={!specialization || !Mdata || !Mmiddlename || !Mlastname || !Mname}
                                        onClick={handleAddMedic}
                                    >
                                        Добавить сотрудника
                                    </button>
                                </div>
                            </form>

                        </div>


                        <div className="bg-white col-start-1 col-span-10 text-gray-800 p-8 rounded-lg w-[80%]">
                            <h1 className="text-3xl font-semibold mb-6">Сотрудники</h1>

                            {medic && medic.length > 0 ? (
                                <ul className="grid grid-cols-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                    {medic.map((medicItem) => (
                                        <li
                                            key={medicItem.id}
                                            className="p-4 border rounded-md shadow-sm bg-gray-50"
                                        >
                                            <p>
                                                <strong>Имя:</strong> {medicItem.MlastName} {medicItem.MfirstName} {medicItem.MmiddleName || ''}
                                            </p>
                                            <p><strong>Специализация:</strong> {medicItem.prof}</p>
                                            <p><strong>Дата
                                                рождения:</strong> {new Date(medicItem.MbirthDate).toLocaleDateString()}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">Нет данных о сотрудниках.</p>
                            )}
                        </div>


                    </div>
                ) : null}
            </div>
        </div>
    );

}