import React from "react";
import { MainLayout } from "@library/layouts/main.layout";
import { PayUssd } from "@library/views/pay-ussd/pay-ussd";
import { PayTransfer } from "@library/views/pay-transfer/pay-transfer";
import { PayCard } from "@library/views/pay-card/pay-card";

export function Checkouts() {
  const [value, setValue] = React.useState("card");
  return (
    <MainLayout
      tab={value}
      onChange={(values) => {
        setValue(values);
      }}
    >
      <div data-state={value} className=" hidden data-[state=ussd]:grid">
        <PayUssd />
      </div>
      <div data-state={value} className="hidden data-[state=transfer]:grid">
        <PayTransfer />
      </div>
      <div data-state={value} className=" hidden data-[state=card]:grid">
        <PayCard />
      </div>
    </MainLayout>
  );
}
