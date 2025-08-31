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
import { type LmsAddressesRecord } from '@/pocketbase/types';

export const NewAddressForm = withForm({
  defaultValues: {} as CreateRecord<LmsAddressesRecord>,
  props: {},
  render: function ({ form }) {
    return (
      <>
        <form.AppField name="address_line_1">
          {(field) => (
            <field.TextField
              label="Address Line 1"
              required
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="address_line_2">
          {(field) => (
            <field.TextField
              label="Address Line 2"
              required
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="city">
          {(field) => (
            <field.TextField label="City" required className="col-span-1" />
          )}
        </form.AppField>
        <form.AppField name="state">
          {(field) => (
            <field.TextField label="State" required className="col-span-1" />
          )}
        </form.AppField>
        <form.AppField name="postal_code">
          {(field) => (
            <field.TextField
              label="Postal Code"
              required
              className="col-span-1"
            />
          )}
        </form.AppField>
        <form.AppField name="type">
          {(field) => (
            <field.SelectField
              label="Type"
              className="col-span-1"
              options={[
                { value: 'shipping', label: 'Shipping' },
                { value: 'billing', label: 'Billing' },
                { value: 'warehouse', label: 'Warehouse' },
                { value: 'office', label: 'Office' },
              ]}
            />
          )}
        </form.AppField>
        <form.AppField name="is_validated">
          {(field) => (
            <field.CheckBoxField
              label="Is Validated"
              className="col-span-full"
            />
          )}
        </form.AppField>
      </>
    );
  },
});

const NewAddressDialog = () => {
  const route = getRouteApi('/dashboard/lms/addresses/');
  const navigate = route.useNavigate();
  const params = route.useSearch();

  const form = useAppForm({
    defaultValues: {} as CreateRecord<LmsAddressesRecord>,
    onSubmit: async ({ value }) => {
      await toast
        .promise(pb.collection('lms_addresses').create(value), {
          success: 'Successfully created address',
          error: 'An error occurred when creating address',
        })
        .unwrap();
      navigate({ search: (prev) => ({ ...prev, newAddress: undefined }) });
    },
  });

  return (
    <Dialog
      open={params.newAddress}
      onOpenChange={(_) =>
        navigate({
          search: (prev) => ({ ...prev, newAddress: undefined }),
        })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Address</DialogTitle>
          <DialogDescription>Create a new address record</DialogDescription>
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
            <NewAddressForm form={form} />
            <form.SubmitButton>Create Address</form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewAddressDialog;
