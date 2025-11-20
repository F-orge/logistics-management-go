import { formOptions } from "@tanstack/react-form";
import {
  UseNavigateResult,
  useNavigate,
  useRouteContext,
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
import { ProductsSchema } from "@/pocketbase/schemas/customer-relations/products";

export const CreateSchema = z.object({
  name: ProductsSchema.shape.name.register(fieldRegistry, {
    id: "customer-relations-products-name-create",
    type: "field",
    label: "Name",
    description: "Product name is required",
    inputType: "text",
  }),
  sku: ProductsSchema.shape.sku.register(fieldRegistry, {
    id: "customer-relations-products-sku-create",
    type: "field",
    label: "Sku",
    description: "SKU is required",
    inputType: "text",
  }),
  price: ProductsSchema.shape.price.register(fieldRegistry, {
    id: "customer-relations-products-price-create",
    type: "field",
    label: "Price",
    description: "Enter a price",
    inputType: "number",
  }),
  type: ProductsSchema.shape.type.register(fieldRegistry, {
    id: "customer-relations-products-type-create",
    type: "field",
    label: "Type",
    description: "Enter a type",
    inputType: "select",
  }),
  description: ProductsSchema.shape.description.register(fieldRegistry, {
    id: "customer-relations-products-description-create",
    type: "field",
    label: "Description",
    description: "Enter a description",
    inputType: "textarea",
  }),
  attachments: ProductsSchema.shape.attachments.register(fieldRegistry, {
    id: "customer-relations-products-attachments-create",
    type: "field",
    label: "Attachments",
    description: "Upload attachments",
    inputType: "file",
    isArray: true,
  }),
});

const FormOption = formOptions({
  defaultValues: {} as z.infer<typeof CreateSchema>,
  validators: {
    onSubmit: CreateSchema,
  },
  onSubmitMeta: {} as {
    pocketbase: TypedPocketBase;
    navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  },
  onSubmit: async ({ value, meta }) => {
    try {
      await meta
        .pocketbase!.collection(Collections.CustomerRelationsProducts)
        .create(value);

      toast.success("Product created successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to create product: ${error.message} (${error.status})`
        );
      }
    } finally {
      meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
    }
  },
});

const CreateProductsForm = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const form = useAppForm(FormOption);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit({ navigate, pocketbase });
      }}
    >
      <form.AppForm>
        <AutoFieldSet
          form={form as any}
          {...toAutoFormFieldSet(CreateSchema)}
        />
        <DialogFooter>
          <form.SubmitButton>Create Product</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default CreateProductsForm;
