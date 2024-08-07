import * as React from "react";
import { cn } from "@library/utils/utils";

type Props = React.ComponentPropsWithRef<"input"> & {
  DivContainer?: React.ComponentProps<"div">;
  label: React.ReactNode;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
};
export function Input(props: Props) {
  const {
    name,
    id,
    className,
    DivContainer,
    label,
    startAdornment,
    endAdornment,
    ...rest
  } = props;
  return (
    <div
      className={cn(
        " rounded-lg py-1 px-4 border border-[#CECDD0]",
        DivContainer?.className,
      )}
    >
      <label className=" text-[#9E9BA1] text-xs" htmlFor={id || name}>
        {label}
      </label>
      <div className=" flex items-center gap-1">
        {startAdornment}
        <input
          {...rest}
          id={id || name}
          name={name}
          type={rest.type || "text"}
          className={cn(
            " outline-none w-full pr-1 placeholder:text-xs",
            className,
          )}
        />
        {endAdornment}
      </div>
    </div>
  );
}
