import { FC } from "react";
import { ReactAppOrParcel } from "single-spa-react";

export type SingleSpaApp = ReactAppOrParcel<any>

export type ComposableApp = FC<any> | SingleSpaApp;

export type LoadAppFn = () => Promise<ComposableApp>;