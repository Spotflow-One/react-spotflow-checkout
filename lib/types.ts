export type Id = string;
export type SidebarDataLink = {
  label: string;
  value: string;
  Icon: ISvgIcon;
};

export type ISetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type ISvgIcon = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & { title?: string }
>;

export declare type CheckoutData = {
  productId: string;
  productName: string;
  fullname: string;
  email: string;
  phone: string;
  amount: number;
  currency: "USD" | "EUR" | "NGN" | "GBP";
};
