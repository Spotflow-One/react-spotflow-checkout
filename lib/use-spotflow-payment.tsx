import { InitialiseConfig, InitialisePayment } from "./types";
import { useCheckoutContext } from "./context/checkout.provider";

export function useSpotflowPayment(hookConfig: InitialiseConfig) {
  const { setState } = useCheckoutContext();
  function initialisePlanPayment({ config }: Parameters<InitialisePayment>[0]) {
    const args = { ...hookConfig, ...config };
    setState((prev) => ({
      ...prev,
      initialData: args,
      open: true,
    }));
  }

  return initialisePlanPayment;
}
