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
        <FieldDescription>Fill in the details for the new opportunity product.</FieldDescription>
        <FieldGroup>
          {/* Product Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Product Information</FieldLegend>
            <FieldDescription>Select a product and specify the quantity for this opportunity.</FieldDescription>
            <FieldGroup>
              <form.AppField name="productId">
                {(field) => (
                  <field.InputField
                    label="Product *"
                    description="The product associated with this opportunity."
                    placeholder="Product ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="quantity">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Quantity *"
                    description="Number of units."
                    placeholder="1"
                    step="1"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link this product to an opportunity.</FieldDescription>
            <FieldGroup>
              <form.AppField name="opportunityId">
                {(field) => (
                  <field.InputField
                    label="Opportunity *"
                    description="The opportunity this product is associated with."
                    placeholder="Opportunity ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
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
        <FieldDescription>Update the details for the opportunity product.</FieldDescription>
        <FieldGroup>
          {/* Product Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Product Information</FieldLegend>
            <FieldDescription>Update the quantity for this product in the opportunity.</FieldDescription>
            <FieldGroup>
              <form.AppField name="quantity">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Quantity"
                    description="Number of units."
                    placeholder="1"
                    step="1"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
