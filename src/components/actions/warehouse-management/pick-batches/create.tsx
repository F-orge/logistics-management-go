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
import { PickBatchItemsSchema } from "@/pocketbase/schemas/warehouse-management";
import { PickBatchesSchema } from "@/pocketbase/schemas/warehouse-management/pick-batches";

const CreateItemSchema = z
  .object({
    salesOrder: PickBatchItemsSchema.shape.salesOrder.register(fieldRegistry, {
      id: "warehouse-management-pick-batch-items-salesOrder-subitem-create",
      type: "field",
      label: "SalesOrder",
      description: "Enter a salesorder",
      inputType: "relation",
      props: {
        collectionName: Collections.WarehouseManagementSalesOrders,
        displayField: "orderNumber",
        relationshipName: "salesOrder",
      },
    }),
    orderPriority: PickBatchItemsSchema.shape.orderPriority.register(
      fieldRegistry,
      {
        id: "warehouse-management-pick-batch-items-orderPriority-subitem-create",
        type: "field",
        label: "OrderPriority",
        description: "Enter an orderpriority",
        inputType: "number",
      }
    ),
    estimatedPickTime: PickBatchItemsSchema.shape.estimatedPickTime.register(
      fieldRegistry,
      {
        id: "warehouse-management-pick-batch-items-estimatedPickTime-subitem-create",
        type: "field",
        label: "EstimatedPickTime",
        description: "Enter an estimatedpicktime",
        inputType: "date",
        props: {
          showTime: true,
        },
      }
    ),
  })
  .register(fieldSetRegistry, {
    legend: "Pick Batch Item",
    description: "Create a new pick batch item",
  });

export const CreateSchema = z.object({
  batchNumber: PickBatchesSchema.shape.batchNumber.register(fieldRegistry, {
    id: "warehouse-management-pick-batches-batchNumber-create",
    type: "field",
    label: "BatchNumber",
    description: "Enter a batchnumber",
    inputType: "text",
  }),
  warehouse: PickBatchesSchema.shape.warehouse.register(fieldRegistry, {
    id: "warehouse-management-pick-batches-warehouse-create",
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
  status: PickBatchesSchema.shape.status.register(fieldRegistry, {
    id: "warehouse-management-pick-batches-status-create",
    type: "field",
    label: "Status",
    description: "Enter a status",
    inputType: "select",
  }),
  strategy: PickBatchesSchema.shape.strategy.register(fieldRegistry, {
    id: "warehouse-management-pick-batches-strategy-create",
    type: "field",
    label: "Strategy",
    description: "Enter a strategy",
    inputType: "select",
  }),
  priority: PickBatchesSchema.shape.priority.register(fieldRegistry, {
    id: "warehouse-management-pick-batches-priority-create",
    type: "field",
    label: "Priority",
    description: "Enter a priority",
    inputType: "number",
  }),
  assignedUser: PickBatchesSchema.shape.assignedUser.register(fieldRegistry, {
    id: "warehouse-management-pick-batches-assignedUser-create",
    type: "field",
    label: "AssignedUser",
    description: "Enter an assigneduser",
    inputType: "relation",
    props: {
      collectionName: Collections.Users,
      displayField: "email",
      relationshipName: "assignedUser",
    },
  }),
  estimatedDuration: PickBatchesSchema.shape.estimatedDuration.register(
    fieldRegistry,
    {
      id: "warehouse-management-pick-batches-estimatedDuration-create",
      type: "field",
      label: "EstimatedDuration",
      description: "Enter an estimatedduration",
      inputType: "number",
    }
  ),
  totalItems: PickBatchesSchema.shape.totalItems.register(fieldRegistry, {
    id: "warehouse-management-pick-batches-totalItems-create",
    type: "field",
    label: "TotalItems",
    description: "Enter a totalitems",
    inputType: "number",
  }),
  completedItems: PickBatchesSchema.shape.completedItems.register(
    fieldRegistry,
    {
      id: "warehouse-management-pick-batches-completedItems-create",
      type: "field",
      label: "CompletedItems",
      description: "Enter a completeditems",
      inputType: "number",
    }
  ),
  startedAt: PickBatchesSchema.shape.startedAt.register(fieldRegistry, {
    id: "warehouse-management-pick-batches-startedAt-create",
    type: "field",
    label: "StartedAt",
    description: "Enter a startedat",
    inputType: "date",
    props: {
      showTime: true,
    },
  }),
  completedAt: PickBatchesSchema.shape.completedAt.register(fieldRegistry, {
    id: "warehouse-management-pick-batches-completedAt-create",
    type: "field",
    label: "CompletedAt",
    description: "Enter a completedat",
    inputType: "date",
    props: {
      showTime: true,
    },
  }),
  items: CreateItemSchema.array(),
});

const FormOption = formOptions({
  defaultValues: {
    status: "open",
  } as z.infer<typeof CreateSchema>,
  validators: {
    onSubmit: CreateSchema,
  },
  onSubmitMeta: {} as {
    pocketbase: TypedPocketBase;
    navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  },
  onSubmit: async ({ value, meta }) => {
    let pickBatchId: string | null = null;

    try {
      const { items, ...pickBatchData } = value;

      const createdPickBatch = await meta.pocketbase
        .collection(Collections.WarehouseManagementPickBatches)
        .create(pickBatchData);

      pickBatchId = createdPickBatch.id;

      const batch = meta.pocketbase.createBatch();

      for (const item of items) {
        batch.collection(Collections.WarehouseManagementPickBatchItems).create({
          ...item,
          pickBatch: pickBatchId,
        });
      }

      await batch.send();

      toast.success("Pick Batches created successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        if (pickBatchId) {
          // Rollback pick batch creation
          try {
            await meta.pocketbase
              .collection(Collections.WarehouseManagementPickBatches)
              .delete(pickBatchId);
          } catch (deleteError) {
            console.error("Failed to rollback pick batch:", deleteError);
          }
        }

        toast.error(
          `Failed to create pick-batches: ${error.message} (${error.status})`
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
          <form.SubmitButton>Create Pick Batches</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default CreateForm;
