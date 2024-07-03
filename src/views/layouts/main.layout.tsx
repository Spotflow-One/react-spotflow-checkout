import React from "react";
import Sidebar from "./sidebar";

type Props = {
  tab: string;
  onChange(_val: string): void;
};

export default function MainLayout(props: Props) {
  return (
    <div>
      <div className=" grid min-h-[400px] grid-cols-[200px_1fr] gap-4">
        <div>
          <Sidebar onClick={props.onChange} />{" "}
        </div>
        <div>Main</div>
      </div>
    </div>
  );
}
