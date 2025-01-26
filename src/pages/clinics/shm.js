import { useState, useEffect } from "react";
import "@/app/globals.css";

const AdminPanel = ({ medics, error }) => {
    const [selectedMedic, setSelectedMedic] = useState(null);
    const [schedule, setSchedule] = useState({});
    const [updatedSchedule, setUpdatedSchedule] = useState({});
    const [disabledDates, setDisabledDates] = useState([]);

    useEffect(() => {
        if (selectedMedic) {
            fetch(`/api/clinic/GetSchedule?id=${selectedMedic.id}`)
                .then((res) => res.json())
                .then((data) => {
                    setSchedule(data.schedule || {});
                    setDisabledDates(data.disabledDates || []);
                })
                .catch(() => alert("Не удалось загрузить расписание"));
        }
    }, [selectedMedic]);

    const handleScheduleChange = (day, value) => {
        setUpdatedSchedule((prev) => ({
            ...prev,
            [day]: value,
        }));
    };

    const handleSaveSchedule = () => {
        if (!selectedMedic) {
            alert("Выберите сотрудника для сохранения расписания");
            return;
        }

        fetch(`/api/clinic/UpdateSchedule`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                medicId: selectedMedic.id,
                schedule: updatedSchedule,
                disabledDates,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    alert("Расписание успешно обновлено");
                    setSchedule(updatedSchedule);
                } else {
                    alert("Ошибка при обновлении расписания");
                }
            })
            .catch(() => alert("Ошибка при подключении к серверу"));
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Панель администратора</h1>
            {error && <p className="text-red-500">Ошибка: {error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-xl font-semibold mb-2">Сотрудники</h2>
                    <ul className="bg-white shadow p-4 rounded-lg">
                        {Array.isArray(medics?.medics) ? (
                            medics.medics.map((medic) => (
                                <li
                                    key={medic.id}
                                    className={`p-2 cursor-pointer rounded-md ${selectedMedic?.id === medic.id ? "bg-blue-100" : "hover:bg-gray-100"}`}
                                    onClick={() => setSelectedMedic(medic)}
                                >
                                    {medic.MfirstName} {medic.MlastName} — {medic.prof}
                                </li>
                            ))
                        ) : (
                            <p className="text-red-500">Данные о сотрудниках недоступны.</p>
                        )}

                    </ul>
                </div>
                {selectedMedic && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            Расписание: {selectedMedic.firstName} {selectedMedic.lastName}
                        </h2>
                        <div className="bg-white shadow p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">Рабочие дни и время</h3>
                            {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
                                <div key={day} className="mb-2">
                                    <label className="block font-medium mb-1">{day}:</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded-md p-2"
                                        placeholder="Например: 9:00 - 18:00"
                                        value={updatedSchedule[day] || schedule[day] || ""}
                                        onChange={(e) => handleScheduleChange(day, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="bg-white shadow p-4 rounded-lg mt-4">
                            <h3 className="font-semibold mb-2">Недоступные даты</h3>
                            <textarea
                                className="w-full border rounded-md p-2"
                                placeholder="Введите даты через запятую (например, 2025-01-30, 2025-02-01)"
                                value={disabledDates.join(", ")}
                                onChange={(e) =>
                                    setDisabledDates(e.target.value.split(",").map((d) => d.trim()))
                                }
                            />
                        </div>
                        <button
                            onClick={handleSaveSchedule}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            Сохранить изменения
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export async function getServerSideProps(context) {
    const { id } = context.query;

    if (!id) {
        return { props: { error: "Идентификатор больницы не указан", medics: [] } };
    }

    try {
        const medicsRes = await fetch(`http://localhost:3000/api/clinic/GetMedics?id=${id}`);
        if (!medicsRes.ok) {
            throw new Error("Не удалось загрузить данные сотрудников");
        }
        const medics = await medicsRes.json();

        return { props: { medics } };
    } catch (error) {
        return { props: { error: error.message, medics: [] } };
    }
}

export default AdminPanel;
