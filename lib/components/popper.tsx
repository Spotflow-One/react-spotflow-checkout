import { cn } from "@library/utils/utils";
import React from "react";
import ReactDOM from "react-dom";

type Props = React.PropsWithChildren<{
  open: boolean;
}>;
export function Popper(props: Props) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <div role="presentation" id="spotflow-checkout-popper">
          <div
            data-app-active={props.open}
            className={cn(
              " bg-black opacity-0 fixed top-0 z-10 hidden left-0 transition-opacity duration-200 h-screen w-full",
              "data-[app-active=true]:opacity-30 data-[app-active=true]:block",
            )}
          />
          <div
            data-app-active={props.open}
            className={cn(
              "rounded-3xl fixed w-full h-screen top-0 lg:top-24 z-[3000] transition-transform duration-700 transform",
              " data-[app-active=false]:translate-y-full",
            )}
          >
            <div className="grid gap-5">{props.children}</div>
          </div>
        </div>,
        document.body,
      )}
    </React.Fragment>
  );
}
