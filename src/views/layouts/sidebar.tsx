import React from "react";
import { SidebarDataLink } from "../../types";
import PayWithCardIcon from "../../assets/pay-with-card-side-icon.svg?react";
import PayWithUssdIcon from "../../assets/pay-with-ussd-side-icon.svg?react";
import PayWithTransferIcon from "../../assets/pay-with-transfer-side-icon.svg?react";
import { cn } from "../../lib/utils";

type Props = {
  onClick(_val: string): void;
};
export default function Sidebar(props: Props) {
  const [value, setValue] = React.useState(sidebarDataLinkList[0].value);
  return (
    <aside className=" h-full bg-[#F4F4FF] flex flex-col px-2">
      <div>Image</div>
      <div className=" flex-col flex gap-2">
        {sidebarDataLinkList.map((field) => (
          <SidebarLink
            key={field.value}
            value={value}
            data={field}
            onClick={() => {
              setValue(field.value);
              props.onClick(field.value);
            }}
          />
        ))}
      </div>
    </aside>
  );
}

type SidebarLinkProps = {
  value: string;
  data: SidebarDataLink;
  onClick(): void;
};
const SidebarLink = (props: SidebarLinkProps) => {
  return (
    <button
      type="button"
      data-app-active={props.data.value === props.value}
      className={cn(
        " flex items-center gap-1 px-3 rounded-xl py-4 outline-none",
        " text-[#3D3844] font-semibold",
        "data-[app-active=true]:bg-[#01008E] data-[app-active=true]:text-white",
      )}
      onClick={props.onClick}
    >
      <props.data.Icon
        data-app-active={props.data.value === props.value}
        className={cn(
          " fill-[#9E9BA1]",
          " data-[app-active=true]:fill-white data-[app-active=true]:text-white",
        )}
      />
      {props.data.label}
    </button>
  );
};

const sidebarDataLinkList = [
  {
    label: "Pay with Card",
    value: "card",
    Icon: PayWithCardIcon,
  },
  {
    label: "Pay with Transfer",
    value: "transfer",
    Icon: PayWithTransferIcon,
  },
  {
    label: "Pay with USSD",
    value: "ussd",
    Icon: PayWithUssdIcon,
  },
];
