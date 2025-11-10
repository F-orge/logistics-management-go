import { formOptions } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  useNavigate,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
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
  BillingManagementAccountTransactionsRecord,
  BillingManagementClientAccountsResponse,
  Collections,
  Create,
  TypedPocketBase,
  Update,
  UsersResponse,
} from "@/lib/pb.types";
import { BillingManagementAccountTransactionsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = BillingManagementAccountTransactionsSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues:
      {} as Create<Collections.BillingManagementAccountTransactions>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.BillingManagementAccountTransactions)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `AccountTransactions created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: BillingManagementAccountTransactionsRecord
) =>
  formOptions({
    defaultValues:
      record as Update<Collections.BillingManagementAccountTransactions>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.BillingManagementAccountTransactions)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "AccountTransactions updated successfully",
        })
        .unwrap();
    },
  });

export const AccountTransactionsForm = withForm({
  defaultValues: {} as
    | Create<Collections.BillingManagementAccountTransactions>
    | Update<Collections.BillingManagementAccountTransactions>,
  render: ({ form }) => {
    const { pocketbase } = useRouteContext({
      from: "/dashboard/$schema/$collection",
    });

    return (
      <form.AppForm>
        <FieldSet>
          {/* Account */}
          <FieldGroup>
            <FieldLegend>Account</FieldLegend>
            <FieldDescription>Manage account information</FieldDescription>

            <form.AppField name="clientAccount">
              {(field) => (
                <field.RelationField<BillingManagementClientAccountsResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.BillingManagementClientAccounts}
                  relationshipName="clientAccount"
                  label="Client Account"
                  description="Associated client account"
                  displayField="id"
                  recordListOption={{}}
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator> </FieldSeparator>

          {/* Transaction Type */}
          <FieldGroup>
            <FieldLegend>Transaction Type</FieldLegend>
            <FieldDescription>
              Manage transaction type information
            </FieldDescription>

            <form.AppField name="type">
              {(field) => (
                <field.SelectField
                  label="Type"
                  description="Type of transaction"
                  options={[
                    { label: "Credit", value: "credit" },
                    { label: "Debit", value: "debit" },
                    { label: "Top-up", value: "top-up" },
                    { label: "Refund", value: "refund" },
                    { label: "Adjustment", value: "adjustment" },
                    { label: "Fee", value: "fee" },
                  ]}
                  placeholder="Select..."
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator> </FieldSeparator>

          {/* Amount */}
          <FieldGroup>
            <FieldLegend>Amount</FieldLegend>
            <FieldDescription>Manage amount information</FieldDescription>

            <form.AppField name="amount">
              {(field) => (
                <field.NumberField
                  label="Amount"
                  description="Transaction amount"
                  placeholder="0"
                  min={0}
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator> </FieldSeparator>

          {/* Dates */}
          <FieldGroup>
            <FieldLegend>Dates</FieldLegend>
            <FieldDescription>Manage dates information</FieldDescription>

            <form.AppField name="transactionDate">
              {(field) => (
                <field.DateTimeField
                  label="Transaction Date"
                  description="Date of transaction"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator> </FieldSeparator>

          {/* Reference */}
          <FieldGroup>
            <FieldLegend>Reference</FieldLegend>
            <FieldDescription>Manage reference information</FieldDescription>

            <form.AppField name="referenceNumber">
              {(field) => (
                <field.TextField
                  label="Reference Number"
                  description="Reference number for tracking"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator> </FieldSeparator>

          {/* Balance */}
          <FieldGroup>
            <FieldLegend>Balance</FieldLegend>
            <FieldDescription>Manage balance information</FieldDescription>

            <form.AppField name="runningBalance">
              {(field) => (
                <field.NumberField
                  label="Running Balance"
                  description="Account balance after transaction"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator> </FieldSeparator>

          {/* Processing */}
          <FieldGroup>
            <FieldLegend>Processing</FieldLegend>
            <FieldDescription>Manage processing information</FieldDescription>

            <form.AppField name="processedBy">
              {(field) => (
                <field.RelationField<UsersResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.Users}
                  relationshipName="processedBy"
                  label="Processed By"
                  description="User who processed transaction"
                  displayField="username"
                  recordListOption={{}}
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
        <AccountTransactionsForm form={form as any} />
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
    queryKey: ["accounttransactions", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.BillingManagementAccountTransactions)
        .getOne<BillingManagementAccountTransactionsRecord>(searchQuery.id!),
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
        <AccountTransactionsForm form={form as any} />
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
