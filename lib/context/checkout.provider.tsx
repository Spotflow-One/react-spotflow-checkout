import { Button } from "@library/components/button/button";
import { useGetPaymentRate } from "@library/hooks/queries/payments";
import {
  GetPaymentRateResponseData,
  PaymentResponseData,
} from "@library/hooks/queries/types/payment.types";
import { InitialiseConfig, ISetState } from "@library/types";
import React from "react";

type ScreenType = "card" | "ussd" | "transfer" | "options";

type StateType = {
  initialData?: InitialiseConfig;
  open: boolean;
  paymentScreen: ScreenType;
  errorText?: string;
  payment: PaymentResponseData | null;
  loading: boolean;
  paymentStatus: string;
  footer?: {
    MethodButtonProps?: React.ComponentProps<typeof Button>;
    CancelButtonProps?: React.ComponentProps<typeof Button>;
  };
};

const initialState: StateType = {
  open: false,
  paymentScreen: "card",
  payment: null,
  loading: false,
  paymentStatus: "",
  errorText: "",
};

type CheckoutStateType = {
  state?: StateType;
  rate?: GetPaymentRateResponseData;
  onOpenChange?: (_val: boolean) => void;
  onPaymentStatus?: (_val: string) => void;
  setState?: ISetState<StateType>;
  onPaymentScreen?: (_val: ScreenType) => void;
  onLoading?: (_val: boolean) => void;
  onPaymentResponse?: (_val: PaymentResponseData) => void;
  onDataUpdated?: (_val: InitialiseConfig) => void;
  onErrorText?: (_val: string) => void;
  loadingRate?: boolean;
};
const CheckoutContext = React.createContext<CheckoutStateType>({});

type CheckoutProviderProps = {
  data?: InitialiseConfig;
  children?: (
    _val: StateType,
    _bool: (_val: boolean) => void,
  ) => React.ReactElement | React.ReactElement;
  open?: boolean;
  onOpenChange?: (_val: boolean) => void;
};
export function CheckoutProvider(props: CheckoutProviderProps) {
  const [checkoutContext, setCheckoutContext] = React.useState<StateType>({
    ...initialState,
    open: props.open || initialState.open,
    initialData: props?.data,
  });

  const onPaymentScreen = (values: ScreenType) => {
    setCheckoutContext((prev) => ({
      ...prev,
      paymentScreen: values,
    }));
  };
  const { paymentRate, fetchingPaymentRate } = useGetPaymentRate({
    enabler: !!checkoutContext?.open,
    params: {
      to: "USD",
      from: checkoutContext?.initialData?.currency || "USD",
    },
    merchantKeys: checkoutContext?.initialData?.merchantKey,
  });

  const onPaymentResponse = (values: PaymentResponseData) => {
    setCheckoutContext((prev) => ({
      ...prev,
      payment: values,
    }));
  };

  const onOpenChange = (values: boolean) => {
    if (!values) {
      setCheckoutContext({ ...initialState });
    } else {
      setCheckoutContext((prev) => ({
        ...prev,
        open: values,
      }));
    }
  };

  const onDataUpdated = (values: InitialiseConfig) => {
    setCheckoutContext((prev) => ({
      ...prev,
      initialData: values,
    }));
  };

  const onPaymentStatus = (values: string) => {
    setCheckoutContext((prev) => ({
      ...prev,
      paymentStatus: values,
    }));
  };

  const onErrorText = (values: string) => {
    setCheckoutContext((prev) => ({
      ...prev,
      errorText: values,
    }));
  };

  return (
    <CheckoutContext.Provider
      value={{
        state: checkoutContext,
        onOpenChange,
        onPaymentStatus,
        setState: setCheckoutContext,
        onPaymentScreen,
        onPaymentResponse,
        onDataUpdated,
        onErrorText,
        onLoading(_val) {
          setCheckoutContext((prev) => ({ ...prev, loading: _val }));
        },
        rate: paymentRate,
        loadingRate: fetchingPaymentRate,
      }}
    >
      {typeof props.children === "function" ? (
        props.children(checkoutContext, onOpenChange)
      ) : (
        <> {props.children}</>
      )}
    </CheckoutContext.Provider>
  );
}

export const useCheckoutContext = () => {
  const {
    state,
    onOpenChange,
    onPaymentStatus,
    onDataUpdated,
    onErrorText,
    onLoading,
    onPaymentResponse,
    onPaymentScreen,
    setState,
    loadingRate,
    rate,
  } = React.useContext(CheckoutContext);
  if (!state) throw new Error("context is not available");
  if (!setState) throw new Error("context is not available");

  return {
    state,
    onOpenChange,
    config: state.initialData as InitialiseConfig,
    onPaymentStatus,
    onDataUpdated,
    onErrorText,
    onLoading,
    onPaymentResponse,
    onPaymentScreen,
    setState,
    rate,
    loadingRate,
  };
};
