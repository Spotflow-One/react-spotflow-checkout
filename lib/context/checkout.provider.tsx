import { PaymentResponseData } from "@library/hooks/queries/types/payment.types";
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
  payment: PaymentResponseData | null;
  onPaymentResponse(_val: PaymentResponseData): void;
  loading: boolean;
  onLoading(_val: boolean): void;
  paymentStatus: string;
};
type CheckoutStateType = {
  state?: StateType;
  onOpenChange?: (_val: boolean) => void;
  onPaymentStatus?: (_val: string) => void;
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
  const [loading, setLoading] = React.useState(false);
  const [paymentStatus, setPaymentStatus] = React.useState("");
  const [errorText, setErrorText] = React.useState<string | undefined>("");
  const [payment, setPayment] = React.useState<PaymentResponseData | null>(
    null,
  );
  const [paymentScreen, setPaymentScreen] = React.useState<ScreenType>("card");
  const onPaymentScreen = (values: ScreenType) => {
    setPaymentScreen(values);
  };
  const state: StateType = React.useMemo(() => {
    return {
      open:
        !!initialData &&
        !!Object.values(initialData).length &&
        (props.open || open),
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
      payment, // replace with actual data
      onPaymentResponse(_val) {
        // replace with actual data
        setPayment(_val);
      },
      loading,
      onLoading: setLoading,
      paymentStatus,
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.data,
    open,
    props.open,
    paymentScreen,
    errorText,
    payment,
    paymentStatus,
  ]);

  return (
    <CheckoutContext.Provider
      value={{
        state,
        onOpenChange: props.onOpenChange || setOpen,
        onPaymentStatus: setPaymentStatus,
      }}
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
  const { state, onOpenChange, onPaymentStatus } =
    React.useContext(CheckoutContext);
  if (!state) throw new Error("context is not available");
  // if (!state?.initialData)
  //   throw new Error("Initial Config Data is not provided");

  return {
    state,
    onOpenChange,
    config: state.initialData as InitialiseConfig,
    onPaymentStatus,
  };
};
