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
import { type LmsPackagesRecord } from '@/pocketbase/types';

export const NewPackageForm = withForm({
  defaultValues: {} as CreateRecord<LmsPackagesRecord>,
  props: {},
  render: function ({ form }) {
    return (
      <>
        <form.AppField name="package_number">
          {(field) => (
            <field.TextField
              label="Package Number"
              required
              className="col-span-2"
              placeholder="e.g., PKG001234"
            />
          )}
        </form.AppField>
        <form.AppField name="shipment">
          {(field) => (
            <field.SelectField
              label="Shipment"
              required
              className="col-span-2"
              options={[]}
              placeholder="Select a shipment..."
            />
          )}
        </form.AppField>
        <form.AppField name="type">
          {(field) => (
            <field.SelectField
              label="Package Type"
              required
              className="col-span-1"
              options={[
                { value: 'box', label: 'Box' },
                { value: 'envelope', label: 'Envelope' },
                { value: 'tube', label: 'Tube' },
                { value: 'pallet', label: 'Pallet' },
                { value: 'crate', label: 'Crate' },
                { value: 'bag', label: 'Bag' },
              ]}
            />
          )}
        </form.AppField>
        <form.AppField name="weight">
          {(field) => (
            <field.TextField
              label="Weight (kg)"
              type="number"
              step="0.01"
              className="col-span-1"
              placeholder="e.g., 2.5"
            />
          )}
        </form.AppField>
        <form.AppField name="length">
          {(field) => (
            <field.TextField
              label="Length (cm)"
              type="number"
              step="0.1"
              className="col-span-1"
              placeholder="e.g., 30.5"
            />
          )}
        </form.AppField>
        <form.AppField name="height">
          {(field) => (
            <field.TextField
              label="Height (cm)"
              type="number"
              step="0.1"
              className="col-span-1"
              placeholder="e.g., 20.0"
            />
          )}
        </form.AppField>
        <form.AppField name="declared_value">
          {(field) => (
            <field.TextField
              label="Declared Value ($)"
              type="number"
              step="0.01"
              className="col-span-2"
              placeholder="e.g., 199.99"
            />
          )}
        </form.AppField>
        <form.AppField name="description">
          {(field) => (
            <field.TextField
              label="Description"
              className="col-span-full"
              placeholder="Enter package description..."
            />
          )}
        </form.AppField>
      </>
    );
  },
});

const NewPackageDialog = () => {
  const route = getRouteApi('/dashboard/lms/packages/');
  const navigate = route.useNavigate();
  const params = route.useSearch();

  const form = useAppForm({
    defaultValues: {} as CreateRecord<LmsPackagesRecord>,
    onSubmit: async ({ value }) => {
      await toast
        .promise(pb.collection('lms_packages').create(value), {
          success: 'Successfully created package',
          error: 'An error occurred when creating package',
        })
        .unwrap();
      navigate({ search: (prev) => ({ ...prev, newPackage: undefined }) });
    },
  });

  return (
    <Dialog
      open={params.newPackage}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, newPackage: undefined }) })
      }
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Package</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new package.
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
            <NewPackageForm form={form} />
            <form.SubmitButton className="col-span-2">
              Create Package
            </form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewPackageDialog;
