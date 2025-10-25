import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateCaseInputSchema,
  UpdateCaseInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createCaseSchema = CreateCaseInputSchema();
export const updateCaseSchema = UpdateCaseInputSchema();

export const createCaseFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createCaseSchema>,
});

export const updateCaseFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateCaseSchema>,
});

export const CreateCaseForm = withForm({
  ...createCaseFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Case</FieldLegend>
        <FieldDescription>
          Fill in the details for the new case.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Case Details</FieldLegend>
            <form.AppField name="caseNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="priority">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="type">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="ownerId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="contactId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="description">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateCaseForm = withForm({
  ...updateCaseFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Case</FieldLegend>
        <FieldDescription>
          Update the details for the case.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Case Details</FieldLegend>
            <form.AppField name="caseNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="priority">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="type">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="ownerId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="contactId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="description">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
