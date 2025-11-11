import { FieldDescription, FieldLegend, FieldSet } from "../field";
import { withForm } from "../forms";
import AutoField from "./auto-field";
import { FieldSet as FieldSetType } from "./types";

const AutoFieldSet = withForm({
  props: {} as FieldSetType,
  render: ({ form, ...props }) => {
    return (
      <FieldSet>
        <FieldLegend>{props.legend}</FieldLegend>
        <FieldDescription>{props.description}</FieldDescription>
        {props.groups.map((field) => {
          if (field.type === "field") {
            return (
              <AutoField
                // todo: fix any
                form={form as any}
                key={field.name}
                fieldConfig={field}
              />
            );
          } else if (field.type === "fieldset") {
            return (
              <AutoFieldSet
                key={field.name}
                // todo: fix any
                form={form as any}
                {...field}
              />
            );
          }
          return null;
        })}
      </FieldSet>
    );
  },
});

export default AutoFieldSet;
