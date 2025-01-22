"use client";

import React, { useState } from "react";
import { Building2, Clock, Stethoscope, Users } from "lucide-react";
import Header from "@/components/default/Header";
import Image from "next/image";
import HospitalCard from "@/components/default/HospitalCard";
import HospitalSkeleton from "@/components/default/HospitalSkeleton";
import AddressInputWithMap from "@/components/default/AddressInputWithMap";
import SpecializationInput from "@/components/default/SpecializationInput";
import Footer from "@/components/default/Footer";

export default function Home() {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [specialization, setSpecialization] = useState("");


    const handleCoordinatesChange = async (coordinates) => {
        try {
            setLoading(true);
            setError("");
            setHospitals([]);
            console.log(specialization)
            const response = await fetch(
                `/api/nearest-hospitals?lat=${coordinates[0]}&lng=${coordinates[1]}&specialization=${specialization}`
            );

            if (!response.ok) {
                throw new Error("Не удалось загрузить больницы");
            }

            const data = await response.json();

            if (!Array.isArray(data.hospitals)) {
                throw new Error("Некорректный формат ответа от сервера");
            }

            const hospitalsWithTime = await Promise.all(
                data.hospitals.map(async (hospital) => {
                    return { ...hospital };
                })
            );

            setHospitals(hospitalsWithTime);
        } catch (err) {
            setError(err.message || "Произошла ошибка");
        } finally {
            setLoading(false);
        }
    };
    console.log(specialization)

    const handleScroll = () => {
        window.scrollTo({
            top: 1200,
            left: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            <div className="bg-blue-100">
                <Header/>
                <div className="relative min-h-screen bg-white rounded-b-3xl shadow">
                    <div className="absolute w-full h-full  overflow-hidden">
                        <div className="relative  w-full h-full">
                            <div
                                className="absolute hidden xl:block 2xl:block top-[30%] right-[20%] bg-gradient-to-b from-[#0f94c2] to-[#75ddf6] w-[1100px] h-[1100px] rounded-full transform translate-x-1/2 -translate-y-1/2">
                                <Image
                                    src="/image_1.svg"
                                    alt="Medical Innovation"
                                    loading="eager"
                                    className="w-[73%]  h-[60%] rounded-b-full mt-[35%] ml-[13%]"
                                    width={70}
                                    height={70}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 min-h-screen flex items-center justify-center">
                        <div className="container mx-auto px-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <div className="text-center md:text-left">
                                    <h1 className="text-5xl md:text-7xl font-bold text-gray-800 leading-tight">
                                        WEB MED <br/> ДОСТУПНАЯ МЕДИЦИНА
                                    </h1>
                                    <p className="text-xl md:text-2xl text-gray-600 mt-4 md:pr-20">
                                        Мы создаем инновационные решения для <br/>
                                        доступной медицины.
                                    </p>
                                    <button
                                        onClick={handleScroll}
                                        className="bg-gradient-to-br from-[#0f94c2] to-[#75ddf6] text-white px-6 py-3 rounded-full mt-8 hover:bg-blue-600 transition duration-300"
                                    >
                                        Узнать больше
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div
                            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
                            <div className="flex items-center mb-6">
                                <Building2 className="w-10 h-10 text-blue-500 mr-4"/>
                                <h3 className="text-xl font-semibold">Простота разработки</h3>
                            </div>
                            <p className="text-gray-600">
                                Создайте страницу медучреждения за считанные минуты без специальных знаний
                            </p>
                        </div>

                        <div
                            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
                            <div className="flex items-center mb-6">
                                <Users className="w-10 h-10 text-blue-500 mr-4"/>
                                <h3 className="text-xl font-semibold">Понятный интерфейс</h3>
                            </div>
                            <p className="text-gray-600">
                                Интуитивно понятный интерфейс для пользователей любого возраста
                            </p>
                        </div>

                        <div
                            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
                            <div className="flex items-center mb-6">
                                <Stethoscope className="w-10 h-10 text-blue-500 mr-4"/>
                                <h3 className="text-xl font-semibold">Доступность</h3>
                            </div>
                            <p className="text-gray-600">
                                Бесплатный доступ к платформе из любой точки России
                            </p>
                        </div>

                        <div
                            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
                            <div className="flex items-center mb-6">
                                <Clock className="w-10 h-10 text-blue-500 mr-4"/>
                                <h3 className="text-xl font-semibold">Быстрый поиск</h3>
                            </div>
                            <p className="text-gray-600">
                                Мгновенный поиск ближайших медицинских учреждений
                            </p>
                        </div>
                    </div>
                </div>
                <div className='bg-white'>
                    <div className="container    mx-auto  w-fullpx-4 py-16">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl sm:text-4xl font-bold text-medical-dark mb-4">
                                Найти ближайшие больницы
                            </h1>
                            <p className="text-gray-600">
                                Введите адрес и специализацию врача, чтобы найти медицинские учреждения поблизости
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                            <AddressInputWithMap onCoordinatesChange={handleCoordinatesChange} showMarks={true} specInput={
                                <SpecializationInput onSpecializationChange={setSpecialization}/>}
                                spec={specialization} needinput={!specialization}
                                />

                        </div>

                        {loading && <HospitalSkeleton/>}

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
                                {error}
                            </div>
                        )}

                        {!loading && hospitals.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-semibold mx-2 text-medical-dark mb-4">
                                    Ближайшие больницы:
                                </h2>
                                <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {hospitals.map((hospital) => (
                                        <HospitalCard
                                            key={hospital.id}
                                            id={hospital.id}
                                            name={hospital.name}
                                            address={hospital.address}
                                            distance={hospital.distance}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {!loading && hospitals.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                Больницы не найдены
                            </div>
                        )}
                    </div>
                    <Footer/>
                </div>
            </div>
        </>
    );
}
