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
  type CrmCampaignsRecord,
  CrmCampaignsStatusOptions,
} from "@/pocketbase/types";

export const EditCampaignForm = withForm({
  defaultValues: {} as UpdateRecord<CrmCampaignsRecord>,
  props: {},
  render: function ({ form }) {
    return (
      <>
        <form.AppField name="name">
          {(field) => (
            <field.TextField
              label="Campaign Name"
              required
              className="col-span-full"
            />
          )}
        </form.AppField>
        <form.AppField name="description">
          {(field) => (
            <field.TextField label="Description" className="col-span-full" />
          )}
        </form.AppField>
        <form.AppField name="status">
          {(field) => (
            <field.SelectField
              options={Object.keys(CrmCampaignsStatusOptions).map((val) => ({
                label: val.charAt(0).toUpperCase() + val.slice(1),
                value: val,
              }))}
              label="Status"
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="budget">
          {(field) => <field.TextField label="Budget" className="col-span-2" />}
        </form.AppField>
        <form.AppField name="start_date">
          {(field) => (
            <field.DateField
              label="Start Date"
              required
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="end_date">
          {(field) => (
            <field.DateField label="End Date" className="col-span-2" />
          )}
        </form.AppField>
      </>
    );
  },
});

const EditCampaignDialog = () => {
  const route = getRouteApi("/dashboard/crm/campaigns/");

  const navigate = route.useNavigate();
  const searchParams = route.useSearch();

  const { data: campaign } = useSuspenseQuery({
    queryKey: ["campaigns", searchParams.id],
    queryFn: () => pb.collection("crm_campaigns").getOne(searchParams.id ?? ""),
  });

  const form = useAppForm({
    defaultValues: campaign as UpdateRecord<CrmCampaignsRecord>,
    onSubmit: async ({ value }) => {
      await toast
        .promise(
          pb.collection("crm_campaigns").update(searchParams.id ?? "", value),
          {
            success: "Campaign Updated Successfully",
            error: "An Error Occurred when updating the record",
          },
        )
        .unwrap();

      navigate({
        search: (prev) => ({ ...prev, edit: undefined, id: undefined }),
      });
    },
  });

  return (
    <Dialog
      open={searchParams.edit}
      onOpenChange={() =>
        navigate({
          search: (prev) => ({
            ...prev,
            edit: undefined,
            id: undefined,
          }),
        })}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Campaign Information</DialogTitle>
          <DialogDescription>
            Change the information for: {campaign.name}
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
            <EditCampaignForm form={form} />
            <form.SubmitButton>Edit Campaign</form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCampaignDialog;
