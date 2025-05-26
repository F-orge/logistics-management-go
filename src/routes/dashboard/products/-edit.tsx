import { Route } from '.';
import { useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import {
  listRecordsQuery,
  useMutateUpdateRecord,
  viewRecordsQuery,
} from '../../../queries';
import {
  Collections,
  type ProductsRecord,
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
import { useFiles } from '../../../hooks/useFile';

const EditProductForm = () => {
  const searchQuery = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const updateProductMutation = useMutateUpdateRecord(
    Collections.Products,
    searchQuery.id || '',
  );

  const product = useQuery(
    viewRecordsQuery<ProductsRecord>(Collections.Products, searchQuery.id),
  );

  const imageFiles = useFiles(
    product.data?.image.map(
      (file) => `/api/files/products/${searchQuery.id}/${file}`,
    ) || [],
  );

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
      sku: product.data?.sku,
      name: product.data?.name,
      description: product.data?.description,
      weight: product.data?.weight,
      dimensions_width: product.data?.dimensionsWidth,
      dimensions_height: product.data?.dimensionsHeight,
      dimensions_length: product.data?.dimensionsLength,
      cost: product.data?.cost,
      supplier: product.data?.supplier ?? '',
      image: imageFiles.data || [],
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      await updateProductMutation.mutateAsync(
        {
          ...value,
          cost: Number(value.cost),
          weight: Number(value.weight),
          dimensions_width: undefined,
          dimensions_height: undefined,
          dimensions_length: undefined,
          dimensions: `${value.dimensions_width}x${value.dimensions_length}x${value.dimensions_height} cm`,
        },
        {
          onSuccess: () => {
            navigate({
              search: (prev) => ({ ...prev, editProduct: undefined }),
            });
          },
        },
      );
    },
  });

  if (product.isLoading || imageFiles.isLoading || suppliers.isLoading) {
    return (
      <Dialog open={searchQuery.editProduct}>
        <DialogContent>Loading...</DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={searchQuery.editProduct}>
      <DialogContent
        className="!max-w-3/4 max-h-3/4 overflow-y-auto no-scrollbar"
        ref={(e) =>
          closeDialogButtonRef(e, () =>
            navigate({
              search: (prev) => ({ ...prev, editProduct: undefined }),
            }),
          )
        }
      >
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Edit product product</DialogDescription>
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
            <form.AppField name="dimensions_width">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-1' }}
                  labelProps={{ children: '* Width (cm)' }}
                  inputProps={{ type: 'number' }}
                />
              )}
            </form.AppField>
            <form.AppField name="dimensions_height">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-1' }}
                  labelProps={{ children: '* Height (cm)' }}
                  inputProps={{ type: 'number' }}
                />
              )}
            </form.AppField>
            <form.AppField name="dimensions_length">
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
                  selectProps={{ defaultValue: product.data?.supplier }}
                />
              )}
            </form.AppField>
            <form.SubscribeButton
              buttonProps={{
                className: 'col-span-4',
                children: 'Update Product',
              }}
            />
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductForm;
