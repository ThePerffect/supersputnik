import { useRouter } from "next/router";
import { Clock, MapPin, Phone} from "lucide-react";
import "@/app/globals.css";
import Header from "@/components/default/Header";


const ClinicDetails = ({ clinic, medics, error }) => {
    const router = useRouter();
    const { id } = router.query;

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    if (!clinic) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            <Header/>
            <title>{`${clinic.clinic[0].name} - Подробная информация`}</title>
            <div className="relative  bg-[#D3E4FD] py-20 px-4">
                <div className="max-w-7xl mt-20 mx-auto">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {clinic.clinic[0].name}
                        </h1>
                        <p className="text-xl text-gray-700 mb-8">
                            {clinic.clinic[0].type === 1 ? ("Государственная клиника") : ("Частная клиника")}
                        </p>
                        <div className="flex  text-gray-800  items-center justify-center gap-4 text-lg">
                            <Phone className="w-6  h-6"/>
                            <a href={`tel:${clinic.clinic[0].phone}`} className="hover:text-blue-600 transition-colors">
                                {clinic.clinic[0].phone}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50  text-gray-800  py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Контактная информация</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                            <MapPin className="w-10 h-10 text-blue-500 mb-4"/>
                            <div>
                                <h3 className="text-xl font-semibold mb-3">Адрес</h3>
                                <p className="text-gray-600">
                                    {clinic.clinic[0].address}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                            <Clock className="w-10 h-10 text-blue-500 mb-4"/>
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


                <h2 className='text-3xl font-bold mb-5 mt-5 text-center'>Сотрудники больницы</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {medics.medics.map((medic) => (
                        <li
                            key={medic.id}
                            className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex flex-col items-center"
                        >
                            <div
                                className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-bold mb-4"
                            >
                                {medic.MfirstName[0]}
                                {medic.MlastName[0]}
                            </div>
                            <p className="text-center text-lg font-semibold text-gray-800 mb-2">
                                {medic.MfirstName} {medic.MlastName}
                            </p>
                            <p className="text-center text-sm text-gray-500">{medic.prof}</p>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
};

export async function getServerSideProps(context) {
    const {id} = context.params;

    const isServer = typeof window === "undefined";
    const baseUrl = isServer ? `http://${context.req.headers.host}` : "";

    try {
        const res = await fetch(`${baseUrl}/api/clinic/GetClinic?id=${id}`);
        if (!res.ok) {
            throw new Error('Не удалось загрузить данные больницы');
        }
        const clinic = await res.json();
        console.log(clinic)
        const medicsRes = await fetch(`${baseUrl}/api/clinic/GetMedics?id=${id}`);
        if (!medicsRes.ok) {
            throw new Error('Не удалось загрузить данные о работниках');
        }
        const medics = await medicsRes.json();
        return {
            props: {
                clinic,
                medics,
            },
        };
    } catch (error) {
        return {
            props: {
                error: error.message,
            },
        };
    }
}

export default ClinicDetails;
