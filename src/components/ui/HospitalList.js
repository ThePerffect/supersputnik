export default function HospitalsList({ hospitals, loading, error }) {
    return (
        <div className="mt-4">
            {loading && <p>Загрузка больниц...</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}

            {!loading && hospitals && hospitals.length > 0 && (
                <div>
                    <h2 className="text-xl font-bold mb-2">Ближайшие больницы:</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {hospitals.map((hospital) => (
                            <div
                                key={hospital.id}
                                className="cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
                            >
                                <p><strong>Название:</strong> {hospital.name}</p>
                                <p><strong>Адрес:</strong> {hospital.address}</p>
                                <p><strong>Расстояние:</strong> {hospital.distance.toFixed(2)} м</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!loading && hospitals && hospitals.length === 0 && (
                <p>Больницы не найдены</p>
            )}
        </div>
    );
}
