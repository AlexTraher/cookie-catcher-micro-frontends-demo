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
  const parcelRef = useRef<Parcel>();

  // Mount Hook
  useEffect(() => {
    let parcel: Parcel;
    if (rootNodeRef.current) {
      start();
      parcel = mountRootParcel(app, {
        domElement: rootNodeRef.current,
        ...props,
      });

      parcelRef.current = parcel;

    }
    return () => {
      /* istanbul ignore if */
      if (parcel && parcel.getStatus() === 'MOUNTED') {
        parcel.unmount();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update hook
  useEffect(() => {
    if (parcelRef.current && parcelRef.current.update && parcelRef.current.getStatus() !== 'UPDATING') {
      parcelRef.current.update(props);
    }  
  }, [props]);



  return (
    <div style={wrapStyle} ref={rootNodeRef}></div>
  )
}

export default SingleSpaParcel;