import * as React from "react";
import { CheckoutProvider } from "@library/context/checkout.provider";
import { Popper } from "@library/components/popper";
import { Checkouts } from "@library/views/checkouts/checkouts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CheckoutPaymentProps } from "@library/types";

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
      {(values) => {
        return (
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
                {values.open ? <Checkouts /> : null}
              </QueryClientProvider>
            </Popper>
          </React.Fragment>
        );
      }}
    </CheckoutProvider>
  );
}
