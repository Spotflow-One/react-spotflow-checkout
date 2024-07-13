import { CheckoutData } from "@library/types";
import React from "react";

type StateType = {
  data: CheckoutData;
  open: boolean;
  onOpenChange(_val: boolean): void;
  paymentScreen: "card" | "ussd" | "transfer";
  onPaymentScreen(_val: "card" | "ussd" | "transfer"): void;
  merchantKey: string;
  onMerchantKeyChange(_val: string): void;
};
type CheckoutStateType = {
  state?: StateType;
  onOpenChange?: (_val: boolean) => void;
};
const CheckoutContext = React.createContext<CheckoutStateType>({});

type CheckoutProviderProps = {
  data: CheckoutData;
  children?: (_val: StateType) => React.ReactElement | React.ReactElement;
  open?: boolean;
  onOpenChange?: (_val: boolean) => void;
};
export function CheckoutProvider(props: CheckoutProviderProps) {
  const [open, setOpen] = React.useState(false);
  const [merchantKey, setMerchantKey] = React.useState(
    "sk_test_f998479c0ee241a795270a55aa8dab27",
  );

  const [paymentScreen, setPaymentScreen] = React.useState<
    "card" | "ussd" | "transfer"
  >("card");
  const onPaymentScreen = (values: "card" | "ussd" | "transfer") => {
    setPaymentScreen(values);
  };
  const state: StateType = React.useMemo(() => {
    return {
      data: props.data,
      open: props.open || open,
      onOpenChange(value) {
        if (props.onOpenChange) {
          props.onOpenChange(value);
        } else {
          setOpen(value);
        }
        if (!value) onPaymentScreen("card");
      },
      paymentScreen,
      onPaymentScreen,
      merchantKey,
      onMerchantKeyChange(_val) {
        setMerchantKey(_val); //
      },
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data, open, props.open, paymentScreen]);

  return (
    <CheckoutContext.Provider
      value={{ state, onOpenChange: props.onOpenChange || setOpen }}
    >
      {typeof props.children === "function" ? (
        props.children(state)
      ) : (
        <> {props.children}</>
      )}
    </CheckoutContext.Provider>
  );
}

export const useCheckoutContext = () => {
  const { state, onOpenChange } = React.useContext(CheckoutContext);
  if (!state) throw new Error("context is not available");

  return {
    state,
    onOpenChange,
  };
};
