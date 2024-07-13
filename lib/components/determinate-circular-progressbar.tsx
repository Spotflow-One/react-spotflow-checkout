import React from "react";

type Props = {
  progress?: number;
  size?: number;
  strokeWidth?: number;
  circleOneStroke?: string;
  circleTwoStroke?: string;
  progressText?: string;
};
export function DeterminateCircularProgressbar(props: Props) {
  const [offset, setOffset] = React.useState(0);
  const {
    size = 80,
    strokeWidth = 4,
    circleOneStroke = "#01008E",
    circleTwoStroke = "#F4F4FF",
    progress = 50,
    // progressText,
  } = props;

  React.useEffect(() => {
    setOffset(((100 - progress) / 100) * circumference);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  return (
    <svg className=" max-w-full block" width={size} height={size}>
      <circle
        className=" fill-none"
        stroke={circleOneStroke}
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
      />
      <circle
        className=" fill-none transition-[stroke] ease-in-out duration-300"
        stroke={circleTwoStroke}
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
      {/* <text className="" x={`${center}`} y={`${center}`}>
        {progress} {progressText}
      </text> */}
    </svg>
  );
}
