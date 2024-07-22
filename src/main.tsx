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
    amount: 4000,
    currency: "NGN",
    email: "temi@mailinator.com",
    merchantKey: "",
    reference: "",
    plan: "",
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
