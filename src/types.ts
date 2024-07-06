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
