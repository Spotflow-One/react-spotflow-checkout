import React from "react";
import Select, { SingleValue } from "react-select";

type Props = Omit<React.ComponentProps<typeof Select>, "onChange"> & {
  options: Array<{ label: string; value: string }>;
  onChange: (option: string) => void;
  placeholder?: string;
  value: string;
  name?: string;
  loading?: boolean;
};
function CustomSelect(props: Props) {
  const [value, setValue] =
    React.useState<SingleValue<{ label: string; value: string }>>(null);
  return (
    <div>
      <Select
        options={props.options}
        name={props.name}
        onChange={(val) => {
          setValue(val);
          props.onChange(val?.value || "");
        }}
        components={{}}
        isLoading={props.loading}
        isDisabled={props.loading}
        placeholder={props.placeholder}
        value={value}
      />
    </div>
  );
}

export default CustomSelect;
