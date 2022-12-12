import React from "react";
import ReactDOMClient from "react-dom/client";
import { AppProps } from "single-spa";
import singleSpaReact from "single-spa-react";
import Root, { RootProps } from "./root.component";

const lifecycles = singleSpaReact<RootProps>({
  renderType: "createRoot",
  React,
   // @ts-ignore
  ReactDOM: ReactDOMClient,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount, update } = lifecycles;


