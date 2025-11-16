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
import {
  fieldRegistry,
  fieldSetRegistry,
} from "@/components/ui/autoform-tanstack/types";
import { Collections } from "@/lib/pb.types";
import { InvoiceItemsSchema } from "@/pocketbase/schemas/customer-relations";
import { InvoicesSchema } from "@/pocketbase/schemas/customer-relations/invoices";

const CreateInvoiceItemsFormSchema = z
  .object({
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
  })
  .register(fieldSetRegistry, {
    legend: "Invoice Item",
    description: "Add details for each invoice item",
  });

const CreateInvoicesFormSchema = z.object({
  invoiceNumber: InvoicesSchema.shape.invoiceNumber.register(fieldRegistry, {
    id: "crm-invoices-invoiceNumber-create",
    type: "field",
    label: "Invoice Number",
    description: "Enter the invoice number",
    inputType: "text",
  }),
  opportunity: InvoicesSchema.shape.opportunity.register(fieldRegistry, {
    id: "crm-invoices-opportunity-create",
    type: "field",
    label: "Opportunity",
    description: "Select the opportunity (optional)",
    inputType: "text",
  }),
  status: InvoicesSchema.shape.status.register(fieldRegistry, {
    id: "crm-invoices-status-create",
    type: "field",
    label: "Status",
    description: "Select the status (optional)",
    inputType: "select",
  }),
  total: InvoicesSchema.shape.total.register(fieldRegistry, {
    id: "crm-invoices-total-create",
    type: "field",
    label: "Total",
    description: "Enter the total (optional)",
    inputType: "number",
  }),
  issueDate: InvoicesSchema.shape.issueDate.register(fieldRegistry, {
    id: "crm-invoices-issueDate-create",
    type: "field",
    label: "Issue Date",
    description: "Select the issue date (optional)",
    inputType: "date",
  }),
  dueDate: InvoicesSchema.shape.dueDate.register(fieldRegistry, {
    id: "crm-invoices-dueDate-create",
    type: "field",
    label: "Due Date",
    description: "Select the due date (optional)",
    inputType: "date",
  }),
  sentAt: InvoicesSchema.shape.sentAt.register(fieldRegistry, {
    id: "crm-invoices-sentAt-create",
    type: "field",
    label: "Sent At",
    description: "Select when it was sent (optional)",
    inputType: "date",
  }),
  paidAt: InvoicesSchema.shape.paidAt.register(fieldRegistry, {
    id: "crm-invoices-paidAt-create",
    type: "field",
    label: "Paid At",
    description: "Select when it was paid (optional)",
    inputType: "date",
  }),
  paymentMethod: InvoicesSchema.shape.paymentMethod.register(fieldRegistry, {
    id: "crm-invoices-paymentMethod-create",
    type: "field",
    label: "Payment Method",
    description: "Select the payment method (optional)",
    inputType: "select",
  }),
  items: CreateInvoiceItemsFormSchema.array(),
  attachments: InvoicesSchema.shape.attachments.register(fieldRegistry, {
    id: "crm-invoices-attachments-create",
    type: "field",
    inputType: "file",
    label: "Attachments",
    description: "Upload attachments (optional)",
    isArray: true,
  }),
});

const UpdateInvoicesFormSchema = z.object({
  invoiceNumber: InvoicesSchema.shape.invoiceNumber
    .optional()
    .register(fieldRegistry, {
      id: "crm-invoices-invoiceNumber-update",
      type: "field",
      label: "Invoice Number",
      description: "Enter the invoice number",
      inputType: "text",
    }),
  opportunity: InvoicesSchema.shape.opportunity
    .optional()
    .register(fieldRegistry, {
      id: "crm-invoices-opportunity-update",
      type: "field",
      label: "Opportunity",
      description: "Select the opportunity (optional)",
      inputType: "text",
    }),
  status: InvoicesSchema.shape.status.optional().register(fieldRegistry, {
    id: "crm-invoices-status-update",
    type: "field",
    label: "Status",
    description: "Select the status (optional)",
    inputType: "select",
  }),
  total: InvoicesSchema.shape.total.optional().register(fieldRegistry, {
    id: "crm-invoices-total-update",
    type: "field",
    label: "Total",
    description: "Enter the total (optional)",
    inputType: "number",
  }),
  issueDate: InvoicesSchema.shape.issueDate.optional().register(fieldRegistry, {
    id: "crm-invoices-issueDate-update",
    type: "field",
    label: "Issue Date",
    description: "Select the issue date (optional)",
    inputType: "date",
  }),
  dueDate: InvoicesSchema.shape.dueDate.optional().register(fieldRegistry, {
    id: "crm-invoices-dueDate-update",
    type: "field",
    label: "Due Date",
    description: "Select the due date (optional)",
    inputType: "date",
  }),
  sentAt: InvoicesSchema.shape.sentAt.optional().register(fieldRegistry, {
    id: "crm-invoices-sentAt-update",
    type: "field",
    label: "Sent At",
    description: "Select when it was sent (optional)",
    inputType: "date",
  }),
  paidAt: InvoicesSchema.shape.paidAt.optional().register(fieldRegistry, {
    id: "crm-invoices-paidAt-update",
    type: "field",
    label: "Paid At",
    description: "Select when it was paid (optional)",
    inputType: "date",
  }),
  paymentMethod: InvoicesSchema.shape.paymentMethod
    .optional()
    .register(fieldRegistry, {
      id: "crm-invoices-paymentMethod-update",
      type: "field",
      label: "Payment Method",
      description: "Select the payment method (optional)",
      inputType: "select",
    }),
});

export const InvoicesActions = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data } = useQuery({
    queryKey: ["invoicess", searchQuery.id],
    enabled:
      !!searchQuery.id &&
      (searchQuery.action === "update" || searchQuery.action === "delete"),
    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.CustomerRelationsInvoices)
        .getOne(searchQuery.id!);
      return record;
    },
  });

  if (searchQuery.action === "create") {
    return (
      <AutoForm<typeof CreateInvoicesFormSchema>
        title="Create Invoices"
        description="Fill in the details to create a new invoices."
        open={searchQuery.action === "create"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.CustomerRelationsInvoices)
              .create(data);
            toast.success("Invoices created successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to create invoices: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={CreateInvoicesFormSchema}
      />
    );
  }

  if (searchQuery.action === "update" && data) {
    return (
      <AutoForm<typeof UpdateInvoicesFormSchema>
        title="Update Invoices"
        description="Update the invoices details."
        open={searchQuery.action === "update"}
        onOpenChange={() =>
          navigate({
            search: (prev) => ({ ...prev, action: undefined, id: undefined }),
          })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.CustomerRelationsInvoices)
              .update(searchQuery.id!, data);
            toast.success("Invoices updated successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to update invoices: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={UpdateInvoicesFormSchema}
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
            <AlertDialogTitle>Delete Invoices</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this invoices? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await pocketbase
                    .collection(Collections.CustomerRelationsInvoices)
                    .delete(searchQuery.id!);
                  toast.success("Invoices deleted successfully!");
                } catch (error) {
                  if (error instanceof ClientResponseError) {
                    toast.error(
                      `Failed to delete invoices: ${error.message} (${error.status})`
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

export default InvoicesActions;
