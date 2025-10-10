import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import {
  useLoaderData,
  useNavigate,
  useSearch,
} from '@tanstack/react-router';

const ViewProductFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/products' });
  const searchQuery = useSearch({ from: '/dashboard/crm/products/' });
  const { dataTable } = useLoaderData({ from: '/dashboard/crm/products/' });
  const data = dataTable.find((row) => row.id === searchQuery.id);

  if (!data) {
    return <></>;
  }

  return (
    <Dialog
      open={searchQuery.view && !!searchQuery.id}
      onOpenChange={() =>
        navigate({
          search: (prev) => ({ ...prev, view: undefined, id: undefined }),
        })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
          <DialogDescription>
            Detailed information about {data.name}.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <div className="grid gap-4 py-4">
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Basic Information</FieldLegend>
              <FieldDescription>
                Fundamental details about the product.
              </FieldDescription>
              <FieldGroup>
                <Field orientation="horizontal">
                  <FieldLabel>ID</FieldLabel>
                  <FieldDescription>{data.id}</FieldDescription>
                </Field>
                <Field orientation="horizontal">
                  <FieldLabel>Name</FieldLabel>
                  <FieldDescription>{data.name}</FieldDescription>
                </Field>
                {data.description && (
                  <Field orientation="horizontal">
                    <FieldLabel>Description</FieldLabel>
                    <FieldDescription>{data.description}</FieldDescription>
                  </Field>
                )}
                {data.price && (
                  <Field orientation="horizontal">
                    <FieldLabel>Price</FieldLabel>
                    <FieldDescription>
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'PHP',
                      }).format(data.price)}
                    </FieldDescription>
                  </Field>
                )}
                {data.sku && (
                  <Field orientation="horizontal">
                    <FieldLabel>SKU</FieldLabel>
                    <FieldDescription>{data.sku}</FieldDescription>
                  </Field>
                )}
                {data.type && (
                  <Field orientation="horizontal">
                    <FieldLabel>Type</FieldLabel>
                    <FieldDescription>{data.type}</FieldDescription>
                  </Field>
                )}
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
              <FieldLegend>Timestamps</FieldLegend>
              <FieldDescription>
                Creation and last update times.
              </FieldDescription>
              <FieldGroup>
                {data.createdAt && (
                  <Field orientation="horizontal">
                    <FieldLabel>Created At</FieldLabel>
                    <FieldDescription>
                      {new Date(data.createdAt).toLocaleString()}
                    </FieldDescription>
                  </Field>
                )}
                {data.updatedAt && (
                  <Field orientation="horizontal">
                    <FieldLabel>Updated At</FieldLabel>
                    <FieldDescription>
                      {new Date(data.updatedAt).toLocaleString()}
                    </FieldDescription>
                  </Field>
                )}
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProductFormDialog;
