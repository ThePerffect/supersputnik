import { useState } from 'react';

const Calendar = ({ disabledDates, selectedDate, onDateChange }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const startDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const days = Array.from(
        { length: daysInMonth(currentMonth.getMonth(), currentMonth.getFullYear()) },
        (_, i) => new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1)
    );

    const monthNames = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];

    const changeMonth = (increment) => {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(currentMonth.getMonth() + increment);
        setCurrentMonth(newMonth);
    };

    const isDisabled = (date) => {
        return disabledDates.some((disabledDate) =>
            new Date(disabledDate).toDateString() === date.toDateString()
        );
    };

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg w-80">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => changeMonth(-1)}
                    className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                    &lt;
                </button>
                <span className="font-bold text-lg">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </span>
                <button
                    onClick={() => changeMonth(1)}
                    className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                    &gt;
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
                {"Пн Вт Ср Чт Пт Сб Вс".split(" ").map((day, index) => (
                    <div key={index} className="font-bold text-gray-700">
                        {day}
                    </div>
                ))}
                {Array.from({ length: (startDay + 6) % 7 }, (_, i) => (
                    <div key={i}></div>
                ))}
                {days.map((date) => (
                    <button
                        key={date}
                        onClick={() => !isDisabled(date) && onDateChange(date)}
                        className={`p-2 rounded-lg ${
                            date.toDateString() === new Date(selectedDate).toDateString()
                                ? "bg-blue-500 text-white"
                                : isDisabled(date)
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "hover:bg-gray-200"
                        }`}
                        disabled={isDisabled(date)}
                    >
                        {date.getDate()}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
