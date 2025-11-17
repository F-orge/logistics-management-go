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
import { StockTransferSchema } from "@/pocketbase/schemas/warehouse-management/stock-transfer";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
  product: StockTransferSchema.shape.product
    .optional()
    .register(fieldRegistry, {
      id: "warehouse-management-stock-transfer-product-update",
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
  quantity: StockTransferSchema.shape.quantity
    .optional()
    .register(fieldRegistry, {
      id: "warehouse-management-stock-transfer-quantity-update",
      type: "field",
      label: "Quantity",
      description: "Enter a quantity",
      inputType: "text",
    }),
  status: StockTransferSchema.shape.status.optional().register(fieldRegistry, {
    id: "warehouse-management-stock-transfer-status-update",
    type: "field",
    label: "Status",
    description: "Enter a status",
    inputType: "select",
  }),
  sourceWarehouse: StockTransferSchema.shape.sourceWarehouse
    .optional()
    .register(fieldRegistry, {
      id: "warehouse-management-stock-transfer-sourceWarehouse-update",
      type: "field",
      label: "SourceWarehouse",
      description: "Enter a sourcewarehouse",
      inputType: "relation",
      props: {
        collectionName: Collections.WarehouseManagementWarehouses,
        displayField: "name",
        relationshipName: "sourceWarehouse",
      },
    }),
  destinationWarehouse: StockTransferSchema.shape.destinationWarehouse
    .optional()
    .register(fieldRegistry, {
      id: "warehouse-management-stock-transfer-destinationWarehouse-update",
      type: "field",
      label: "DestinationWarehouse",
      description: "Enter a destinationwarehouse",
      inputType: "relation",
      props: {
        collectionName: Collections.WarehouseManagementWarehouses,
        displayField: "name",
        relationshipName: "destinationWarehouse",
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
        .pocketbase!.collection(Collections.WarehouseManagementStockTransfer)
        .update(meta.id!, value);

      toast.success("Stock Transfer updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update stock-transfer: ${error.message} (${error.status})`
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
    queryKey: ["stockTransfer", searchQuery.id],

    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.WarehouseManagementStockTransfer)
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
          <form.SubmitButton>Update Stock Transfer</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateForm;
