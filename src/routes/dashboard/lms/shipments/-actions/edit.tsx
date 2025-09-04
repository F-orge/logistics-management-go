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
import { type LmsShipmentsRecord } from '@/pocketbase/types';

export const EditShipmentForm = withForm({
  defaultValues: {} as UpdateRecord<LmsShipmentsRecord>,
  props: {},
  render: function ({ form }) {
    return (
      <>
        <form.AppField name="tracking_number">
          {(field) => (
            <field.TextField
              label="Tracking Number"
              required
              className="col-span-2"
              placeholder="e.g., TRK123456789"
            />
          )}
        </form.AppField>
        <form.AppField name="status">
          {(field) => (
            <field.SelectField
              label="Status"
              required
              className="col-span-1"
              options={[
                { value: 'created', label: 'Created' },
                { value: 'picked_up', label: 'Picked Up' },
                { value: 'in_transit', label: 'In Transit' },
                { value: 'out_for_delivery', label: 'Out for Delivery' },
                { value: 'delivered', label: 'Delivered' },
                { value: 'exception', label: 'Exception' },
                { value: 'cancelled', label: 'Cancelled' },
              ]}
            />
          )}
        </form.AppField>
        <form.AppField name="primary_transport_mode">
          {(field) => (
            <field.SelectField
              label="Transport Mode"
              required
              className="col-span-1"
              options={[
                { value: 'air', label: 'Air' },
                { value: 'sea', label: 'Sea' },
                { value: 'road', label: 'Road' },
                { value: 'rail', label: 'Rail' },
              ]}
            />
          )}
        </form.AppField>
        <form.AppField name="sender_address">
          {(field) => (
            <field.SelectField
              label="Sender Address"
              required
              className="col-span-2"
              options={[]}
              placeholder="Select sender address..."
            />
          )}
        </form.AppField>
        <form.AppField name="sender_company">
          {(field) => (
            <field.SelectField
              label="Sender Company"
              className="col-span-1"
              options={[]}
              placeholder="Select sender company..."
            />
          )}
        </form.AppField>
        <form.AppField name="sender_contact">
          {(field) => (
            <field.SelectField
              label="Sender Contact"
              className="col-span-1"
              options={[]}
              placeholder="Select sender contact..."
            />
          )}
        </form.AppField>
        <form.AppField name="receiver_address">
          {(field) => (
            <field.SelectField
              label="Receiver Address"
              required
              className="col-span-2"
              options={[]}
              placeholder="Select receiver address..."
            />
          )}
        </form.AppField>
        <form.AppField name="receiver_company">
          {(field) => (
            <field.SelectField
              label="Receiver Company"
              className="col-span-1"
              options={[]}
              placeholder="Select receiver company..."
            />
          )}
        </form.AppField>
        <form.AppField name="receiver_contact">
          {(field) => (
            <field.SelectField
              label="Receiver Contact"
              className="col-span-1"
              options={[]}
              placeholder="Select receiver contact..."
            />
          )}
        </form.AppField>
        <form.AppField name="shipping_service">
          {(field) => (
            <field.SelectField
              label="Shipping Service"
              required
              className="col-span-2"
              options={[]}
              placeholder="Select shipping service..."
            />
          )}
        </form.AppField>
        <form.AppField name="total_weight">
          {(field) => (
            <field.TextField
              label="Total Weight (kg)"
              required
              type="number"
              step="0.01"
              className="col-span-1"
              placeholder="e.g., 5.5"
            />
          )}
        </form.AppField>
        <form.AppField name="currency">
          {(field) => (
            <field.TextField
              label="Currency"
              required
              className="col-span-1"
              placeholder="e.g., USD"
              maxLength={3}
            />
          )}
        </form.AppField>
        <form.AppField name="total_value">
          {(field) => (
            <field.TextField
              label="Total Value"
              type="number"
              step="0.01"
              className="col-span-1"
              placeholder="e.g., 199.99"
            />
          )}
        </form.AppField>
        <form.AppField name="shipping_cost">
          {(field) => (
            <field.TextField
              label="Shipping Cost"
              type="number"
              step="0.01"
              className="col-span-1"
              placeholder="e.g., 25.00"
            />
          )}
        </form.AppField>
        <form.AppField name="insurance_amount">
          {(field) => (
            <field.TextField
              label="Insurance Amount"
              type="number"
              step="0.01"
              className="col-span-1"
              placeholder="e.g., 50.00"
            />
          )}
        </form.AppField>
        <form.AppField name="pickup_date">
          {(field) => (
            <field.DateField label="Pickup Date" className="col-span-1" />
          )}
        </form.AppField>
        <form.AppField name="estimated_delivery_date">
          {(field) => (
            <field.DateField
              label="Estimated Delivery Date"
              className="col-span-1"
            />
          )}
        </form.AppField>
        <form.AppField name="special_instructions">
          {(field) => (
            <field.TextField
              label="Special Instructions"
              className="col-span-full"
              placeholder="Enter any special handling instructions..."
            />
          )}
        </form.AppField>
      </>
    );
  },
});

const EditShipmentDialog = () => {
  const route = getRouteApi('/dashboard/lms/shipments/');
  const navigate = route.useNavigate();
  const params = route.useSearch();

  const shipments = route.useLoaderData();
  const shipment = shipments.items.find(
    (shipment) => shipment.id === params.id,
  );

  const form = useAppForm({
    defaultValues: shipment as UpdateRecord<LmsShipmentsRecord>,
    onSubmit: async ({ value }) => {
      if (!shipment?.id) return;
      await toast
        .promise(pb.collection('lms_shipments').update(shipment.id, value), {
          success: 'Successfully updated shipment',
          error: 'An error occurred when updating shipment',
        })
        .unwrap();
      navigate({ search: (prev) => ({ ...prev, editShipment: undefined }) });
    },
  });

  if (!shipment) {
    return null;
  }

  return (
    <Dialog
      open={params.editShipment}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, editShipment: undefined }) })
      }
    >
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Shipment</DialogTitle>
          <DialogDescription>
            Update the shipment details below.
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
            <EditShipmentForm form={form} />
            <form.SubmitButton>Update Shipment</form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditShipmentDialog;
