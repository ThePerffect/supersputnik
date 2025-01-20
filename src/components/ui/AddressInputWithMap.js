'use client';

import React, { useEffect, useState } from "react";
import { Map, Placemark, YMaps } from "react-yandex-maps";
import Loading from "@/components/ui/Loading";

const AddressInputWithMap = ({ onAddressChange, onCoordinatesChange, initialCoords, initialAddress, showMarks, specInput, spec, needinput }) => {
    const [address, setAddress] = useState("");
    const [selectedCoords, setSelectedCoords] = useState([55.75, 37.57]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [hospitals, setHospitals] = useState([]);
    const [specialization, setSpecialization] = useState("");

    // Установка начальных данных
    useEffect(() => {
        if (initialCoords && Array.isArray(initialCoords) && initialCoords.length === 2) {
            setSelectedCoords(initialCoords);
        }
        if (initialAddress && typeof initialAddress === "string") {
            setAddress(initialAddress);
        }
    }, [initialCoords, initialAddress]);

    useEffect(() => {
        if (specInput && spec) {
            setSpecialization(spec);
        }
    }, [specInput, spec]);

    const handleSearch = async () => {


        setLoading(true);
        setError("");

        if (address.length > 0) {
            try {
                const apiKey = "a08951d8-f98a-45b7-a721-e42b293eb9ce";
                const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${encodeURIComponent(
                    address
                )}&format=json&results=1&lang=ru_RU`;

                const response = await fetch(url);
                const data = await response.json();

                const geoObjects = data.response.GeoObjectCollection.featureMember;

                if (!geoObjects.length) {
                    setError("Адрес не найден. Проверьте правильность ввода.");
                    return;
                }

                const coordinates = geoObjects[0].GeoObject.Point.pos
                    .split(" ")
                    .map(Number)
                    .reverse();
                setSelectedCoords(coordinates);

                if (onAddressChange) onAddressChange(address);
                if (onCoordinatesChange) onCoordinatesChange(coordinates);
                console.log(coordinates)

                if (showMarks) {
                    try {
                        setHospitals([]);

                        let response;

                        if (!needinput) {
                            response = await fetch(
                                `/api/nearest-hospitals?lat=${coordinates[0]}&lng=${coordinates[1]}&specialization=${specialization}`
                            );
                        } else {
                            response = await fetch(
                                `/api/nearest-hospitals?lat=${coordinates[0]}&lng=${coordinates[1]}`
                            );
                        }

                        if (!response.ok) {
                            throw new Error("Не удалось загрузить больницы");
                        }

                        const data = await response.json();

                        if (!Array.isArray(data.hospitals)) {
                            throw new Error("Некорректный формат ответа от сервера");
                        }

                        setHospitals(data.hospitals);
                    } catch (err) {
                        setError(err.message || "Произошла ошибка");
                    }
                }
            } catch (err) {
                console.error("Ошибка геокодирования:", err);
                setError("Произошла ошибка при обработке адреса.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div>
            <label htmlFor="addresinput" className="block text-sm font-medium text-gray-700">Введите ваш адрес</label>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="flex my-2">
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Введите адрес"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm mb-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    name="addresinput"
                />
                <button
                    type="button"
                    onClick={handleSearch}
                    className="mt-1 ml-1 px-3 py-2 border border-blue-500 bg-blue-500 rounded-md shadow-sm mb-2 text-white hover:bg-blue-600 transition duration-150 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? <Loading h="5" /> :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    }
                </button>
            </div>
            {specInput && (
                <div className="mt-3 mb-5">
                    {specInput}
                </div>
            )}
            <YMaps query={{ apikey: "a08951d8-f98a-45b7-a721-e42b293eb9ce" }}>
                <Map
                    state={{ center: selectedCoords, zoom: 15 }}
                    width="100%"
                    height="300px"
                >
                    <Placemark geometry={selectedCoords} />
                    {hospitals.map((hospital) => {
                        const coords = hospital.cord_address.split(",").map(Number);
                        return (
                            <Placemark
                                key={hospital.id}
                                geometry={coords}
                                options={{
                                    iconColor: "red",
                                    preset: "islands#redMedicalCircleIcon",
                                }}
                            />
                        );
                    })}
                </Map>
            </YMaps>
        </div>
    );
};

export default AddressInputWithMap;
