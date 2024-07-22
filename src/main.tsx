import "./index.css";
import {
  // PaymentCheckoutButton,
  PaymentContextProvider,
  useSpotflowPayment,
} from "@library/main";
import React from "react";
import ReactDOM from "react-dom/client";
// import React from "react";

const PaymentConponents = () => {
  const initialFn = useSpotflowPayment({
    amount: 9,
    currency: "NGN",
    email: "temi@mailinator.com",
    merchantKey: "sk_test_f998479c0ee241a795270a55aa8dab27",
    reference: "",
    plan: "a9d53c4c-4452-4d00-953e-bb0f2780702a", //a6851d77-5ca8-40c9-8c25-af3df85002e7     // a9d53c4c-4452-4d00-953e-bb0f2780702a
  });
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          initialFn({
            config: undefined,
          });
        }}
        className=" bg-primary-main text-black"
      >
        Apaysjbdjbs
      </button>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div>
      <PaymentContextProvider>
        <PaymentConponents />
      </PaymentContextProvider>
    </div>
  </React.StrictMode>,
);

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <div>
//       <PaymentCheckoutButton
//         data={{
//           amount: 4000,
//           currency: "NGN",
//           email: "temi@mailinator.com",
//           fullname: "kayode ogunnowo",
//           phone: "09090909090",
//           merchantKey: "",
//           reference: "",
//           plan: "",
//         }}
//         actionText="Nornone"
//       />
//     </div>
//   </React.StrictMode>,
// );
