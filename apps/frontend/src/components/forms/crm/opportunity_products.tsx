import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateOpportunityProductInputSchema,
  UpdateOpportunityProductInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createOpportunityProductSchema = CreateOpportunityProductInputSchema();
export const updateOpportunityProductSchema = UpdateOpportunityProductInputSchema();

export const createOpportunityProductFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createOpportunityProductSchema>,
});

export const updateOpportunityProductFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateOpportunityProductSchema>,
});

export const CreateOpportunityProductForm = withForm({
  ...createOpportunityProductFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Opportunity Product</FieldLegend>
        <FieldDescription>
          Fill in the details for the new opportunity product.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Product Details</FieldLegend>
            <form.AppField name="opportunityId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="quantity">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateOpportunityProductForm = withForm({
  ...updateOpportunityProductFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Opportunity Product</FieldLegend>
        <FieldDescription>
          Update the details for the opportunity product.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Product Details</FieldLegend>
            <form.AppField name="quantity">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
