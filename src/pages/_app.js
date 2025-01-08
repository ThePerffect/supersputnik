
import { SessionProvider } from "next-auth/react";
import {NotificationProvider} from "@/components/ui/Message";

function MyApp({ Component, pageProps }) {
    return (
    <NotificationProvider>
        <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
        </SessionProvider>
    </NotificationProvider>
    );
}

export default MyApp;
