import React from "react";
import Input from "../input/input";
import Button from "../button";

export function PayCard() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [screen, setScreen] = React.useState("details");
  console.log({ setScreen });
  return (
    <div className=" grid gap-3">
      <div data-state={screen}>
        <BankDetailForm />
      </div>
    </div>
  );
}

const BankDetailForm = () => {
  return (
    <div className="">
      <h3>Enter your card details to pay</h3>
      <form
        onSubmit={(e) => {
          e.stopPropagation();
        }}
        className=" grid grid-cols-2 gap-4"
      >
        <Input
          className=" col-span-2"
          DivContainer={{ className: " col-span-2" }}
          label="CARD NUMBER"
        />
        <Input label="CARD EXPIRY" />
        <Input label="CVV" />
        <Button label="Pay USD 14.99" className=" col-span-2" />
      </form>
    </div>
  );
};
