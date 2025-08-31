import { useSuspenseQuery } from '@tanstack/react-query';
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
import { type LmsAddressesRecord } from '@/pocketbase/types';

export const EditAddressForm = withForm({
  defaultValues: {} as UpdateRecord<LmsAddressesRecord>,
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

const EditAddressDialog = () => {
  const route = getRouteApi('/dashboard/lms/addresses/');
  const navigate = route.useNavigate();
  const searchParams = route.useSearch();

  const { data: address } = useSuspenseQuery({
    queryKey: ['addresses', searchParams.id],
    queryFn: () => pb.collection('lms_addresses').getOne(searchParams.id ?? ''),
  });

  const form = useAppForm({
    defaultValues: address as UpdateRecord<LmsAddressesRecord>,
    onSubmit: async ({ value }) => {
      await toast
        .promise(
          pb.collection('lms_addresses').update(searchParams.id ?? '', value),
          {
            success: 'Address Updated Successfully',
            error: 'An Error Occurred when updating the record',
          },
        )
        .unwrap();
      navigate({
        search: (prev) => ({
          ...prev,
          editAddress: undefined,
          id: undefined,
        }),
      });
    },
  });

  return (
    <Dialog
      open={searchParams.editAddress}
      onOpenChange={() =>
        navigate({
          search: (prev) => ({
            ...prev,
            editAddress: undefined,
            id: undefined,
          }),
        })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Address Information</DialogTitle>
          <DialogDescription>
            Change the information for: {address.address_line_1}
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid grid-cols-4 gap-2.5"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <EditAddressForm form={form} />
            <form.SubmitButton>Edit Address</form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAddressDialog;
