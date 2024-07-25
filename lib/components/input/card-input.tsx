import { Prettify } from "@library/hooks/queries/types/payment.types";
import React from "react";
import { Input } from "./input";
import visa from "@library/assets/card-svg/visa.svg";
import discover from "@library/assets/card-svg/discover.svg";
import mastercard from "@library/assets/card-svg/master-card.svg";
import verve from "@library/assets/card-svg/verve.svg";
import amex from "@library/assets/card-svg/amex.svg";
import union from "@library/assets/card-svg/union.svg";
import { getCardType } from "@library/utils/get-card-type";

const iconObject = {
  visa,
  discover,
  mastercard,
  verve,
  amex,
  union,
};

type Props = Prettify<
  Omit<React.ComponentProps<typeof Input>, "value"> & {
    value?: string;
  }
>;
export default function CardInput(props: Props) {
  const { value, ...rest } = props;
  const cardType = getCardType(value || "") as keyof typeof iconObject;
  const iconStg = iconObject[cardType];
  return (
    <Input
      {...rest}
      value={value}
      type="tel"
      inputMode="numeric"
      placeholder="Card Number"
      maxLength={19}
      // pattern="\d*"
      endAdornment={<>{iconStg ? <img src={iconStg} alt="" /> : null}</>}
    />
  );
}

CardInput;
