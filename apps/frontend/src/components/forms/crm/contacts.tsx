import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateContactInputSchema,
  UpdateContactInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createContactSchema = CreateContactInputSchema();
export const updateContactSchema = UpdateContactInputSchema();

export const createContactFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createContactSchema>,
});

export const updateContactFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateContactSchema>,
});

export const CreateContactForm = withForm({
  ...createContactFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Contact</FieldLegend>
        <FieldDescription>
          Fill in the details for the new contact.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Contact Details</FieldLegend>
            <form.AppField name="name">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="email">
              {(field) => <field.InputField type="email" />}
            </form.AppField>
            <form.AppField name="phoneNumber">
              {(field) => <field.InputField type="tel" />}
            </form.AppField>
            <form.AppField name="jobTitle">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="companyId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="ownerId">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateContactForm = withForm({
  ...updateContactFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Contact</FieldLegend>
        <FieldDescription>
          Update the details for the contact.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Contact Details</FieldLegend>
            <form.AppField name="name">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="email">
              {(field) => <field.InputField type="email" />}
            </form.AppField>
            <form.AppField name="phoneNumber">
              {(field) => <field.InputField type="tel" />}
            </form.AppField>
            <form.AppField name="jobTitle">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="companyId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="ownerId">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
