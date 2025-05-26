import React from 'react';
import { Route } from '.';
import { useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { listRecordsQuery, useMutateCreateRecord } from '../../../queries';
import {
  Collections,
  type CompaniesResponse,
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

const NewProductForm = () => {
  const searchQuery = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const createProductMutation = useMutateCreateRecord(Collections.Products);

  const suppliers = useQuery(
    listRecordsQuery<CompaniesResponse>(
      Collections.Companies,
      {
        page: 1,
        perPage: 500,
      },
      { filter: "type = 'supplier'" },
    ),
  );

  const form = useAppForm({
    defaultValues: {
      sku: '',
      name: '',
      description: '',
      weight: 0.0,
      dimensionsWidth: 0.0,
      dimensionsHeight: 0.0,
      dimensionsLength: 0.0,
      cost: 0.0,
      supplier: '',
      image: [] as File[],
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      await createProductMutation.mutateAsync(
        {
          ...value,
          cost: Number(value.cost),
          weight: Number(value.weight),
          dimensionsWidth: Number(value.dimensionsWidth),
          dimensionsHeight: Number(value.dimensionsHeight),
          dimensionsLength: Number(value.dimensionsLength),
        },
        {
          onSuccess: () => {
            navigate({
              search: (prev) => ({ ...prev, newProduct: undefined }),
            });
          },
        },
      );
    },
  });

  return (
    <Dialog open={searchQuery.newProduct}>
      <DialogContent
        className="!max-w-3/4 max-h-3/4 overflow-y-auto no-scrollbar"
        ref={(e) =>
          closeDialogButtonRef(e, () =>
            navigate({
              search: (prev) => ({ ...prev, newProduct: undefined }),
            }),
          )
        }
      >
        <DialogHeader>
          <DialogTitle>New Product</DialogTitle>
          <DialogDescription>Create a new product</DialogDescription>
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
            <form.AppField name="image">
              {(field) => (
                <field.FileUploadField
                  containerProps={{ className: 'col-span-4' }}
                  labelProps={{ children: '* Images' }}
                  fileUploadProps={{ multiple: true }}
                />
              )}
            </form.AppField>
            <form.AppField name="sku">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: '* SKU' }}
                />
              )}
            </form.AppField>
            <form.AppField name="name">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: '* Name' }}
                />
              )}
            </form.AppField>
            <form.AppField name="description">
              {(field) => (
                <field.TextAreaInputField
                  containerProps={{ className: 'col-span-4' }}
                  labelProps={{ children: 'Description' }}
                />
              )}
            </form.AppField>
            <form.AppField name="weight">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-1' }}
                  labelProps={{ children: '* Weight (kg)' }}
                  inputProps={{ type: 'number' }}
                />
              )}
            </form.AppField>
            <form.AppField name="dimensionsWidth">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-1' }}
                  labelProps={{ children: '* Width (cm)' }}
                  inputProps={{ type: 'number' }}
                />
              )}
            </form.AppField>
            <form.AppField name="dimensionsHeight">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-1' }}
                  labelProps={{ children: '* Height (cm)' }}
                  inputProps={{ type: 'number' }}
                />
              )}
            </form.AppField>
            <form.AppField name="dimensionsLength">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-1' }}
                  labelProps={{ children: '* Length (cm)' }}
                  inputProps={{ type: 'number' }}
                />
              )}
            </form.AppField>
            <form.AppField name="cost">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: '* Cost (php)' }}
                  inputProps={{ type: 'number' }}
                />
              )}
            </form.AppField>
            <form.AppField name="supplier">
              {(field) => (
                <field.SingleSelectField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: '* Supplier' }}
                  options={
                    suppliers.data?.items.map((supplier) => ({
                      label: supplier.name,
                      value: supplier.id,
                    })) || []
                  }
                />
              )}
            </form.AppField>
            <form.SubscribeButton
              buttonProps={{
                className: 'col-span-4',
                children: 'Create Product',
              }}
            />
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewProductForm;
