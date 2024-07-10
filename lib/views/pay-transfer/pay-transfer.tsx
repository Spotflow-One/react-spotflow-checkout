import React from "react";
import CopyIcon from "@library/assets/copy-icon.svg?react";
import TransferSuccess from "@library/assets/transfer-success-icon.svg?react";
import WarningIcon from "@library/assets/warning-icon.svg?react";
import { CircularProgress } from "@library/components/circular-progress";
import { Button } from "@library/components/button/button";
import { cn } from "@library/utils/utils";
import { useTimer } from "@library/hooks/use-timer";

export function PayTransfer() {
  const [screen, setScreen] = React.useState("detail");
  return (
    <div>
      <div
        data-state={screen}
        className={cn(" hidden data-[state=detail]:block")}
      >
        <TransferDetail
          onSubmit={() => {
            setScreen("auto");
          }}
        />
      </div>
      <div
        data-state={screen}
        className={cn(" hidden data-[state=expiry]:block")}
      >
        <AccountExpiry />
      </div>
      <div
        data-state={screen}
        className={cn(" hidden data-[state=auto]:block")}
      >
        <TransactionAuto
          onWait={() => {
            setScreen("wait");
          }}
        />
      </div>
      <div
        data-state={screen}
        className={cn(" hidden data-[state=wait]:block")}
      >
        <WaitingView
          onNext={() => {
            setScreen("success");
          }}
        />
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

type TransferDetailProps = {
  onSubmit(): void;
};
const TransferDetail = (props: TransferDetailProps) => {
  return (
    <div className=" grid gap-4">
      <h2>Transfer USD 14.99 to the details below</h2>
      <div className=" grid gap-4">
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
      <Button
        onClick={() => {
          props.onSubmit();
        }}
        className=" bg-white text-[#01008E] border border-[#01008E]"
      >
        I’ve sent the money
      </Button>
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
      <p className=" text-[#6D6A73] text-xl text-center">{props.title}</p>
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
        <CircularProgress size={50} color="#01008E" />
      </div>
    </div>
  );
};

const AccountExpiry = () => {
  return (
    <div className=" grid gap-12">
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

type TransactionAutoProps = {
  onWait(): void;
};
const TransactionAuto = (props: TransactionAutoProps) => {
  const [state, setState] = React.useState("first");
  return (
    <div className=" grid gap-6 max-w-[290px] w-full mx-auto">
      <div className=" flex flex-col items-center gap-3">
        <h1 className=" text-center text-xl text-[#55515B]">
          {state === "first"
            ? " We’ll complete this transaction automatically once we confirm your transfer."
            : "If you have any issues with this transfer, please contact us via support@spotflow.com"}
        </h1>
        <div className=" flex items-center gap-2">
          <FilledSpan active={state === "first"} />
          <FilledSpan active={state === "second"} />
        </div>
      </div>
      <div className=" ">
        {state === "first" && (
          <Button
            type="button"
            onClick={() => {
              setState("second");
            }}
            className="border-[#C0B5CF] border bg-white text-[#55515B]"
          >
            Next
          </Button>
        )}
        {state === "second" && (
          <div className=" grid gap-3">
            <Button className=" bg-[#32BB78]">Close Checkout</Button>
            <button
              type="button"
              className=" text-[#55515B] text-center w-full"
              onClick={() => {
                props.onWait();
              }}
            >
              Keep waiting
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

type FilledSpanProps = {
  active: boolean;
};
const FilledSpan = (props: FilledSpanProps) => {
  return (
    <span
      className={cn(
        " w-3 h-3 rounded-full border border-[#C0B5CF] inline-block",
        props.active && "bg-[#01008E] border-0",
      )}
    />
  );
};

type WaitingProps = {
  onNext(): void;
};

const WaitingView = (props: WaitingProps) => {
  const { formatted, seconds } = useTimer(40);

  React.useEffect(() => {
    if (seconds === 0) props.onNext();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  return (
    <div className=" grid gap-5 max-w-[404px] w-full mx-auto">
      <h4 className=" text-center">
        We’re waiting to confirm your transfer. This can take a few minutes
      </h4>
      <div> loader coming</div>
      <div className=" grid gap-3">
        <Button className="border-[#C0B5CF] border bg-white text-[#55515B]">
          Please wait for {formatted}
        </Button>
        <button type="button" className=" w-full text-center text-[#55515B]">
          Show account number
        </button>
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
          Your payment has been received
        </p>
      </div>
      <Button className="border-[#C0B5CF] border bg-white text-[#55515B]">
        Close
      </Button>
    </div>
  );
};
