import { useQuery } from "@tanstack/react-query";
import {
  useNavigate,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AutoForm from "@/components/ui/autoform-tanstack/auto-form";
import { fieldRegistry } from "@/components/ui/autoform-tanstack/types";
import { Collections } from "@/lib/pb.types";
import { ProductsSchema } from "@/pocketbase/schemas/customer-relations/products";

const CreateProductsFormSchema = z.object({
  name: ProductsSchema.shape.name.register(fieldRegistry, {
    id: "crm-products-name-create",
    type: "field",
    label: "Product Name",
    description: "Enter the product name",
    inputType: "text",
  }),
  sku: ProductsSchema.shape.sku.register(fieldRegistry, {
    id: "crm-products-sku-create",
    type: "field",
    label: "SKU",
    description: "Enter the SKU",
    inputType: "text",
  }),
  price: ProductsSchema.shape.price.register(fieldRegistry, {
    id: "crm-products-price-create",
    type: "field",
    label: "Price",
    description: "Enter the price",
    inputType: "number",
  }),
  type: ProductsSchema.shape.type.register(fieldRegistry, {
    id: "crm-products-type-create",
    type: "field",
    label: "Type",
    description: "Select the product type",
    inputType: "select",
  }),
  description: ProductsSchema.shape.description.register(fieldRegistry, {
    id: "crm-products-description-create",
    type: "field",
    label: "Description",
    description: "Enter the description (optional)",
    inputType: "textarea",
  }),
  attachments: ProductsSchema.shape.attachments.register(fieldRegistry, {
    id: "crm-products-attachments-create",
    type: "field",
    inputType: "file",
    label: "Attachments",
    description: "Upload attachments (optional)",
    isArray: true,
  }),
});

const UpdateProductsFormSchema = z.object({
  name: ProductsSchema.shape.name.optional().register(fieldRegistry, {
    id: "crm-products-name-update",
    type: "field",
    label: "Product Name",
    description: "Enter the product name",
    inputType: "text",
  }),
  sku: ProductsSchema.shape.sku.optional().register(fieldRegistry, {
    id: "crm-products-sku-update",
    type: "field",
    label: "SKU",
    description: "Enter the SKU",
    inputType: "text",
  }),
  price: ProductsSchema.shape.price.optional().register(fieldRegistry, {
    id: "crm-products-price-update",
    type: "field",
    label: "Price",
    description: "Enter the price",
    inputType: "number",
  }),
  type: ProductsSchema.shape.type.optional().register(fieldRegistry, {
    id: "crm-products-type-update",
    type: "field",
    label: "Type",
    description: "Select the product type",
    inputType: "select",
  }),
  description: ProductsSchema.shape.description
    .optional()
    .register(fieldRegistry, {
      id: "crm-products-description-update",
      type: "field",
      label: "Description",
      description: "Enter the description (optional)",
      inputType: "textarea",
    }),
});

export const ProductsActions = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data } = useQuery({
    queryKey: ["productss", searchQuery.id],
    enabled:
      !!searchQuery.id &&
      (searchQuery.action === "update" || searchQuery.action === "delete"),
    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.CustomerRelationsProducts)
        .getOne(searchQuery.id!);
      return record;
    },
  });

  if (searchQuery.action === "create") {
    return (
      <AutoForm<typeof CreateProductsFormSchema>
        title="Create Products"
        description="Fill in the details to create a new products."
        open={searchQuery.action === "create"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.CustomerRelationsProducts)
              .create(data);
            toast.success("Products created successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to create products: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={CreateProductsFormSchema}
      />
    );
  }

  if (searchQuery.action === "update" && data) {
    return (
      <AutoForm<typeof UpdateProductsFormSchema>
        title="Update Products"
        description="Update the products details."
        open={searchQuery.action === "update"}
        onOpenChange={() =>
          navigate({
            search: (prev) => ({ ...prev, action: undefined, id: undefined }),
          })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.CustomerRelationsProducts)
              .update(searchQuery.id!, data);
            toast.success("Products updated successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to update products: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={UpdateProductsFormSchema}
        defaultValues={data as any}
      />
    );
  }

  if (searchQuery.action === "delete" && data) {
    return (
      <AlertDialog
        open={searchQuery.action === "delete"}
        onOpenChange={() =>
          navigate({
            search: (prev) => ({ ...prev, action: undefined, id: undefined }),
          })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Products</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this products? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await pocketbase
                    .collection(Collections.CustomerRelationsProducts)
                    .delete(searchQuery.id!);
                  toast.success("Products deleted successfully!");
                } catch (error) {
                  if (error instanceof ClientResponseError) {
                    toast.error(
                      `Failed to delete products: ${error.message} (${error.status})`
                    );
                  }
                } finally {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      action: undefined,
                      id: undefined,
                    }),
                  });
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
};

export default ProductsActions;
