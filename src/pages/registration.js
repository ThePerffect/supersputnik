import { useState } from "react";
import "@/app/globals.css";
import { useRouter } from "next/navigation";
import InputField from "@/components/ui/InputField";
import {useNotification} from "@/components/ui/Message";

export default function Registration() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();
    const { showNotification } = useNotification();

    const validateBirthDate = (date) => {
        const today = new Date();
        const birth = new Date(date);
        const age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (isNaN(birth)) {
            return "Введите корректную дату рождения.";
        }
        if (birth > today) {
            return "Дата рождения не может быть в будущем.";
        }
        if (age > 120) {
            return "Проверьте дату рождения — возраст не может быть более 120 лет.";
        }
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }

        const birthDateError = validateBirthDate(birthDate);
        if (birthDateError) {
            setError(birthDateError);
            return;
        }

        setError("");
        try {
            const response = await fetch("/api/user/Register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    middleName,
                    birthDate,
                    email,
                    password,
                }),
            });

            console.log(response)
            if (!response.ok) {
                const { message } = await response.json();
                setError(message || "Произошла ошибка регистрации");
                return;
            }

            setSuccess("Регистрация успешна! Вы можете войти.");
            setFirstName("");
            setLastName("");
            setMiddleName("");
            setBirthDate("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            router.push("/login");
            showNotification("Вы успешно зарегистрировались!", "success");

        } catch (err) {
            setError("Произошла ошибка. Попробуйте ещё раз.");
        }
    };

    return (
        <div className="flex justify-center items-center flex-col text-black h-screen bg-gray-100">
            <title>WEB MED - Регистрация</title>
            <div className="flex">
                <a
                    href="#"
                    className="block bg-white shadow-2xl w-48 p-2 text-center rounded-t-lg transition duration-150"
                >
                    <span className="text-blue-700 font-medium text-sm">Пользователь</span>
                </a>
                <a
                    href="clinics/registration"
                    className="block bg-gray-200 shadow-2xl w-48 p-2 text-center rounded-t-lg hover:bg-gray-100 transition duration-150"
                >
                    <span className="text-blue-700 font-medium text-sm">Учреждение</span>
                </a>
            </div>
            <div className="bg-white p-8 rounded-b-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6">Регистрация</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <InputField id="firstName" label="Имя" value={firstName} onChange={setFirstName} />
                    <InputField id="lastName" label="Фамилия" value={lastName} onChange={setLastName} />
                    <InputField id="middleName" label="Отчество" value={middleName} onChange={setMiddleName} />
                    <InputField id="birthDate" label="Дата рождения" type="date" value={birthDate} onChange={setBirthDate} />
                    <InputField id="email" label="Email" type="email" value={email} onChange={setEmail} />
                    <InputField id="password" label="Пароль" type="password" value={password} onChange={setPassword} />
                    <InputField
                        id="confirmPassword"
                        label="Подтвердите пароль"
                        type="password"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                    />
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Зарегистрироваться
                    </button>
                </form>
                <div className="text-center mt-5">
                    <a href="/login">Уже есть аккаунт?</a>
                </div>
            </div>
        </div>
    );
}
