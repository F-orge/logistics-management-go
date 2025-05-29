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
  type ShipmentsResponse,
  ShipmentsStatusOptions,
  type UsersResponse,
  type WarehousesResponse,
} from '../../../../lib/pocketbase.gen';
import { closeDialogButtonRef } from '../../../../lib/utils';
import { useFiles } from '../../../hooks/useFile';
import {
  listRecordsQuery,
  useMutateCreateRecord,
  useMutateUpdateRecord,
  viewRecordsQuery,
} from '../../../queries';

const EditShipmentForm = () => {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const editShipmentMutation = useMutateUpdateRecord(
    Collections.Shipments,
    searchQuery.id,
  );

  const [shipment, orders, companies, drivers, departments] = useQueries({
    queries: [
      viewRecordsQuery<ShipmentsResponse>(
        Collections.Shipments,
        searchQuery.id,
      ),
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

  const proofOfDeliveryImages = useFiles(
    shipment.data?.proofOfDelivery?.map(
      (file) => `/api/files/shipments/${searchQuery.id}/${file}`,
    ) || [],
  );

  const form = useAppForm({
    defaultValues: {
      orderRef: shipment.data?.orderRef,
      trackingNumber: shipment.data?.trackingNumber,
      carrier: shipment.data?.carrier,
      status: shipment.data?.status,
      estimatedDeliveryDate: shipment.data?.estimatedDeliveryDate
        ? new Date(shipment.data?.estimatedDeliveryDate)
        : '',
      actualDeliveryDate: shipment.data?.actualDeliveryDate
        ? new Date(shipment.data?.actualDeliveryDate)
        : '',
      proofOfDelivery: proofOfDeliveryImages.data || [],
      driver: shipment.data?.driver,
      currentLocationNotes: shipment.data?.currentLocationNotes,
      departmentAssigned: shipment.data?.departmentAssigned,
    },
    onSubmit: async ({ value }) =>
      editShipmentMutation.mutateAsync(value, {
        onSuccess: () =>
          navigate({
            search: (prev) => ({
              ...prev,
              editShipment: undefined,
              id: undefined,
            }),
          }),
      }),
  });

  if (
    companies.isLoading ||
    orders.isLoading ||
    drivers.isLoading ||
    departments.isLoading ||
    shipment.isLoading ||
    proofOfDeliveryImages.isLoading
  ) {
    return (
      <Dialog open>
        <DialogContent>Loading...</DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={searchQuery.editShipment}>
      <DialogContent
        className="!max-w-3/4 max-h-3/4 overflow-y-auto no-scrollbar"
        ref={(e) =>
          closeDialogButtonRef(e, () =>
            navigate({
              search: (prev) => ({
                ...prev,
                editShipment: undefined,
                id: undefined,
              }),
            }),
          )
        }
      >
        <DialogHeader>
          <DialogTitle>Edit Shipment</DialogTitle>
          <DialogDescription>Edit shipment information</DialogDescription>
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
                  selectProps={{ defaultValue: shipment.data?.orderRef }}
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
                  selectProps={{ defaultValue: shipment.data?.carrier }}
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
                  selectProps={{ defaultValue: shipment.data?.driver }}
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
                  selectProps={{
                    defaultValue: shipment.data?.departmentAssigned,
                  }}
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
                  selectProps={{ defaultValue: shipment.data?.status }}
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
                children: 'Update Shipment',
              }}
            />
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditShipmentForm;
