import { useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/default/Header";
import Calendar from "@/components/default/Calendar";

const ClinicDetails = ({ clinic, medics, error }) => {
    const router = useRouter();
    const { id } = router.query;
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false); // состояние для модального окна
    const [selectedMedic, setSelectedMedic] = useState(null);
    const disabledDates = useState([]);

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    if (!clinic) {
        return <div>Загрузка...</div>;
    }

    const handleSelectMedic = (medic) => {
        setSelectedMedic(medic);
        setIsModalOpen(true); // Открываем модальное окно при выборе специалиста
    };

    const handleConfirmAppointment = () => {
        if (!selectedDate || !selectedTime) {
            alert("Пожалуйста, выберите дату и время.");
            return;
        }
        alert(
            `Запись подтверждена!\nСпециалист: ${selectedMedic?.MfirstName} ${selectedMedic?.MlastName}\nДата: ${selectedDate.toLocaleDateString()}\nВремя: ${selectedTime}`
        );
        setIsModalOpen(false);
    };

    const renderTimeSelector = () => {
        const workingHours = Array.from({ length: 10 }, (_, i) => 9 + i);
        const unavailableTimes = [
            { hour: 12, minute: 0 },
            { hour: 15, minute: 0 }
        ];


        const generateTimeSlots = (hour) => {
            const slots = [];
            for (let minute = 0; minute < 60; minute += 10) {
                slots.push({ hour, minute });
            }
            return slots;
        };

        const handleChange = (event) => {
            setSelectedTime(event.target.value);
        };

        return (
            <div className="mb-4">
                <label htmlFor="appointment-time" className="block text-gray-700 mb-2">
                    Выберите время:
                </label>
                <select
                    id="appointment-time"
                    value={selectedTime}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="" disabled>
                        Выберите время
                    </option>
                    {workingHours.map((hour) => (
                        generateTimeSlots(hour).map(({ hour, minute }) => {
                            const timeString = `${hour}:${minute === 0 ? "00" : minute}`;
                            const isUnavailable = unavailableTimes.some(
                                (time) => time.hour === hour && time.minute === minute
                            );

                            return (
                                !isUnavailable && (
                                    <option key={timeString} value={timeString}>
                                        {timeString}
                                    </option>
                                )
                            );
                        })
                    ))}
                </select>
            </div>
        );
    };

    return (
        <div>
            <Header />
            <title>{`${clinic.clinic[0].name} - Подробная информация`}</title>
            <div className="relative bg-[#D3E4FD] py-20 px-4">
                <div className="max-w-7xl mt-20 mx-auto">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {clinic.clinic[0].name}
                        </h1>
                        <p className="text-xl text-gray-700 mb-8">
                            {clinic.clinic[0].type === 1
                                ? "Государственная клиника"
                                : "Частная клиника"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 text-gray-800 py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Контактная информация</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                            <div>
                                <h3 className="text-xl font-semibold mb-3">Адрес</h3>
                                <p className="text-gray-600">{clinic.clinic[0].address}</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                            <div>
                                <h3 className="text-xl font-semibold mb-3">Часы работы</h3>
                                <p className="text-gray-600">
                                    Пн-Пт: {clinic.clinic[0].time}<br/>
                                    Сб-Вс: {clinic.clinic[0].htime}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 className="text-3xl font-bold mb-5 mt-5 text-center">Сотрудники больницы</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {medics.medics.map((medic) => (
                        <li
                            key={medic.id}
                            className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex flex-col items-center"
                        >
                            <div
                                className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-bold mb-4">
                                {medic.MfirstName[0]}
                                {medic.MlastName[0]}
                            </div>
                            <p className="text-center text-lg font-semibold text-gray-800 mb-2">
                                {medic.MfirstName} {medic.MlastName}
                            </p>
                            <p className="text-center text-sm text-gray-500 mb-3">{medic.prof}</p>
                            <button
                                onClick={() => handleSelectMedic(medic)}
                                className="bg-blue-500 text-white text-center justify-center rounded-lg w-full"
                            >
                                Записаться на приём
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg text-gray-800 shadow-lg w-96">
                        <h2 className="text-2xl font-bold mb-4">Запись на приём</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Выберите дату:</label>
                            <Calendar
                                disabledDates={disabledDates.map(date => new Date(date))}
                                selectedDate={selectedDate}
                                onDateChange={setSelectedDate}
                            />
                        </div>
                        {renderTimeSelector()}
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setIsModalOpen(false)} // Закрыть модальное окно
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={handleConfirmAppointment}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            >
                                Подтвердить
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClinicDetails;
