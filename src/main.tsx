import "./index.css";
export * from "./checkout-types";
import { PaymentCheckoutButton } from "@library/main";
import React from "react";
import ReactDOM from "react-dom/client";
// import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div>
      <PaymentCheckoutButton
        data={{
          amount: 4000,
          currency: "NGN",
          email: "temi@mailinator.com",
          fullname: "kayode ogunnowo",
          phone: "09090909090",
          productId: "9e0808304344834034",
          productName: "Leagues Pass",
        }}
        actionText="Nornone"
      />
    </div>
  </React.StrictMode>,
);
