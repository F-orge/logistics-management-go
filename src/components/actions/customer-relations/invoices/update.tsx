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
import { RelationFieldProps } from "@/components/ui/forms/fields";
import {
  Collections,
  CustomerRelationsOpportunitiesRecord,
  TypedPocketBase,
} from "@/lib/pb.types";
import { InvoicesSchema } from "@/pocketbase/schemas/customer-relations";
import { CreateInvoiceSchema } from "./create";

export const UpdateInvoiceSchema = z.object({
  invoiceNumber: InvoicesSchema.shape.invoiceNumber
    .optional()
    .register(fieldRegistry, {
      id: "crm-invoices-invoiceNumber-update",
      type: "field",
      label: "Invoice Number",
      description: "Enter the invoice number",
      inputType: "text",
    }),
  opportunity: InvoicesSchema.shape.opportunity
    .optional()
    .register(fieldRegistry, {
      id: "crm-invoices-opportunity-update",
      type: "field",
      label: "Opportunity",
      description: "Select the opportunity (optional)",
      inputType: "relation",
      props: {
        collectionName: Collections.CustomerRelationsOpportunities,
        relationshipName: "opportunity",
        placeholder: "Select an opportunity",
        displayField: "name",
        renderOption: (item) => item.name,
      } as RelationFieldProps<CustomerRelationsOpportunitiesRecord>,
    }),
  status: InvoicesSchema.shape.status.optional().register(fieldRegistry, {
    id: "crm-invoices-status-update",
    type: "field",
    label: "Status",
    description: "Select the status (optional)",
    inputType: "select",
  }),
  issueDate: InvoicesSchema.shape.issueDate.optional().register(fieldRegistry, {
    id: "crm-invoices-issueDate-update",
    type: "field",
    label: "Issue Date",
    description: "Select the issue date (optional)",
    inputType: "date",
  }),
  dueDate: InvoicesSchema.shape.dueDate.optional().register(fieldRegistry, {
    id: "crm-invoices-dueDate-update",
    type: "field",
    label: "Due Date",
    description: "Select the due date (optional)",
    inputType: "date",
  }),
  sentAt: InvoicesSchema.shape.sentAt.optional().register(fieldRegistry, {
    id: "crm-invoices-sentAt-update",
    type: "field",
    label: "Sent At",
    description: "Select when it was sent (optional)",
    inputType: "date",
  }),
  paidAt: InvoicesSchema.shape.paidAt.optional().register(fieldRegistry, {
    id: "crm-invoices-paidAt-update",
    type: "field",
    label: "Paid At",
    description: "Select when it was paid (optional)",
    inputType: "date",
  }),
  paymentMethod: InvoicesSchema.shape.paymentMethod
    .optional()
    .register(fieldRegistry, {
      id: "crm-invoices-paymentMethod-update",
      type: "field",
      label: "Payment Method",
      description: "Select the payment method (optional)",
      inputType: "select",
    }),
});

const FormOption = formOptions({
  defaultValues: {} as z.infer<typeof UpdateInvoiceSchema>,
  validators: {
    onSubmit: UpdateInvoiceSchema,
  },
  onSubmitMeta: {} as {
    id: string;
    pocketbase: TypedPocketBase;
    navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  },
  onSubmit: async ({ value, meta }) => {
    try {
      await meta
        .pocketbase!.collection(Collections.CustomerRelationsInvoices)
        .update(meta.id, value);

      toast.success("Invoice updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      meta.navigate({
        search: (prev) => ({ ...prev, action: undefined, id: undefined }),
      });
    }
  },
});

const UpdateInvoiceForm = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data } = useQuery({
    queryKey: ["invoice", searchQuery.id],
    queryFn: async () => {
      if (!searchQuery.id) return null;
      const record = await pocketbase
        .collection(Collections.CustomerRelationsInvoices)
        .getOne(searchQuery.id);
      return record;
    },
    enabled: !!searchQuery.id,
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
          {...toAutoFormFieldSet(CreateInvoiceSchema)}
        />
        <DialogFooter>
          <form.SubmitButton>Create Invoice</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateInvoiceForm;
