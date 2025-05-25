import React from 'react';
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
  useMutateCreateRecord,
  useMutateUpdateRecord,
  viewRecordsQuery,
} from '../../../queries';
import {
  Collections,
  type UsersResponse,
} from '../../../../lib/pocketbase.gen';
import type { ExpandedDepartmentResponse } from './-columns';

const EditDepartmentForm = () => {
  const searchQuery = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const departmentsMutation = useMutateUpdateRecord(
    Collections.Departments,
    searchQuery.id || '',
  );

  const department = useQuery(
    viewRecordsQuery<ExpandedDepartmentResponse>(
      Collections.Departments,
      searchQuery.id,
      {
        expand: 'managers,employees',
      },
    ),
  );

  const users = useQuery(
    listRecordsQuery<UsersResponse>(Collections.Users, {
      page: 1,
      perPage: 500,
    }),
  );

  const form = useAppForm({
    defaultValues: {
      name: department.data?.name ?? '',
      avatar: [department.data?.avatar].map(
        (file) => `/api/files/departments/${searchQuery.id}/${file}`,
      ),
      coverPhoto: [department.data?.coverPhoto].map(
        (file) => `/api/files/departments/${searchQuery.id}/${file}`,
      ),
      managers: department.data?.managers ?? [],
      employees: department.data?.employees ?? [],
    },
    onSubmit: async ({ value }) =>
      departmentsMutation.mutateAsync(
        { ...value, avatar: value.avatar[0], coverPhoto: value.coverPhoto[0] },
        {
          onSuccess: () =>
            navigate({
              search: (prev) => ({ ...prev, editDepartment: undefined }),
            }),
        },
      ),
  });

  if (department.isLoading) {
    return <>Loading...</>;
  }

  return (
    <Dialog open={searchQuery.editDepartment}>
      <DialogContent className="!max-w-3/4 max-h-3/4 overflow-y-auto no-scrollbar">
        <DialogHeader>
          <DialogTitle>New Department</DialogTitle>
          <DialogDescription>Create a new department</DialogDescription>
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
                />
              )}
            </form.AppField>
            <form.SubscribeButton
              buttonProps={{
                className: 'col-span-4',
                children: 'Create Department',
              }}
            />
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDepartmentForm;
