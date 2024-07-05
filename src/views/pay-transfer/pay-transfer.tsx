import React from "react";
import CopyIcon from "../../assets/copy-icon.svg?react";
import WarningIcon from "../../assets/warning-icon.svg?react";
import CircularProgress from "../circular-progress";
import Button from "../button";

export function PayTransfer() {
  const [screen] = React.useState("detail");
  return (
    <div>
      <div data-state={screen}>
        <TransferDetail />
      </div>
      <div data-state={screen}>
        <AccountExpiry />
      </div>
      <div>
        <TransactionAuto />
      </div>
    </div>
  );
}

const TransferDetail = () => {
  return (
    <div className=" grid gap-4">
      <div className=" grid gap-4">
        <h2>Transfer USD 14.99 to the details below</h2>
        <div className=" bg-[#F4F4FF] py-8 px-7 rounded-lg grid gap-8">
          {detailCardMockList().map((field) => (
            <ItemRowCard
              key={field.title}
              title={field.title}
              value={field.value}
              isCopy={field.isCopy}
            />
          ))}
        </div>
        <div className=" mx-auto">
          <TimerCard />
        </div>
      </div>
    </div>
  );
};

type ItemRowCardProps = {
  title: string;
  value: React.ReactNode;
  isCopy?: boolean;
};
const ItemRowCard = (props: ItemRowCardProps) => {
  return (
    <div>
      <p className=" text-[#6D6A73] text-xs">{props.title}</p>
      <div className=" text-[#3D3844] flex justify-between gap-3">
        <p>{props.value}</p>
        {props.isCopy && (
          <button type="button" title="">
            <CopyIcon />
          </button>
        )}
      </div>
    </div>
  );
};

const detailCardMockList = () => [
  {
    title: "BANK NAME",
    value: "Paystack Team",
  },
  {
    title: "ACCOUNT NUMBER",
    value: "0123456789",
    isCopy: true,
  },
  {
    title: "AMOUNT",
    value: "USD 14.99",
    isCopy: true,
  },
];

const TimerCard = () => {
  return (
    <div className=" max-w-[336px] w-full grid  gap-3 grid-rows-[auto_1fr]">
      <p className=" text-center text-[#6D6A73] text-xs">
        Search for Spotflow Direct or Direct Spotflow on your bank app. Use this
        account for this transaction only
      </p>
      <div className=" justify-self-center">
        <CircularProgress size={40} />
      </div>
    </div>
  );
};

const AccountExpiry = () => {
  return (
    <div>
      <div className=" grid place-items-center">
        <WarningIcon />
        <p className=" text-[#55515B]">Account expired</p>
      </div>
      <div className=" grid gap-3">
        <Button className=" border border-[#C0B5CF] bg-white text-[#55515B]">
          Try again
        </Button>
        <Button className=" border border-[#C0B5CF] bg-white text-[#55515B]">
          I already sent the money
        </Button>
      </div>
    </div>
  );
};

const TransactionAuto = () => {
  return (
    <div>
      <div>djdk</div>
    </div>
  );
};
