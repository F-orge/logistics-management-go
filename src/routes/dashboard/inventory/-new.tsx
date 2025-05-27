import React from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useQueries } from '@tanstack/react-query';
import { listRecordsQuery, useMutateCreateRecord } from '../../../queries';
import {
  Collections,
  InventoryItemsStatusOptions,
  type ProductsResponse,
  type WarehousesResponse,
} from '../../../../lib/pocketbase.gen';
import { useAppForm } from '@marahuyo/react-ui/forms/index';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@marahuyo/react-ui/ui/dialog';
import { closeDialogButtonRef } from '../../../../lib/utils';
import { Route } from '.';

const NewInventoryItemForm = () => {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const createInventoryItemMutation = useMutateCreateRecord(
    Collections.InventoryItems,
  );

  const [products, warehouses] = useQueries({
    queries: [
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
      product: '',
      warehouse: '',
      quantityOnHand: '',
      lotNumber: '',
      serialNumber: '',
      status: InventoryItemsStatusOptions['on-hold'],
      expiryDate: new Date(),
      storageLocationCode: '',
      lastCountedDate: new Date(),
    },
    onSubmit: async ({ value }) =>
      createInventoryItemMutation.mutateAsync(value, {
        onSuccess: () => {
          navigate({
            search: (prev) => ({ ...prev, newInventoryItem: undefined }),
          });
        },
      }),
  });

  if (products.isLoading || warehouses.isLoading) {
    return (
      <Dialog open={searchQuery.newInventoryItem}>
        <DialogContent>Loading...</DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={searchQuery.newInventoryItem}>
      <DialogContent
        className="!max-w-3/4 max-h-3/4 overflow-y-auto no-scrollbar"
        ref={(e) =>
          closeDialogButtonRef(e, () => {
            navigate({
              search: (prev) => ({ ...prev, newInventoryItem: undefined }),
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

export default NewInventoryItemForm;
