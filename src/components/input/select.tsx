import React from "react";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"select"> & {
  options: Array<{ label: React.ReactNode; value: string }>;
  endAdornment?: React.ReactNode;
  label?: React.ReactNode;
};
export default function Select(props: Props) {
  const { options, className, endAdornment, label, ...rest } = props;
  return (
    <div className=" flex flex-col gap-3 py-3 px-4 rounded-lg border border-[#C0B5CF]">
      <label className="text-[#9E9BA1] text-xs">{label}</label>
      <div className=" relative flex items-center gap-3">
        <select
          {...rest}
          title=""
          className={cn("w-full py-1 outline-none flex-1 px-1", className)}
        >
          {options.map((opt) => (
            <option
              className=" bg-white py-1 px-1"
              key={opt.value}
              value={opt.value}
            >
              {opt.label}
            </option>
          ))}
        </select>
        <span>{endAdornment}</span>
      </div>
    </div>
  );
}
