import "@/styles/globals.css";
import Head from "next/head";
import Layout from "@/componensts/layout/index.";

const App = ({ Component, pageProps })  => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default App;