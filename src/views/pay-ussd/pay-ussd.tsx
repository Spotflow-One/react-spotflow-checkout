import React from "react";
import HashIcon from "../../assets/hash-icon.svg?react";
import Select from "../input/select";
import Button from "../button";

export function PayUssd() {
  const [screen] = React.useState("bank");
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
        <div data-state={screen}>
          <ChooseBankForm />
        </div>
        <div data-state={screen}>
          <CodeForm />
        </div>
      </div>
    </div>
  );
}

const ChooseBankForm = () => {
  return (
    <form
      className=" grid gap-3"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Select
        options={bankList}
        endAdornment={
          <span className=" rounded-sm bg-[#CCCCE8] font-semibold text-[#6D6A73] p-1">
            *323#
          </span>
        }
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

const CodeForm = () => {
  return (
    <div className=" grid gap-2">
      <Button>*329*33*4*343788#</Button>
    </div>
  );
};
