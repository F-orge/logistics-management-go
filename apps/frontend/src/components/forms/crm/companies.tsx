import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import { CreateCompanyMutation } from "@packages/graphql/client";
import {
  CreateCompanyInputSchema,
  UpdateCompanyInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const schema = CreateCompanyInputSchema();

export const companyFormOption = formOptions({
  defaultValues: {} as z.infer<typeof schema>,
});

export const CompanyForm = withForm({
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Title</FieldLegend>
        <FieldDescription>Description</FieldDescription>
        <FieldGroup>
          <form.AppField name="name">
            {(field) => <field.InputField />}
          </form.AppField>
        </FieldGroup>
      </FieldSet>
    );
  },
});
