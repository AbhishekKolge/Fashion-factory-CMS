import { Provider } from "react-redux";
import Head from "next/head";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/globals.scss";

import Layout from "../components/Layout/Layout";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import store from "../store";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  if (Component.getLayout) {
    return Component.getLayout(
      <Provider store={store}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <ProtectedRoute {...pageProps}>
          <Component {...pageProps} />
        </ProtectedRoute>
        <Toaster />
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout {...pageProps}>
        <ProtectedRoute {...pageProps}>
          <Component {...pageProps} />
        </ProtectedRoute>
      </Layout>
      <Toaster />
    </Provider>
  );
}
