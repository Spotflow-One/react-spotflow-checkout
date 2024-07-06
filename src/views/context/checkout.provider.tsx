import React from "react";

type StateType = {
  data: unknown;
  open: boolean;
  onOpenChange(_val: boolean): void;
};
type CheckoutStateType = {
  state?: StateType;
};
const CheckoutContext = React.createContext<CheckoutStateType>({});

export default function CheckoutProvider(props: {
  data: unknown;
  children?: (_val: StateType) => React.ReactElement | React.ReactElement;
}) {
  const [open, setOpen] = React.useState(false);
  const state: StateType = React.useMemo(() => {
    return {
      data: props.data,
      open,
      onOpenChange(value) {
        setOpen(value);
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
