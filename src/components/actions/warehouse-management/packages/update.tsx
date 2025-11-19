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
import { PackagesSchema } from "@/pocketbase/schemas/warehouse-management/packages";

export const UpdateSchema = z.object({
  warehouse: PackagesSchema.shape.warehouse.optional().register(fieldRegistry, {
    id: "warehouse-management-packages-warehouse-update",
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
  type: PackagesSchema.shape.type.optional().register(fieldRegistry, {
    id: "warehouse-management-packages-type-update",
    type: "field",
    label: "Type",
    description: "Enter a type",
    inputType: "text",
  }),
  weight: PackagesSchema.shape.weight.optional().register(fieldRegistry, {
    id: "warehouse-management-packages-weight-update",
    type: "field",
    label: "Weight",
    description: "Enter a weight",
    inputType: "number",
  }),
  length: PackagesSchema.shape.length.optional().register(fieldRegistry, {
    id: "warehouse-management-packages-length-update",
    type: "field",
    label: "Length",
    description: "Enter a length",
    inputType: "number",
  }),
  width: PackagesSchema.shape.width.optional().register(fieldRegistry, {
    id: "warehouse-management-packages-width-update",
    type: "field",
    label: "Width",
    description: "Enter a width",
    inputType: "number",
  }),
  height: PackagesSchema.shape.height.optional().register(fieldRegistry, {
    id: "warehouse-management-packages-height-update",
    type: "field",
    label: "Height",
    description: "Enter a height",
    inputType: "number",
  }),
  packedAt: PackagesSchema.shape.packedAt.optional().register(fieldRegistry, {
    id: "warehouse-management-packages-packedAt-update",
    type: "field",
    label: "PackedAt",
    description: "Enter a packedat",
    inputType: "date",
  }),
  shippedAt: PackagesSchema.shape.shippedAt.optional().register(fieldRegistry, {
    id: "warehouse-management-packages-shippedAt-update",
    type: "field",
    label: "ShippedAt",
    description: "Enter a shippedat",
    inputType: "date",
  }),
  isFragile: PackagesSchema.shape.isFragile.optional().register(fieldRegistry, {
    id: "warehouse-management-packages-isFragile-update",
    type: "field",
    label: "IsFragile",
    description: "Enter an isfragile",
    inputType: "bool",
  }),
  isHazmat: PackagesSchema.shape.isHazmat.optional().register(fieldRegistry, {
    id: "warehouse-management-packages-isHazmat-update",
    type: "field",
    label: "IsHazmat",
    description: "Enter an ishazmat",
    inputType: "bool",
  }),
  requireSignature: PackagesSchema.shape.requireSignature
    .optional()
    .register(fieldRegistry, {
      id: "warehouse-management-packages-requireSignature-update",
      type: "field",
      label: "RequireSignature",
      description: "Enter a requiresignature",
      inputType: "bool",
    }),
  insuranceValue: PackagesSchema.shape.insuranceValue
    .optional()
    .register(fieldRegistry, {
      id: "warehouse-management-packages-insuranceValue-update",
      type: "field",
      label: "InsuranceValue",
      description: "Enter an insurancevalue",
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
        .pocketbase!.collection(Collections.WarehouseManagementPackages)
        .update(meta.id!, value);

      toast.success("Packages updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update packages: ${error.message} (${error.status})`
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
    queryKey: ["packages", searchQuery.id],

    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.WarehouseManagementPackages)
        .getOne(searchQuery.id!);
      return record;
    },
  });

  const form = useAppForm({
    ...FormOption,
    defaultValues: {
      ...data,
      packedAt: data.packedAt ? new Date(data.packedAt) : undefined,
      shippedAt: data.shippedAt ? new Date(data.shippedAt) : undefined,
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
          <form.SubmitButton>Update Packages</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateForm;
