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
import { ProductsSchema } from "@/pocketbase/schemas/warehouse-management/products";

export const CreateSchema = z.object({
  sku: ProductsSchema.shape.sku.register(fieldRegistry, {
    id: "warehouse-management-products-sku-create",
    type: "field",
    label: "Sku",
    description: "Enter a sku",
    inputType: "text",
  }),
  name: ProductsSchema.shape.name.register(fieldRegistry, {
    id: "warehouse-management-products-name-create",
    type: "field",
    label: "Name",
    description: "Enter a name",
    inputType: "text",
  }),
  description: ProductsSchema.shape.description.register(fieldRegistry, {
    id: "warehouse-management-products-description-create",
    type: "field",
    label: "Description",
    description: "Enter a description",
    inputType: "textarea",
  }),
  costPrice: ProductsSchema.shape.price.register(fieldRegistry, {
    id: "warehouse-management-products-price-create",
    type: "field",
    label: "Price",
    description: "Enter a price",
    inputType: "number",
  }),
  weight: ProductsSchema.shape.weight.register(fieldRegistry, {
    id: "warehouse-management-products-weight-create",
    type: "field",
    label: "Weight",
    description: "Enter a weight",
    inputType: "number",
  }),
  length: ProductsSchema.shape.length.register(fieldRegistry, {
    id: "warehouse-management-products-length-create",
    type: "field",
    label: "Length",
    description: "Enter a length",
    inputType: "number",
  }),
  width: ProductsSchema.shape.width.register(fieldRegistry, {
    id: "warehouse-management-products-width-create",
    type: "field",
    label: "Width",
    description: "Enter a width",
    inputType: "number",
  }),
  height: ProductsSchema.shape.height.register(fieldRegistry, {
    id: "warehouse-management-products-height-create",
    type: "field",
    label: "Height",
    description: "Enter a height",
    inputType: "number",
  }),
  status: ProductsSchema.shape.status.register(fieldRegistry, {
    id: "warehouse-management-products-status-create",
    type: "field",
    label: "Status",
    description: "Enter a status",
    inputType: "select",
  }),
  supplier: ProductsSchema.shape.supplier.register(fieldRegistry, {
    id: "warehouse-management-products-supplier-create",
    type: "field",
    label: "Supplier",
    description: "Enter a supplier",
    inputType: "relation",
    props: {
      collectionName: Collections.WarehouseManagementSuppliers,
      displayField: "name",
      relationshipName: "supplier",
    },
  }),
  client: ProductsSchema.shape.client.register(fieldRegistry, {
    id: "warehouse-management-products-client-create",
    type: "field",
    label: "Client",
    description: "Enter a client",
    inputType: "relation",
    props: {
      collectionName: Collections.CustomerRelationsCompanies,
      displayField: "name",
      relationshipName: "client",
    },
  }),
  images: z.file().array().register(fieldRegistry, {
    id: "warehouse-management-products-images-create",
    type: "field",
    label: "Images",
    description: "Enter an images",
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
      await meta.pocketbase
        .collection(Collections.WarehouseManagementProducts)
        .create(value);
      toast.success("Products created successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to create products: ${error.message} (${error.status})`
        );
      }
    } finally {
      meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
    }
  },
});

const CreateForm = () => {
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
          <form.SubmitButton>Create Products</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default CreateForm;
