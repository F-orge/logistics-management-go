import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppForm, withForm } from "@/components/ui/form";
import { type CreateRecord, pb } from "@/pocketbase";
import {
  type CrmCompaniesRecord,
  type CrmContactsRecord,
  CrmContactsStatusOptions,
} from "@/pocketbase/types";

export const NewContactForm = withForm({
  defaultValues: {} as CreateRecord<CrmContactsRecord>,
  props: {} as { companies: CrmCompaniesRecord[] },
  render: function ({ form, companies }) {
    return (
      <>
        <form.AppField name="first_name">
          {(field) => (
            <field.TextField
              label="First Name"
              required
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="last_name">
          {(field) => (
            <field.TextField
              label="Last Name"
              required
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="email">
          {(field) => (
            <field.TextField
              label="Email"
              required
              className="col-span-full"
            />
          )}
        </form.AppField>
        <form.AppField name="phone_number">
          {(field) => (
            <field.TextField label="Phone Number" className="col-span-2" />
          )}
        </form.AppField>
        <form.AppField name="job_title">
          {(field) => (
            <field.TextField label="Job Title" className="col-span-2" />
          )}
        </form.AppField>
        <form.AppField name="status">
          {(field) => (
            <field.SelectField
              options={Object.keys(CrmContactsStatusOptions).map((val) => ({
                label: val,
                value: val,
              }))}
              label="Status"
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="lead_source">
          {(field) => (
            <field.TextField label="Lead Source" className="col-span-2" />
          )}
        </form.AppField>
        <form.AppField name="company">
          {(field) => (
            <field.SelectField
              options={companies.map((val) => ({
                label: val.name,
                value: val.id,
              }))}
              label="Company"
              className="col-span-full"
            />
          )}
        </form.AppField>
        <form.AppField name="birth_date">
          {(field) => (
            <field.DateField label="Birth Date" className="col-span-full" />
          )}
        </form.AppField>
      </>
    );
  },
});

const NewContactDialog = () => {
  const route = getRouteApi("/dashboard/crm/contacts/");
  const navigate = route.useNavigate();
  const params = route.useSearch();

  const { data: companies } = useSuspenseQuery({
    queryKey: ["crm_companies"],
    queryFn: () => pb.collection("crm_companies").getList(1, 50),
  });

  const form = useAppForm({
    defaultValues: {} as CreateRecord<CrmContactsRecord>,
    onSubmit: async ({ value }) => {
      await toast
        .promise(pb.collection("crm_contacts").create(value), {
          success: "Successfully created a contact",
          error: "An error occurred when creating a contact",
        })
        .unwrap();

      navigate({ search: (prev) => ({ ...prev, newContact: undefined }) });
    },
  });

  return (
    <Dialog
      open={params.newContact}
      onOpenChange={(_) =>
        navigate({ search: (prev) => ({ ...prev, newContact: undefined }) })}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Contact</DialogTitle>
          <DialogDescription>Create a new Contact</DialogDescription>
        </DialogHeader>
        <form
          className="grid grid-cols-4 gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <NewContactForm companies={companies.items} form={form} />
            <form.SubmitButton className="col-start-4">
              Create Contact
            </form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewContactDialog;
