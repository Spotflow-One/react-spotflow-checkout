export type BaseApiPayloadDto<T> = {
  payload: T;
};

export type BaseApiParams<T> = {
  params: T;
};

export type Prettify<T> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

export type PaymentRequestPayload = {
  merchantId?: string;
  amount: number;
  channel: string;
  currency: string;
  customer: {
    email: string;
  };
  reference: string;
  planId?: string;
};

export type CardDetails = Prettify<{
  pan: string;
  cvv: string;
  expiryMonth: string;
  expiryYear: string;
}>;

export type CardPaymentRequestPayload = Prettify<
  PaymentRequestPayload & {
    card: CardDetails;
  }
>;

export type AuthorizeCardPaymentRequestPayload = {
  authorization: {
    pin: string;
  };
  reference: string;
};

export type ValidateCardPaymentRequestPayload = {
  authorization: {
    otp: string;
  };
  reference: string;
};

export type CardPaymentRequest = BaseApiPayloadDto<CardPaymentRequestPayload>;

export type AuthorizeCardPaymentRequest =
  BaseApiPayloadDto<AuthorizeCardPaymentRequestPayload>;

export type ValidateCardPaymentRequest =
  BaseApiPayloadDto<ValidateCardPaymentRequestPayload>;

export type PaymentResponseData = {
  id: string;
  reference: string;
  spotflowReference: string;
  amount: number;
  currency: string;
  channel: string;
  status: string;
  bankDetails?: BankDetails;
  customer: Customer;
  provider: string;
  providerMessage: string;
  rate: Rate;
  authorization: Authorization;
  createdAt: Date;
};
export interface Authorization {
  mode: string;
}
export interface BankDetails {
  accountName: string;
  accountNumber: string;
  bankName: string;
}
export interface Customer {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
}
export interface Rate {
  from: string;
  to: string;
  rate: number;
}

export type TransferPaymentRequestPayload = PaymentRequestPayload;

export type TransferPaymentRequest =
  BaseApiPayloadDto<TransferPaymentRequestPayload>;

export type VerifyPaymentTransferProps = {
  merchantId?: string;
  reference: string;
  isPollingEnabled?: boolean;
  enabler: boolean;
  interval: number;
};
