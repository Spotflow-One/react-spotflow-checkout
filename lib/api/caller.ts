import { Api } from "@library/api/api";
import { AxiosRequestConfig } from "axios";

type ApiObjType = Record<
  string,
  string | number | undefined | null | string[] | number[]
>;

interface FuncProp<T> {
  url: string;
  payload: T;
  config?: AxiosRequestConfig;
}

interface GetFuncProp<T extends ApiObjType> {
  url: string;
  params: T | undefined;
  config?: AxiosRequestConfig;
}

export const postRequest = async <T, R>({
  url,
  payload,
  config,
}: FuncProp<T>) => {
  const response = await Api.post<R>(url, payload, config);

  const { data } = response;

  return data;
};

export const putRequest = async <T, R>({
  url,
  payload,
  config,
}: FuncProp<T>) => {
  const response = await Api.put<R>(url, payload, config);

  const { data } = response;

  return data;
};

export const patchRequest = async <T, R>({ url, payload }: FuncProp<T>) => {
  const response = await Api.patch<R>(url, payload);

  const { data } = response;

  return data;
};

export const deleteRequest = async <R>({ url }: { url: string }) => {
  const { data } = await Api.delete<R>(url);

  return data;
};

export const deleteRequestTest = async ({ url }: { url: string }) => {
  const { data } = await Api.delete(url);

  return data;
};

export const getRequestParams = async <T extends ApiObjType, R>({
  url,
  params,
  config,
}: GetFuncProp<T>) => {
  const response = await Api.get<R>(url, { ...config, params });

  const { data } = response;

  return data;
};

type GetRequestType = {
  url: string;
  config?: AxiosRequestConfig;
};

export const getRequest = async <R>({ url, config }: GetRequestType) => {
  const response = await Api.get<R>(url, config);

  const { data } = response;

  return data;
};
