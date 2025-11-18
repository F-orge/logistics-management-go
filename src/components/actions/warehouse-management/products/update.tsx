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
import { ProductsSchema } from "@/pocketbase/schemas/warehouse-management/products";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
  sku: ProductsSchema.shape.sku.optional().register(fieldRegistry, {
    id: "warehouse-management-products-sku-update",
    type: "field",
    label: "Sku",
    description: "Enter a sku",
    inputType: "text",
  }),
  name: ProductsSchema.shape.name.optional().register(fieldRegistry, {
    id: "warehouse-management-products-name-update",
    type: "field",
    label: "Name",
    description: "Enter a name",
    inputType: "text",
  }),
  description: ProductsSchema.shape.description.register(fieldRegistry, {
    id: "warehouse-management-products-description-update",
    type: "field",
    label: "Description",
    description: "Enter a description",
    inputType: "textarea",
  }),
  category: ProductsSchema.shape.category.register(fieldRegistry, {
    id: "warehouse-management-products-category-update",
    type: "field",
    label: "Category",
    description: "Enter a category",
    inputType: "text",
  }),
  price: ProductsSchema.shape.price.register(fieldRegistry, {
    id: "warehouse-management-products-price-update",
    type: "field",
    label: "Price",
    description: "Enter a price",
    inputType: "number",
  }),
  unit: ProductsSchema.shape.unit.register(fieldRegistry, {
    id: "warehouse-management-products-unit-update",
    type: "field",
    label: "Unit",
    description: "Enter an unit",
    inputType: "text",
  }),
  weight: ProductsSchema.shape.weight.register(fieldRegistry, {
    id: "warehouse-management-products-weight-update",
    type: "field",
    label: "Weight",
    description: "Enter a weight",
    inputType: "number",
  }),
  length: ProductsSchema.shape.length.register(fieldRegistry, {
    id: "warehouse-management-products-length-update",
    type: "field",
    label: "Length",
    description: "Enter a length",
    inputType: "number",
  }),
  width: ProductsSchema.shape.width.register(fieldRegistry, {
    id: "warehouse-management-products-width-update",
    type: "field",
    label: "Width",
    description: "Enter a width",
    inputType: "number",
  }),
  height: ProductsSchema.shape.height.register(fieldRegistry, {
    id: "warehouse-management-products-height-update",
    type: "field",
    label: "Height",
    description: "Enter a height",
    inputType: "number",
  }),
  status: ProductsSchema.shape.status.register(fieldRegistry, {
    id: "warehouse-management-products-status-update",
    type: "field",
    label: "Status",
    description: "Enter a status",
    inputType: "select",
  }),
  supplier: ProductsSchema.shape.supplier.register(fieldRegistry, {
    id: "warehouse-management-products-supplier-update",
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
    id: "warehouse-management-products-client-update",
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
        .pocketbase!.collection(Collections.WarehouseManagementProducts)
        .update(meta.id!, value);

      toast.success("Products updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update products: ${error.message} (${error.status})`
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
    queryKey: ["products", searchQuery.id],

    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.WarehouseManagementProducts)
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
          <form.SubmitButton>Update Products</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateForm;
