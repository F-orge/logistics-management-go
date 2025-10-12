import { useMutation } from '@tanstack/react-query';
import {
  useNavigate,
  useRouteContext,
  useSearch,
} from '@tanstack/react-router';
import { useAppForm } from '@/components/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import { CrmProductType } from '@/db/types';
import { ORPCInputs } from '@/orpc/client';
import { createProduct } from '@/queries/crm/products';
import { crmProductInsertSchema } from '@/schemas/crm/products';

const NewProductFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/products' });
  const searchQuery = useSearch({ from: '/dashboard/crm/products/' });
  const { queryClient } = useRouteContext({ from: '/dashboard/crm/products/' });

  const createMutation = useMutation(createProduct, queryClient);

  const form = useAppForm({
    defaultValues: {} as ORPCInputs['crm']['createProduct'],
    validators: {
      onChange: crmProductInsertSchema,
    },
    onSubmit: async ({ value }) =>
      createMutation.mutateAsync(value, {
        onSuccess: () => {
          navigate({ search: (prev) => ({ ...prev, new: undefined }) });
        },
      }),
  });

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new product record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <FieldGroup>
              <FieldSet>
                <FieldLegend>Product Details</FieldLegend>
                <FieldDescription>
                  Provide the essential information for the product.
                </FieldDescription>
                <FieldGroup>
                  <form.AppField name="name">
                    {(field) => (
                      <field.TextField
                        label="Product Name"
                        description="The name of the product."
                        required
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="description">
                    {(field) => (
                      <field.TextAreaField
                        label="Description"
                        description="A brief description of the product."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="price">
                    {(field) => (
                      <field.NumberField
                        label="Price"
                        description="The price of the product."
                        required
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="sku">
                    {(field) => (
                      <field.TextField
                        label="SKU"
                        description="The Stock Keeping Unit for the product."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="type">
                    {(field) => (
                      <field.SelectField
                        label="Type"
                        description="The type or category of the product."
                        options={Object.values(CrmProductType).map((type) => ({
                          label: type,
                          value: type,
                        }))}
                      />
                    )}
                  </form.AppField>
                </FieldGroup>
              </FieldSet>
              <form.SubmitButton>Create Product</form.SubmitButton>
            </FieldGroup>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewProductFormDialog;
