// import React from "react";
import { MainLayout } from "@library/layouts/main.layout";
import { PayUssd } from "@library/views/pay-ussd/pay-ussd";
import { PayTransfer } from "@library/views/pay-transfer/pay-transfer";
import { PayCard } from "@library/views/pay-card/pay-card";
import { useCheckoutContext } from "@library/context/checkout.provider";

export function Checkouts() {
  const { state } = useCheckoutContext();
  return (
    <MainLayout
      tab={state.paymentScreen}
      onChange={(values) => {
        state.onPaymentScreen(values as "card" | "ussd" | "transfer");
      }}
    >
      <div
        data-state={state.paymentScreen}
        className="hidden data-[state=ussd]:grid"
      >
        <PayUssd />
      </div>
      <div
        data-state={state.paymentScreen}
        className="hidden data-[state=transfer]:grid"
      >
        <PayTransfer />
      </div>
      <div
        data-state={state.paymentScreen}
        className="hidden data-[state=card]:grid"
      >
        <PayCard />
      </div>
    </MainLayout>
  );
}
