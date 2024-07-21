import { InitialiseConfig } from "@library/types";
import React from "react";

type ScreenType = "card" | "ussd" | "transfer" | "options";

type StateType = {
  initialData?: InitialiseConfig;
  open: boolean;
  onOpenChange(_val: boolean): void;
  paymentScreen: ScreenType;
  onPaymentScreen(_val: ScreenType): void;
  errorText?: string;
  onErrorText?: (_val: string) => void;
  onDataUpdated(_val: InitialiseConfig): void;
};
type CheckoutStateType = {
  state?: StateType;
  onOpenChange?: (_val: boolean) => void;
};
const CheckoutContext = React.createContext<CheckoutStateType>({});

type CheckoutProviderProps = {
  data?: InitialiseConfig;
  children?: (_val: StateType) => React.ReactElement | React.ReactElement;
  open?: boolean;
  onOpenChange?: (_val: boolean) => void;
};
export function CheckoutProvider(props: CheckoutProviderProps) {
  const [initialData, setInitialData] = React.useState<InitialiseConfig>({
    ...props.data,
  } as InitialiseConfig);
  const [open, setOpen] = React.useState(false);
  const [errorText, setErrorText] = React.useState<string | undefined>("");

  const [paymentScreen, setPaymentScreen] = React.useState<ScreenType>("card");
  const onPaymentScreen = (values: ScreenType) => {
    setPaymentScreen(values);
  };
  const state: StateType = React.useMemo(() => {
    return {
      open: !!initialData && (props.open || open),
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
      errorText,
      onErrorText(_val) {
        setErrorText(_val); //
      },
      onDataUpdated(_val) {
        setInitialData(_val);
      },
      initialData,
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
  // if (!state?.initialData)
  //   throw new Error("Initial Config Data is not provided");

  return {
    state,
    onOpenChange,
    config: state.initialData as InitialiseConfig,
  };
};
