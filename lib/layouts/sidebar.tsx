// import React from "react";
import { useState } from "react";
import { SidebarDataLink } from "@library/types";
import PayWithCardIcon from "@library/assets/pay-with-card-side-icon.svg?react";
import PayWithUssdIcon from "@library/assets/pay-with-ussd-side-icon.svg?react";
import PayWithTransferIcon from "@library/assets/pay-with-transfer-side-icon.svg?react";
import { cn } from "@library/utils/utils";
import { useCheckoutContext } from "@library/context/checkout.provider";
import { usePaymentTransfer } from "@library/hooks/queries/payments";
import { generatePaymentReference } from "@library/utils/ref";

type Props = {
  onClick(_val: string): void;
};

export default function Sidebar(props: Props) {
  const [value, setValue] = useState(sidebarDataLinkList[0].value);
  const { config, setState, onLoading } = useCheckoutContext();

  const { transferPayment, transferringPayment } = usePaymentTransfer({
    onSuccess(_val) {
      if (onLoading) {
        onLoading(false);
      }
      if (_val.status === "failed") {
        setState((prev) => ({
          ...prev,
          errorText: _val.providerMessage || "Payment Failed",
        }));
        return;
      }
      setState((prev) => ({
        ...prev,
        payment: _val,
      }));
    },
    reference: config.merchantKey,
    onError(_val) {
      setState((prev) => ({
        ...prev,
        errorText: _val || "Payment Failed",
      }));
    },
  });

  return (
    <aside className=" h-full bg-[#F4F4FF] flex flex-col gap-5 py-4 px-8 lg:px-2">
      <img
        src="https://res.cloudinary.com/du7qw0hpn/image/upload/v1720260601/image_3_xyiqdn.png"
        alt=""
        className=" w-12 h-auto bg-contain self-center"
      />
      <h2 className=" text-xl text-[#6D6A73] font-semibold whitespace-nowrap  hidden lg:block">
        PAYMENT OPTIONS
      </h2>
      <div className=" flex-col gap-2 hidden lg:flex">
        {sidebarDataLinkList.map((field) => (
          <SidebarLink
            key={field.value}
            value={value}
            data={field}
            onClick={() => {
              if (field.value === "transfer") {
                if (config?.email) {
                  transferPayment({
                    payload: {
                      amount: config.amount,
                      channel: "bank_transfer",
                      currency: config.currency || "USD",
                      customer: {
                        email: config.email,
                      },
                      reference: config.reference || generatePaymentReference(),
                      // planId: config.plan,
                    },
                  });
                  setState((prev) => ({
                    ...prev,
                    errorText: "",
                    loading: transferringPayment,
                  }));
                }
              }
              setValue(field.value);
              props.onClick(field.value);
              setState((prev) => ({
                ...prev,
                errorText: "",
              }));
            }}
          />
        ))}
      </div>
    </aside>
  );
}

type SidebarLinkProps = {
  value: string;
  data: SidebarDataLink;
  onClick(): void;
};
export const SidebarLink = (props: SidebarLinkProps) => {
  // const { state } = useCheckoutContext();
  return (
    <button
      // disabled={state.paymentStatus === "ongoing"}
      type="button"
      data-app-active={props.data.value === props.value}
      className={cn(
        " flex items-center gap-1 px-3 rounded-xl py-3 outline-none",
        " text-[#3D3844] font-semibold",
        "data-[app-active=true]:bg-[#01008E] data-[app-active=true]:text-white",
      )}
      onClick={props.onClick}
    >
      <props.data.Icon
        data-app-active={props.data.value === props.value}
        className={cn(
          " fill-[#9E9BA1]",
          " data-[app-active=true]:fill-white data-[app-active=true]:text-white font-semibold",
        )}
      />
      {props.data.label}
    </button>
  );
};

export const sidebarDataLinkList = [
  {
    label: "Pay with Card",
    value: "card",
    Icon: PayWithCardIcon,
  },
  {
    label: "Pay with Transfer",
    value: "transfer",
    Icon: PayWithTransferIcon,
  },
  {
    label: "Pay with USSD",
    value: "ussd",
    Icon: PayWithUssdIcon,
  },
];
