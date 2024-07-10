import * as React from "react";
import { cn } from "@library/utils/utils";
import { CircularProgress } from "@library/components/circular-progress";

type Props = React.ComponentPropsWithRef<"button"> & {
  // label?: React.ReactNode;
  loading?: boolean;
  endAdornment?: React.ReactNode;
};
export const Button = React.forwardRef<HTMLButtonElement, Props>(
  (props, ref) => {
    const { children, className, loading, endAdornment, ...rest } = props;
    return (
      <button
        ref={ref}
        {...rest}
        className={cn(
          " w-full py-4 flex gap-3 font-semibold text-sm text-white rounded-lg px-3 justify-center",
          "disabled:text-[#AAAAD9] disabled:bg-[#F4F4FF] bg-[#01008E]",
          className,
        )}
      >
        {/* <span></span> */}
        <span className=" flex-1">
          {loading ? <CircularProgress /> : children}
        </span>
        {endAdornment}
      </button>
    );
  },
);

Button.displayName = "Button";