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
import { SurchargesSchema } from "@/pocketbase/schemas/billing-management/surcharges";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
  name: SurchargesSchema.shape.name.optional().register(fieldRegistry, {
    id: "billing-management-surcharges-name-update",
    type: "field",
    label: "Name",
    description: "Enter a name",
    inputType: "text",
  }),
  type: SurchargesSchema.shape.type.optional().register(fieldRegistry, {
    id: "billing-management-surcharges-type-update",
    type: "field",
    label: "Type",
    description: "Enter a type",
    inputType: "text",
  }),
  amount: SurchargesSchema.shape.amount.optional().register(fieldRegistry, {
    id: "billing-management-surcharges-amount-update",
    type: "field",
    label: "Amount",
    description: "Enter an amount",
    inputType: "number",
  }),
  calculationMethod: SurchargesSchema.shape.calculationMethod
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-surcharges-calculationMethod-update",
      type: "field",
      label: "CalculationMethod",
      description: "Enter a calculationmethod",
      inputType: "text",
    }),
  isActive: SurchargesSchema.shape.isActive.optional().register(fieldRegistry, {
    id: "billing-management-surcharges-isActive-update",
    type: "field",
    label: "IsActive",
    description: "Enter an isactive",
    inputType: "boolean",
  }),
  validFrom: SurchargesSchema.shape.validFrom
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-surcharges-validFrom-update",
      type: "field",
      label: "ValidFrom",
      description: "Enter a validfrom",
      inputType: "date",
    }),
  validTo: SurchargesSchema.shape.validTo.optional().register(fieldRegistry, {
    id: "billing-management-surcharges-validTo-update",
    type: "field",
    label: "ValidTo",
    description: "Enter a validto",
    inputType: "date",
  }),
  description: SurchargesSchema.shape.description
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-surcharges-description-update",
      type: "field",
      label: "Description",
      description: "Enter a description",
      inputType: "textarea",
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
        .pocketbase!.collection(Collections.BillingManagementSurcharges)
        .update(meta.id!, value);

      toast.success("Surcharges updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update surcharges: ${error.message} (${error.status})`
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
    queryKey: ["surcharges", searchQuery.id],
    enabled: !!searchQuery.id,
    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.BillingManagementSurcharges)
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
          <form.SubmitButton>Update Surcharges</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateForm;
