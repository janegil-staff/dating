import "@/styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";
import Head from "next/head";
import Layout from "@/componensts/layout/index.";
import { SessionProvider } from "next-auth/react";
const App = ({ Component, pageProps })  => {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout session={pageProps.session}>
        <Component {...pageProps} />
      </Layout>
      </SessionProvider>
  );
}

export default App;