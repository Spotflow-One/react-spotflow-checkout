import React from "react";
import Sidebar from "./sidebar";

type Props = React.PropsWithChildren<{
  tab: string;
  onChange(_val: string): void;
}>;

export default function MainLayout(props: Props) {
  return (
    <div>
      <div className=" grid min-h-[400px] grid-cols-[200px_1fr] max-w-[800px] mx-auto gap-4 pt-5">
        <div>
          <Sidebar onClick={props.onChange} />{" "}
        </div>
        <main className=" h-full bg-white grid grid-rows-[auto_1fr] gap-4 px-3 md:px-6">
          <TopContainer />
          <div>{props.children}</div>
        </main>
      </div>
    </div>
  );
}

const TopContainer = () => {
  return (
    <div className=" bg-[#01008E] py-12 px-3 md:py-7 md:px-8 grid gap-4 grid-rows-[51px_1fr] rounded-xl text-white">
      <div className=" flex gap-4 items-center justify-between border-b border-b-white text-white leading-8">
        <p>Julesanums@gmail.com </p>
        <p>League Pass</p>
      </div>
      <div className=" flex self-start items-center gap-4 justify-between">
        <h3 className=" flex items-center leading-10">USD 1 = NGN 1,483.98</h3>
        <div>
          <h3>
            Pay <span className=" font-semibold">USD 14.99</span>
          </h3>
          <span className=" inline-block bg-[#32BB78] py-1 px-3 rounded-sm">
            NGN 22,244.86
          </span>
        </div>
      </div>
    </div>
  );
};
