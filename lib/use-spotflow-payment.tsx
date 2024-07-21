import { InitialiseConfig, InitialisePayment } from "./types";
import { useCheckoutContext } from "./context/checkout.provider";

export function useSpotflowPayment(hookConfig: InitialiseConfig) {
  const { state } = useCheckoutContext();
  function initialisePlanPayment({ config }: Parameters<InitialisePayment>[0]) {
    const args = { ...hookConfig, ...config };
    state.onDataUpdated(args);
    state.onOpenChange(true);
  }

  return initialisePlanPayment;
}
