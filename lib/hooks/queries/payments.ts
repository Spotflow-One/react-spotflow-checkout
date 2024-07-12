import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AuthorizeCardPaymentRequest,
  CardPaymentRequest,
  PaymentResponseData,
  Prettify,
  TransferPaymentRequest,
  ValidateCardPaymentRequest,
} from "./types/payment.types";
import { getRequest, postRequest } from "@library/api/caller";

type UseCreatePaymentProps = Prettify<{
  onSuccess(_val: unknown): void;
  onError?: (_val: unknown) => void;
  onDrawer?: () => void;
}>;

export const useCreatePayment = (props: UseCreatePaymentProps) => {
  const { onSuccess, onError, onDrawer } = props;
  const { mutate, isError, isSuccess, reset, isPending } = useMutation({
    mutationFn: ({ payload }: CardPaymentRequest) =>
      postRequest<CardPaymentRequest["payload"], PaymentResponseData>({
        url: "payments",
        payload,
      }),
    onSuccess: (data) => {
      onSuccess(data);
      if (onDrawer) {
        onDrawer();
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error);
      }
      reset();
    },
  });

  return { makePaymenr: mutate, isError, isSuccess, makingPayment: isPending };
};

type UseAuthorisationProps = {
  onSuccess(_val: unknown): void;
  onError?: (_val: unknown) => void;
  onDrawer?: () => void;
};

export const useAuthorisation = (props: UseAuthorisationProps) => {
  const { onSuccess, onError, onDrawer } = props;
  const { mutate, isError, isSuccess, reset, isPending } = useMutation({
    mutationFn: ({ payload }: AuthorizeCardPaymentRequest) =>
      postRequest<AuthorizeCardPaymentRequest["payload"], PaymentResponseData>({
        url: "payments/authorise",
        payload,
      }),
    onSuccess: (data) => {
      onSuccess(data);
      if (onDrawer) {
        onDrawer();
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error);
      }
      reset();
    },
  });

  return {
    authorisePayment: mutate,
    isError,
    isSuccess,
    authorisingPayment: isPending,
  };
};

type UseValidatePaymentProps = {
  onSuccess(_val: unknown): void;
  onError?: (_val: unknown) => void;
  onDrawer?: () => void;
};

export const useValidatePayment = (props: UseValidatePaymentProps) => {
  const { onSuccess, onError, onDrawer } = props;
  const { mutate, isError, isSuccess, reset, isPending } = useMutation({
    mutationFn: ({ payload }: ValidateCardPaymentRequest) =>
      postRequest<ValidateCardPaymentRequest["payload"], PaymentResponseData>({
        url: "payments/validate",
        payload,
      }),
    onSuccess: (data) => {
      onSuccess(data);
      if (onDrawer) {
        onDrawer();
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error);
      }
      reset();
    },
  });

  return {
    validatePayment: mutate,
    isError,
    isSuccess,
    validatingPayment: isPending,
  };
};

type UsePaymentTransferProps = {
  onSuccess(_val: unknown): void;
  onError?: (_val: unknown) => void;
  onDrawer?: () => void;
};

export const usePaymentTransfer = (props: UsePaymentTransferProps) => {
  const { onSuccess, onError, onDrawer } = props;
  const { mutate, isError, isSuccess, reset, isPending } = useMutation({
    mutationFn: ({ payload }: TransferPaymentRequest) =>
      postRequest<TransferPaymentRequest["payload"], PaymentResponseData>({
        url: "payments",
        payload,
      }),
    onSuccess: (data) => {
      onSuccess(data);
      if (onDrawer) {
        onDrawer();
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error);
      }
      reset();
    },
  });

  return {
    transferPayment: mutate,
    isError,
    isSuccess,
    transferringPayment: isPending,
  };
};

type UseVerifyPaymentTransferProps = {
  merchantId?: string;
  reference: string;
  isPollingEnabled?: boolean;
  enabler: boolean;
  interval: number;
  merchantKey?: string;
};

export const useVerifyPaymentTransfer = (
  props: UseVerifyPaymentTransferProps,
) => {
  const { reference, isPollingEnabled, enabler, interval, merchantKey } = props;
  const { data, isFetching, isError, isSuccess, error, refetch } = useQuery({
    queryKey: ["verifyPaymentTransfer"],
    queryFn: () =>
      getRequest<PaymentResponseData>({
        url: `payments/verify?reference=${reference}`,
        config: {
          headers: {
            Authorization: `Bearer ${merchantKey}`,
          },
        },
      }),
    enabled: !!enabler,
    refetchInterval: isPollingEnabled ? interval : false,
    retry: false,
  });

  return {
    payment: data,
    fetchingPayment: isFetching,
    error,
    isSuccess,
    isError,
    refetch,
  };
};
