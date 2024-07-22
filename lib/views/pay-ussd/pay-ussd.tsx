import React from "react";
import HashIcon from "@library/assets/hash-icon.svg?react";
import { Button } from "@library/components/button/button";
import { cn } from "@library/utils/utils";
import Select, { DropdownIndicatorProps, components } from "react-select";
import SentIcon from "@library/assets/payment-sent-icon.svg?react";
import { useCheckoutContext } from "@library/context/checkout.provider";
import WarningIcon from "@library/assets/warning-icon.svg?react";
import TransferSuccess from "@library/assets/transfer-success-icon.svg?react";
import { useTimer } from "@library/hooks/use-timer";

export function PayUssd() {
  const [screen, setScreen] = React.useState("bank");
  const timeout = 470;
  const [bank, setBank] = React.useState("");

  const { formatted } = useTimer(timeout, false);
  return (
    <div>
      <div className=" grid grid-rows-[auto_1fr] gap-5">
        <HashIcon className=" justify-self-center" />
        <div
          data-state={screen}
          className={cn("hidden data-[state=bank]:grid")}
        >
          <ChooseBankForm
            onSubmit={() => {
              setScreen("code");
            }}
            onChange={setBank}
            value={bank}
          />
        </div>
        <div
          data-state={screen}
          className={cn(" hidden data-[state=code]:grid")}
        >
          <CodeForm value="" />
        </div>
        <div
          data-state={screen}
          className={cn(" hidden data-[state=success]:grid")}
        >
          <SuccessView />
        </div>
        <div
          data-state={screen}
          className={cn(" hidden data-[state=warning]:grid")}
        >
          <WarningView />
        </div>
        <div
          data-state={screen}
          className={cn("hidden data-[state=wait]:block")}
        >
          <WaitingView
            onShow={() => {
              // setTransferState((prev) => ({
              //   ...prev,
              //   screen: "detail",
              // }));
            }}
            formatted={formatted}
          />
        </div>
      </div>
    </div>
  );
}

type ChooseBankFormProps = {
  onSubmit(): void;
  value?: string;
  onChange(value: string): void;
};
const ChooseBankForm = (props: ChooseBankFormProps) => {
  const [state, setState] = React.useState<Record<string, string>>({});
  return (
    <div className="grid gap-4 max-w-[400px] w-full justify-self-center">
      <p className=" text-[#55515B] text-xl text-center">
        Choose your bank to start the payment
      </p>
      <div className=" grid gap-3">
        <ControlledSelect
          options={bankList}
          value={state?.bank}
          name="bank"
          onChange={(values) => {
            setState((prev) => ({
              ...prev,
              bank: values,
            }));
            props.onChange(values);
          }}
          onBlur={() => {
            if (props.value) {
              setTimeout(() => {
                if (state.bank) props.onSubmit();
              }, 500);
            }
          }}
        />
      </div>
    </div>
  );
};

const bankList = [
  {
    label: "First City Monument bank",
    value: "firstcitymonument",
  },
  {
    label: "First Bank",
    value: "firstbank",
  },
];

type CodeFormProps = {
  value: string;
};
const CodeForm = (props: CodeFormProps) => {
  return (
    <div className=" grid gap-6 max-w-[400px] w-full justify-self-center ">
      <div className=" grid gap-2 max-w-[330px] w-full justify-self-center">
        <div className=" flex flex-col gap-4">
          <p className=" text-[#55515B] text-xl text-center max-">
            Dial the code below to complete this transaction with FCMB’s 329
          </p>
          <p className=" text-[#5655B4] text-center">
            How to pay with FCMB USSD
          </p>
        </div>
        <Button className=" justify-self-center w-auto px-3">
          {props.value || "*329*33*4*343788#"}{" "}
        </Button>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(props.value || "*329*33*4*343788#");
          }}
          className=" text-xs text-[#86838A]"
        >
          Click to copy
        </button>
      </div>
      <Button className="border-[#E6E6E7] px-1 border-[0.5px] w-auto lg:flex-1 text-xs whitespace-nowrap  items-center bg-white text-[#55515B]">
        I have completed the payment
      </Button>
    </div>
  );
};

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

const DropdownIndicator = (
  props: DropdownIndicatorProps<ColourOption, true>,
) => {
  return (
    <components.DropdownIndicator {...props}>
      <span className=" rounded-sm bg-[#CCCCE8] font-semibold text-[#6D6A73] p-1">
        *323#
      </span>
    </components.DropdownIndicator>
  );
};

type ControlledSelectProps = {
  options: Array<{ label: string; value: string }>;
  value: string;
  onChange: (_val: string) => void;
  name?: string;
  onBlur?: () => void;
};
const ControlledSelect = (props: ControlledSelectProps) => {
  // const [value] = React.useState<any>(null);
  return (
    <div>
      <Select
        // value={value}
        components={{ DropdownIndicator }}
        options={props.options.map((field) => ({
          color: "#00B8D9",
          ...field,
        }))}
        onChange={(_val) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          props.onChange(_val?.value as unknown as string);
          // setValue(_val);
        }}
        onBlur={props.onBlur}
        name={props.name}
      />
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

const WarningView = () => {
  const { state } = useCheckoutContext();
  return (
    <div className=" grid gap-8">
      <div className=" max-w-[400px] w-full mx-auto">
        <WarningIcon className=" mx-auto" />
        <h3 className="text-[#55515B] text-center text-xl font-semibold">
          Please dial the ussd shortcode
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

type WaitingProps = {
  onShow(): void;
  formatted?: string;
};

const WaitingView = (props: WaitingProps) => {
  return (
    <div className=" grid gap-5 max-w-[404px] w-full mx-auto">
      <h4 className=" text-center">
        We’re waiting to confirm your transfer. This can take a few minutes
      </h4>
      <div className=" grid grid-cols-[auto_1fr_auto] gap-3 items-center">
        <DottedSpan Icon={SentIcon} text="Sent" />{" "}
        <span
          className={cn(
            " relative block h-2 an rounded-xl -top-2 bg-[#E6E6E7] ",
            "before:w-[50%] before:bg-green-700 before:rounded-xl before:animate-progress-linear before:h-full before:absolute before:left-0 before:top-0",
          )}
        ></span>
        <DottedSpan text="Received" />
      </div>
      <div className=" grid gap-3 items-center">
        <Button className="border-[#C0B5CF] border bg-white text-[#55515B]">
          Please wait for {props.formatted || ""}
        </Button>
        <button
          onClick={props.onShow}
          type="button"
          className=" w-full text-center text-[#55515B]"
        >
          Show account number
        </button>
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DottedSpan = ({ text, Icon }: { text: string; Icon?: any }) => {
  return (
    <span className="flex flex-col justify-center">
      {Icon ? (
        <Icon />
      ) : (
        <span className=" border border-dashed rounded-full block h-9 w-9 border-[#B6B4B9]"></span>
      )}
      <span className=" text-sm text-[#9E9BA1] text-center">{text}</span>
    </span>
  );
};
