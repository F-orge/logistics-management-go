import { formOptions } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  UseNavigateResult,
  useNavigate,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import AutoFieldSet from "@/components/ui/autoform-tanstack/auto-fieldset";
import {
  fieldRegistry,
  toAutoFormFieldSet,
} from "@/components/ui/autoform-tanstack/types";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import { Collections, TypedPocketBase } from "@/lib/pb.types";
import { AccountTransactionsSchema } from "@/pocketbase/schemas/billing-management/account-transactions";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
  clientAccount: AccountTransactionsSchema.shape.clientAccount
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-account-transactions-clientAccount-update",
      type: "field",
      label: "ClientAccount",
      description: "Enter a clientaccount",
      inputType: "relation",
      props: {
        collectionName: Collections.BillingManagementClientAccounts,
        displayField: "name",
        relationshipName: "clientAccount",
      },
    }),
  type: AccountTransactionsSchema.shape.type
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-account-transactions-type-update",
      type: "field",
      label: "Type",
      description: "Enter a type",
      inputType: "select",
    }),
  amount: AccountTransactionsSchema.shape.amount
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-account-transactions-amount-update",
      type: "field",
      label: "Amount",
      description: "Enter an amount",
      inputType: "number",
    }),
  runningBalance: AccountTransactionsSchema.shape.runningBalance
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-account-transactions-runningBalance-update",
      type: "field",
      label: "RunningBalance",
      description: "Enter a runningbalance",
      inputType: "number",
    }),
  transactionDate: AccountTransactionsSchema.shape.transactionDate
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-account-transactions-transactionDate-update",
      type: "field",
      label: "TransactionDate",
      description: "Enter a transactiondate",
      inputType: "date",
    }),
  processedBy: AccountTransactionsSchema.shape.processedBy
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-account-transactions-processedBy-update",
      type: "field",
      label: "ProcessedBy",
      description: "Enter a processedby",
      inputType: "text",
    }),
  referenceNumber: AccountTransactionsSchema.shape.referenceNumber
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-account-transactions-referenceNumber-update",
      type: "field",
      label: "ReferenceNumber",
      description: "Enter a referencenumber",
      inputType: "text",
    }),
});

const FormOption = formOptions({
  defaultValues: {} as z.infer<typeof UpdateSchema>,
  validators: {
    onSubmit: UpdateSchema,
  },
  onSubmitMeta: {} as {
    id: string;
    pocketbase: TypedPocketBase;
    navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  },
  onSubmit: async ({ value, meta }) => {
    try {
      await meta
        .pocketbase!.collection(
          Collections.BillingManagementAccountTransactions
        )
        .update(meta.id!, value);

      toast.success("Account Transactions updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update account-transactions: ${error.message} (${error.status})`
        );
      }
    } finally {
      meta.navigate!({
        search: (prev) => ({ ...prev, action: undefined, id: undefined }),
      });
    }
  },
});

const UpdateForm = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data } = useSuspenseQuery({
    queryKey: ["accountTransactions", searchQuery.id],

    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.BillingManagementAccountTransactions)
        .getOne(searchQuery.id!);
      return record;
    },
  });

  const form = useAppForm({
    ...FormOption,
    defaultValues: data as z.infer<typeof UpdateSchema>,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit({ navigate, pocketbase, id: searchQuery.id! });
      }}
    >
      <form.AppForm>
        <AutoFieldSet
          form={form as any}
          {...toAutoFormFieldSet(UpdateSchema)}
        />
        <DialogFooter>
          <form.SubmitButton>Update Account Transactions</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateForm;
