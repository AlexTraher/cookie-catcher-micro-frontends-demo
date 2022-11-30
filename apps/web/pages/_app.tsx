import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/_app.css";


const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}