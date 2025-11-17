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
import { RelationFieldProps } from "@/components/ui/forms/fields";
import {
  Collections,
  CustomerRelationsOpportunitiesRecord,
  TypedPocketBase,
} from "@/lib/pb.types";
import { InvoicesSchema } from "@/pocketbase/schemas/customer-relations";

export const UpdateSchema = z.object({
  invoiceNumber: InvoicesSchema.shape.invoiceNumber
    .optional()
    .register(fieldRegistry, {
      id: "customer-relations-invoices-invoiceNumber-update",
      type: "field",
      label: "InvoiceNumber",
      description: "Invoice number is required",
      inputType: "text",
    }),
  opportunity: InvoicesSchema.shape.opportunity
    .optional()
    .register(fieldRegistry, {
      id: "customer-relations-invoices-opportunity-update",
      type: "field",
      label: "Opportunity",
      description: "Enter an opportunity",
      inputType: "relation",
      props: {
        collectionName: Collections.CustomerRelationsOpportunities,
        displayField: "name",
        relationshipName: "opportunity",
      },
    }),
  status: InvoicesSchema.shape.status.optional().register(fieldRegistry, {
    id: "customer-relations-invoices-status-update",
    type: "field",
    label: "Status",
    description: "Enter a status",
    inputType: "select",
  }),
  total: InvoicesSchema.shape.total.optional().register(fieldRegistry, {
    id: "customer-relations-invoices-total-update",
    type: "field",
    label: "Total",
    description: "Enter a total",
    inputType: "number",
  }),
  issueDate: InvoicesSchema.shape.issueDate.optional().register(fieldRegistry, {
    id: "customer-relations-invoices-issueDate-update",
    type: "field",
    label: "IssueDate",
    description: "Enter an issuedate",
    inputType: "text",
  }),
  dueDate: InvoicesSchema.shape.dueDate.optional().register(fieldRegistry, {
    id: "customer-relations-invoices-dueDate-update",
    type: "field",
    label: "DueDate",
    description: "Enter a duedate",
    inputType: "text",
  }),
  sentAt: InvoicesSchema.shape.sentAt.optional().register(fieldRegistry, {
    id: "customer-relations-invoices-sentAt-update",
    type: "field",
    label: "SentAt",
    description: "Enter a sentat",
    inputType: "text",
  }),
  paymentMethod: InvoicesSchema.shape.paymentMethod
    .optional()
    .register(fieldRegistry, {
      id: "customer-relations-invoices-paymentMethod-update",
      type: "field",
      label: "PaymentMethod",
      description: "Enter a paymentmethod",
      inputType: "text",
    }),
  items: InvoicesSchema.shape.items.optional().register(fieldRegistry, {
    id: "customer-relations-invoices-items-update",
    type: "field",
    label: "Items",
    description: "Enter an items",
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

  const { data } = useSuspenseQuery({
    queryKey: ["invoice", searchQuery.id],
    queryFn: async () => {
      if (!searchQuery.id) return null;
      const record = await pocketbase
        .collection(Collections.CustomerRelationsInvoices)
        .getOne(searchQuery.id);
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
          <form.SubmitButton>Update Invoice</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateInvoiceForm;
