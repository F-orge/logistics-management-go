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
import { pb } from '../../../../lib/pocketbase';
import {
  Collections,
  type CompaniesResponse,
  OrdersStatusOptions,
  type WarehousesResponse,
} from '../../../../lib/pocketbase.gen';
import { closeDialogButtonRef } from '../../../../lib/utils';
import { listRecordsQuery, useMutateCreateRecord } from '../../../queries';

const NewOrderForm = () => {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const createOrderMutation = useMutateCreateRecord(Collections.Orders);

  const [companies, warehouses] = useQueries({
    queries: [
      listRecordsQuery<CompaniesResponse>(Collections.Companies, {
        page: 1,
        perPage: 500,
      }),
      listRecordsQuery<WarehousesResponse>(Collections.Warehouses, {
        page: 1,
        perPage: 500,
      }),
    ],
  });

  const form = useAppForm({
    defaultValues: {
      orderIdCustom: '',
      customer: '',
      orderDate: new Date(),
      status: OrdersStatusOptions['pending-validation'],
      totalAmount: 0,
      createdBy: pb.authStore.record?.id,
      shippingAddress: '',
      billingAddress: '',
      assignedWarehouse: '',
    },
    onSubmit: async ({ value }) =>
      createOrderMutation.mutateAsync(value, {
        onSuccess: () =>
          navigate({ search: (prev) => ({ ...prev, newOrder: undefined }) }),
      }),
  });

  if (companies.isLoading || warehouses.isLoading) {
    return (
      <Dialog open>
        <DialogContent>Loading...</DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={searchQuery.newOrder}>
      <DialogContent
        className="!max-w-3/4 max-h-3/4 overflow-y-auto no-scrollbar"
        ref={(e) =>
          closeDialogButtonRef(e, () =>
            navigate({ search: (prev) => ({ ...prev, newOrder: undefined }) }),
          )
        }
      >
        <DialogHeader>
          <DialogTitle>New Order</DialogTitle>
          <DialogDescription>Create a new order</DialogDescription>
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
                />
              )}
            </form.AppField>
            <form.AppField name="orderDate">
              {(field) => (
                <field.SingleDateInputField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: '* Order Date' }}
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

export default NewOrderForm;
