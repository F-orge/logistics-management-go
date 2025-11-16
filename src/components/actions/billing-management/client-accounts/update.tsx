import { formOptions } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
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
import { ClientAccountsSchema } from "@/pocketbase/schemas/billing-management/client-accounts";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
  client: ClientAccountsSchema.shape.client.optional().register(fieldRegistry, {
    id: "billing-management-client-accounts-client-update",
    type: "field",
    label: "Client",
    description: "Enter a client",
    inputType: "text",
  }),
  creditLimit: ClientAccountsSchema.shape.creditLimit
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-client-accounts-creditLimit-update",
      type: "field",
      label: "CreditLimit",
      description: "Enter a creditlimit",
      inputType: "number",
    }),
  availableCredit: ClientAccountsSchema.shape.availableCredit
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-client-accounts-availableCredit-update",
      type: "field",
      label: "AvailableCredit",
      description: "Enter an availablecredit",
      inputType: "text",
    }),
  walletBalance: ClientAccountsSchema.shape.walletBalance
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-client-accounts-walletBalance-update",
      type: "field",
      label: "WalletBalance",
      description: "Enter a walletbalance",
      inputType: "text",
    }),
  currency: ClientAccountsSchema.shape.currency
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-client-accounts-currency-update",
      type: "field",
      label: "Currency",
      description: "Enter a currency",
      inputType: "text",
    }),
  paymentTermsDays: ClientAccountsSchema.shape.paymentTermsDays
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-client-accounts-paymentTermsDays-update",
      type: "field",
      label: "PaymentTermsDays",
      description: "Enter a paymenttermsdays",
      inputType: "number",
    }),
  isCreditApproved: ClientAccountsSchema.shape.isCreditApproved
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-client-accounts-isCreditApproved-update",
      type: "field",
      label: "IsCreditApproved",
      description: "Enter an iscreditapproved",
      inputType: "boolean",
    }),
  lastPaymentDate: ClientAccountsSchema.shape.lastPaymentDate
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-client-accounts-lastPaymentDate-update",
      type: "field",
      label: "LastPaymentDate",
      description: "Enter a lastpaymentdate",
      inputType: "date",
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
        .pocketbase!.collection(Collections.BillingManagementClientAccounts)
        .update(meta.id!, value);

      toast.success("Client Accounts updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update client-accounts: ${error.message} (${error.status})`
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

  const { data } = useQuery({
    queryKey: ["clientAccounts", searchQuery.id],
    enabled: !!searchQuery.id,
    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.BillingManagementClientAccounts)
        .getOne(searchQuery.id!);
      return record;
    },
  });

  const form = useAppForm({
    ...FormOption,
    defaultValues: data || {},
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
          <form.SubmitButton>Update Client Accounts</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateForm;
