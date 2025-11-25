import React from "react";
import {
  FieldSet as BaseFieldSet,
  FieldDescription,
  FieldGroup,
  FieldLegend,
} from "../../field";

export type FieldSetProps = React.ComponentProps<typeof BaseFieldSet> & {
  legend?: React.ReactNode;
  description?: React.ReactNode;
  legendProps?: React.ComponentProps<typeof FieldLegend>;
  descriptionProps?: React.ComponentProps<typeof FieldDescription>;
  fieldGroupProps?: React.ComponentProps<typeof FieldGroup>;
};

const FieldSet = ({
  legendProps,
  descriptionProps,
  fieldGroupProps,
  legend,
  description,
  ...props
}: FieldSetProps) => {
  return (
    <BaseFieldSet {...props}>
      {legend && <FieldLegend {...legendProps}>{legend}</FieldLegend>}
      {description && (
        <FieldDescription {...descriptionProps}>{description}</FieldDescription>
      )}
      <FieldGroup {...fieldGroupProps}>{props.children}</FieldGroup>
    </BaseFieldSet>
  );
};

export default FieldSet;
