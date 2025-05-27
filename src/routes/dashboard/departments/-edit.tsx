import { Route } from '.';
import { useNavigate } from '@tanstack/react-router';
import { useAppForm } from '@marahuyo/react-ui/forms/index';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@marahuyo/react-ui/ui/dialog';
import { useQuery } from '@tanstack/react-query';
import {
  listRecordsQuery,
  useMutateUpdateRecord,
  viewRecordsQuery,
} from '../../../queries';
import {
  Collections,
  type UsersResponse,
} from '../../../../lib/pocketbase.gen';
import type { ExpandedDepartmentResponse } from './-columns';
import { useFiles } from '../../../hooks/useFile';
import { closeDialogButtonRef } from '../../../../lib/utils';

const EditDepartmentForm = () => {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const departmentsMutation = useMutateUpdateRecord(
    Collections.Departments,
    searchQuery.id || '',
  );

  const department = useQuery({
    ...viewRecordsQuery<ExpandedDepartmentResponse>(
      Collections.Departments,
      searchQuery.id,
      {
        expand: 'managers,employees',
      },
    ),
    select: (data) => ({
      ...data,
      avatar: `/api/files/departments/${data.id}/${data.avatar}`,
      coverPhoto: `/api/files/departments/${data.id}/${data.coverPhoto}`,
    }),
  });

  const files = useFiles([
    department.data?.avatar,
    department.data?.coverPhoto,
  ]);

  const users = useQuery(
    listRecordsQuery<UsersResponse>(Collections.Users, {
      page: 1,
      perPage: 500,
    }),
  );

  const form = useAppForm({
    defaultValues: {
      name: department.data?.name ?? '',
      avatar: files.data ? [files.data[0]] : [],
      coverPhoto: files.data ? [files.data[1]] : [],
      managers: department.data?.managers ?? [],
      employees: department.data?.employees ?? [],
    },
    onSubmit: async ({ value }) =>
      departmentsMutation.mutateAsync(
        {
          ...value,
        },
        {
          onSuccess: () =>
            navigate({
              search: (prev) => ({
                ...prev,
                editDepartment: undefined,
                id: undefined,
              }),
            }),
        },
      ),
  });

  if (department.isLoading || files.isLoading || users.isLoading) {
    return <>Loading...</>;
  }

  return (
    <Dialog open={searchQuery.editDepartment}>
      <DialogContent
        ref={(e) =>
          closeDialogButtonRef(e, () => {
            navigate({
              search: (prev) => ({
                ...prev,
                editDepartment: undefined,
                id: undefined,
              }),
            });
          })
        }
        className="!max-w-3/4 max-h-3/4 overflow-y-auto no-scrollbar"
      >
        <DialogHeader>
          <DialogTitle>Edit Department</DialogTitle>
          <DialogDescription>Edit department information</DialogDescription>
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
            <form.AppField name="name">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-4' }}
                  labelProps={{ children: '* Name' }}
                />
              )}
            </form.AppField>
            <form.AppField name="avatar">
              {(field) => (
                <field.FileUploadField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: '* Avatar' }}
                  fileUploadProps={{ maxFiles: 1 }}
                />
              )}
            </form.AppField>
            <form.AppField name="coverPhoto">
              {(field) => (
                <field.FileUploadField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: '* Cover Photo' }}
                  fileUploadProps={{ maxFiles: 1 }}
                />
              )}
            </form.AppField>
            <form.AppField name="managers">
              {(field) => (
                <field.MultiSelectField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: '* Managers' }}
                  options={
                    users.data?.items.map((user) => ({
                      label: user.name,
                      value: user.id,
                    })) || []
                  }
                  multiSelectProps={{ defaultValue: department.data?.managers }}
                />
              )}
            </form.AppField>
            <form.AppField name="employees">
              {(field) => (
                <field.MultiSelectField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: '* Employees' }}
                  options={
                    users.data?.items.map((user) => ({
                      label: user.name,
                      value: user.id,
                    })) || []
                  }
                  multiSelectProps={{
                    defaultValue: department.data?.employees,
                  }}
                />
              )}
            </form.AppField>
            <form.SubscribeButton
              buttonProps={{
                className: 'col-span-4',
                children: 'Update Department',
              }}
            />
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDepartmentForm;
