import * as React from "react";
import { CheckoutProvider } from "@library/context/checkout.provider";
import { CheckoutPaymentProps } from "./types";
import { Popper } from "@library/components/popper";
import { Checkouts } from "../checkouts/checkouts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
    mutations: {},
  },
});

export function CheckoutPayment(props: CheckoutPaymentProps) {
  return (
    <CheckoutProvider data={props.data}>
      {(values) => (
        <React.Fragment>
          <button
            type="button"
            onClick={() => {
              values.onOpenChange(true);
            }}
          >
            {props.actionText || "Pay Amount"}
          </button>
          <Popper open={values.open}>
            <QueryClientProvider client={queryClient}>
              <Checkouts />
            </QueryClientProvider>
          </Popper>
        </React.Fragment>
      )}
    </CheckoutProvider>
  );
}
