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
  fieldSetRegistry,
  toAutoFormFieldSet,
} from "@/components/ui/autoform-tanstack/types";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import { Collections, TypedPocketBase } from "@/lib/pb.types";
import { SalesOrderItemsSchema } from "@/pocketbase/schemas/warehouse-management";
import { SalesOrdersSchema } from "@/pocketbase/schemas/warehouse-management/sales-orders";

const CreateItemSchema = z
  .object({
    product: SalesOrderItemsSchema.shape.product.register(fieldRegistry, {
      id: "warehouse-management-sales-order-items-product-subitem-create",
      type: "field",
      label: "Product",
      description: "Enter a product",
      inputType: "relation",
      props: {
        collectionName: Collections.WarehouseManagementProducts,
        displayField: "name",
        relationshipName: "product",
      },
    }),
    quantityOrdered: SalesOrderItemsSchema.shape.quantityOrdered.register(
      fieldRegistry,
      {
        id: "warehouse-management-sales-order-items-quantityOrdered-subitem-create",
        type: "field",
        label: "QuantityOrdered",
        description: "Enter a quantityordered",
        inputType: "number",
      }
    ),
  })
  .register(fieldSetRegistry, {
    legend: "Items",
    description: "Add items",
  });

export const CreateSchema = z.object({
  shippingAddress: SalesOrdersSchema.shape.shippingAddress.register(
    fieldRegistry,
    {
      id: "warehouse-management-sales-orders-shippingAddress-create",
      type: "field",
      label: "ShippingAddress",
      description: "Enter a shippingaddress",
      inputType: "textarea",
    }
  ),
  client: SalesOrdersSchema.shape.client.register(fieldRegistry, {
    id: "warehouse-management-sales-orders-client-create",
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
  opportunity: SalesOrdersSchema.shape.opportunity.register(fieldRegistry, {
    id: "warehouse-management-sales-orders-opportunity-create",
    type: "field",
    label: "Opportunity",
    description: "Enter an opportunity",
    inputType: "relation",
    props: {
      collectionName: Collections.CustomerRelationsOpportunities,
      displayField: "name",
      relationshipName: "opportunity",
    },
  }),
  status: SalesOrdersSchema.shape.status.register(fieldRegistry, {
    id: "warehouse-management-sales-orders-status-create",
    type: "field",
    label: "Status",
    description: "Enter a status",
    inputType: "select",
  }),
  orderNumber: SalesOrdersSchema.shape.orderNumber.register(fieldRegistry, {
    id: "warehouse-management-sales-orders-orderNumber-create",
    type: "field",
    label: "OrderNumber",
    description: "Enter an ordernumber",
    inputType: "text",
  }),
  items: CreateItemSchema.array(),
});

const FormOption = formOptions({
  defaultValues: {
    status: "pending",
  } as z.infer<typeof CreateSchema>,
  validators: {
    onSubmit: CreateSchema,
  },
  onSubmitMeta: {} as {
    pocketbase: TypedPocketBase;
    navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  },
  onSubmit: async ({ value, meta }) => {
    let salesOrderId: string | null = null;

    try {
      const { items, ...salesOrderData } = value;

      const createdSalesOrder = await meta.pocketbase
        .collection(Collections.WarehouseManagementSalesOrders)
        .create(salesOrderData);

      salesOrderId = createdSalesOrder.id;

      const batch = meta.pocketbase.createBatch();

      for (const item of items) {
        batch
          .collection(Collections.WarehouseManagementSalesOrderItems)
          .create({
            ...item,
            salesOrder: salesOrderId,
          });
      }

      await batch.send();

      toast.success("Sales Orders created successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        if (salesOrderId) {
          // Rollback sales order creation
          try {
            await meta.pocketbase
              .collection(Collections.WarehouseManagementSalesOrders)
              .delete(salesOrderId);
          } catch (rollbackError) {
            console.error(
              "Failed to rollback sales order creation:",
              rollbackError
            );
          }
        }

        toast.error(
          `Failed to create sales-orders: ${error.message} (${error.status})`
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
          <form.SubmitButton>Create Sales Orders</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default CreateForm;
