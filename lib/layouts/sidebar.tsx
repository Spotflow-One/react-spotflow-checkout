// import React from "react";
import { useState } from "react";
import { SidebarDataLink } from "@library/types";
import PayWithCardIcon from "@library/assets/pay-with-card-side-icon.svg?react";
import PayWithUssdIcon from "@library/assets/pay-with-ussd-side-icon.svg?react";
import PayWithTransferIcon from "@library/assets/pay-with-transfer-side-icon.svg?react";
import { cn } from "@library/utils/utils";

type Props = {
  onClick(_val: string): void;
};

export default function Sidebar(props: Props) {
  const [value, setValue] = useState(sidebarDataLinkList[0].value);
  return (
    <aside className=" h-full bg-[#F4F4FF] flex flex-col gap-5 py-4 px-8 lg:px-2">
      <img
        src="https://res.cloudinary.com/du7qw0hpn/image/upload/v1720260601/image_3_xyiqdn.png"
        alt=""
        className=" w-12 h-auto bg-contain self-center"
      />
      <div className=" flex-col gap-2 hidden lg:flex">
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
export const SidebarLink = (props: SidebarLinkProps) => {
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

export const sidebarDataLinkList = [
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
