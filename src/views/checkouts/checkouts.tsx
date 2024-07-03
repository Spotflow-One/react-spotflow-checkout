import React from "react";
import MainLayout from "../layouts/main.layout";
import { PayUssd } from "../pay-ussd/pay-ussd";
import { PayTransfer } from "../pay-transfer/pay-transfer";
import { PayCard } from "../pay-card/pay-card";

function Checkouts() {
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

export default Checkouts;
