import React from "react";

export type Id = string;
export type SidebarDataLink = {
  label: string;
  value: string;
  Icon: ISvgIcon;
};

export type ISetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type ISvgIcon = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & { title?: string }
>;

export declare type InitialiseConfig = {
  /**
   * plan Id from spotflow
   */
  plan: string;
  fullname?: string;
  email: string;
  phone?: string;
  /**
   * @type {"USD" | "EUR" | "NGN" | "GBP"}
   * Acceptable currency are USD, EUR, NGN, GBP
   */
  currency?: "USD" | "EUR" | "NGN" | "GBP" | string;
  amount: number;
  /**
   * merchant generated secret key
   */
  merchantKey: string;
  reference?: string;
};

export type CheckoutPaymentProps = React.ComponentProps<"button"> & {
  data: InitialiseConfig;
  actionText: string;
};

export type InitialisePayment = (options: {
  onSuccess?: callback;
  onClose?: callback;
  config?: Omit<InitialiseConfig, "publicKey">;
}) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type callback = (response?: any) => void;
