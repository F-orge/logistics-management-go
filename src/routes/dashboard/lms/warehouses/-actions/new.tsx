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
import { type LmsWarehousesRecord } from '@/pocketbase/types';

export const NewWarehouseForm = withForm({
  defaultValues: {} as CreateRecord<LmsWarehousesRecord>,
  props: {},
  render: function ({ form }) {
    return (
      <>
        <form.AppField name="name">
          {(field) => (
            <field.TextField
              label="Warehouse Name"
              required
              className="col-span-4"
            />
          )}
        </form.AppField>
        <form.AppField name="code">
          {(field) => (
            <field.TextField
              label="Warehouse Code"
              required
              className="col-span-2"
              placeholder="e.g., WH001"
            />
          )}
        </form.AppField>
        <form.AppField name="type">
          {(field) => (
            <field.SelectField
              label="Warehouse Type"
              required
              className="col-span-2"
              options={[
                { value: 'distribution', label: 'Distribution' },
                { value: 'fulfillment', label: 'Fulfillment' },
                { value: 'cross_dock', label: 'Cross Dock' },
                { value: 'cold_storage', label: 'Cold Storage' },
                { value: 'bonded', label: 'Bonded' },
              ]}
            />
          )}
        </form.AppField>
        <form.AppField name="address">
          {(field) => (
            <field.SelectField
              label="Address"
              required
              className="col-span-4"
              options={[]}
              placeholder="Select an address..."
            />
          )}
        </form.AppField>
        <form.AppField name="capacity">
          {(field) => (
            <field.TextField
              label="Capacity (units)"
              type="number"
              className="col-span-2"
              placeholder="e.g., 10000"
            />
          )}
        </form.AppField>
        <form.AppField name="manager">
          {(field) => (
            <field.SelectField
              label="Manager"
              className="col-span-2"
              options={[]}
              placeholder="Select a manager..."
            />
          )}
        </form.AppField>
        <form.AppField name="is_active">
          {(field) => (
            <field.CheckBoxField label="Is Active" className="col-span-full" />
          )}
        </form.AppField>
      </>
    );
  },
});

const NewWarehouseDialog = () => {
  const route = getRouteApi('/dashboard/lms/warehouses/');
  const navigate = route.useNavigate();
  const params = route.useSearch();

  const form = useAppForm({
    defaultValues: {} as CreateRecord<LmsWarehousesRecord>,
    onSubmit: async ({ value }) => {
      await toast
        .promise(pb.collection('lms_warehouses').create(value), {
          success: 'Successfully created warehouse',
          error: 'An error occurred when creating warehouse',
        })
        .unwrap();
      navigate({ search: (prev) => ({ ...prev, newWarehouse: undefined }) });
    },
  });

  return (
    <Dialog
      open={params.newWarehouse}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, newWarehouse: undefined }) })
      }
    >
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create New Warehouse</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new warehouse.
          </DialogDescription>
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
            <NewWarehouseForm form={form} />
            <form.SubmitButton className="col-span-2">
              Create Warehouse
            </form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewWarehouseDialog;
