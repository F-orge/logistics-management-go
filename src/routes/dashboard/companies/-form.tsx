import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CompaniesTypeOptions } from '../../../../lib/pocketbase.gen';
import { withForm } from '../../../components/form';
import { pb } from '../../../../lib/pocketbase';
import { z } from 'zod';
import { ClientResponseError } from 'pocketbase';
import { toast } from 'sonner';
import {
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@marahuyo/react-ui/ui/alert-dialog';

const companySchema = z.object({
  name: z.string(),
  address: z.string(),
  type: z.nativeEnum(CompaniesTypeOptions),
  contactEmail: z.string(),
  contactPhone: z.string(),
  primaryContactPerson: z.string(),
});

export const CreateCompanyForm = withForm({
  defaultValues: {} as z.infer<typeof companySchema>,
  validators: {
    onChange: companySchema,
  },
  onSubmit: async ({ value }) => {
    const queryClient = useQueryClient();
    // TODO: convert me into a global error for better composability
    try {
      pb.collection('companies').create(value);
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    } catch (e) {
      if (e instanceof ClientResponseError) {
        toast(`Error ${e.status}`, { description: e.message });
      }
    }
  },
  render: function Render({ form }) {
    const users = useQuery({
      queryKey: ['companies'],
      queryFn: () => pb.collection('companies').getFullList(),
    });

    return (
      <div className="grid grid-cols-4">
        <form.AppForm>
          <form.AppField name="name">
            {(field) => <field.TextInputField inputProps={{ type: 'text' }} />}
          </form.AppField>
          <form.AppField name="address">
            {(field) => (
              <field.TextAreaInputField
                textAreaProps={{ placeholder: 'Address of the company' }}
              />
            )}
          </form.AppField>
          <form.AppField name="contactEmail">
            {(field) => <field.TextInputField inputProps={{ type: 'email' }} />}
          </form.AppField>
          <form.AppField name="contactPhone">
            {(field) => <field.TextInputField inputProps={{ type: 'text' }} />}
          </form.AppField>
          <form.AppField name="type">
            {(field) => (
              <field.SingleSelectField
                options={Object.keys(CompaniesTypeOptions).map((option) => ({
                  label: option,
                  value: option,
                }))}
              />
            )}
          </form.AppField>
          <form.AppField name="primaryContactPerson">
            {(field) => (
              <field.SingleSelectField
                options={
                  users?.data?.map((option) => ({
                    label: option.name,
                    value: option.id,
                  })) || []
                }
              />
            )}
          </form.AppField>
          <form.SubscribeButton buttonProps={{ children: 'Create company' }} />
        </form.AppForm>
      </div>
    );
  },
});

export const DeleteCompanyAlertDialogForm = withForm({
  defaultValues: { id: '' },
  validators: { onChange: z.object({ id: z.string() }) },
  onSubmit: async ({ value }) => {
    const queryClient = useQueryClient();
    try {
      pb.collection('companies').delete(value.id);
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    } catch (e) {
      if (e instanceof ClientResponseError) {
        toast(`Error ${e.status}`, { description: e.message });
      }
      throw e;
    }
  },
  render: function Render({ form }) {
    const company = useQuery({
      queryKey: ['companies'],
      queryFn: () => pb.collection('companies').getOne(''),
    });

    return (
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deleting Company</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete `{company.data?.name}`
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel />
          <AlertDialogAction asChild>
            <form.SubscribeButton />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    );
  },
});
