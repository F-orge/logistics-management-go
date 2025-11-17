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
import { InvoiceItemsSchema } from "@/pocketbase/schemas/customer-relations/invoice-items";

export const UpdateSchema = z.object({
  invoice: InvoiceItemsSchema.shape.invoice.optional().register(fieldRegistry, {
    id: "customer-relations-invoice-items-invoice-update",
    type: "field",
    label: "Invoice",
    description: "Enter an invoice",
    inputType: "text",
  }),
  product: InvoiceItemsSchema.shape.product.optional().register(fieldRegistry, {
    id: "customer-relations-invoice-items-product-update",
    type: "field",
    label: "Product",
    description: "Enter a product",
    inputType: "relation",
    props: {
      collectionName: Collections.CustomerRelationsProducts,
      displayField: "name",
      relationshipName: "product",
    },
  }),
  quantity: InvoiceItemsSchema.shape.quantity
    .optional()
    .register(fieldRegistry, {
      id: "customer-relations-invoice-items-quantity-update",
      type: "field",
      label: "Quantity",
      description: "Enter a quantity",
      inputType: "text",
    }),
  price: InvoiceItemsSchema.shape.price.optional().register(fieldRegistry, {
    id: "customer-relations-invoice-items-price-update",
    type: "field",
    label: "Price",
    description: "Enter a price",
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

  const { data } = useSuspenseQuery({
    queryKey: ["invoice-item", searchQuery.id],

    queryFn: async () => {
      return await pocketbase
        .collection(Collections.CustomerRelationsInvoiceItems)
        .getOne(searchQuery.id!);
    },
  });

  const form = useAppForm({
    ...FormOption,
    defaultValues: data as z.infer<typeof UpdateSchema>,
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
          {...toAutoFormFieldSet(UpdateSchema)}
        />
        <DialogFooter>
          <form.SubmitButton>Update Invoice Item</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateInvoiceItemsForm;
