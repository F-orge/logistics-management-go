import { AutoFormFieldProps } from "@autoform/react";
import React from "react";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";

export const StringField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  id,
}) => {
  const { key, ...props } = inputProps;

  return (
    <InputGroup>
      <InputGroupInput id={id} {...props} />
    </InputGroup>
  );
};
