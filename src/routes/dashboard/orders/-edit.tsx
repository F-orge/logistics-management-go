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
  OrdersStatusOptions,
  type UsersResponse,
  type WarehousesResponse,
} from '../../../../lib/pocketbase.gen';
import { closeDialogButtonRef } from '../../../../lib/utils';
import {
  listRecordsQuery,
  useMutateUpdateRecord,
  viewRecordsQuery,
} from '../../../queries';
import type { ExpandedOrdersResponse } from './-columns';

const EditOrderForm = () => {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const editOrdersMutation = useMutateUpdateRecord(
    Collections.Orders,
    searchQuery.id,
  );

  const [order, companies, warehouses, users] = useQueries({
    queries: [
      viewRecordsQuery<ExpandedOrdersResponse>(
        Collections.Orders,
        searchQuery.id,
      ),
      listRecordsQuery<CompaniesResponse>(Collections.Companies, {
        page: 1,
        perPage: 500,
      }),
      listRecordsQuery<WarehousesResponse>(Collections.Warehouses, {
        page: 1,
        perPage: 500,
      }),
      listRecordsQuery<UsersResponse>(Collections.Users, {
        page: 1,
        perPage: 500,
      }),
    ],
  });

  const form = useAppForm({
    defaultValues: {
      orderIdCustom: order.data?.orderIdCustom,
      customer: order.data?.customer,
      orderDate: order.data?.orderDate ? new Date(order.data?.orderDate) : '',
      status: order.data?.status,
      totalAmount: order.data?.totalAmount,
      createdBy: order.data?.createdBy,
      shippingAddress: order.data?.shippingAddress,
      billingAddress: order.data?.billingAddress,
      assignedWarehouse: order.data?.assignedWarehouse,
    },
    onSubmit: async ({ value }) =>
      editOrdersMutation.mutateAsync(value, {
        onSuccess: () =>
          navigate({
            search: (prev) => ({
              ...prev,
              editOrder: undefined,
              id: undefined,
            }),
          }),
      }),
  });

  if (
    order.isLoading ||
    companies.isLoading ||
    warehouses.isLoading ||
    users.isLoading
  ) {
    return (
      <Dialog open>
        <DialogContent>Loading...</DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={searchQuery.editOrder}>
      <DialogContent
        className="!max-w-3/4 max-h-3/4 overflow-y-auto no-scrollbar"
        ref={(e) =>
          closeDialogButtonRef(e, () =>
            navigate({
              search: (prev) => ({
                ...prev,
                editOrder: undefined,
                id: undefined,
              }),
            }),
          )
        }
      >
        <DialogHeader>
          <DialogTitle>Edit Order</DialogTitle>
          <DialogDescription>Edit order information</DialogDescription>
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
            <form.AppField name="orderIdCustom">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-4' }}
                  labelProps={{ children: '* Order ID' }}
                />
              )}
            </form.AppField>
            <form.AppField name="customer">
              {(field) => (
                <field.SingleSelectField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: '* Customer' }}
                  options={
                    companies.data?.items.map((customer) => ({
                      label: customer.name,
                      value: customer.id,
                    })) || []
                  }
                  selectProps={{ defaultValue: order.data?.customer }}
                />
              )}
            </form.AppField>
            <form.AppField name="assignedWarehouse">
              {(field) => (
                <field.SingleSelectField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: '* Warehouse' }}
                  options={
                    warehouses.data?.items.map((warehouse) => ({
                      label: warehouse.name,
                      value: warehouse.id,
                    })) || []
                  }
                  selectProps={{ defaultValue: order.data?.assignedWarehouse }}
                />
              )}
            </form.AppField>
            <form.AppField name="status">
              {(field) => (
                <field.SingleSelectField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: '* Status' }}
                  options={Object.keys(OrdersStatusOptions).map((option) => ({
                    label: option,
                    value: option,
                  }))}
                  selectProps={{ defaultValue: order.data?.status }}
                />
              )}
            </form.AppField>
            <form.AppField name="orderDate">
              {(field) => (
                <field.SingleDateInputField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: '* Order Date' }}
                  calendarProps={{ disabled: true, disableNavigation: true }}
                />
              )}
            </form.AppField>
            <form.AppField name="totalAmount">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-4' }}
                  labelProps={{ children: '* Total Amount' }}
                  inputProps={{ type: 'number' }}
                />
              )}
            </form.AppField>
            <form.AppField name="shippingAddress">
              {(field) => (
                <field.TextAreaInputField
                  containerProps={{ className: 'col-span-4' }}
                  labelProps={{ children: '* Shipping Address' }}
                />
              )}
            </form.AppField>
            <form.AppField name="billingAddress">
              {(field) => (
                <field.TextAreaInputField
                  containerProps={{ className: 'col-span-4' }}
                  labelProps={{ children: '* Billing Address' }}
                />
              )}
            </form.AppField>
            <form.SubscribeButton
              buttonProps={{
                className: 'col-span-4',
                children: 'Create Order',
              }}
            />
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditOrderForm;
