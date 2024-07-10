import React from "react";
import Sidebar from "./sidebar";
import PayWithCardIcon from "../../assets/pay-with-card-side-icon.svg?react";
import PayWithUssdIcon from "../../assets/pay-with-ussd-side-icon.svg?react";
import PayWithTransferIcon from "../../assets/pay-with-transfer-side-icon.svg?react";
import CertifiedIcon from "../../assets/pci-dss-certified.svg?react";
import Button from "../button";

type Props = React.PropsWithChildren<{
  tab: string;
  onChange(_val: string): void;
}>;

const IconObject = {
  card: PayWithCardIcon,
  ussd: PayWithUssdIcon,
  transfer: PayWithTransferIcon,
};

const TextObject = {
  card: "Pay with Card",
  ussd: "Pay with USSD",
  transfer: "Pay with Transfer",
};

export default function MainLayout(props: Props) {
  const Icon = IconObject[props.tab as unknown as keyof typeof IconObject];
  const Text = TextObject[props.tab as unknown as keyof typeof TextObject];
  return (
    <div>
      <div className=" grid min-h-[400px] grid-rows-[auto_1fr] lg:grid-rows-1 grid-cols-1 lg:grid-cols-[200px_1fr] max-w-[800px] mx-auto gap-4 ">
        <div>
          <Sidebar onClick={props.onChange} />{" "}
        </div>
        <main className=" h-full bg-white grid grid-rows-[auto_1fr] gap-4 px-3 md:px-6">
          <div className=" flex lg:hidden gap-4 font-semibold text-[#3D3844]">
            <Icon className=" fill-[#9E9BA1]" /> {Text}
          </div>
          <TopContainer />
          <div>{props.children}</div>
          <div className=" grid grid-rows-[repeat(2,_auto)] gap-4">
            <div className=" flex lg:hidden justify-between gap-4">
              <Button className="border-[#E6E6E7] border-[0.5px]flex-1 whitespace-nowrap py-1 items-center bg-white text-[#55515B]">
                x Change Payment Method
              </Button>
              <Button className="border-[#E6E6E7] border-[0.5px] flex-1 items-center bg-white text-[#55515B]">
                x Cancel Payment
              </Button>
            </div>
            <div className=" justify-self-center flex gap-4 items-center font-normal text-[10px] text-[#9E9BA1]">
              <CertifiedIcon /> PCI DSS Certified
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const TopContainer = () => {
  return (
    <div className=" bg-[#01008E] py-12 px-3 md:py-7 md:px-8 grid gap-4 grid-rows-[51px_1fr] rounded-xl text-white">
      <div className=" flex gap-4 items-center justify-between border-b border-b-white text-white leading-8">
        <p className=" text-sm whitespace-nowrap">Julesanums@gmail.com </p>
        <p className=" text-sm">League Pass</p>
      </div>
      <div className=" flex self-start items-center gap-4 justify-between">
        <h3 className=" flex items-center leading-10">USD 1 = NGN 1,483.98</h3>
        <div>
          <h3>
            Pay <span className=" font-semibold">USD 14.99</span>
          </h3>
          <span className=" inline-block bg-[#32BB78] text-xs whitespace-nowrap py-1 px-3 rounded-sm">
            NGN 22,244.86
          </span>
        </div>
      </div>
    </div>
  );
};
