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
import { pb, type UpdateRecord } from "@/pocketbase";
import {
  type CrmCompaniesRecord,
  type CrmContactsRecord,
  CrmContactsStatusOptions,
} from "@/pocketbase/types";

export const EditContactForm = withForm({
  defaultValues: {} as UpdateRecord<CrmContactsRecord>,
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

const EditContactDialog = () => {
  const route = getRouteApi("/dashboard/crm/contacts/");

  const navigate = route.useNavigate();
  const searchParams = route.useSearch();

  const { data: contact } = useSuspenseQuery({
    queryKey: ["contacts", searchParams.id],
    queryFn: () => pb.collection("crm_contacts").getOne(searchParams.id ?? ""),
  });

  const { data: companies } = useSuspenseQuery({
    queryKey: ["companies", searchParams.id],
    queryFn: () => pb.collection("crm_companies").getList(1, 50),
  });

  const form = useAppForm({
    defaultValues: contact as UpdateRecord<CrmContactsRecord>,
    onSubmit: async ({ value }) => {
      await toast
        .promise(
          pb.collection("crm_contacts").update(searchParams.id ?? "", value),
          {
            success: "Contact Updated Successfully",
            error: "An Error Occurred when updating the record",
          },
        )
        .unwrap();

      navigate({
        search: (prev) => ({ ...prev, editContact: undefined, id: undefined }),
      });
    },
  });

  return (
    <Dialog
      open={searchParams.editContact}
      onOpenChange={() =>
        navigate({
          search: (prev) => ({
            ...prev,
            editContact: undefined,
            id: undefined,
          }),
        })}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Contact Information</DialogTitle>
          <DialogDescription>
            Change the information for: {contact.first_name} {contact.last_name}
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid grid-cols-4 gap-2.5"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <EditContactForm form={form} companies={companies.items} />
            <form.SubmitButton>Edit Contact</form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditContactDialog;
