import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { FC } from "react";
import "../styles/_app.css";

interface AProps extends AppProps {
  Component: FC
}

const queryClient = new QueryClient();

const MyApp: NextPage<AProps> = ({ Component, pageProps }) =>  {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp;