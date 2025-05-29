import { useAppForm } from '@marahuyo/react-ui/forms/index';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@marahuyo/react-ui/ui/dialog';
import { useQueries } from '@tanstack/react-query';
import { Route } from '.';
import {
  Collections,
  type CompaniesResponse,
  type DepartmentsResponse,
  type OrdersResponse,
  ShipmentsStatusOptions,
  type UsersResponse,
} from '../../../../lib/pocketbase.gen';
import { closeDialogButtonRef } from '../../../../lib/utils';
import { listRecordsQuery, useMutateCreateRecord } from '../../../queries';

const NewShipmentForm = () => {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const createShipmentMutation = useMutateCreateRecord(Collections.Shipments);

  const [orders, companies, drivers, departments] = useQueries({
    queries: [
      listRecordsQuery<OrdersResponse>(Collections.Orders, {
        page: 1,
        perPage: 500,
      }),
      listRecordsQuery<CompaniesResponse>(Collections.Companies, {
        page: 1,
        perPage: 500,
      }),
      listRecordsQuery<UsersResponse>(
        Collections.Users,
        {
          page: 1,
          perPage: 500,
        },
        { filter: `role = 'delivery_driver'` },
      ),
      listRecordsQuery<DepartmentsResponse>(Collections.Departments, {
        page: 1,
        perPage: 500,
      }),
    ],
  });

  const form = useAppForm({
    defaultValues: {
      orderRef: '',
      trackingNumber: '',
      carrier: '',
      status: ShipmentsStatusOptions['label-created'],
      estimatedDeliveryDate: new Date(),
      actualDeliveryDate: '',
      proofOfDelivery: [] as File[],
      driver: '',
      currentLocationNotes: '',
      departmentAssigned: '',
    },
    onSubmit: async ({ value }) =>
      createShipmentMutation.mutateAsync(value, {
        onSuccess: () =>
          navigate({ search: (prev) => ({ ...prev, newShipment: undefined }) }),
      }),
  });

  if (
    companies.isLoading ||
    orders.isLoading ||
    drivers.isLoading ||
    departments.isLoading
  ) {
    return (
      <Dialog open>
        <DialogContent>Loading...</DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={searchQuery.newShipment}>
      <DialogContent
        className="!max-w-3/4 max-h-3/4 overflow-y-auto no-scrollbar"
        ref={(e) =>
          closeDialogButtonRef(e, () =>
            navigate({
              search: (prev) => ({ ...prev, newShipment: undefined }),
            }),
          )
        }
      >
        <DialogHeader>
          <DialogTitle>New Shipment</DialogTitle>
          <DialogDescription>Create a new shipment</DialogDescription>
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
            <form.AppField name="trackingNumber">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-4' }}
                  labelProps={{ children: 'Tracking Number' }}
                />
              )}
            </form.AppField>
            <form.AppField name="orderRef">
              {(field) => (
                <field.SingleSelectField
                  containerProps={{ className: 'col-span-1' }}
                  labelProps={{ children: '* Order ID' }}
                  options={
                    orders.data?.items.map((order) => ({
                      label: order.orderIdCustom,
                      value: order.id,
                    })) || []
                  }
                />
              )}
            </form.AppField>
            <form.AppField name="carrier">
              {(field) => (
                <field.SingleSelectField
                  containerProps={{ className: 'col-span-1' }}
                  labelProps={{ children: '* Carrier' }}
                  options={
                    companies.data?.items.map((company) => ({
                      label: company.name,
                      value: company.id,
                    })) || []
                  }
                />
              )}
            </form.AppField>
            <form.AppField name="driver">
              {(field) => (
                <field.SingleSelectField
                  containerProps={{ className: 'col-span-1' }}
                  labelProps={{ children: '* Driver' }}
                  options={
                    drivers.data?.items.map((driver) => ({
                      label: driver.name,
                      value: driver.id,
                    })) || []
                  }
                />
              )}
            </form.AppField>
            <form.AppField name="departmentAssigned">
              {(field) => (
                <field.SingleSelectField
                  containerProps={{ className: 'col-span-1' }}
                  labelProps={{ children: '* Assigned Department' }}
                  options={
                    departments.data?.items.map((department) => ({
                      label: department.name,
                      value: department.id,
                    })) || []
                  }
                />
              )}
            </form.AppField>
            <form.AppField name="estimatedDeliveryDate">
              {(field) => (
                <field.SingleDateInputField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: '* Estimated Delivery Date' }}
                />
              )}
            </form.AppField>
            <form.AppField name="status">
              {(field) => (
                <field.SingleSelectField
                  containerProps={{ className: 'col-span-1' }}
                  labelProps={{ children: '* Status' }}
                  options={Object.keys(ShipmentsStatusOptions).map(
                    (option) => ({ label: option, value: option }),
                  )}
                  selectProps={{
                    defaultValue: ShipmentsStatusOptions['label-created'],
                  }}
                />
              )}
            </form.AppField>
            <form.AppField name="actualDeliveryDate">
              {(field) => (
                <field.SingleDateInputField
                  containerProps={{ className: 'col-span-1' }}
                  labelProps={{ children: 'Actual Delivery Date' }}
                />
              )}
            </form.AppField>
            <form.AppField name="proofOfDelivery">
              {(field) => (
                <field.FileUploadField
                  containerProps={{ className: 'col-span-4' }}
                  labelProps={{ children: 'Proof of delivery' }}
                  fileUploadProps={{ multiple: true }}
                />
              )}
            </form.AppField>
            <form.AppField name="currentLocationNotes">
              {(field) => (
                <field.TextAreaInputField
                  containerProps={{ className: 'col-span-4' }}
                  labelProps={{ children: 'Notes' }}
                />
              )}
            </form.AppField>
            <form.SubscribeButton
              buttonProps={{
                className: 'col-span-4',
                children: 'Create Shipment',
              }}
            />
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewShipmentForm;
