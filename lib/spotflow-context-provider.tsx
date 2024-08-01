import * as React from "react";
import { CheckoutProvider } from "@library/context/checkout.provider";
import { Popper } from "@library/components/popper";
import { Checkouts } from "@library/views/checkouts/checkouts";
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

export function PaymentContextProvider(props: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <CheckoutProvider>
        {(values) => (
          <React.Fragment>
            <>{props.children}</>
            <Popper open={values.open}>
              <Checkouts />
            </Popper>
          </React.Fragment>
        )}
      </CheckoutProvider>
    </QueryClientProvider>
  );
}
