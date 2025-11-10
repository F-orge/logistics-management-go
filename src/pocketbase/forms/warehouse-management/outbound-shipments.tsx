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
  WarehouseManagementSalesOrdersResponse,
  WarehouseManagementWarehousesResponse,
  TransportManagementCarriersResponse,
  WarehouseManagementOutboundShipmentItemsResponse,
  WarehouseManagementOutboundShipmentsRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { WarehouseManagementOutboundShipmentsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = WarehouseManagementOutboundShipmentsSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.WarehouseManagementOutboundShipments>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.WarehouseManagementOutboundShipments)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `OutboundShipments created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: WarehouseManagementOutboundShipmentsRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.WarehouseManagementOutboundShipments>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.WarehouseManagementOutboundShipments)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "OutboundShipments updated successfully",
        })
        .unwrap();
    },
  });

export const OutboundShipmentsForm = withForm({
  defaultValues: {} as Create<Collections.WarehouseManagementOutboundShipments> | Update<Collections.WarehouseManagementOutboundShipments>,
  render: ({ form }) => {
    const { pocketbase } = useRouteContext({
      from: "/dashboard/$schema/$collection",
    });

    return (
      <form.AppForm>
        <FieldSet>
          {/* Order */}
          <FieldGroup>
            <FieldLegend>Order</FieldLegend>
            <FieldDescription>
              Manage order information
            </FieldDescription>

            <form.AppField name="salesOrder">
              {(field) => (
                <field.RelationField<WarehouseManagementSalesOrdersResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.WarehouseManagementSalesOrders}
                  relationshipName="salesOrder"
                  label="Sales Order"
                  description="Associated sales order"
                  displayField="orderNumber"
                  recordListOption={{  }}
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Warehouse */}
          <FieldGroup>
            <FieldLegend>Warehouse</FieldLegend>
            <FieldDescription>
              Manage warehouse information
            </FieldDescription>

            <form.AppField name="warehouse">
              {(field) => (
                <field.RelationField<WarehouseManagementWarehousesResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.WarehouseManagementWarehouses}
                  relationshipName="warehouse"
                  label="Warehouse"
                  description="Source warehouse"
                  displayField="name"
                  recordListOption={{  }}
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Shipping */}
          <FieldGroup>
            <FieldLegend>Shipping</FieldLegend>
            <FieldDescription>
              Manage shipping information
            </FieldDescription>

            <form.AppField name="carrier">
              {(field) => (
                <field.RelationField<TransportManagementCarriersResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.TransportManagementCarriers}
                  relationshipName="carrier"
                  label="Carrier"
                  description="Shipping carrier"
                  displayField="name"
                  recordListOption={{  }}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Tracking */}
          <FieldGroup>
            <FieldLegend>Tracking</FieldLegend>
            <FieldDescription>
              Manage tracking information
            </FieldDescription>

            <form.AppField name="trackingNumber">
              {(field) => (
                <field.TextField
                  label="Tracking Number"
                  description="Carrier tracking number"
                  placeholder=""
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Status */}
          <FieldGroup>
            <FieldLegend>Status</FieldLegend>
            <FieldDescription>
              Manage status information
            </FieldDescription>

            <form.AppField name="status">
              {(field) => (
                <field.SelectField
                  label="Status"
                  description="Current status"
                  options={[
                    { label: "Picking", value: "picking" },
                    { label: "Packed", value: "packed" },
                    { label: "Shipped", value: "shipped" },
                    { label: "Delivered", value: "delivered" },
                    { label: "Cancelled", value: "cancelled" }
                  ]}
                  placeholder="Select..."
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Items */}
          <FieldGroup>
            <FieldLegend>Items</FieldLegend>
            <FieldDescription>
              Manage items information
            </FieldDescription>

            <form.AppField name="items">
              {(field) => (
                <field.RelationField<WarehouseManagementOutboundShipmentItemsResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.WarehouseManagementOutboundShipmentItems}
                  relationshipName="items"
                  label="Items"
                  description="Shipment items"
                  displayField="id"
                  recordListOption={{  }}
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
        <OutboundShipmentsForm form={form as any} />
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
    queryKey: ["outboundshipments", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.WarehouseManagementOutboundShipments)
        .getOne<WarehouseManagementOutboundShipmentsRecord>(searchQuery.id!),
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
        <OutboundShipmentsForm form={form as any} />
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
