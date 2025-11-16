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
import { OpportunityProductsSchema } from "@/pocketbase/schemas/customer-relations/opportunity-products";
import { CreateOpportunityProductsSchema } from "./create";

export const UpdateOpportunityProductsSchema = z.object({
  opportunity: OpportunityProductsSchema.shape.opportunity
    .optional()
    .register(fieldRegistry, {
      id: "crm-opportunity-products-opportunity-update",
      type: "field",
      label: "Opportunity",
      description: "Select the opportunity (optional)",
      inputType: "text",
    }),
  product: OpportunityProductsSchema.shape.product
    .optional()
    .register(fieldRegistry, {
      id: "crm-opportunity-products-product-update",
      type: "field",
      label: "Product",
      description: "Select the product (optional)",
      inputType: "text",
    }),
  quantity: OpportunityProductsSchema.shape.quantity
    .optional()
    .register(fieldRegistry, {
      id: "crm-opportunity-products-quantity-update",
      type: "field",
      label: "Quantity",
      description: "Enter the quantity",
      inputType: "number",
    }),
  priceSnapshot: OpportunityProductsSchema.shape.priceSnapshot
    .optional()
    .register(fieldRegistry, {
      id: "crm-opportunity-products-priceSnapshot-update",
      type: "field",
      label: "Price Snapshot",
      description: "Enter the price snapshot (optional)",
      inputType: "number",
    }),
});

const FormOption = formOptions({
  defaultValues: {} as z.infer<typeof UpdateOpportunityProductsSchema>,
  validators: {
    onSubmit: UpdateOpportunityProductsSchema,
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
          Collections.CustomerRelationsOpportunityProducts
        )
        .update(meta.id, value);

      toast.success("Opportunity product updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update opportunity product: ${error.message} (${error.status})`
        );
      }
    } finally {
      meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
    }
  },
});

const UpdateOpportunityProductsForm = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data } = useQuery({
    queryKey: ["opportunity-product", searchQuery.id],
    enabled: !!searchQuery.id,
    queryFn: async () => {
      return await pocketbase
        .collection(Collections.CustomerRelationsOpportunityProducts)
        .getOne(searchQuery.id!);
    },
  });

  const form = useAppForm({
    ...FormOption,
    defaultValues: data || {},
  });

  if (!data) return null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit({ id: searchQuery.id!, navigate, pocketbase });
      }}
    >
      <form.AppForm>
        <AutoFieldSet
          form={form as any}
          {...toAutoFormFieldSet(UpdateOpportunityProductsSchema)}
        />
        <DialogFooter>
          <form.SubmitButton>Update Opportunity Product</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateOpportunityProductsForm;
