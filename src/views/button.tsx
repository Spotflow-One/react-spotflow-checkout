import React from "react";
import { cn } from "../lib/utils";

type Props = React.ComponentPropsWithRef<"button"> & {
  label?: React.ReactNode;
};
const Button = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { label, className, ...rest } = props;
  return (
    <button
      ref={ref}
      {...rest}
      className={cn(
        " w-full py-2 disabled:text-[#AAAAD9] text-white rounded-lg px-3 bg-[#01008E] disabled:bg-[#F4F4FF]",
        className,
      )}
    >
      {label}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
