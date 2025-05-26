import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@marahuyo/react-ui/ui/dialog';
import { Route } from '.';
import { useNavigate } from '@tanstack/react-router';
import { useAppForm } from '@marahuyo/react-ui/forms/index';
import {
  Collections,
  CompaniesTypeOptions,
  type UsersResponse,
} from '../../../../lib/pocketbase.gen';
import { useQuery } from '@tanstack/react-query';
import { listRecordsQuery, useMutateCreateRecord } from '../../../queries';
import { toast } from 'sonner';
import { closeDialogButtonRef } from '../../../../lib/utils';

const NewCompanyForm = () => {
  const searchQuery = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const companiesMutation = useMutateCreateRecord(Collections.Companies);

  const users = useQuery(
    listRecordsQuery<UsersResponse>(
      Collections.Users,
      { page: 1, perPage: 500 },
      {
        filter: "role = 'customer_rep'",
      },
    ),
  );

  const form = useAppForm({
    defaultValues: {
      name: '',
      type: CompaniesTypeOptions.internal,
      address: '',
      contactEmail: '',
      contactPhone: '',
      primaryContactPerson: '',
    },
    onSubmit: async ({ value }) =>
      companiesMutation.mutateAsync(value, {
        onSuccess: () => {
          navigate({
            search: (prev) => ({
              ...prev,
              newCompany: undefined,
              id: undefined,
            }),
          });
        },
      }),
  });

  return (
    <Dialog open={searchQuery.newCompany}>
      <DialogContent className="!max-w-3/4 max-h-3/4 overflow-y-auto no-scrollbar">
        <DialogHeader>
          <DialogTitle>New Company</DialogTitle>
          <DialogDescription>Create new company</DialogDescription>
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
            <form.AppField name="address">
              {(field) => (
                <field.TextAreaInputField
                  containerProps={{ className: 'col-span-4' }}
                  labelProps={{ children: '* Address' }}
                />
              )}
            </form.AppField>
            <form.AppField name="contactEmail">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-4' }}
                  labelProps={{ children: '* Email address' }}
                />
              )}
            </form.AppField>
            <form.AppField name="type">
              {(field) => (
                <field.SingleSelectField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: '* Type' }}
                  options={Object.keys(CompaniesTypeOptions).map((option) => ({
                    label: option,
                    value: option,
                  }))}
                />
              )}
            </form.AppField>
            <form.AppField name="contactPhone">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: '* Phone Number' }}
                />
              )}
            </form.AppField>
            <form.AppField name="primaryContactPerson">
              {(field) => (
                <field.SingleSelectField
                  containerProps={{ className: 'col-span-4' }}
                  labelProps={{ children: '* Primary Contact Person' }}
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
                children: 'Create Company',
              }}
            />
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewCompanyForm;
