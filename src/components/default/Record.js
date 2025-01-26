import React, { useState } from 'react';

const DateTimePickerModal = ({ open, onClose, busyDates, busyTimes, onSubmit }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const isDateBusy = (date) => busyDates.includes(date);
    const isTimeBusy = (time) => busyTimes.includes(time);

    const handleSubmit = () => {
        if (selectedDate && selectedTime) {
            onSubmit({ date: selectedDate, time: selectedTime });
            onClose();
        }
    };

    if (!open) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2 style={styles.title}>Выберите дату и время</h2>
                <div style={styles.content}>
                    <label style={styles.label}>
                        Дата:
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]} // минимальная дата — сегодня
                            style={styles.input}
                        />
                        {isDateBusy(selectedDate) && (
                            <span style={styles.error}>Эта дата недоступна</span>
                        )}
                    </label>
                    <label style={styles.label}>
                        Время:
                        <input
                            type="time"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            disabled={!selectedDate || isDateBusy(selectedDate)}
                            style={styles.input}
                        />
                        {isTimeBusy(selectedTime) && (
                            <span style={styles.error}>Это время недоступно</span>
                        )}
                    </label>
                </div>
                <div style={styles.actions}>
                    <button onClick={onClose} style={styles.button}>
                        Отмена
                    </button>
                    <button
                        onClick={handleSubmit}
                        style={{ ...styles.button, ...styles.submitButton }}
                        disabled={!selectedDate || !selectedTime || isDateBusy(selectedDate) || isTimeBusy(selectedTime)}
                    >
                        Подтвердить
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: '8px',
        width: '400px',
        maxWidth: '90%',
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    title: {
        margin: '0 0 20px 0',
        fontSize: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    label: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '14px',
        fontWeight: 'bold',
    },
    input: {
        marginTop: '5px',
        padding: '8px',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    error: {
        marginTop: '5px',
        fontSize: '12px',
        color: 'red',
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
        marginTop: '20px',
    },
    button: {
        padding: '8px 16px',
        fontSize: '14px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
    },
    submitButton: {
        backgroundColor: '#007BFF',
        color: 'white',
    },
};

export default DateTimePickerModal;
