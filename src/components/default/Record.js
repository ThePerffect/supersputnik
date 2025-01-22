'use client';

import React, { useEffect, useState } from 'react';
import { DayPilot, DayPilotMonth, DayPilotNavigator } from '@daypilot/daypilot-lite-react';
import Modal from 'react-modal';
import './toolbar.css';
import prisma from '../../../../prisma/client'; // Импорт Prisma клиента

Modal.setAppElement('#__next');

export default function MedicsCalendar() {
    const [calendar, setCalendar] = useState<DayPilot.Month>();
    const [datePicker, setDatePicker] = useState<DayPilot.Navigator>();
    const [events, setEvents] = useState<DayPilot.EventData[]>([]);
    const [startDate, setStartDate] = useState<string | DayPilot.Date>('2025-11-01');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState<DayPilot.EventData | null>(null);

    const fetchEvents = async () => {
        // Получение данных из базы Prisma
        const result = await prisma.medics.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                middleName: true,
                birthDate: true,
                profession: true,
            },
        });

        const mappedEvents = result.map((medic) => ({
            id: medic.id,
            text: `${medic.firstName} ${medic.lastName}`,
            start: new Date(medic.birthDate).toISOString(),
            end: new Date(medic.birthDate).toISOString(),
            tags: {
                profession: medic.profession,
            },
        }));

        setEvents(mappedEvents);
    };

    const handleSaveEvent = async (eventData) => {
        if (currentEvent) {
            // Обновление события
            await prisma.medics.update({
                where: { id: currentEvent.id },
                data: {
                    firstName: eventData.firstName,
                    lastName: eventData.lastName,
                    middleName: eventData.middleName,
                    profession: eventData.profession,
                },
            });
        } else {
            // Создание нового события
            const newMedic = await prisma.medics.create({
                data: {
                    firstName: eventData.firstName,
                    lastName: eventData.lastName,
                    middleName: eventData.middleName,
                    profession: eventData.profession,
                    birthDate: new Date(eventData.birthDate),
                },
            });

            // Добавление записи в таблицу
            await prisma.records.create({
                data: {
                    medicId: newMedic.id,
                    date: new Date(eventData.birthDate),
                    description: `Запись создана для медика ${eventData.firstName} ${eventData.lastName}`,
                },
            });
        }

        await fetchEvents();
        setModalIsOpen(false);
    };

    const handleDeleteEvent = async () => {
        if (currentEvent) {
            await prisma.medics.delete({ where: { id: currentEvent.id } });
            await fetchEvents();
            setModalIsOpen(false);
        }
    };

    useEffect(() => {
        fetchEvents();
        datePicker?.select('2025-11-01');
    }, [calendar, datePicker]);

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '10px' }}>
                <DayPilotNavigator
                    selectMode={'Month'}
                    showMonths={3}
                    skipMonths={3}
                    onTimeRangeSelected={(args) => setStartDate(args.start)}
                    controlRef={setDatePicker}
                />
            </div>
            <div style={{ flexGrow: '1' }}>
                <div className={'toolbar'}>
                    <button onClick={() => datePicker?.select(DayPilot.Date.today())}>Today</button>
                </div>
                <DayPilotMonth
                    startDate={startDate}
                    events={events}
                    eventBorderRadius={'5px'}
                    eventBarVisible={false}
                    eventHeight={80}
                    cellHeight={120}
                    onEventClick={(args) => {
                        setCurrentEvent(args.e.data);
                        setModalIsOpen(true);
                    }}
                    controlRef={setCalendar}
                />
            </div>

            {modalIsOpen && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    contentLabel="Edit Medic Event"
                >
                    <h2>{currentEvent ? 'Edit Medic' : 'New Medic'}</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            handleSaveEvent(Object.fromEntries(formData));
                        }}
                    >
                        <label>First Name:</label>
                        <input
                            name="firstName"
                            defaultValue={currentEvent?.tags?.firstName || ''}
                            required
                        />
                        <label>Last Name:</label>
                        <input
                            name="lastName"
                            defaultValue={currentEvent?.tags?.lastName || ''}
                            required
                        />
                        <label>Middle Name:</label>
                        <input
                            name="middleName"
                            defaultValue={currentEvent?.tags?.middleName || ''}
                        />
                        <label>Profession:</label>
                        <input
                            name="profession"
                            defaultValue={currentEvent?.tags?.profession || ''}
                            required
                        />
                        <label>Birth Date:</label>
                        <input
                            name="birthDate"
                            type="date"
                            defaultValue={currentEvent?.start?.split('T')[0] || ''}
                            required
                        />
                        <button type="submit">Save</button>
                        {currentEvent && <button type="button" onClick={handleDeleteEvent}>Delete</button>}
                        <button type="button" onClick={() => setModalIsOpen(false)}>Cancel</button>
                    </form>
                </Modal>
            )}
        </div>
    );
}
