import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC } from "react";
// import Notifications from "./components/Notifications";


export interface NotificationProps {
  queryClient: QueryClient
}

const Root: FC<NotificationProps> = (props) =>  {
  return (
    <QueryClientProvider client={props?.queryClient}>
      {/* <Notifications /> */}
    </QueryClientProvider>
  )
}

export default Root;
