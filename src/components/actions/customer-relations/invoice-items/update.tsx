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
import { InvoiceItemsSchema } from "@/pocketbase/schemas/customer-relations/invoice-items";
import { CreateInvoiceItemsSchema } from "./create";

export const UpdateInvoiceItemsSchema = z.object({
  invoice: InvoiceItemsSchema.shape.invoice.optional().register(fieldRegistry, {
    id: "crm-invoice-items-invoice-update",
    type: "field",
    label: "Invoice",
    description: "Select the invoice",
    inputType: "text",
  }),
  product: InvoiceItemsSchema.shape.product.optional().register(fieldRegistry, {
    id: "crm-invoice-items-product-update",
    type: "field",
    label: "Product",
    description: "Select the product",
    inputType: "text",
  }),
  quantity: InvoiceItemsSchema.shape.quantity
    .optional()
    .register(fieldRegistry, {
      id: "crm-invoice-items-quantity-update",
      type: "field",
      label: "Quantity",
      description: "Enter the quantity",
      inputType: "number",
    }),
  price: InvoiceItemsSchema.shape.price.optional().register(fieldRegistry, {
    id: "crm-invoice-items-price-update",
    type: "field",
    label: "Price",
    description: "Enter the price",
    inputType: "number",
  }),
});

const FormOption = formOptions({
  defaultValues: {} as z.infer<typeof UpdateInvoiceItemsSchema>,
  validators: {
    onSubmit: UpdateInvoiceItemsSchema,
  },
  onSubmitMeta: {} as {
    id: string;
    pocketbase: TypedPocketBase;
    navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  },
  onSubmit: async ({ value, meta }) => {
    try {
      await meta
        .pocketbase!.collection(Collections.CustomerRelationsInvoiceItems)
        .update(meta.id, value);

      toast.success("Invoice item updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update invoice item: ${error.message} (${error.status})`
        );
      }
    } finally {
      meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
    }
  },
});

const UpdateInvoiceItemsForm = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data } = useQuery({
    queryKey: ["invoice-item", searchQuery.id],
    enabled: !!searchQuery.id,
    queryFn: async () => {
      return await pocketbase
        .collection(Collections.CustomerRelationsInvoiceItems)
        .getOne(searchQuery.id!);
    },
  });

  const form = useAppForm({
    ...FormOption,
    defaultValues: data || {},
  });

  if (!data) return null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit({ id: searchQuery.id!, navigate, pocketbase });
      }}
    >
      <form.AppForm>
        <AutoFieldSet
          form={form as any}
          {...toAutoFormFieldSet(UpdateInvoiceItemsSchema)}
        />
        <DialogFooter>
          <form.SubmitButton>Update Invoice Item</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateInvoiceItemsForm;
