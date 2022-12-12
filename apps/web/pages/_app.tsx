import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { FC } from "react";
import "../styles/_app.css";

interface AProps extends AppProps {
  Component: FC
}

const queryClient = new QueryClient();

const MyApp: NextPage<AProps> = ({ Component, pageProps }) =>  {
  return (
    <>
    <Script
      src="/import-map.json"
      crossOrigin="anonymous"
      type="systemjs-importmap"
    />
    <Head>
      <meta name="importmap-type" content="systemjs-importmap" />

    </Head>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
    </>
  )
}

export default MyApp;