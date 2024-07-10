import React from "react";
import { Input } from "@library/components/input/input";
import { Button } from "@library/components/button/button";
import { OtpInput } from "@library/components/input/otp-input";
import WarningIcon from "@library/assets/warning-icon.svg?react";
import TransferSuccess from "@library/assets/transfer-success-icon.svg?react";
import { cn } from "@library/utils/utils";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "@library/utils/creditCardInputs";
import { cardValidator } from "./validator";
import { useTimer } from "@library/hooks/use-timer";

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
      <div
        data-state={screen}
        className={cn(" hidden data-[state=warning]:block")}
      >
        <WarningView />
      </div>
      <div
        data-state={screen}
        className={cn(" hidden data-[state=success]:block")}
      >
        <SuccessView />
      </div>
    </div>
  );
}

type BankDetailFormProps = {
  onSubmit(): void;
};
const BankDetailForm = (props: BankDetailFormProps) => {
  const [input, setInput] = React.useState({
    card: "",
    cvv: "",
    expiry: "",
    validator: false,
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { name, value } = event.target;
    let formattedValue = value;
    if (name === "card") {
      formattedValue = formatCreditCardNumber(value);
    } else if (name === "expiry") {
      formattedValue = formatExpirationDate(value);
    } else if (name === "cvv") {
      formattedValue = formatCVC(value);
    }
    setInput((prev) => ({
      ...prev,
      [name]: formattedValue,
      validator: cardValidator({
        ...prev,
        [name]: formattedValue,
      }),
    }));
  };

  return (
    <div className=" grid gap-6">
      <h3 className=" text-center font-semibold text-xl text-[#55515B]">
        Enter your card details to pay
      </h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          props.onSubmit();
        }}
        className=" grid grid-cols-2 gap-4 gap-y-6"
      >
        <Input
          className=" col-span-2"
          name="card"
          type="tel"
          id="card-number"
          value={input.card}
          placeholder="0000 0000 0000 0000"
          DivContainer={{ className: " col-span-2" }}
          label="CARD NUMBER"
          onChange={handleInputChange}
        />
        <Input
          label="CARD EXPIRY"
          name="expiry"
          type="tel"
          value={input.expiry}
          id="card-expiry"
          placeholder="MM / YY"
          onChange={handleInputChange}
        />
        <Input
          label="CVV"
          name="cvv"
          type="tel"
          id="card-cvv"
          value={input.cvv}
          placeholder="123"
          onChange={handleInputChange}
        />
        <Button
          disabled={!input.validator}
          type="submit"
          className=" col-span-2"
        >
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
  const [pin, setPin] = React.useState("");
  return (
    <div className=" grid gap-4">
      <p className=" text-center mx-auto text-sm text-[#55515B] max-w-[15rem]">
        Please enter your 4-digit card pin to authorize this payment
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (pin.length === 4) {
            props.onSubmit();
          }
        }}
        className=" grid gap-3"
      >
        <OtpInput
          FormDivContainer={{ className: " max-w-[400px] w-full mx-auto" }}
          inputType="tel"
          value={pin}
          numInputs={4}
          onChange={(e) => {
            setPin(e);
          }}
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
  const { formatted } = useTimer(360);
  return (
    <div className=" grid gap-6">
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
      <div className=" grid gap-3">
        <div className=" max-w-[300px] w-full mx-auto text-center text-sm text-[#999999]">
          A token should be sent to you within {formatted}
        </div>
        <button
          type="button"
          className=" justify-self-center text-[#3D3844] font-semibold text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const WarningView = () => {
  return (
    <div className=" grid gap-8">
      <div className=" max-w-[400px] w-full mx-auto">
        <WarningIcon className=" mx-auto" />
        <h3 className="text-[#55515B] text-center text-xl font-semibold">
          Incorrect otp. please retry with the correct otp
        </h3>
      </div>
      <div className=" grid gap-4">
        <Button className="border-[#C0B5CF] border bg-white text-[#55515B]">
          Try again with your card
        </Button>
        <Button className="border-[#C0B5CF] border bg-white text-[#55515B]">
          Try again with transfer
        </Button>
        <Button className="border-[#C0B5CF] border bg-white text-[#55515B]">
          I already sent the money
        </Button>
      </div>
    </div>
  );
};

const SuccessView = () => {
  return (
    <div className=" grid gap-[50px] max-w-[300px] w-full mx-auto">
      <div className=" flex flex-col items-center gap-6">
        <TransferSuccess />
        <p className=" text-[#55515B] text-xl font-semibold text-center">
          Token generation/authorization successful
        </p>
      </div>
      <Button className="border-[#C0B5CF] border bg-white text-[#55515B]">
        Close
      </Button>
    </div>
  );
};
