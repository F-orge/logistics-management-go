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
  type CrmOpportunitiesRecord,
  CrmOpportunitiesStageOptions,
} from "@/pocketbase/types";

export const NewOpportunityForm = withForm({
  defaultValues: {} as CreateRecord<CrmOpportunitiesRecord>,
  props: {} as {
    companies: CrmCompaniesRecord[];
    contacts: CrmContactsRecord[];
  },
  render: function ({ form, companies, contacts }) {
    return (
      <>
        <form.AppField name="name">
          {(field) => (
            <field.TextField
              label="Opportunity Name"
              required
              className="col-span-full"
            />
          )}
        </form.AppField>
        <form.AppField name="stage">
          {(field) => (
            <field.SelectField
              options={Object.keys(CrmOpportunitiesStageOptions).map((val) => ({
                label: val.charAt(0).toUpperCase() +
                  val.slice(1).replace("-", " "),
                value: val,
              }))}
              label="Stage"
              required
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="amount">
          {(field) => (
            <field.TextField
              label="Amount"
              required
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="probability">
          {(field) => (
            <field.TextField
              label="Probability (%)"
              min={0}
              max={100}
              className="col-span-2"
            />
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
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="primary_contact">
          {(field) => (
            <field.SelectField
              options={contacts.map((val) => ({
                label: `${val.first_name} ${val.last_name}`,
                value: val.id,
              }))}
              label="Primary Contact"
              className="col-span-full"
            />
          )}
        </form.AppField>
        <form.AppField name="close_date">
          {(field) => (
            <field.DateField
              label="Expected Close Date"
              className="col-span-full"
            />
          )}
        </form.AppField>
      </>
    );
  },
});

const NewOpportunityDialog = () => {
  const route = getRouteApi("/dashboard/crm/opportunities/");
  const navigate = route.useNavigate();
  const params = route.useSearch();

  const { data: companies } = useSuspenseQuery({
    queryKey: ["crm_companies"],
    queryFn: () => pb.collection("crm_companies").getList(1, 50),
  });

  const { data: contacts } = useSuspenseQuery({
    queryKey: ["crm_contacts"],
    queryFn: () => pb.collection("crm_contacts").getList(1, 50),
  });

  const form = useAppForm({
    defaultValues: {} as CreateRecord<CrmOpportunitiesRecord>,
    onSubmit: async ({ value }) => {
      await toast
        .promise(pb.collection("crm_opportunities").create(value), {
          success: "Successfully created an opportunity",
          error: "An error occurred when creating an opportunity",
        })
        .unwrap();

      navigate({ search: (prev) => ({ ...prev, newOpportunity: undefined }) });
    },
  });

  return (
    <Dialog
      open={params.newOpportunity}
      onOpenChange={(_) =>
        navigate({
          search: (prev) => ({ ...prev, newOpportunity: undefined }),
        })}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Opportunity</DialogTitle>
          <DialogDescription>Create a new sales opportunity</DialogDescription>
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
            <NewOpportunityForm
              companies={companies.items}
              contacts={contacts.items}
              form={form}
            />
            <form.SubmitButton className="col-start-4">
              Create Opportunity
            </form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewOpportunityDialog;
