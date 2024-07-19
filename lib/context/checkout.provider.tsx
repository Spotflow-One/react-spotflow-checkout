import { CheckoutData } from "@library/types";
import React from "react";

type ScreenType = "card" | "ussd" | "transfer" | "options";

type StateType = {
  data: CheckoutData;
  open: boolean;
  onOpenChange(_val: boolean): void;
  paymentScreen: ScreenType;
  onPaymentScreen(_val: ScreenType): void;
  merchantKey: string;
  onMerchantKeyChange(_val: string): void;
  errorText?: string;
  onErrorText?: (_val: string) => void;
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
  const [errorText, setErrorText] = React.useState<string | undefined>("");
  const [merchantKey, setMerchantKey] = React.useState(
    props.data.merchantKey || "sk_test_f998479c0ee241a795270a55aa8dab27",
  );

  const [paymentScreen, setPaymentScreen] = React.useState<ScreenType>("card");
  const onPaymentScreen = (values: ScreenType) => {
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
      errorText,
      onErrorText(_val) {
        setErrorText(_val); //
      },
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data, open, props.open, paymentScreen, errorText]);

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
