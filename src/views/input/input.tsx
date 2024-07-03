import React from "react";
import { cn } from "../../lib/utils";

type Props = React.ComponentPropsWithRef<"input"> & {
  DivContainer?: React.ComponentProps<"div">;
  label: React.ReactNode;
};
export default function Input(props: Props) {
  const { name, id, className, DivContainer, label, ...rest } = props;
  return (
    <div
      className={cn(
        " rounded-lg py-2 px-4 border border-[#CECDD0]",
        DivContainer?.className,
      )}
    >
      <label htmlFor={id || name}>{label}</label>
      <div className=" flex items-center gap-1">
        <input
          {...rest}
          id={id || name}
          type={rest.type || "text"}
          className={cn(" outline-none w-full px-1", className)}
        />
      </div>
    </div>
  );
}
