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
import { RateRulesSchema } from "@/pocketbase/schemas/billing-management/rate-rules";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
  rateCard: RateRulesSchema.shape.rateCard.optional().register(fieldRegistry, {
    id: "billing-management-rate-rules-rateCard-update",
    type: "field",
    label: "RateCard",
    description: "Enter a ratecard",
    inputType: "text",
  }),
  condition: RateRulesSchema.shape.condition
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-rate-rules-condition-update",
      type: "field",
      label: "Condition",
      description: "Enter a condition",
      inputType: "text",
    }),
  value: RateRulesSchema.shape.value.optional().register(fieldRegistry, {
    id: "billing-management-rate-rules-value-update",
    type: "field",
    label: "Value",
    description: "Enter a value",
    inputType: "text",
  }),
  price: RateRulesSchema.shape.price.optional().register(fieldRegistry, {
    id: "billing-management-rate-rules-price-update",
    type: "field",
    label: "Price",
    description: "Enter a price",
    inputType: "number",
  }),
  pricingModel: RateRulesSchema.shape.pricingModel
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-rate-rules-pricingModel-update",
      type: "field",
      label: "PricingModel",
      description: "Enter a pricingmodel",
      inputType: "select",
    }),
  minValue: RateRulesSchema.shape.minValue.optional().register(fieldRegistry, {
    id: "billing-management-rate-rules-minValue-update",
    type: "field",
    label: "MinValue",
    description: "Enter a minvalue",
    inputType: "number",
  }),
  maxValue: RateRulesSchema.shape.maxValue.optional().register(fieldRegistry, {
    id: "billing-management-rate-rules-maxValue-update",
    type: "field",
    label: "MaxValue",
    description: "Enter a maxvalue",
    inputType: "number",
  }),
  priority: RateRulesSchema.shape.priority.optional().register(fieldRegistry, {
    id: "billing-management-rate-rules-priority-update",
    type: "field",
    label: "Priority",
    description: "Enter a priority",
    inputType: "number",
  }),
  isActive: RateRulesSchema.shape.isActive.optional().register(fieldRegistry, {
    id: "billing-management-rate-rules-isActive-update",
    type: "field",
    label: "IsActive",
    description: "Enter an isactive",
    inputType: "boolean",
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
        .pocketbase!.collection(Collections.BillingManagementRateRules)
        .update(meta.id!, value);

      toast.success("Rate Rules updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update rate-rules: ${error.message} (${error.status})`
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
    queryKey: ["rateRules", searchQuery.id],

    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.BillingManagementRateRules)
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
          <form.SubmitButton>Update Rate Rules</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateForm;
