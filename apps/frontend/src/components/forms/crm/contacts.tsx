import { formOptions } from "@tanstack/react-form";
import { useAppForm, withForm } from "@packages/ui/components/form/index";
import {
  Button,
  Dialog,
  DialogContent,
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
import { toast } from "sonner";
import {
  CreateContactMutation,
  execute,
  UpdateContactMutation,
} from "@packages/graphql/client";
import { Contact } from "@/components/tables/crm/contacts";
import { Row } from "@tanstack/react-table";
import { useNavigate, useSearch } from "@tanstack/react-router";

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
          {/* Personal Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Personal Details</FieldLegend>
            <FieldDescription>
              Contact's personal and professional information.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.InputField
                    label="Full Name *"
                    description="Contact's full name."
                    placeholder="e.g., John Doe"
                  />
                )}
              </form.AppField>
              <form.AppField name="email">
                {(field) => (
                  <field.InputField
                    type="email"
                    label="Email *"
                    description="Primary email address."
                    placeholder="john@example.com"
                  />
                )}
              </form.AppField>
              <form.AppField name="phoneNumber">
                {(field) => (
                  <field.InputField
                    type="tel"
                    label="Phone Number"
                    description="Primary contact phone number."
                    placeholder="+1 (555) 123-4567"
                  />
                )}
              </form.AppField>
              <form.AppField name="jobTitle">
                {(field) => (
                  <field.InputField
                    label="Job Title"
                    description="Contact's job title or position."
                    placeholder="e.g., Sales Manager"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Link this contact to related entities.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="companyId">
                {(field) => (
                  <field.InputField
                    label="Company"
                    description="The company this contact works for."
                    placeholder="Company ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="ownerId">
                {(field) => (
                  <field.InputField
                    label="Account Owner"
                    description="The person responsible for managing this contact."
                    placeholder="Owner ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
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
        <FieldDescription>Update the details for the contact.</FieldDescription>
        <FieldGroup>
          {/* Personal Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Personal Details</FieldLegend>
            <FieldDescription>
              Contact's personal and professional information.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.InputField
                    label="Full Name"
                    description="Contact's full name."
                    placeholder="e.g., John Doe"
                  />
                )}
              </form.AppField>
              <form.AppField name="email">
                {(field) => (
                  <field.InputField
                    type="email"
                    label="Email"
                    description="Primary email address."
                    placeholder="john@example.com"
                  />
                )}
              </form.AppField>
              <form.AppField name="phoneNumber">
                {(field) => (
                  <field.InputField
                    type="tel"
                    label="Phone Number"
                    description="Primary contact phone number."
                    placeholder="+1 (555) 123-4567"
                  />
                )}
              </form.AppField>
              <form.AppField name="jobTitle">
                {(field) => (
                  <field.InputField
                    label="Job Title"
                    description="Contact's job title or position."
                    placeholder="e.g., Sales Manager"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Link this contact to related entities.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="companyId">
                {(field) => (
                  <field.InputField
                    label="Company"
                    description="The company this contact works for."
                    placeholder="Company ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="ownerId">
                {(field) => (
                  <field.InputField
                    label="Account Owner"
                    description="The person responsible for managing this contact."
                    placeholder="Owner ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const NewContactDialogForm = () => {
  const navigate = useNavigate({ from: "/dashboard/crm/contacts" });
  const searchQuery = useSearch({ from: "/dashboard/crm/contacts" });

  const form = useAppForm({
    ...createContactFormOption,
    onSubmit: async ({ value }) => {
      const { data, errors } = await execute(
        "/api/graphql",
        CreateContactMutation,
        { contact: value }
      );

      if (data) {
        toast.success("Successfully created contact");
      }

      if (errors) {
        toast.error("Operation Error");
        console.error(errors);
      }
      navigate({ search: (prev) => ({ ...prev, new: undefined }) });
    },
  });

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent className="!max-h-3/4 overflow-y-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <CreateContactForm form={form} />
            <form.Subscribe>
              {(el) => (
                <Button type="submit" disabled={el.isSubmitting}>
                  Create
                </Button>
              )}
            </form.Subscribe>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const UpdateContactDialogForm = ({ data }: { data: Contact[] }) => {
  const navigate = useNavigate({ from: "/dashboard/crm/contacts" });
  const searchQuery = useSearch({ from: "/dashboard/crm/contacts" });

  const contact = data.find((value) => value.id === searchQuery.id)!;

  const form = useAppForm({
    ...updateContactFormOption,
    defaultValues: contact,
    onSubmit: async ({ value }) => {
      const { data, errors } = await execute(
        "/api/graphql",
        UpdateContactMutation,
        { id: contact.id, contact: value }
      );

      if (data) {
        toast.success("Successfully updated contact");
      }

      if (errors) {
        toast.error("Operation Error");
        console.error(errors);
      }
      navigate({
        search: (prev) => ({ ...prev, edit: undefined, id: undefined }),
      });
    },
  });

  return (
    <Dialog
      open={searchQuery.edit && !!searchQuery.id}
      onOpenChange={() =>
        navigate({
          search: (prev) => ({ ...prev, edit: undefined, id: undefined }),
        })
      }
    >
      <DialogContent className="!max-h-3/4 overflow-y-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <UpdateContactForm form={form} />
            <form.Subscribe>
              {(el) => (
                <Button type="submit" disabled={el.isSubmitting}>
                  Update
                </Button>
              )}
            </form.Subscribe>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};
