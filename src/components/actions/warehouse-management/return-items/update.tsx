import { formOptions } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
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
import { ReturnItemsSchema } from "@/pocketbase/schemas/warehouse-management/return-items";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
  return: ReturnItemsSchema.shape.return.optional().register(fieldRegistry, {
    id: "warehouse-management-return-items-return-update",
    type: "field",
    label: "Return",
    description: "Enter a return",
    inputType: "text",
  }),
  product: ReturnItemsSchema.shape.product.optional().register(fieldRegistry, {
    id: "warehouse-management-return-items-product-update",
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
  quantityExpected: ReturnItemsSchema.shape.quantityExpected
    .optional()
    .register(fieldRegistry, {
      id: "warehouse-management-return-items-quantityExpected-update",
      type: "field",
      label: "QuantityExpected",
      description: "Enter a quantityexpected",
      inputType: "number",
    }),
  quantityRecevied: ReturnItemsSchema.shape.quantityRecevied
    .optional()
    .register(fieldRegistry, {
      id: "warehouse-management-return-items-quantityRecevied-update",
      type: "field",
      label: "QuantityRecevied",
      description: "Enter a quantityrecevied",
      inputType: "number",
    }),
  condition: ReturnItemsSchema.shape.condition
    .optional()
    .register(fieldRegistry, {
      id: "warehouse-management-return-items-condition-update",
      type: "field",
      label: "Condition",
      description: "Enter a condition",
      inputType: "text",
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
        .pocketbase!.collection(Collections.WarehouseManagementReturnItems)
        .update(meta.id!, value);

      toast.success("Return Items updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update return-items: ${error.message} (${error.status})`
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

  const { data } = useQuery({
    queryKey: ["returnItems", searchQuery.id],
    enabled: !!searchQuery.id,
    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.WarehouseManagementReturnItems)
        .getOne(searchQuery.id!);
      return record;
    },
  });

  const form = useAppForm({
    ...FormOption,
    defaultValues: data || {},
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
          <form.SubmitButton>Update Return Items</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateForm;
