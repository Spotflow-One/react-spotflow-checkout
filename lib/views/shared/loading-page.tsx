import LoadingGif from "@library/assets/img/loader.gif";

type Props = {
  text?: string;
};
function LoadingPage(props: Props) {
  return (
    <div className=" grid place-items-center gap-4 min-h-[16rem]">
      <div>
        <img src={LoadingGif} alt="loading" />
        <h4>{props?.text || "fetching..."}</h4>
      </div>
    </div>
  );
}

export default LoadingPage;
