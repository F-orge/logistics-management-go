import type React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../input-group";
import { useFieldContext } from "..";

export type FileFieldProps = {
  children?: React.ReactNode;
};

const FileField = (props: FileFieldProps) => {
  const field = useFieldContext<File | string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <InputGroup>
      <InputGroupInput
        type="file"
        id={field.name}
        name={field.name}
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            field.setValue(files[0]);
          }
        }}
      />
      <InputGroupAddon align={"inline-end"}>{props.children}</InputGroupAddon>
    </InputGroup>
  );
};

export default FileField;
