import { Route } from '.';
import {
  listRecordsQuery,
  useMutateUpdateRecord,
  viewRecordsQuery,
} from '../../../queries';
import {
  Collections,
  type InventoryItemsResponse,
  InventoryItemsStatusOptions,
  type ProductsResponse,
  type WarehousesResponse,
} from '../../../../lib/pocketbase.gen';
import { useQueries } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@marahuyo/react-ui/ui/dialog';
import { useAppForm } from '@marahuyo/react-ui/forms/index';
import { closeDialogButtonRef } from '../../../../lib/utils';

const EditInventoryItemForm = () => {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const updateInventoryMutation = useMutateUpdateRecord(
    Collections.InventoryItems,
    searchQuery.id,
  );

  const [inventoryItem, products, warehouses] = useQueries({
    queries: [
      viewRecordsQuery<InventoryItemsResponse>(
        Collections.InventoryItems,
        searchQuery.id,
      ),
      listRecordsQuery<ProductsResponse>(Collections.Products, {
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
      product: inventoryItem.data?.product,
      warehouse: inventoryItem.data?.warehouse,
      quantityOnHand: inventoryItem.data?.quantityOnHand,
      lotNumber: inventoryItem.data?.lotNumber,
      serialNumber: inventoryItem.data?.serialNumber,
      status: inventoryItem.data?.status,
      expiryDate: inventoryItem.data?.expiryDate,
      storageLocationCode: inventoryItem.data?.storageLocationCode,
      lastCountedDate: inventoryItem.data?.lastCountedDate,
    },
    onSubmit: async ({ value }) =>
      updateInventoryMutation.mutateAsync(value, {
        onSuccess: () =>
          navigate({
            search: (prev) => ({
              ...prev,
              editInventoryItem: undefined,
              id: undefined,
            }),
          }),
      }),
  });

  if (inventoryItem.isLoading || products.isLoading || warehouses.isLoading) {
    return (
      <Dialog open>
        <DialogContent>Loading...</DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={searchQuery.editInventoryItem}>
      <DialogContent
        className="!max-w-3/4 max-h-3/4 overflow-y-auto no-scrollbar"
        ref={(e) =>
          closeDialogButtonRef(e, () => {
            navigate({
              search: (prev) => ({
                ...prev,
                editInventoryItem: undefined,
                id: undefined,
              }),
            });
          })
        }
      >
        <DialogHeader>
          <DialogTitle>New Inventory Item</DialogTitle>
          <DialogDescription>Create a new Inventory Item</DialogDescription>
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
            <form.AppField name="product">
              {(field) => (
                <field.SingleSelectField
                  options={
                    products.data?.items.map((product) => ({
                      label: product.name,
                      value: product.id,
                    })) || []
                  }
                  labelProps={{ children: '* Product' }}
                  containerProps={{ className: 'col-span-2' }}
                  selectProps={{ defaultValue: inventoryItem.data?.product }}
                />
              )}
            </form.AppField>
            <form.AppField name="warehouse">
              {(field) => (
                <field.SingleSelectField
                  options={
                    warehouses.data?.items.map((product) => ({
                      label: product.name,
                      value: product.id,
                    })) || []
                  }
                  labelProps={{ children: '* Warehouse' }}
                  containerProps={{ className: 'col-span-2' }}
                  selectProps={{ defaultValue: inventoryItem.data?.warehouse }}
                />
              )}
            </form.AppField>
            <form.AppField name="quantityOnHand">
              {(field) => (
                <field.TextInputField
                  inputProps={{ type: 'number' }}
                  labelProps={{ children: '* Quantity on Hand' }}
                  containerProps={{ className: 'col-span-1' }}
                />
              )}
            </form.AppField>
            <form.AppField name="lotNumber">
              {(field) => (
                <field.TextInputField
                  labelProps={{ children: '* Lot Number' }}
                  containerProps={{ className: 'col-span-1' }}
                />
              )}
            </form.AppField>
            <form.AppField name="serialNumber">
              {(field) => (
                <field.TextInputField
                  labelProps={{ children: '* Serial Number' }}
                  containerProps={{ className: 'col-span-1' }}
                />
              )}
            </form.AppField>
            <form.AppField name="status">
              {(field) => (
                <field.SingleSelectField
                  options={
                    Object.keys(InventoryItemsStatusOptions).map((option) => ({
                      label: option,
                      value: option,
                    })) || []
                  }
                  labelProps={{ children: '* Status' }}
                  containerProps={{ className: 'col-span-1' }}
                  selectProps={{ defaultValue: inventoryItem.data?.status }}
                />
              )}
            </form.AppField>
            <form.AppField name="expiryDate">
              {(field) => (
                <field.SingleDateInputField
                  labelProps={{ children: 'Expiry Date' }}
                  containerProps={{ className: 'col-span-2' }}
                />
              )}
            </form.AppField>
            <form.AppField name="storageLocationCode">
              {(field) => (
                <field.TextInputField
                  labelProps={{ children: '* Storage Location Code' }}
                  containerProps={{ className: 'col-span-2' }}
                />
              )}
            </form.AppField>
            <form.AppField name="lastCountedDate">
              {(field) => (
                <field.SingleDateInputField
                  labelProps={{ children: 'Last counted date' }}
                  containerProps={{ className: 'col-span-4' }}
                />
              )}
            </form.AppField>
            <form.SubscribeButton
              buttonProps={{
                className: 'col-span-4',
                children: 'Create Inventory Item',
              }}
            />
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditInventoryItemForm;
