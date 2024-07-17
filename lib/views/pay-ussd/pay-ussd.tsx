import React from "react";
import HashIcon from "@library/assets/hash-icon.svg?react";
import { Button } from "@library/components/button/button";
import { cn } from "@library/utils/utils";
import Select, { DropdownIndicatorProps, components } from "react-select";

export function PayUssd() {
  const [screen, setScreen] = React.useState("bank");
  const getScreenTitle = () => {
    switch (screen) {
      case "bank":
        return <p>Choose your bank to start the payment</p>;

      case "code":
        return (
          <div className=" flex flex-col gap-4">
            <p className=" text-[#55515B] text-xl">
              Dial the code below to complete this transaction with FCMB’s 329
            </p>
            <p className=" text-[#5655B4]">How to pay with FCMB USSD</p>
          </div>
        );

      default:
        return "";
    }
  };
  return (
    <div>
      <div className=" grid grid-rows-[auto_1fr] gap-3">
        <div className=" flex flex-col items-center">
          <HashIcon />
          <div>{getScreenTitle()}</div>
        </div>
        <div
          data-state={screen}
          className={cn("hidden data-[state=bank]:block")}
        >
          <ChooseBankForm
            onSubmit={() => {
              setScreen("code");
            }}
          />
        </div>
        <div
          data-state={screen}
          className={cn(" hidden data-[state=code]:block")}
        >
          <CodeForm value="" />
        </div>
      </div>
    </div>
  );
}

type ChooseBankFormProps = {
  onSubmit(): void;
};
const ChooseBankForm = (props: ChooseBankFormProps) => {
  const [state, setState] = React.useState<Record<string, string>>({});
  return (
    <form
      className=" grid gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        setTimeout(() => {
          if (state.bank) props.onSubmit();
        }, 500);
      }}
    >
      <ControlledSelect
        options={bankList}
        value={state?.bank}
        name="bank"
        onChange={(values) => {
          setState((prev) => ({
            ...prev,
            bank: values,
          }));
        }}
        // endAdornment={
        //   <span className=" rounded-sm bg-[#CCCCE8] font-semibold text-[#6D6A73] p-1">
        //     *323#
        //   </span>
        // }
        // onChange={(e) => {
        //   setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        // }}
        // onChange={(e) => {
        //   setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        // }}
      />
    </form>
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
    <div className=" grid gap-2">
      <Button>{props.value || "*329*33*4*343788#"} </Button>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(props.value || "*329*33*4*343788#");
        }}
      >
        Click to copy
      </button>
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
};
const ControlledSelect = (props: ControlledSelectProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
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
        // onChange={(_val) => {
        //   props.onChange(_val[0].value);
        //   setValue(_val);
        // }}
        name={props.name}
      />
    </div>
  );
};
