# React Spotflow Checkout

this is a React SDK Library for the Spotflow Payment Checkout

## DEMO

<img src="https://github.com/Spotflow-One/react-spotflow-checkout/blob/main/Spoflow_Demo.png?raw=true" />

## Getting Started

This Library is a wrapper around the payment checkout to your React Application

### Install

```bash
  yarn add  @spot-flow/react-spotflow-checkout 
```

or With NPM

```bash
   npm install @spot-flow/react-spotflow-checkout 
```

### Usage

This library can be implemented using the following

1. By Using the Button PaymentCheckoutButton component

### 1. Using the Payment CheckoutButton

```javascript
import { PaymentCheckoutButton } from "@spot-flow/react-spotflow-checkout";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div>
      <PaymentCheckoutButton
        data={{
          amount: 4000,
          currency: "NGN",
          email: "temi@mailinator.com",
          fullname: "Hammed Chigozie",
          phone: "09090909090",
          productId: "9e0808304344834034",
          productName: "Leagues Pass",
          merchantKey: "<sk_test_f998479c0eedhXXXXXXXXXXXXXXXX>"// <This is your Merchant Key generated for you Merchant on Spotflow> 
        }}
        actionText="Pay Money"
      />
    </div>
  </React.StrictMode>,
);

```

the Button has the ButtonProps which can allow you to customize to your design

```javascript
import React from "react";

export declare type CheckoutData = {
  productId: string;
  productName: string;
  fullname: string;
  email: string;
  phone: string;
  amount: number;
  currency: "USD" | "EUR" | "NGN" | "GBP";
};

export type CheckoutPaymentProps = React.ComponentProps<"button"> & {
  data: CheckoutData;
  actionText: string;
};
```

## License

This project is licensed under the MIT License - see the <a href="/LICENSE">LICENSE.md</a> file for details
