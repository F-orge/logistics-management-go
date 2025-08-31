import { getRouteApi } from '@tanstack/react-router';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAppForm, withForm } from '@/components/ui/form';
import { type CreateRecord, pb } from '@/pocketbase';
import { type CrmProductsRecord } from '@/pocketbase/types';

export const NewProductForm = withForm({
  defaultValues: {} as CreateRecord<CrmProductsRecord>,
  props: {},
  render: function ({ form }) {
    return (
      <>
        <form.AppField name="name">
          {(field) => (
            <field.TextField
              label="Product Name"
              required
              className="col-span-full"
            />
          )}
        </form.AppField>
        <form.AppField name="sku">
          {(field) => (
            <field.TextField
              label="SKU"
              placeholder="PROD-001"
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="price">
          {(field) => (
            <field.TextField
              label="Price"
              min={0}
              step={0.01}
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="description">
          {(field) => (
            <field.TextField label="Description" className="col-span-full" />
          )}
        </form.AppField>
      </>
    );
  },
});

const NewProductDialog = () => {
  const route = getRouteApi('/dashboard/crm/products/');
  const navigate = route.useNavigate();
  const params = route.useSearch();

  const form = useAppForm({
    defaultValues: {} as CreateRecord<CrmProductsRecord>,
    onSubmit: async ({ value }) => {
      await toast
        .promise(pb.collection('crm_products').create(value), {
          success: 'Successfully created a product',
          error: 'An error occurred when creating a product',
        })
        .unwrap();

      navigate({ search: (prev) => ({ ...prev, newProduct: undefined }) });
    },
  });

  return (
    <Dialog
      open={params.newProduct}
      onOpenChange={(_) =>
        navigate({ search: (prev) => ({ ...prev, newProduct: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Product</DialogTitle>
          <DialogDescription>Create a new product</DialogDescription>
        </DialogHeader>
        <form
          className="grid grid-cols-4 gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <NewProductForm form={form} />
            <form.SubmitButton className="col-start-4">
              Create Product
            </form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewProductDialog;
