'use client';

import { useState } from "react";
import "@/app/globals.css";
import { useRouter } from "next/navigation";
import InputField from "@/components/ui/InputField";
import AddressInputWithMap from "@/components/ui/AddressInputWithMap";
import {useNotification} from "@/components/ui/Message";

export default function ClinicRegistration() {
    const [clinicName, setClinicName] = useState("");
    const [licenseNumber, setLicenseNumber] = useState("");
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState([55.75, 37.57]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const { showNotification } = useNotification();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            setError("Пароли не совпадают");
            setLoading(false);
            return;
        }

        setError("");
        try {
            const response = await fetch("/api/clinic/Register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    clinicName,
                    licenseNumber,
                    address,
                    coordinates: coordinates.join(", "),
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                const { message } = await response.json();
                setError(message || "Ошибка регистрации");
                return;
            }


            router.push("/clinics/login");
            showNotification("Вы успешно зарегистрировались!", "success");
        } catch (err) {
            showNotification("Произошла ошибка. Попробуйте ещё раз.", "error");
            setError("Произошла ошибка. Попробуйте ещё раз.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center  bg- items-center flex-col text-black h-screen bg-gray-100">
            <title>WEB MED - Регистрация</title>
            <div className="flex">
                <a
                    href="/registration"
                    className="block bg-gray-200 shadow-2xl w-48 p-2 text-center rounded-t-lg transition duration-150"
                >
                    <span className="text-blue-700 font-medium text-sm">Пользователь</span>
                </a>
                <a
                    href="#"
                    className="block bg-white shadow-2xl w-48 p-2 text-center rounded-t-lg hover:bg-gray-100 transition duration-150"
                >
                    <span className="text-blue-700 font-medium text-sm">Учреждение</span>
                </a>
            </div>
            <div className="bg-white p-4 rounded-b-lg shadow-md w-96 text-xs">
                <h1 className="text-xl font-bold mb-3">Регистрация учреждения</h1>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-3">
                    <InputField id="clinicName" label="Название учреждения" value={clinicName} onChange={setClinicName} />
                    <InputField id="licenseNumber" label="Номер лицензии" value={licenseNumber} onChange={setLicenseNumber} />
                    <InputField id="email" label="Email" type="email" value={email} onChange={setEmail} />
                    <InputField id="password" label="Пароль" type="password" value={password} onChange={setPassword} />
                    <InputField id="confirmPassword" label="Подтвердите пароль" type="password" value={confirmPassword} onChange={setConfirmPassword}/>
                    <AddressInputWithMap
                        onAddressChange={setAddress}
                        onCoordinatesChange={setCoordinates}
                    />
                    <button
                        type="submit"
                        className="w-full py-3 px-3 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        disabled={loading}
                    >
                        {loading ? "Регистрация..." : "Зарегистрироваться"}
                    </button>
                </form>
            </div>
        </div>
    );
}
