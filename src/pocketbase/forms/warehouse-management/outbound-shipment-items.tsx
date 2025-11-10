import { formOptions } from "@tanstack/react-form";
import { useNavigate, useRouteContext, useSearch } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";
import {
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { useAppForm, withForm } from "@/components/ui/forms";
import FormDialog from "@/components/ui/forms/utils/dialog";
import {
  Collections,
  Create,
  WarehouseManagementOutboundShipmentsResponse,
  WarehouseManagementSalesOrderItemsResponse,
  WarehouseManagementProductsResponse,
  WarehouseManagementInventoryBatchesResponse,
  WarehouseManagementOutboundShipmentItemsRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { WarehouseManagementOutboundShipmentItemsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = WarehouseManagementOutboundShipmentItemsSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.WarehouseManagementOutboundShipmentItems>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.WarehouseManagementOutboundShipmentItems)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `OutboundShipmentItems created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: WarehouseManagementOutboundShipmentItemsRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.WarehouseManagementOutboundShipmentItems>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.WarehouseManagementOutboundShipmentItems)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "OutboundShipmentItems updated successfully",
        })
        .unwrap();
    },
  });

export const OutboundShipmentItemsForm = withForm({
  defaultValues: {} as Create<Collections.WarehouseManagementOutboundShipmentItems> | Update<Collections.WarehouseManagementOutboundShipmentItems>,
  render: ({ form }) => {
    const { pocketbase } = useRouteContext({
      from: "/dashboard/$schema/$collection",
    });

    return (
      <form.AppForm>
        <FieldSet>
          {/* Shipment */}
          <FieldGroup>
            <FieldLegend>Shipment</FieldLegend>
            <FieldDescription>
              Manage shipment information
            </FieldDescription>

            <form.AppField name="outboundShipment">
              {(field) => (
                <field.RelationField<WarehouseManagementOutboundShipmentsResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.WarehouseManagementOutboundShipments}
                  relationshipName="outboundShipment"
                  label="Outbound Shipment"
                  description="Parent outbound shipment"
                  displayField="id"
                  recordListOption={{  }}
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Order */}
          <FieldGroup>
            <FieldLegend>Order</FieldLegend>
            <FieldDescription>
              Manage order information
            </FieldDescription>

            <form.AppField name="salesOrderItem">
              {(field) => (
                <field.RelationField<WarehouseManagementSalesOrderItemsResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.WarehouseManagementSalesOrderItems}
                  relationshipName="salesOrderItem"
                  label="Sales Order Item"
                  description="Associated sales order item"
                  displayField="id"
                  recordListOption={{  }}
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Product */}
          <FieldGroup>
            <FieldLegend>Product</FieldLegend>
            <FieldDescription>
              Manage product information
            </FieldDescription>

            <form.AppField name="product">
              {(field) => (
                <field.RelationField<WarehouseManagementProductsResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.WarehouseManagementProducts}
                  relationshipName="product"
                  label="Product"
                  description="Product shipped"
                  displayField="name"
                  recordListOption={{  }}
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Batch */}
          <FieldGroup>
            <FieldLegend>Batch</FieldLegend>
            <FieldDescription>
              Manage batch information
            </FieldDescription>

            <form.AppField name="batch">
              {(field) => (
                <field.RelationField<WarehouseManagementInventoryBatchesResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.WarehouseManagementInventoryBatches}
                  relationshipName="batch"
                  label="Batch"
                  description="Inventory batch"
                  displayField="batchNumber"
                  recordListOption={{  }}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Quantity */}
          <FieldGroup>
            <FieldLegend>Quantity</FieldLegend>
            <FieldDescription>
              Manage quantity information
            </FieldDescription>

            <form.AppField name="quantityShipped">
              {(field) => (
                <field.NumberField
                  label="Quantity Shipped"
                  description="Quantity shipped"
                  placeholder="0"
                  min={0}
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>
        </FieldSet>
      </form.AppForm>
    );
  },
});

const CreateForm = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const form = useAppForm(CreateFormOptionFactory(pocketbase));

  return (
    <form.AppForm>
      <FormDialog
        open={searchQuery.action === "create"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        onClear={(e) => {
          e.preventDefault();
          form.reset();
        }}
      >
        <OutboundShipmentItemsForm form={form as any} />
      </FormDialog>
    </form.AppForm>
  );
};

const UpdateForm = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data: record } = useSuspenseQuery({
    queryKey: ["outboundshipmentitems", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.WarehouseManagementOutboundShipmentItems)
        .getOne<WarehouseManagementOutboundShipmentItemsRecord>(searchQuery.id!),
  });

  const form = useAppForm(UpdateFormOptionFactory(pocketbase, record));

  return (
    <form.AppForm>
      <FormDialog
        open={searchQuery.action === "update"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        onClear={(e) => {
          e.preventDefault();
          form.reset();
        }}
      >
        <OutboundShipmentItemsForm form={form as any} />
      </FormDialog>
    </form.AppForm>
  );
};

export default () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  switch (searchQuery.action) {
    case "create":
      return <CreateForm />;
    case "update":
      return <UpdateForm />;
    default:
      return null;
  }
};
