import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import { CreateCompanyInputSchema } from "@packages/graphql/client/zod";
import z from "zod";

export const schema = CreateCompanyInputSchema();

export const companyFormOption = formOptions({
  defaultValues: {} as z.infer<typeof schema>,
});

export const CompanyForm = withForm({
  ...companyFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Title</FieldLegend>
        <FieldDescription>Description</FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Section 1</FieldLegend>
            <FieldDescription>Description</FieldDescription>
            <form.AppField name="annualRevenue">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="city">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="country">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
          <FieldSet>
            <FieldLegend>Section 2</FieldLegend>
            <FieldDescription>Description</FieldDescription>
            <form.AppField name="industry">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="name">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
          <FieldSet>
            <FieldLegend>Section 3</FieldLegend>
            <FieldDescription>Description</FieldDescription>
            <form.AppField name="ownerId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="phoneNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="postalCode">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="state">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="street">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
