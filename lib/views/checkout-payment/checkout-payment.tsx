import * as React from "react";
import { CheckoutProvider } from "@library/context/checkout.provider";
import { CheckoutPaymentProps } from "./types";
import { Popper } from "@library/components/popper";
import { Checkouts } from "../checkouts/checkouts";

export function CheckoutPayment(props: CheckoutPaymentProps) {
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
