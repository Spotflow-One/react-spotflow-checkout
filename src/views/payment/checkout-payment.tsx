import React from "react";
import Popper from "../popper";
import CheckoutProvider from "../context/checkout.provider";
import Checkouts from "../checkouts/checkouts";

type Props = {
  data: unknown;
  actionText: string;
};
function CheckoutPayment(props: Props) {
  return (
    <React.Fragment>
      <button type="button">{props.actionText || "Pay Amount"}</button>
      <CheckoutProvider data={props.data}>
        {(values) => (
          <Popper open={values.open}>
            <Checkouts />
          </Popper>
        )}
      </CheckoutProvider>
    </React.Fragment>
  );
}

export default CheckoutPayment;
