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
import { InvoiceItemsSchema } from "@/pocketbase/schemas/customer-relations/invoice-items";

const CreateInvoiceItemsFormSchema = z.object({
  invoice: InvoiceItemsSchema.shape.invoice.register(fieldRegistry, {
    id: "crm-invoice-items-invoice-create",
    type: "field",
    label: "Invoice",
    description: "Select the invoice",
    inputType: "text",
  }),
  product: InvoiceItemsSchema.shape.product.register(fieldRegistry, {
    id: "crm-invoice-items-product-create",
    type: "field",
    label: "Product",
    description: "Select the product",
    inputType: "text",
  }),
  quantity: InvoiceItemsSchema.shape.quantity.register(fieldRegistry, {
    id: "crm-invoice-items-quantity-create",
    type: "field",
    label: "Quantity",
    description: "Enter the quantity",
    inputType: "number",
  }),
  price: InvoiceItemsSchema.shape.price.register(fieldRegistry, {
    id: "crm-invoice-items-price-create",
    type: "field",
    label: "Price",
    description: "Enter the price",
    inputType: "number",
  }),
});

const UpdateInvoiceItemsFormSchema = z.object({
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

export const InvoiceItemsActions = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data } = useQuery({
    queryKey: ["invoice-itemss", searchQuery.id],
    enabled:
      !!searchQuery.id &&
      (searchQuery.action === "update" || searchQuery.action === "delete"),
    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.CustomerRelationsInvoiceItems)
        .getOne(searchQuery.id!);
      return record;
    },
  });

  if (searchQuery.action === "create") {
    return (
      <AutoForm<typeof CreateInvoiceItemsFormSchema>
        title="Create InvoiceItems"
        description="Fill in the details to create a new invoice-items."
        open={searchQuery.action === "create"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.CustomerRelationsInvoiceItems)
              .create(data);
            toast.success("InvoiceItems created successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to create invoice-items: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={CreateInvoiceItemsFormSchema}
      />
    );
  }

  if (searchQuery.action === "update" && data) {
    return (
      <AutoForm<typeof UpdateInvoiceItemsFormSchema>
        title="Update InvoiceItems"
        description="Update the invoice-items details."
        open={searchQuery.action === "update"}
        onOpenChange={() =>
          navigate({
            search: (prev) => ({ ...prev, action: undefined, id: undefined }),
          })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.CustomerRelationsInvoiceItems)
              .update(searchQuery.id!, data);
            toast.success("InvoiceItems updated successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to update invoice-items: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={UpdateInvoiceItemsFormSchema}
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
            <AlertDialogTitle>Delete InvoiceItems</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this invoice-items? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await pocketbase
                    .collection(Collections.CustomerRelationsInvoiceItems)
                    .delete(searchQuery.id!);
                  toast.success("InvoiceItems deleted successfully!");
                } catch (error) {
                  if (error instanceof ClientResponseError) {
                    toast.error(
                      `Failed to delete invoice-items: ${error.message} (${error.status})`
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

export default InvoiceItemsActions;
