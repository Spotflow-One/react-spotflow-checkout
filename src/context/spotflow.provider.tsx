import React from "react";

type StateType = {
  secret?: string;
  key?: string;
};

const SpotflowPaymentContext = React.createContext<StateType>({});
export default function SpotflowPaymentProvider({
  children,
  key,
  secret,
}: React.PropsWithChildren<Partial<StateType>>) {
  return (
    <SpotflowPaymentContext.Provider value={{ secret, key }}>
      {children}
    </SpotflowPaymentContext.Provider>
  );
}

export const useSpotflowPaymentContext = () => {
  return React.useContext(SpotflowPaymentContext);
};
