import { CheckoutData } from "@library/types";
import React from "react";

type StateType = {
  data: CheckoutData;
  open: boolean;
  onOpenChange(_val: boolean): void;
};
type CheckoutStateType = {
  state?: StateType;
};
const CheckoutContext = React.createContext<CheckoutStateType>({});

export function CheckoutProvider(props: {
  data: CheckoutData;
  children?: (_val: StateType) => React.ReactElement | React.ReactElement;
  open?: boolean;
  onOpenChange?: (_val: boolean) => void;
}) {
  const [open, setOpen] = React.useState(false);
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
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data, open]);

  return (
    <CheckoutContext.Provider value={{ state }}>
      {typeof props.children === "function" ? (
        props.children(state)
      ) : (
        <> {props.children}</>
      )}
    </CheckoutContext.Provider>
  );
}

export const useCheckoutContext = () => {
  const { state } = React.useContext(CheckoutContext);
  if (!state) throw new Error("context is not available");

  return {
    state,
  };
};
