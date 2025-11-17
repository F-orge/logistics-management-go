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
import { SalesOrderItemsSchema } from "@/pocketbase/schemas/warehouse-management/sales-order-items";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
  salesOrder: SalesOrderItemsSchema.shape.salesOrder
    .optional()
    .register(fieldRegistry, {
      id: "warehouse-management-sales-order-items-salesOrder-update",
      type: "field",
      label: "SalesOrder",
      description: "Enter a salesorder",
      inputType: "text",
    }),
  product: SalesOrderItemsSchema.shape.product
    .optional()
    .register(fieldRegistry, {
      id: "warehouse-management-sales-order-items-product-update",
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
  quantityOrdered: SalesOrderItemsSchema.shape.quantityOrdered
    .optional()
    .register(fieldRegistry, {
      id: "warehouse-management-sales-order-items-quantityOrdered-update",
      type: "field",
      label: "QuantityOrdered",
      description: "Enter a quantityordered",
      inputType: "number",
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
        .pocketbase!.collection(Collections.WarehouseManagementSalesOrderItems)
        .update(meta.id!, value);

      toast.success("Sales Order Items updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update sales-order-items: ${error.message} (${error.status})`
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
    queryKey: ["salesOrderItems", searchQuery.id],

    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.WarehouseManagementSalesOrderItems)
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
          <form.SubmitButton>Update Sales Order Items</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateForm;
