import React from "react";
import { SidebarDataLink } from "../../types";
import { cn } from "../../lib/utils";

type Props = {
  onClick(_val: string): void;
};
export default function Sidebar(props: Props) {
  const [value, setValue] = React.useState(sidebarDataLinkList[0].value);
  console.log({ value });
  return (
    <aside className=" h-full flex flex-col px-2">
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
      data-app-active={props.data.value === props.value}
      className={cn(
        " flex items-center gap-1 px-3 rounded-xl py-4 outline-none",
        " text-[#3D3844] font-semibold",
        "data-[app-active=true]:bg-blue-800 data-[app-active=true]:text-white"
      )}
      onClick={props.onClick}
    >
      {props.data.label}
    </button>
  );
};

const sidebarDataLinkList = [
  {
    label: "Pay with Card",
    value: "card",
  },
  {
    label: "Pay with Transfer",
    value: "transfer",
  },
  {
    label: "Pay with USSD",
    value: "ussd",
  },
];
