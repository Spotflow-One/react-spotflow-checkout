import React from "react";
import Sidebar from "./sidebar";
import PayWithCardIcon from "@library/assets/pay-with-card-side-icon.svg?react";
import PayWithUssdIcon from "@library/assets/pay-with-ussd-side-icon.svg?react";
import PayWithTransferIcon from "@library/assets/pay-with-transfer-side-icon.svg?react";
import ErrorIcon from "@library/assets/error-notify-icon.svg?react";
import CertifiedIcon from "@library/assets/pci-dss-certified.svg?react";
import { Button } from "@library/components/button/button";
import { useCheckoutContext } from "@library/context/checkout.provider";
import { cn } from "@library/utils/utils";
import { useGetPaymentRate } from "@library/hooks/queries/payments";
import InforIcon from "@library/assets/top-container-icon.svg?react";
import { formatNumber } from "@library/utils/number-format";

type Props = React.PropsWithChildren<{
  tab: string;
  onChange(_val: string): void;
}>;

const IconObject = {
  card: PayWithCardIcon,
  ussd: PayWithUssdIcon,
  transfer: PayWithTransferIcon,
  options: PayWithCardIcon,
};

const TextObject = {
  card: "Pay with Card",
  ussd: "Pay with USSD",
  transfer: "Pay with Transfer",
  options: "",
};

export function MainLayout(props: Props) {
  const Icon = IconObject[props.tab as unknown as keyof typeof IconObject];
  const Text = TextObject[props.tab as unknown as keyof typeof TextObject];
  const { state, onOpenChange, setState } = useCheckoutContext();

  return (
    <div className=" relative max-[400px]:min-h-[600px] lg:h-full lg:max-h-[70dvh] ">
      <div className="lg:shadow-2xl relative rounded-lg bg-white grid min-h-[400px] h-full grid-rows-[auto_1fr] lg:grid-rows-1 grid-cols-1 lg:grid-cols-[200px_1fr] max-w-[390px] lg:max-w-[750px] mx-auto">
        <Sidebar onClick={props.onChange} />{" "}
        <main
          className={cn(
            "  grid gap-4 px-3 md:px-6 pt-2 pb-2 overflow-y-auto grid-rows-[auto_1fr] hide-scrollbar",
            state.paymentScreen === "options" && "grid-rows-[auto_1fr]",
          )}
        >
          <div>
            {state.paymentScreen !== "options" && (
              <div className=" flex lg:hidden gap-4 font-semibold py-4 text-[#3D3844]">
                <Icon className=" fill-[#9E9BA1]" /> {Text}
              </div>
            )}

            <TopContainer />
          </div>
          <div className="grid gap-4 grid-rows-[1fr_auto] overflow-y-auto max-h-max hide-scrollbar">
            <div>
              <button
                type="button"
                className=" absolute -top-4 -right-4 z-30 font-semibold cursor-pointer"
                onClick={() => {
                  if (onOpenChange) {
                    onOpenChange(false);
                  }
                }}
              >
                X
              </button>
              {state.errorText && (
                <p className=" bg-red-500 text-center p-1 rounded-lg px-2 text-white">
                  <ErrorIcon className=" inline mr-3 align-middle" />{" "}
                  {state?.errorText || ""}{" "}
                </p>
              )}
              {props.children}
            </div>
            <div className=" grid grid-rows-[repeat(2,_auto)] gap-10">
              <div
                className={cn(
                  " flex lg:hidden gap-4",
                  state.paymentScreen === "options" && "justify-center",
                )}
              >
                {state.paymentScreen !== "options" && (
                  <Button
                    onClick={() => {
                      setState((prev) => ({
                        ...prev,
                        errorText: "",
                        paymentScreen: "options",
                      }));
                    }}
                    className="border-[#E6E6E7] px-1 border-[0.5px] w-auto flex-1 text-xs whitespace-nowrap py-1 items-center bg-white text-[#55515B]"
                  >
                    x Change Payment Method
                  </Button>
                )}
                <Button
                  onClick={() => {
                    if (onOpenChange) {
                      onOpenChange(false);
                    }
                  }}
                  className="border-[#E6E6E7]  w-auto  text-xs px-2 border-[0.5px] flex-1 items-center bg-white text-[#55515B]"
                >
                  x Cancel Payment
                </Button>
              </div>
              <div className=" justify-self-center flex gap-4 items-center font-normal text-[10px] text-[#9E9BA1]">
                <CertifiedIcon /> PCI DSS Certified
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const TopContainer = () => {
  const { config, state } = useCheckoutContext();
  const { paymentRate } = useGetPaymentRate({
    enabler: state.open,
    params: {
      to: "USD",
      from: config.currency || "USD",
    },
    merchantKeys: config.merchantKey,
  });
  return (
    <div className=" bg-[#01008E] py-5 px-3 md:py-4 md:px-8 grid gap-4 grid-rows-[51px_1fr] rounded-xl text-white">
      <div className=" flex gap-4 items-center justify-between border-b border-b-white text-white leading-8">
        <p className=" text-sm whitespace-nowrap">{config?.email}</p>
        <p className=" text-sm">{"Leagues Pass"}</p>
      </div>
      <div className=" flex self-start items-center gap-4 justify-between">
        <div className=" relative flex gap-1 items-center leading-10 text-sm">
          <span className=" whitespace-nowrap">
            {`${paymentRate?.from || "USD"} 1 = ${paymentRate?.to || "NGN"} ${formatNumber(paymentRate?.rate || 0, 2)}`}{" "}
          </span>
          <InforComponent />
        </div>
        <div>
          <h3 className=" text-right">
            Pay{" "}
            <span className=" font-semibold">
              {config?.currency} {config?.amount || 0}
            </span>
          </h3>
          <span className=" inline-block bg-[#32BB78] text-xs whitespace-nowrap p-[3px_10px] rounded">
            NGN{" "}
            {formatNumber((paymentRate?.rate || 1) * (config?.amount || 0), 2)}
          </span>
        </div>
      </div>
    </div>
  );
};

const InforComponent = () => {
  return (
    <div className="  group">
      <InforIcon />
      <div
        className={cn(
          "text-xs w-0 absolute transition-all duration-500 opacity-30 hidden rotate-45 left-0 top-5 z-30 text-[#98A2B3] hover:block bg-white p-3 rounded-lg lg:max-w-[20rem]",
          "translate-x-[50%] min-w-[10rem] lg:min-w-[18rem] shadow",
          "before:h-4 before:w-4 before:absolute before:-top-0 before:left-0 before:translate-x-[50%] before:-translate-y-1 before:bg-white before:rotate-45",
          "group-hover:rotate-0 hover:rotate-0 hover:opacity-100 group-hover:block group-hover:w-full hover:w-full",
        )}
      >
        <p className=" text-black font-medium">What is this?</p>
        <span className=" text-xs">
          This rate reflects the current exchange rate for converting United
          States Dollars (USD) to Nigerian Naira (NGN). Please note that
          exchange rates are subject to change and may vary slightly at the time
          of the transaction.
        </span>
      </div>
    </div>
  );
};
