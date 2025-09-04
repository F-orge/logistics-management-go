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
import { pb, type UpdateRecord } from '@/pocketbase';
import { type LmsPackagesRecord } from '@/pocketbase/types';

export const EditPackageForm = withForm({
  defaultValues: {} as UpdateRecord<LmsPackagesRecord>,
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

const EditPackageDialog = () => {
  const route = getRouteApi('/dashboard/lms/packages/');
  const navigate = route.useNavigate();
  const params = route.useSearch();

  const packages = route.useLoaderData();
  const packageRecord = packages.items.find((pkg) => pkg.id === params.id);

  const form = useAppForm({
    defaultValues: packageRecord as UpdateRecord<LmsPackagesRecord>,
    onSubmit: async ({ value }) => {
      if (!packageRecord?.id) return;
      await toast
        .promise(
          pb.collection('lms_packages').update(packageRecord.id, value),
          {
            success: 'Successfully updated package',
            error: 'An error occurred when updating package',
          },
        )
        .unwrap();
      navigate({ search: (prev) => ({ ...prev, editPackage: undefined }) });
    },
  });

  if (!packageRecord) {
    return null;
  }

  return (
    <Dialog
      open={params.editPackage}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, editPackage: undefined }) })
      }
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Package</DialogTitle>
          <DialogDescription>
            Update the package details below.
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
            <EditPackageForm form={form} />
            <form.SubmitButton className="col-span-2">
              Update Package
            </form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPackageDialog;
