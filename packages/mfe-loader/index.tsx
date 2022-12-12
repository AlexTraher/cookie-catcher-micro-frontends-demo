import { FC, useEffect, useRef, useState } from "react"
import { LoadAppFn, SingleSpaApp, ComposableApp } from "./types";
import SingleSpaParcel from "./SingleSpaParcel";



interface LoaderProps {
  app: LoadAppFn,
  appName: string,
  [key: string]: any
}

const testIsSingleSpa = (loadedApp: FC | SingleSpaApp): loadedApp is SingleSpaApp => 'bootstrap' in loadedApp

const useLoadableApp = (loadApp: LoadAppFn) => {
  const [isSingleSpa, setIsSingleSpa] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const appRef = useRef<undefined | ComposableApp>();

  useEffect(() => {
    let unmounted = false;
    (async () => {
      const app = await loadApp();
      if (unmounted) {
        return;
      }
      if (testIsSingleSpa(app)) {
        setIsSingleSpa(true);
      }
      appRef.current = app;
      setIsLoading(false);
    })();

    return () => {
      unmounted = true;
    }
  }, []);

  if (isLoading) {
    return { isLoading } as const 
  }

  if (isSingleSpa) {
    return { isSingleSpa: true, isLoading: false, LoadedApp: appRef.current as SingleSpaApp } as const
  }
    return { isSingleSpa: false, isLoading: false, LoadedApp: appRef.current as FC } as const

}

// Heavily inspired by the leanjs implementation of loading an app
// @see https://github.com/leanjs/leanjs/blob/main/packages/core/src/utils/loadApp.ts 
const Loader: FC<LoaderProps> = ({ app, appName, ...props }) => {
  const { isSingleSpa, isLoading, LoadedApp } = useLoadableApp(app);


  if (isLoading) {
    return <>Loading...</>
  }

  if (!isLoading && isSingleSpa) {
    return (
      <SingleSpaParcel
        app={LoadedApp}
        {...props}
      />
    )
  }
  if (!isLoading && LoadedApp) {
    return (
      <LoadedApp {...props} />
    )
  }

  return <></>

}

export default Loader;




