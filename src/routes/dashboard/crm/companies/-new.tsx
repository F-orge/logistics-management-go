import { useAppForm } from '@/components/form';
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import FormDialog from '@/components/ui/form-dialog';
import { insertCompanySchema } from '@/db/schemas';
import { useNavigate, useSearch } from '@tanstack/react-router';
import z from 'zod';

const NewCrmCompanyRecord = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/companies' });
  const searchQuery = useSearch({ from: '/dashboard/crm/companies/' });

  const form = useAppForm({
    defaultValues: {} as z.infer<typeof insertCompanySchema>,
  });

  return (
    <form.AppForm>
      <FormDialog
        className="!max-w-3/4"
        title="New Company"
        description="Fill out information"
        open={searchQuery.new}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, new: undefined }) })
        }
        onSave={() => form.handleSubmit()}
      >
        <FieldGroup>
          <FieldGroup>
            <form.AppField name="name">
              {(field) => (
                <field.TextField label="Name" description="The company name" />
              )}
            </form.AppField>
          </FieldGroup>
          <FieldSeparator />
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Company Address</FieldLegend>
              <FieldDescription>Enter the company address</FieldDescription>
            </FieldSet>
            <div className="grid grid-cols-4 gap-5">
              <form.AppField name="street">
                {(field) => (
                  <field.TextAreaField
                    label="Street"
                    description="Company Street Address"
                    className="col-span-full"
                  />
                )}
              </form.AppField>
              <form.AppField name="city">
                {(field) => (
                  <field.TextField
                    label="City"
                    description="Company Street Address"
                  />
                )}
              </form.AppField>
              <form.AppField name="postalCode">
                {(field) => (
                  <field.TextField
                    label="Postal Code"
                    description="Company Street Address"
                  />
                )}
              </form.AppField>
              <form.AppField name="country">
                {(field) => (
                  <field.TextField
                    label="Country"
                    description="Company Street Address"
                    className="col-span-2"
                  />
                )}
              </form.AppField>
            </div>
          </FieldGroup>
          <FieldSeparator />
          <FieldGroup></FieldGroup>
        </FieldGroup>
      </FormDialog>
    </form.AppForm>
  );
};

export default NewCrmCompanyRecord;
