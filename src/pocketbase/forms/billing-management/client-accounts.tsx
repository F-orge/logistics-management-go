import { formOptions } from "@tanstack/react-form";
import { useNavigate, useRouteContext, useSearch } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";
import {
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { useAppForm, withForm } from "@/components/ui/forms";
import FormDialog from "@/components/ui/forms/utils/dialog";
import {
  Collections,
  Create,
  UsersResponse,
  BillingManagementClientAccountsRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { BillingManagementClientAccountsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = BillingManagementClientAccountsSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.BillingManagementClientAccounts>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.BillingManagementClientAccounts)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `ClientAccounts created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: BillingManagementClientAccountsRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.BillingManagementClientAccounts>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.BillingManagementClientAccounts)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "ClientAccounts updated successfully",
        })
        .unwrap();
    },
  });

export const ClientAccountsForm = withForm({
  defaultValues: {} as Create<Collections.BillingManagementClientAccounts> | Update<Collections.BillingManagementClientAccounts>,
  render: ({ form }) => {
    const { pocketbase } = useRouteContext({
      from: "/dashboard/$schema/$collection",
    });

    return (
      <form.AppForm>
        <FieldSet>
          {/* Client Info */}
          <FieldGroup>
            <FieldLegend>Client Info</FieldLegend>
            <FieldDescription>
              Manage client info information
            </FieldDescription>

            <form.AppField name="client">
              {(field) => (
                <field.RelationField<UsersResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.Users}
                  relationshipName="client"
                  label="Client"
                  description="Associated client"
                  displayField="username"
                  recordListOption={{  }}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Credit */}
          <FieldGroup>
            <FieldLegend>Credit</FieldLegend>
            <FieldDescription>
              Manage credit information
            </FieldDescription>

            <form.AppField name="creditLimit">
              {(field) => (
                <field.NumberField
                  label="Credit Limit"
                  description="Maximum credit allowed"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
            <form.AppField name="availableCredit">
              {(field) => (
                <field.NumberField
                  label="Available Credit"
                  description="Remaining available credit"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
            <form.AppField name="isCreditApproved">
              {(field) => (
                <field.TextField
                  label="Is Credit Approved"
                  description="Whether credit is approved"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Payment */}
          <FieldGroup>
            <FieldLegend>Payment</FieldLegend>
            <FieldDescription>
              Manage payment information
            </FieldDescription>

            <form.AppField name="walletBalance">
              {(field) => (
                <field.NumberField
                  label="Wallet Balance"
                  description="Current wallet balance"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
            <form.AppField name="paymentTermsDays">
              {(field) => (
                <field.NumberField
                  label="Payment Terms Days"
                  description="Number of days for payment terms"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Details */}
          <FieldGroup>
            <FieldLegend>Details</FieldLegend>
            <FieldDescription>
              Manage details information
            </FieldDescription>

            <form.AppField name="currency">
              {(field) => (
                <field.TextField
                  label="Currency"
                  description="Currency code"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* History */}
          <FieldGroup>
            <FieldLegend>History</FieldLegend>
            <FieldDescription>
              Manage history information
            </FieldDescription>

            <form.AppField name="lastPaymentDate">
              {(field) => (
                <field.DateTimeField
                  label="Last Payment Date"
                  description="Date of last payment"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>
        </FieldSet>
      </form.AppForm>
    );
  },
});

const CreateForm = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const form = useAppForm(CreateFormOptionFactory(pocketbase));

  return (
    <form.AppForm>
      <FormDialog
        open={searchQuery.action === "create"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        onClear={(e) => {
          e.preventDefault();
          form.reset();
        }}
      >
        <ClientAccountsForm form={form as any} />
      </FormDialog>
    </form.AppForm>
  );
};

const UpdateForm = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data: record } = useSuspenseQuery({
    queryKey: ["clientaccounts", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.BillingManagementClientAccounts)
        .getOne<BillingManagementClientAccountsRecord>(searchQuery.id!),
  });

  const form = useAppForm(UpdateFormOptionFactory(pocketbase, record));

  return (
    <form.AppForm>
      <FormDialog
        open={searchQuery.action === "update"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        onClear={(e) => {
          e.preventDefault();
          form.reset();
        }}
      >
        <ClientAccountsForm form={form as any} />
      </FormDialog>
    </form.AppForm>
  );
};

export default () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  switch (searchQuery.action) {
    case "create":
      return <CreateForm />;
    case "update":
      return <UpdateForm />;
    default:
      return null;
  }
};
