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
import { InventoryStockSchema } from "@/pocketbase/schemas/warehouse-management/inventory-stock";

export const UpdateSchema = z.object({
  location: InventoryStockSchema.shape.location.register(fieldRegistry, {
    id: "warehouse-management-inventory-stock-location-update",
    type: "field",
    label: "Location",
    description: "Enter a location",
    inputType: "relation",
    props: {
      collectionName: Collections.WarehouseManagementLocations,
      displayField: "name",
      relationshipName: "location",
    },
  }),
  product: InventoryStockSchema.shape.product.register(fieldRegistry, {
    id: "warehouse-management-inventory-stock-product-update",
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
  batch: InventoryStockSchema.shape.batch.register(fieldRegistry, {
    id: "warehouse-management-inventory-stock-batch-update",
    type: "field",
    label: "Batch",
    description: "Enter a batch",
    inputType: "relation",
    props: {
      collectionName: Collections.WarehouseManagementInventoryBatches,
      displayField: "batchNumber",
      relationshipName: "batch",
    },
  }),
  quantity: InventoryStockSchema.shape.quantity.register(fieldRegistry, {
    id: "warehouse-management-inventory-stock-quantity-update",
    type: "field",
    label: "Quantity",
    description: "Enter a quantity",
    inputType: "number",
  }),
  reservedQuantity: InventoryStockSchema.shape.reservedQuantity.register(
    fieldRegistry,
    {
      id: "warehouse-management-inventory-stock-reservedQuantity-update",
      type: "field",
      label: "ReservedQuantity",
      description: "Enter a reservedquantity",
      inputType: "number",
    }
  ),
  status: InventoryStockSchema.shape.status.register(fieldRegistry, {
    id: "warehouse-management-inventory-stock-status-update",
    type: "field",
    label: "Status",
    description: "Enter a status",
    inputType: "select",
  }),
  lastCountedAt: InventoryStockSchema.shape.lastCountedAt.register(
    fieldRegistry,
    {
      id: "warehouse-management-inventory-stock-lastCountedAt-update",
      type: "field",
      label: "LastCountedAt",
      description: "Enter a lastcountedat",
      inputType: "date",
      props: {
        showTime: true,
      },
    }
  ),
  lastMovementAt: InventoryStockSchema.shape.lastMovementAt.register(
    fieldRegistry,
    {
      id: "warehouse-management-inventory-stock-lastMovementAt-update",
      type: "field",
      label: "LastMovementAt",
      description: "Enter a lastmovementat",
      inputType: "date",
      props: {
        showTime: true,
      },
    }
  ),
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
        .pocketbase!.collection(Collections.WarehouseManagementInventoryStock)
        .update(meta.id!, value);

      toast.success("Inventory Stock updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update inventory-stock: ${error.message} (${error.status})`
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
    queryKey: ["inventoryStock", searchQuery.id],

    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.WarehouseManagementInventoryStock)
        .getOne(searchQuery.id!);
      return record;
    },
  });

  const form = useAppForm({
    ...FormOption,
    defaultValues: {
      ...data,
      lastCountedAt: data.lastCountedAt
        ? new Date(data.lastCountedAt)
        : undefined,
      lastMovementAt: data.lastMovementAt
        ? new Date(data.lastMovementAt)
        : undefined,
    } as z.infer<typeof UpdateSchema>,
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
          <form.SubmitButton>Update Inventory Stock</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateForm;
