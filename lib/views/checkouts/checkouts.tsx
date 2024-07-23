// import React from "react";
import { MainLayout } from "@library/layouts/main.layout";
import { PayUssd } from "@library/views/pay-ussd/pay-ussd";
import { PayTransfer } from "@library/views/pay-transfer/pay-transfer";
import { PayCard } from "@library/views/pay-card/pay-card";
import { useCheckoutContext } from "@library/context/checkout.provider";
import { sidebarDataLinkList, SidebarLink } from "@library/layouts/sidebar";
import React from "react";

type ScreenType = "card" | "ussd" | "transfer" | "options";
export function Checkouts() {
  const { state } = useCheckoutContext();

  React.useEffect(() => {
    const handleBeforeUnload = (evt: BeforeUnloadEvent) => {
      evt.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <MainLayout
      tab={state.paymentScreen}
      onChange={(values) => {
        state.onPaymentScreen(values as ScreenType);
      }}
    >
      {state.paymentScreen === "options" ? (
        <div
          data-state={state.paymentScreen}
          className="hidden data-[state=options]:grid"
        >
          <PaymentOptions onClick={state.onPaymentScreen} />
        </div>
      ) : state.paymentScreen === "ussd" ? (
        <div
          data-state={state.paymentScreen}
          className="hidden data-[state=ussd]:grid"
        >
          <PayUssd />
        </div>
      ) : state.paymentScreen === "transfer" ? (
        <div
          data-state={state.paymentScreen}
          className="hidden data-[state=transfer]:grid"
        >
          <PayTransfer />
        </div>
      ) : (
        <div
          data-state={state.paymentScreen}
          className="hidden data-[state=card]:grid"
        >
          <PayCard />
        </div>
      )}
    </MainLayout>
  );
}

type PaymentOptionsProps = {
  onClick(_val: string): void;
};
const PaymentOptions = (props: PaymentOptionsProps) => {
  return (
    <div className="grid grid-rows-[80px_1fr] gap-4">
      <h3 className=" text-xs text-[#9E9BA1]">
        Use one of the payment methods below to pay NGN500,000,000 to Spotflow
      </h3>
      <div>
        <h3 className=" font-semibold text-[#6D6A73] leading-10 border-b-[0.5px] border-b-[#E6E6E7]">
          PAYMENT OPTIONS
        </h3>
        <div className=" flex flex-col gap-1">
          {sidebarDataLinkList.map((field) => (
            <SidebarLink
              key={field.value}
              value={""}
              data={field}
              onClick={() => {
                props.onClick(field.value);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
