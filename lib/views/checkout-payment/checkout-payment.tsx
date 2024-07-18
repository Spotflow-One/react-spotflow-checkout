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

export function PaymentCheckoutButton(props: CheckoutPaymentProps) {
  const { data, actionText, ...rest } = props;
  return (
    <CheckoutProvider data={data}>
      {(values) => (
        <React.Fragment>
          <button
            {...rest}
            type="button"
            onClick={() => {
              values.onOpenChange(true);
            }}
          >
            {actionText || "Pay Amount"}
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
