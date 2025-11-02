import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EnumSelect = ({
  options,
  placeholder,
  ...props
}: {
  options: { label: string; value: string }[];
  placeholder?: string;
} & React.ComponentProps<typeof Select>) => {
  return (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((item) => (
          <SelectItem value={item.value}>{item.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default EnumSelect;
