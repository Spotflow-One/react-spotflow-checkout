import React from "react";
import Popper from "./views/popper";
import CheckoutProvider from "./views/context/checkout.provider";
import Checkouts from "./views/checkouts/checkouts";
import { CheckoutData } from "./checkout-types";

type Props = {
  data: CheckoutData;
  actionText: string;
};

function CheckoutPayment(props: Props) {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <button type="button">{props.actionText || "Pay Amount"}</button>
      <CheckoutProvider data={props.data} open={open} onOpenChange={setOpen}>
        {(values) => (
          <Popper open={values.open}>
            <Checkouts />
          </Popper>
        )}
      </CheckoutProvider>
    </React.Fragment>
  );
}

export { CheckoutPayment };
