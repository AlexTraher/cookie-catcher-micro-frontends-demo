import { FC, useEffect, useRef } from "react";
import { mountRootParcel, start, Parcel } from "single-spa";

import { SingleSpaApp } from "./types";

interface ParcelProps {
  app: SingleSpaApp
  wrapStyle?: Record<string, any>
  [key: string]: any
}

const SingleSpaParcel: FC<ParcelProps> = ({ app, wrapStyle, ...props }) => {
  const rootNodeRef = useRef(null);

  useEffect(() => {
    let parcel: Parcel;
    if (rootNodeRef.current) {
      start();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      parcel = mountRootParcel(app, {
        domElement: rootNodeRef.current,
        ...props,
      });
    }
    return () => {
      /* istanbul ignore if */
      if (parcel) {
        parcel.mountPromise.then(() => {
          parcel.unmount();
        });
      }
    };
  }, []);

  return (
    <div style={wrapStyle} ref={rootNodeRef}></div>
  )
}

export default SingleSpaParcel;