import "./index.css";
export * from "./checkout-types";
import { CheckoutPayment } from "@library/main";
import React from "react";
import ReactDOM from "react-dom/client";
// import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div>
      <CheckoutPayment
        data={{
          amount: 4000,
          currency: "NGN",
          email: "olukayode@main.com",
          fullname: "kayode ogunnowo",
          phone: "09090909090",
          productId: "9e0808304344834034",
          productName: "oijtojat",
        }}
        actionText="Nornone"
      />
    </div>
  </React.StrictMode>,
);
