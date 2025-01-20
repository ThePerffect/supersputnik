export default function Footer() {
    return (
        <footer className="w-full mt-auto">
            <div className="mx-11  md:mx-20 lg:mx-16 bg-blue-200 text-gray-700 py-8  rounded-t-3xl">
                <div className="max-w-6xl mx-auto px-10">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">
                            <a href="/">WEB MED</a>
                        </h2>
                        <h1 className=" font-bold">Доступная медицина</h1>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
                    <p>Выполнил Ежов Илья. Для Всероссийского конкурса <a href="https://www.sputnikssau.ru/" className='text-blue-800'>"Спутник"</a>.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

