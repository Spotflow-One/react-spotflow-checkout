import React from "react";
import CopyIcon from "@library/assets/copy-icon.svg?react";
import TransferSuccess from "@library/assets/transfer-success-icon.svg?react";
import WarningIcon from "@library/assets/warning-icon.svg?react";
import CheckoutSpinnerIcon from "@library/assets/payment-home-icon.svg?react";
import { Button } from "@library/components/button/button";
import { cn } from "@library/utils/utils";
import { useTimer } from "@library/hooks/use-timer";
import { useCheckoutContext } from "@library/context/checkout.provider";
import { DeterminateCircularProgressbar } from "@library/components/determinate-circular-progressbar";
import { getTimeformatWithMomentAppend } from "@library/utils/format-date";
import { useVerifyPaymentTransfer } from "@library/hooks/queries/payments";
import { useQueryClient } from "@tanstack/react-query";
import { PaymentResponseData } from "@library/hooks/queries/types/payment.types";

type TransferStateType = {
  screen: string;
  reference: string;
  payment: PaymentResponseData | null;
  waiting: boolean;
  count: number;
};
export function PayTransfer() {
  const { config, state, onPaymentStatus } = useCheckoutContext();
  const [transferState, setTransferState] = React.useState<TransferStateType>({
    screen: "detail",
    reference: "",
    payment: null,
    waiting: false,
    count: 1,
  });
  const timeout = 470;
  const queryClient = useQueryClient();

  const { formatted } = useTimer(timeout, transferState.waiting);

  const { payment } = useVerifyPaymentTransfer({
    enabler:
      !!state?.payment?.reference &&
      state.paymentScreen === "transfer" &&
      transferState.screen === "wait",
    reference: state?.payment?.reference || "",
    interval: 17000,
    merchantKey: config.merchantKey,
    isPollingEnabled: state.paymentScreen === "transfer",
  });

  React.useEffect(() => {
    if (state.paymentScreen !== "transfer") {
      setTransferState((prev) => ({
        ...prev,
        screen: "detail",
        reference: "",
        payment: null,
        waiting: false,
        count: 1,
      }));
    }
     
  }, [state.paymentScreen]);

  React.useEffect(() => {
    if (payment?.status === "successful") {
      queryClient.cancelQueries({ queryKey: ["useVerifyPaymentTransfer"] });
      setTransferState((prev) => ({
        ...prev,
        screen: "success",
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment?.status]);

  return (
    <div>
      <div
        data-state={transferState.screen}
        className={cn("hidden data-[state=detail]:block")}
      >
        <TransferDetail
          onSubmit={() => {
            // setScreen("wait");
            if (state.payment) {
              setTransferState((prev) => ({
                ...prev,
                screen: "wait",
              }));
              if (onPaymentStatus) {
                onPaymentStatus("ongoing");
              }
            }
          }}
          data={state.payment}
          start={transferState.screen === "detail"}
          loading={state.loading}
        />
      </div>
      <div
        data-state={transferState.screen}
        className={cn("hidden data-[state=expiry]:block")}
      >
        <AccountExpiry />
      </div>
      <div
        data-state={transferState.screen}
        className={cn("hidden data-[state=auto]:block")}
      >
        <TransactionAuto
          onWait={() => {
            setTransferState((prev) => ({
              ...prev,
              screen: "wait",
            }));
          }}
        />
      </div>
      <div
        data-state={transferState.screen}
        className={cn("hidden data-[state=wait]:block")}
      >
        <WaitingView
          onShow={() => {
            setTransferState((prev) => ({
              ...prev,
              screen: "detail",
            }));
          }}
          formatted={formatted}
        />
      </div>
      <div
        data-state={transferState.screen}
        className={cn("hidden data-[state=success]:block")}
      >
        <SuccessView />
      </div>
    </div>
  );
}

type TransferDetailProps = {
  onSubmit(): void;
  start?: boolean;
  loading?: boolean;
  validating?: boolean;
  data: PaymentResponseData | null;
};

const TransferDetail = (props: TransferDetailProps) => {
  const { state, config } = useCheckoutContext();
  const defaultTime = 589;
  const [timeLeft, setTimeLeft] = React.useState(defaultTime);

  React.useEffect(() => {
    if (timeLeft === 0) return;
    if (!props.start) return;
    let timer: string | number | NodeJS.Timeout | undefined;

    if (state.paymentScreen === "transfer") {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }

    if (props.validating || state.paymentScreen !== "transfer") {
      clearInterval(timer);
      setTimeLeft(defaultTime);
    }

    return () => {
      clearInterval(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, props.start, state.paymentScreen]);

  const progress = ((defaultTime - timeLeft) / defaultTime) * 100;
  return props.loading ? (
    <div className=" grid gap-3 place-items-center">
      <div>
        <img src="@/assets/img/loader.gif" alt="loader" />
        <p className="text-center text-gray-400">Getting Bank Details</p>
      </div>
    </div>
  ) : (
    <div className=" grid gap-4">
      <h2 className=" text-center font-semibold text-xl text-[#55515B]">
        Transfer {config?.currency || "USD"} {config?.amount || 0} to the
        details below
      </h2>
      <div className=" grid gap-4">
        <div className="bg-[#F4F4FF] py-8 px-7 rounded-lg grid gap-8">
          {detailCardMockList(state.payment).map((field) => (
            <ItemRowCard
              key={field.title}
              title={field.title}
              value={field.value}
              isCopy={field.isCopy}
            />
          ))}
        </div>
        <div className=" mx-auto">
          <TimerCard progress={progress} timer={timeLeft} />
        </div>
      </div>
      <Button
        onClick={() => {
          props.onSubmit();
        }}
        className="bg-white text-[#01008E] border border-[#01008E]"
        disabled={props.loading}
      >
        {props.loading ? "validating" : "I've sent the money"}
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
      <p className=" text-[#6D6A73] text-xs text-left">{props.title}</p>
      <div className=" text-[#3D3844] flex justify-between gap-3">
        <p>{props.value}</p>
        {props.isCopy && (
          <button
            type="button"
            title=""
            onClick={() =>
              navigator.clipboard.writeText(`${props.value || ""}`)
            }
          >
            <CopyIcon />
          </button>
        )}
      </div>
    </div>
  );
};
const detailCardMockList = (values?: PaymentResponseData | null) => [
  {
    title: "BANK NAME",
    value: values?.bankDetails?.bankName || "",
  },
  {
    title: "ACCOUNT NUMBER",
    value: values?.bankDetails?.accountNumber || "",
    isCopy: true,
  },
  {
    title: "AMOUNT",
    value: `${values?.currency || ""} ${values?.amount || 0}`,
    isCopy: true,
  },
];

type TimerCardProps = {
  start?: boolean;
  progress?: number;
  timer: number;
};
const TimerCard = (props: TimerCardProps) => {
  return (
    <div className=" max-w-[336px] w-full grid  gap-3 grid-rows-[auto_1fr]">
      <p className=" text-center text-[#6D6A73] text-xs">
        Search for Spotflow Direct or Direct Spotflow on your bank app. Use this
        account for this transaction only
      </p>
      <div className=" justify-self-center  flex flex-col items-center gap-3">
        <div className=" relative w-[3rem]">
          <CheckoutSpinnerIcon className=" absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] transform-[translate(-50%,_-50%)]" />
          <DeterminateCircularProgressbar size={45} progress={props.progress} />
        </div>
        <p className=" text-center text-[#6D6A73]">
          Expires in{" "}
          <span className=" text-green-500">
            {" "}
            {getTimeformatWithMomentAppend(props.timer)}{" "}
          </span>
        </p>
      </div>
    </div>
  );
};

const AccountExpiry = () => {
  const { state } = useCheckoutContext();
  return (
    <div className=" grid gap-12">
      <div className=" grid place-items-center">
        <WarningIcon />
        <p className=" text-[#55515B]">Account expired</p>
      </div>
      <div className=" grid gap-3">
        <Button
          className=" border border-[#C0B5CF] bg-white text-[#55515B]"
          onClick={() => {
            state.onPaymentScreen("transfer");
          }}
        >
          Try again
        </Button>
        <Button
          disabled={!state?.payment}
          className=" border border-[#C0B5CF] bg-white text-[#55515B]"
        >
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
        <DottedSpan text="Sent" />{" "}
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

const SuccessView = () => {
  const { state } = useCheckoutContext();
  return (
    <div className=" grid gap-[50px] max-w-[300px] w-full mx-auto">
      <div className=" flex flex-col items-center gap-6">
        <TransferSuccess />
        <p className=" text-[#55515B] text-xl font-semibold text-center">
          Your payment has been received
        </p>
      </div>
      <Button
        onClick={() => {
          state.onOpenChange(false);
        }}
        className="border-[#C0B5CF] border bg-white text-[#55515B]"
      >
        Close
      </Button>
    </div>
  );
};

const DottedSpan = ({ text }: { text: string }) => {
  return (
    <span className="flex flex-col justify-center">
      <span className=" border border-dashed rounded-full block h-9 w-9 border-[#B6B4B9]"></span>
      <span className=" text-sm text-[#9E9BA1] text-center">{text}</span>
    </span>
  );
};
