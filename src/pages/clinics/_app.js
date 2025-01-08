import Head from "next/head";
import {NotificationProvider} from "@/components/ui/Message";

export default function MyApp({ Component, pageProps }) {
    return (
        <>
        <NotificationProvider>
            <Head>
                <script
                    src={`https://api-maps.yandex.ru/2.1/?apikey=a08951d8-f98a-45b7-a721-e42b293eb9ce&lang=ru_RU`}
                    type="text/javascript"
                    async
                ></script>
            </Head>
            <Component {...pageProps} />
        </NotificationProvider>
        </>
    );
}
