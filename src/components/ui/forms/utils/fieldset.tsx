import React from "react";
import {
  FieldSet as BaseFieldSet,
  FieldDescription,
  FieldGroup,
  FieldLegend,
} from "../../field";

export type FieldSetProps = React.ComponentProps<typeof BaseFieldSet> & {
  legendProps?: React.ComponentProps<typeof FieldLegend>;
  descriptionProps?: React.ComponentProps<typeof FieldDescription>;
  fieldGroupProps?: React.ComponentProps<typeof FieldGroup>;
};

const FieldSet = ({
  legendProps,
  descriptionProps,
  fieldGroupProps,
  ...props
}: FieldSetProps) => {
  return (
    <BaseFieldSet {...props}>
      {legendProps && <FieldLegend {...legendProps} />}
      {descriptionProps && <FieldDescription {...descriptionProps} />}
      <FieldGroup {...fieldGroupProps}>{props.children}</FieldGroup>
    </BaseFieldSet>
  );
};

export default FieldSet;
