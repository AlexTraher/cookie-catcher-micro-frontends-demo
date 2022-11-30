import { FC, PropsWithChildren, useState, useEffect } from "react"


const useClientRender = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};


const ClientOnly: FC<PropsWithChildren> = ({ children }) => {
  const isClient = useClientRender();

  
  return isClient ? <>{children}</> : <></>
}

export default ClientOnly;