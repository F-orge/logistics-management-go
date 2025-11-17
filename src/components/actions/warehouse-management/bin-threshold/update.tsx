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
import { BinThresholdSchema } from "@/pocketbase/schemas/warehouse-management/bin-threshold";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
  location: BinThresholdSchema.shape.location
    .optional()
    .register(fieldRegistry, {
      id: "warehouse-management-bin-threshold-location-update",
      type: "field",
      label: "Location",
      description: "Enter a location",
      inputType: "text",
    }),
  product: BinThresholdSchema.shape.product.optional().register(fieldRegistry, {
    id: "warehouse-management-bin-threshold-product-update",
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
  minQuantity: BinThresholdSchema.shape.minQuantity
    .optional()
    .register(fieldRegistry, {
      id: "warehouse-management-bin-threshold-minQuantity-update",
      type: "field",
      label: "MinQuantity",
      description: "Enter a minquantity",
      inputType: "number",
    }),
  maxQuantity: BinThresholdSchema.shape.maxQuantity
    .optional()
    .register(fieldRegistry, {
      id: "warehouse-management-bin-threshold-maxQuantity-update",
      type: "field",
      label: "MaxQuantity",
      description: "Enter a maxquantity",
      inputType: "number",
    }),
  reorderQuantity: BinThresholdSchema.shape.reorderQuantity
    .optional()
    .register(fieldRegistry, {
      id: "warehouse-management-bin-threshold-reorderQuantity-update",
      type: "field",
      label: "ReorderQuantity",
      description: "Enter a reorderquantity",
      inputType: "text",
    }),
  alertThreshold: BinThresholdSchema.shape.alertThreshold
    .optional()
    .register(fieldRegistry, {
      id: "warehouse-management-bin-threshold-alertThreshold-update",
      type: "field",
      label: "AlertThreshold",
      description: "Enter an alertthreshold",
      inputType: "text",
    }),
  isActive: BinThresholdSchema.shape.isActive
    .optional()
    .register(fieldRegistry, {
      id: "warehouse-management-bin-threshold-isActive-update",
      type: "field",
      label: "IsActive",
      description: "Enter an isactive",
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
        .pocketbase!.collection(Collections.WarehouseManagementBinThreshold)
        .update(meta.id!, value);

      toast.success("Bin Threshold updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update bin-threshold: ${error.message} (${error.status})`
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
    queryKey: ["binThreshold", searchQuery.id],

    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.WarehouseManagementBinThreshold)
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
          <form.SubmitButton>Update Bin Threshold</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateForm;
