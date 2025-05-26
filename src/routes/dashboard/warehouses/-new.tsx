import { useNavigate } from '@tanstack/react-router';
import { Route } from '.';
import { useQuery } from '@tanstack/react-query';
import { listRecordsQuery, useMutateCreateRecord } from '../../../queries';
import {
  Collections,
  type UsersResponse,
} from '../../../../lib/pocketbase.gen';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@marahuyo/react-ui/ui/dialog';
import { closeDialogButtonRef } from '../../../../lib/utils';
import { useAppForm } from '@marahuyo/react-ui/forms/index';
import { newWarehouseFormSchema } from './-schema';

const NewWarehouseForm = () => {
  const searchQuery = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const createWarehouseMutation = useMutateCreateRecord(Collections.Warehouses);

  const users = useQuery(
    listRecordsQuery<UsersResponse>(Collections.Users, {
      page: 1,
      perPage: 500,
    }),
  );

  const form = useAppForm({
    defaultValues: {
      name: '',
      address: '',
      longitude: 0.0,
      latitude: 0.0,
      manager: '',
    },
    validators: { onChange: newWarehouseFormSchema },
    onSubmit: async ({ value }) =>
      createWarehouseMutation.mutateAsync(value, {
        onSuccess: () => {
          navigate({
            search: (prev) => ({ ...prev, newWarehouse: undefined }),
          });
        },
      }),
  });

  return (
    <Dialog open={searchQuery.newWarehouse}>
      <DialogContent
        className="!max-w-3/4 max-h-3/4"
        ref={(e) =>
          closeDialogButtonRef(e, () => {
            navigate({
              search: (prev) => ({ ...prev, newWarehouse: undefined }),
            });
          })
        }
      >
        <DialogHeader>
          <DialogTitle>Create Warehouse</DialogTitle>
          <DialogDescription>Create a new warehouse</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="grid grid-cols-4 gap-5"
        >
          <form.AppForm>
            <form.AppField name="name">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-4' }}
                  labelProps={{ children: '* Name' }}
                />
              )}
            </form.AppField>
            <form.AppField name="address">
              {(field) => (
                <field.TextAreaInputField
                  containerProps={{ className: 'col-span-4' }}
                  labelProps={{ children: '* Address' }}
                />
              )}
            </form.AppField>
            <form.AppField name="longitude">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: '* Longitude' }}
                />
              )}
            </form.AppField>
            <form.AppField name="latitude">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: '* Latitude' }}
                />
              )}
            </form.AppField>
            <form.AppField name="manager">
              {(field) => (
                <field.SingleSelectField
                  containerProps={{ className: 'col-span-4' }}
                  labelProps={{ children: '* Latitude' }}
                  options={
                    users.data?.items.map((user) => ({
                      label: user.name,
                      value: user.id,
                    })) || []
                  }
                />
              )}
            </form.AppField>
            <form.SubscribeButton
              buttonProps={{
                className: 'col-span-4',
                children: 'Create Warehouse',
              }}
            />
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewWarehouseForm;
