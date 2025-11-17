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
import { InvoiceLineItemsSchema } from "@/pocketbase/schemas/billing-management/invoice-line-items";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
  invoice: InvoiceLineItemsSchema.shape.invoice
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-invoice-line-items-invoice-update",
      type: "field",
      label: "Invoice",
      description: "Enter an invoice",
      inputType: "text",
    }),
  description: InvoiceLineItemsSchema.shape.description
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-invoice-line-items-description-update",
      type: "field",
      label: "Description",
      description: "Enter a description",
      inputType: "textarea",
    }),
  quantity: InvoiceLineItemsSchema.shape.quantity
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-invoice-line-items-quantity-update",
      type: "field",
      label: "Quantity",
      description: "Enter a quantity",
      inputType: "number",
    }),
  unitPrice: InvoiceLineItemsSchema.shape.unitPrice
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-invoice-line-items-unitPrice-update",
      type: "field",
      label: "UnitPrice",
      description: "Enter an unitprice",
      inputType: "number",
    }),
  taxRate: InvoiceLineItemsSchema.shape.taxRate
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-invoice-line-items-taxRate-update",
      type: "field",
      label: "TaxRate",
      description: "Enter a taxrate",
      inputType: "text",
    }),
  discountRate: InvoiceLineItemsSchema.shape.discountRate
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-invoice-line-items-discountRate-update",
      type: "field",
      label: "DiscountRate",
      description: "Enter a discountrate",
      inputType: "text",
    }),
  discountRate: InvoiceLineItemsSchema.shape.discountRate
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-invoice-line-items-discountRate-update",
      type: "field",
      label: "DiscountRate",
      description: "Enter a discountrate",
      inputType: "number",
    }),
  discountAmount: InvoiceLineItemsSchema.shape.discountAmount
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-invoice-line-items-discountAmount-update",
      type: "field",
      label: "DiscountAmount",
      description: "Enter a discountamount",
      inputType: "number",
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
        .pocketbase!.collection(Collections.BillingManagementInvoiceLineItems)
        .update(meta.id!, value);

      toast.success("Invoice Line Items updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update invoice-line-items: ${error.message} (${error.status})`
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
    queryKey: ["invoiceLineItems", searchQuery.id],

    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.BillingManagementInvoiceLineItems)
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
          <form.SubmitButton>Update Invoice Line Items</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateForm;
