import React from "react";
import { Input } from "@library/components/input/input";
import { Button } from "@library/components/button/button";
import { OtpInput } from "@library/components/input/otp-input";
import WarningIcon from "@library/assets/warning-icon.svg?react";
import TransferSuccess from "@library/assets/transfer-success-icon.svg?react";
import { cn } from "@library/utils/utils";
import {
  clearNumber,
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  unFormatCreditCardNumber,
} from "@library/utils/creditCardInputs";
import { cardValidator } from "./validator";
import { useTimer } from "@library/hooks/use-timer";
import {
  useAuthorisation,
  useCardPayment,
  useValidatePayment,
} from "@library/hooks/queries/payments";
import { useCheckoutContext } from "@library/context/checkout.provider";
import { generatePaymentReference } from "@library/utils/ref";

type CardDetailType = {
  card: string;
  cvv: string;
  expiry: string;
};
export function PayCard() {
  const { state } = useCheckoutContext();
  const [pageState, setPageState] = React.useState({
    reference: "",
    providerMessage: "",
    screen: "detail",
  });

  const { makePayment, makingPayment } = useCardPayment({
    onSuccess(_val) {
      if (_val.status === "pending_authorization") {
        setPageState((prev) => ({
          ...prev,
          screen: "pin",
          reference: _val.reference,
        }));
      }
      if (_val.status === "failed") {
        if (state.onErrorText) {
          state.onErrorText(_val?.providerMessage || "Payment Failed");
        }
      }
    },
    reference: state.merchantKey,
  });

  const { validatePayment, validatingPayment } = useValidatePayment({
    onSuccess(_val) {
      if (_val.status === "successful") {
        setPageState((prev) => ({
          ...prev,
          screen: "success",
        }));
      } else {
        setPageState((prev) => ({
          ...prev,
          screen: "warning",
        }));
      }
    },
    reference: state.merchantKey,
  });

  const onValidate = (val: string) => {
    validatePayment({
      payload: {
        authorization: {
          otp: val,
        },
        reference: pageState.reference,
      },
    });
  };

  const { authorisePayment, authorisingPayment } = useAuthorisation({
    onSuccess(_val) {
      setPageState((prev) => ({
        ...prev,
        screen: "otp",
        providerMessage:
          _val?.providerMessage || "Enter the OTP sent to your phone",
      }));
    },
    reference: state.merchantKey,
  });

  const onAuthorisation = (_val: string) => {
    authorisePayment({
      payload: {
        authorization: {
          pin: _val,
        },
        reference: pageState.reference,
      },
    });
  };

  const onCardPayment = (val: CardDetailType) => {
    makePayment({
      payload: {
        amount: state.data.amount,
        channel: "card",
        currency: "USD",
        customer: {
          email: state.data.email,
        },
        reference: generatePaymentReference(),
        card: {
          pan: unFormatCreditCardNumber(val.card),
          cvv: val.cvv,
          expiryMonth: val.expiry.split("/")[0].trim(),
          expiryYear: val.expiry.split("/")[1].trim(),
        },
      },
    });
  };
  return (
    <div className=" grid gap-3">
      <div
        data-state={pageState.screen}
        className={cn(" hidden data-[state=detail]:block")}
      >
        <BankDetailForm onSubmit={onCardPayment} loading={makingPayment} />
      </div>
      <div
        data-state={pageState.screen}
        className={cn(" hidden data-[state=pin]:block")}
      >
        <PinForm
          onSubmit={(value) => {
            if (value.length === 4) {
              setTimeout(() => {
                onAuthorisation(value);
              }, 500);
            }
          }}
          loading={authorisingPayment}
        />
      </div>
      <div
        data-state={pageState.screen}
        className={cn(" hidden data-[state=otp]:block")}
      >
        <OtpForm
          onSubmit={onValidate}
          message={pageState.providerMessage}
          loading={validatingPayment}
        />
      </div>
      <div
        data-state={pageState.screen}
        className={cn(" hidden data-[state=warning]:block")}
      >
        <WarningView />
      </div>
      <div
        data-state={pageState.screen}
        className={cn(" hidden data-[state=success]:block")}
      >
        <SuccessView />
      </div>
    </div>
  );
}

type BankDetailFormProps = {
  onSubmit(_val: CardDetailType): void;
  loading?: boolean;
};
const BankDetailForm = (props: BankDetailFormProps) => {
  const [input, setInput] = React.useState({
    card: "",
    cvv: "",
    expiry: "",
    validator: false,
  });
  const { state } = useCheckoutContext();

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
          if (input.validator) {
            props.onSubmit({
              card: input.card,
              cvv: input.cvv,
              expiry: input.expiry,
            });
          }
          if (state.onErrorText) {
            state.onErrorText("");
          }
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
          type="text"
          id="card-cvv"
          inputMode="numeric"
          value={input.cvv}
          placeholder="123"
          onChange={handleInputChange}
        />
        <Button
          disabled={!input.validator}
          type="submit"
          className=" col-span-2"
        >
          {props.loading
            ? "Validating..."
            : ` Pay ${state?.data?.currency || "USD"} ${state?.data?.amount || 0}`}
        </Button>
      </form>
    </div>
  );
};

type PinFormProps = {
  onSubmit(_val: string): void;
  loading?: boolean;
};
const PinForm = (props: PinFormProps) => {
  return (
    <div className=" grid gap-4">
      <p className=" text-center mx-auto text-sm text-[#55515B] max-w-[15rem]">
        Please enter your 4-digit card pin to authorize this payment
      </p>
      <div className=" grid gap-3">
        <OtpInput
          FormDivContainer={{ className: " max-w-[400px] w-full mx-auto" }}
          inputType="tel"
          numInputs={4}
          onChange={(e) => {
            if (e.length === 4) props.onSubmit(e);
          }}
        />
        <button title="" type="submit">
          Cancel
        </button>
      </div>
    </div>
  );
};

type OtpFormProps = {
  onSubmit(_val: string): void;
  loading?: boolean;
  message?: string;
};
const OtpForm = (props: OtpFormProps) => {
  const { formatted } = useTimer(360);
  const [otp, setOtp] = React.useState("");
  return (
    <div className=" grid gap-6">
      <p className=" mx-auto max-w-[15rem] text-center">
        {props.message || " Kindly enter the OTP sent to 234249***3875"}
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (props.loading) return;
          if (otp.length < 4) return;
          props.onSubmit(otp);
        }}
        className=" flex gap-4 justify-center "
      >
        <Input
          type="text"
          inputMode="numeric"
          required
          name="otp"
          max={6}
          value={otp}
          onChange={(e) => {
            setOtp(clearNumber(e.target.value));
          }}
          pattern="\d*"
          label
        />
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
  const { state } = useCheckoutContext();
  return (
    <div className=" grid gap-8">
      <div className=" max-w-[400px] w-full mx-auto">
        <WarningIcon className=" mx-auto" />
        <h3 className="text-[#55515B] text-center text-xl font-semibold">
          Incorrect otp. please retry with the correct otp
        </h3>
      </div>
      <div className=" grid gap-4">
        <Button
          onClick={() => {
            state.onPaymentScreen("card");
          }}
          className="border-[#C0B5CF] border bg-white text-[#55515B]"
        >
          Try again with your card
        </Button>
        <Button
          onClick={() => {
            state.onPaymentScreen("transfer");
          }}
          className="border-[#C0B5CF] border bg-white text-[#55515B]"
        >
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
  const { state } = useCheckoutContext();
  return (
    <div className=" grid gap-[50px] max-w-[300px] w-full mx-auto">
      <div className=" flex flex-col items-center gap-6">
        <TransferSuccess />
        <p className=" text-[#55515B] text-xl font-semibold text-center">
          Token generation/authorization successful
        </p>
      </div>
      <Button
        className="border-[#C0B5CF] border bg-white text-[#55515B]"
        onClick={() => {
          state.onOpenChange(false);
        }}
      >
        Close
      </Button>
    </div>
  );
};
