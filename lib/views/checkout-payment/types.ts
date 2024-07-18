import React from "react";

export declare type CheckoutData = {
  productId: string;
  productName: string;
  fullname: string;
  email: string;
  phone: string;
  amount: number;
  currency: "USD" | "EUR" | "NGN" | "GBP";
};

export type CheckoutPaymentProps = React.ComponentProps<"button"> & {
  data: CheckoutData;
  actionText: string;
};
