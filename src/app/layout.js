import localFont from "next/font/local";
import "./globals.css";


const ROBOTO = localFont({
    src: "./fonts/RobotoMono-Bold.ttf",
    variable: "--font-RobotoMono",
    weight: "100 900",
});

export const metadata = {
    title: "WEB MED: ДОСТУПНАЯ МЕДЕЦИНА"
};

export default function RootLayout({ children }) {

    return (

            <html lang="ru" className='bg-white'>

            <body className={`antialiased ${ROBOTO.value} bg-white text-black`}>
            {children}
            </body>
            </html>
        );
}