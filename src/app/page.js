import Header from "../components/ui/Header";
import Image from "next/image";


export default function Home() {


    return (<>
        <div className="bg-blue-100">
            <Header/>

            <div className="relative min-h-screen bg-white rounded-b-3xl shadow">
                <div className="absolute w-full h-full overflow-hidden">
                    <div className="relative w-full h-full">
                        <div
                            className="lg:block xl:block md:hidden sm:hidden sl:hidden  absolute top-[30%] right-[20%] to-[#75ddf6] from-[#0f94c2] bg-gradient-to-b w-[1100px] h-[1100px] rounded-full transform translate-x-1/2 -translate-y-1/2">
                            <div className="relative">
                                <Image src={'/image_1.svg'} alt="Medical Innovation" loading='eager'
                                       className="w-[70%] h-[70%] rounded-b-full mt-[35%] ml-[13%]" width='70'
                                       height='70'/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="z-10 min-h-screen flex items-center justify-center">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="text-center md:text-left">
                                <h1 className="text-5xl md:text-7xl font-bold text-gray-800 leading-tight">
                                    WEB MED <br/> ДОСТУПНАЯ МЕДИЦИНА
                                </h1>
                                <p className="text-xl md:text-2xl text-gray-600 mt-4 md:pr-20">
                                    Мы создаем инновационные решения для <br/>доступной медицины.
                                </p>
                                <button
                                    className="bg-gradient-to-br to-[#75ddf6] from-[#0f94c2] text-white px-6 py-3 rounded-full mt-8 hover:bg-blue-600 transition duration-300">
                                    Узнать больше
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 mx-4 sm:mx-10 1.5xl:grid-cols-2 2xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-2 h-[2%]">
                <div
                    className='rounded-2xl bg-gradient-to-br to-[#75ddf6] from-[#0f94c2] text-white text-center m-4 sm:m-10 p-6 sm:p-10 shadow'>
                    <div className='flex justify-center items-center'>
                        <p className='text-2xl font-bold pt-3 pr-3 leading-tight'>Приемущества</p>
                        <div className='w-14 h-14 rounded-xl flex items-center justify-center text-blue'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-14 h-14">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"/>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"/>
                            </svg>
                        </div>
                    </div>
                    <p className='text-base font-bold text-center p-4 sm:p-10 leading-tight pt-14 pb-2'>Кратко расскажем
                        о
                        своих
                        преимуществах</p>
                </div>
                <div className='rounded-2xl bg-white text-center m-4 sm:m-10 shadow p-6 sm:p-10'>
                    <div className='flex justify-center items-center'>
                        <p className='text-2xl font-bold pr-3 leading-tight'>Простота разработки</p>
                        <div className='w-14 h-14 mr-7 rounded-xl flex items-center justify-center text-blue'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-14 h-14">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"/>
                            </svg>
                        </div>
                    </div>
                    <p className='text-base font-bold text-center leading-tight pt-10 pb-5'>Наша платформа позволяет
                        создать страницу мед.учереждения за считаные минуты без особых знаний</p>
                    <a href=""
                       className='py-2 px-3 bg-gradient-to-br to-[#75ddf6] from-[#0f94c2] rounded-2xl text-xl text-white'>Подробнее</a>
                </div>
                <div className='rounded-2xl bg-white text-center m-4 sm:m-10 shadow p-6 sm:p-10'>
                    <div className='flex justify-center items-center'>
                        <p className='text-2xl font-bold pr-3 leading-tight'>Понятный интерфейс</p>
                        <div className='w-14 h-14 mr-7 rounded-xl flex items-center justify-center text-blue'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-14 h-14">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/>
                            </svg>
                        </div>
                    </div>
                    <p className='text-base font-bold text-center leading-tight pt-10 pb-5'>
                        На платформе выполнен очень понятный интерфейс, который будет понятен как и ребёнку, так и
                        старшему поколению
                    </p>
                    <a href=""
                       className='py-2 px-3 bg-gradient-to-br to-[#75ddf6] from-[#0f94c2] rounded-2xl text-xl text-white'>Подробнее</a>
                </div>
                <div className='rounded-2xl bg-white text-center m-4 sm:m-10 shadow p-6 sm:p-10'>
                    <div className='flex justify-center items-center'>
                        <p className='text-2xl font-bold pr-3 leading-tight'>Абсолютно бесплатно</p>
                        <div className='w-14 h-14 mr-7 rounded-xl flex items-center justify-center text-blue'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-14 h-14">
                                <path strokeLinejoin="round"
                                      d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"/>
                            </svg>
                        </div>
                    </div>
                    <p className='text-base font-bold text-center leading-tight pt-10 pb-10'>
                        Пользоваться нашей платформой можно из любой точки России, полность бесплатно для всех.
                    </p>
                    <a href=""
                       className='py-2 px-3 bg-gradient-to-br to-[#75ddf6] from-[#0f94c2] rounded-2xl text-xl text-white'>Подробнее</a>
                </div>
            </div>
            <div className="z-10 min-h-screen bg-white flex items-center rounded-t-3xl justify-center">
            </div>

        </div>
    </>);
}