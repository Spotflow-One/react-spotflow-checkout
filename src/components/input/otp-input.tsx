import React from "react";
import OTPInput, { OTPInputProps } from "react-otp-input";
import { pxToRem } from "@/lib/utils";

type Props = Omit<OTPInputProps, "renderInput"> & {
  label?: React.ReactNode;
  DivContainer?: React.ComponentProps<"div">;
  FormDivContainer?: React.ComponentProps<"div">;
};

export default function OtpInput(props: Props) {
  const {
    label,
    numInputs = 6,
    value,
    onChange,
    DivContainer,
    FormDivContainer,
    ...rest
  } = props;

  const [otp, setOtp] = React.useState(value || "");
  return (
    <div {...DivContainer}>
      <label>{label}</label>
      <div {...FormDivContainer}>
        <OTPInput
          value={value || otp}
          onChange={(values) => {
            setOtp(values);
            if (onChange) {
              onChange(values);
            }
          }}
          containerStyle={{
            width: "100%",
            justifyContent: "space-around",
            gap: pxToRem(6),
          }}
          inputStyle={{
            minWidth: `calc(100%/${numInputs || 6} - 10px)`,
            backgroundColor: "transparent",
            padding: pxToRem(13),
            borderRadius: pxToRem(8),
            color: "#041111CC",
            border: "1.5px solid #E2E8F0",
            display: "flex",
            justifyContent: "center",
            fontWeight: 600,
            fontSize: pxToRem(24),
            outline: "none",
          }}
          renderInput={(props) => <input {...props} />}
          numInputs={numInputs || 6}
          shouldAutoFocus={false}
          {...rest}
        />
      </div>
    </div>
  );
}
