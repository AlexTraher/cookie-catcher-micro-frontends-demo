import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC } from "react";
// import CookieCatcher from "./components/CookieCatcher";


export interface CookieCatcherProps {
  queryClient: QueryClient
  onScoreUpdate: (score: number) => void;
  onGameStateChange: (inProgress: boolean) => void
  speed: number;
}

const Root: FC<CookieCatcherProps> = (props) =>  {
  
  return (
    <QueryClientProvider client={props?.queryClient}>
      {/* <CookieCatcher {...props} /> */}
    </QueryClientProvider>
  )
}

export default Root;
