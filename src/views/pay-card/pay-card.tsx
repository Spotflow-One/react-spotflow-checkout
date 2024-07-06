import React from "react";
import Input from "../input/input";
import Button from "../button";
import OtpInput from "../input/otp-input";
import { cn } from "../../lib/utils";

export function PayCard() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [screen, setScreen] = React.useState("detail");
  return (
    <div className=" grid gap-3">
      <div
        data-state={screen}
        className={cn(" hidden data-[state=detail]:block")}
      >
        <BankDetailForm
          onSubmit={() => {
            setScreen("pin");
          }}
        />
      </div>
      <div data-state={screen} className={cn(" hidden data-[state=pin]:block")}>
        <PinForm
          onSubmit={() => {
            setScreen("otp");
          }}
        />
      </div>
      <div data-state={screen} className={cn(" hidden data-[state=otp]:block")}>
        <OtpForm onSubmit={() => {}} />
      </div>
    </div>
  );
}

type BankDetailFormProps = {
  onSubmit(): void;
};
const BankDetailForm = (props: BankDetailFormProps) => {
  return (
    <div className=" grid gap-6">
      <h3 className=" text-center font-semibold text-[#55515B]">
        Enter your card details to pay
      </h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          props.onSubmit();
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
        <Button type="submit" className=" col-span-2">
          Pay USD 14.99
        </Button>
      </form>
    </div>
  );
};

type PinFormProps = {
  onSubmit(): void;
};
const PinForm = (props: PinFormProps) => {
  return (
    <div className=" grid gap-4">
      <p className=" text-center mx-auto text-sm text-[#55515B] max-w-[15rem]">
        Please enter your 4-digit card pin to authorize this payment
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.onSubmit();
        }}
        className=" grid gap-3"
      >
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
    </div>
  );
};

type OtpFormProps = {
  onSubmit(): void;
};
const OtpForm = (props: OtpFormProps) => {
  return (
    <div className=" grid gap-3">
      <p className=" mx-auto max-w-[15rem] text-center">
        Kindly enter the OTP sent to 234249***3875
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.onSubmit();
        }}
        className=" flex gap-4 justify-center "
      >
        <Input label />
        <button
          type="submit"
          className="bg-[#32BB78] py-4 px-5 rounded-lg text-white"
        >
          Authorize
        </button>
      </form>
      <div className=" max-w-[300px] w-full mx-auto text-center text-sm text-[#999999]">
        A token should be sent to you within 6 minutes
      </div>
      <button
        type="button"
        className=" justify-self-center text-[#3D3844] font-semibold text-sm"
      >
        Cancel
      </button>
    </div>
  );
};
