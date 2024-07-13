import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AuthorizeCardPaymentRequest,
  CardPaymentRequest,
  GetMerchantKeysResponse,
  PaymentResponseData,
  Prettify,
  TransferPaymentRequest,
  ValidateCardPaymentRequest,
} from "./types/payment.types";
import { getRequest, postRequest } from "@library/api/caller";

type UseCardPaymentProps = Prettify<{
  onSuccess(_val: PaymentResponseData): void;
  onError?: (_val: unknown) => void;
  onDrawer?: () => void;
  reference: string;
}>;

export const useCardPayment = (props: UseCardPaymentProps) => {
  const { onSuccess, onError, onDrawer, reference } = props;
  const { mutate, isError, isSuccess, reset, isPending } = useMutation({
    mutationFn: ({ payload }: CardPaymentRequest) =>
      postRequest<CardPaymentRequest["payload"], PaymentResponseData>({
        url: "payments",
        payload,
        config: {
          headers: {
            Authorization: `Bearer ${reference}`,
          },
        },
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

  return { makePayment: mutate, isError, isSuccess, makingPayment: isPending };
};

type UseAuthorisationProps = {
  onSuccess(_val: PaymentResponseData): void;
  onError?: (_val: unknown) => void;
  onDrawer?: () => void;
  reference: string;
};

export const useAuthorisation = (props: UseAuthorisationProps) => {
  const { onSuccess, onError, onDrawer, reference } = props;
  const { mutate, isError, isSuccess, reset, isPending } = useMutation({
    mutationFn: ({ payload }: AuthorizeCardPaymentRequest) =>
      postRequest<AuthorizeCardPaymentRequest["payload"], PaymentResponseData>({
        url: "payments/authorize",
        payload,
        config: {
          headers: {
            Authorization: `Bearer ${reference}`,
          },
        },
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
  onSuccess(_val: PaymentResponseData): void;
  onError?: (_val: unknown) => void;
  onDrawer?: () => void;
  reference: string;
};

export const useValidatePayment = (props: UseValidatePaymentProps) => {
  const { onSuccess, onError, onDrawer, reference } = props;
  const { mutate, isError, isSuccess, reset, isPending } = useMutation({
    mutationFn: ({ payload }: ValidateCardPaymentRequest) =>
      postRequest<ValidateCardPaymentRequest["payload"], PaymentResponseData>({
        url: "payments/validate",
        payload,
        config: {
          headers: {
            Authorization: `Bearer ${reference}`,
          },
        },
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
  onSuccess(_val: PaymentResponseData): void;
  onError?: (_val: unknown) => void;
  onDrawer?: () => void;
  reference: string;
};

export const usePaymentTransfer = (props: UsePaymentTransferProps) => {
  const { onSuccess, onError, onDrawer, reference } = props;
  const { mutate, isError, isSuccess, reset, isPending } = useMutation({
    mutationFn: ({ payload }: TransferPaymentRequest) =>
      postRequest<TransferPaymentRequest["payload"], PaymentResponseData>({
        url: "payments",
        payload,
        config: {
          headers: {
            Authorization: `Bearer ${reference}`,
          },
        },
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
    queryKey: ["useVerifyPaymentTransfer"],
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

type UseGetMerchantKeysProps = {
  enabler?: boolean;
};

export const useGetMerchantKeys = (props: UseGetMerchantKeysProps) => {
  const { enabler } = props;
  const { data, isFetching, isError, isSuccess, error, refetch } = useQuery({
    queryKey: ["useGetMerchantKeys"],
    queryFn: () =>
      getRequest<GetMerchantKeysResponse>({
        url: "merchant-keys",
        config: {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      }),
    enabled: !!enabler,
  });

  return {
    merchantKeys: data || [],
    fetchingMerchantKeys: isFetching,
    error,
    isSuccess,
    isError,
    refetch,
  };
};
