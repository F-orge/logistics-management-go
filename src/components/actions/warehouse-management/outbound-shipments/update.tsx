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
import { OutboundShipmentsSchema } from "@/pocketbase/schemas/warehouse-management/outbound-shipments";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
  salesOrder: OutboundShipmentsSchema.shape.salesOrder
    .optional()
    .register(fieldRegistry, {
      id: "warehouse-management-outbound-shipments-salesOrder-update",
      type: "field",
      label: "SalesOrder",
      description: "Enter a salesorder",
      inputType: "text",
    }),
  status: OutboundShipmentsSchema.shape.status
    .optional()
    .register(fieldRegistry, {
      id: "warehouse-management-outbound-shipments-status-update",
      type: "field",
      label: "Status",
      description: "Enter a status",
      inputType: "text",
    }),
  trackingNumber: OutboundShipmentsSchema.shape.trackingNumber
    .optional()
    .register(fieldRegistry, {
      id: "warehouse-management-outbound-shipments-trackingNumber-update",
      type: "field",
      label: "TrackingNumber",
      description: "Enter a trackingnumber",
      inputType: "text",
    }),
  carrier: OutboundShipmentsSchema.shape.carrier
    .optional()
    .register(fieldRegistry, {
      id: "warehouse-management-outbound-shipments-carrier-update",
      type: "field",
      label: "Carrier",
      description: "Enter a carrier",
      inputType: "relation",
      props: {
        collectionName: Collections.TransportManagementCarriers,
        displayField: "name",
        relationshipName: "carrier",
      },
    }),
  items: OutboundShipmentsSchema.shape.items
    .optional()
    .register(fieldRegistry, {
      id: "warehouse-management-outbound-shipments-items-update",
      type: "field",
      label: "Items",
      description: "Enter an items",
      inputType: "text",
    }),
  warehouse: OutboundShipmentsSchema.shape.warehouse
    .optional()
    .register(fieldRegistry, {
      id: "warehouse-management-outbound-shipments-warehouse-update",
      type: "field",
      label: "Warehouse",
      description: "Enter a warehouse",
      inputType: "relation",
      props: {
        collectionName: Collections.WarehouseManagementWarehouses,
        displayField: "name",
        relationshipName: "warehouse",
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
        .pocketbase!.collection(
          Collections.WarehouseManagementOutboundShipments
        )
        .update(meta.id!, value);

      toast.success("Outbound Shipments updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update outbound-shipments: ${error.message} (${error.status})`
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
    queryKey: ["outboundShipments", searchQuery.id],

    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.WarehouseManagementOutboundShipments)
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
          <form.SubmitButton>Update Outbound Shipments</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateForm;
