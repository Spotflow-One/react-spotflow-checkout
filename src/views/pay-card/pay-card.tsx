import React from "react";
import Input from "../input/input";
import Button from "../button";
import OtpInput from "../input/otp-input";

export function PayCard() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [screen, setScreen] = React.useState("details");
  console.log({ setScreen });
  return (
    <div className=" grid gap-3">
      <div data-state={screen}>
        <BankDetailForm />
      </div>
      <div data-state={screen}>
        <PinForm />
      </div>
      <div data-state={screen}>
        <OtpForm />
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
          e.preventDefault();
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
        <Button className=" col-span-2">Pay USD 14.99</Button>
      </form>
    </div>
  );
};

const PinForm = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className=" grid gap-3"
    >
      <p className=" text-center mx-auto text-sm text-[#55515B] max-w-[15rem]">
        Please enter your 4-digit card pin to authorize this payment
      </p>
      <OtpInput
        FormDivContainer={{ className: " max-w-[400px] w-full mx-auto" }}
        inputType="tel"
        numInputs={4}
        onChange={() => {}}
      />
      <button title="" type="submit">
        Cancel
      </button>
    </form>
  );
};

const OtpForm = () => {
  return (
    <div className=" grid gap-3">
      <p className=" mx-auto max-w-[15rem] text-center">
        Kindly enter the OTP sent to 234249***3875
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className=" flex gap-4 justify-center "
      >
        <Input label />
        <button
          type="submit"
          title=""
          className="bg-[#32BB78] py-4 px-5 rounded-lg text-white"
        >
          Authorize
        </button>
      </form>
    </div>
  );
};
