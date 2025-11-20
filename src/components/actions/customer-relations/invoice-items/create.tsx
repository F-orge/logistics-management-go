import { formOptions } from "@tanstack/react-form";
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

export const CreateSchema = z.object({
  product: InvoiceItemsSchema.shape.product.register(fieldRegistry, {
    id: "customer-relations-invoice-items-product-create",
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
  quantity: InvoiceItemsSchema.shape.quantity.register(fieldRegistry, {
    id: "customer-relations-invoice-items-quantity-create",
    type: "field",
    label: "Quantity",
    description: "Enter a quantity",
    inputType: "text",
  }),
});

const FormOption = formOptions({
  defaultValues: {} as z.infer<typeof CreateSchema>,
  validators: {
    onSubmit: CreateSchema,
  },
  onSubmitMeta: {} as {
    invoice: string;
    pocketbase: TypedPocketBase;
    navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  },
  onSubmit: async ({ value, meta }) => {
    try {
      const product = await meta.pocketbase
        .collection(Collections.CustomerRelationsProducts)
        .getOne(value.product as string);

      await meta
        .pocketbase!.collection(Collections.CustomerRelationsInvoiceItems)
        .create({
          ...value,
          invoice: meta.invoice,
          price: product.price * value.quantity,
        });

      toast.success("Invoice item created successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to create invoice item: ${error.message} (${error.status})`
        );
      }
    } finally {
      meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
    }
  },
});

const CreateInvoiceItemsForm = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const form = useAppForm(FormOption);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit({ navigate, pocketbase, invoice: searchQuery.id! });
      }}
    >
      <form.AppForm>
        <AutoFieldSet
          form={form as any}
          {...toAutoFormFieldSet(CreateSchema)}
        />
        <DialogFooter>
          <form.SubmitButton>Create Invoice Item</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default CreateInvoiceItemsForm;
