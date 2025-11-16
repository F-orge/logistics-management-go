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
  toAutoFormFieldSet,
} from "@/components/ui/autoform-tanstack/types";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import { Collections, TypedPocketBase } from "@/lib/pb.types";
import { OpportunityProductsSchema } from "@/pocketbase/schemas/customer-relations/opportunity-products";

export const CreateOpportunityProductsSchema = z.object({
  opportunity: OpportunityProductsSchema.shape.opportunity.register(
    fieldRegistry,
    {
      id: "crm-opportunity-products-opportunity-create",
      type: "field",
      label: "Opportunity",
      description: "Select the opportunity (optional)",
      inputType: "text",
    }
  ),
  product: OpportunityProductsSchema.shape.product.register(fieldRegistry, {
    id: "crm-opportunity-products-product-create",
    type: "field",
    label: "Product",
    description: "Select the product (optional)",
    inputType: "text",
  }),
  quantity: OpportunityProductsSchema.shape.quantity.register(fieldRegistry, {
    id: "crm-opportunity-products-quantity-create",
    type: "field",
    label: "Quantity",
    description: "Enter the quantity",
    inputType: "number",
  }),
  priceSnapshot: OpportunityProductsSchema.shape.priceSnapshot.register(
    fieldRegistry,
    {
      id: "crm-opportunity-products-priceSnapshot-create",
      type: "field",
      label: "Price Snapshot",
      description: "Enter the price snapshot (optional)",
      inputType: "number",
    }
  ),
});

const FormOption = formOptions({
  defaultValues: {} as z.infer<typeof CreateOpportunityProductsSchema>,
  validators: {
    onSubmit: CreateOpportunityProductsSchema,
  },
  onSubmitMeta: {} as {
    pocketbase: TypedPocketBase;
    navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  },
  onSubmit: async ({ value, meta }) => {
    try {
      await meta
        .pocketbase!.collection(
          Collections.CustomerRelationsOpportunityProducts
        )
        .create(value);

      toast.success("Opportunity product created successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to create opportunity product: ${error.message} (${error.status})`
        );
      }
    } finally {
      meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
    }
  },
});

const CreateOpportunityProductsForm = () => {
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
          {...toAutoFormFieldSet(CreateOpportunityProductsSchema)}
        />
        <DialogFooter>
          <form.SubmitButton>Create Opportunity Product</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default CreateOpportunityProductsForm;
