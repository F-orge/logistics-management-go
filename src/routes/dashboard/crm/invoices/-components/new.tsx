import { useMutation } from '@tanstack/react-query';
import {
  useNavigate,
  useRouteContext,
  useSearch,
} from '@tanstack/react-router';
import { useAppForm } from '@/components/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import { CrmInvoiceStatus, CrmPaymentMethod } from '@/db/types';
import { ORPCInputs } from '@/orpc/client';
import { createInvoice } from '@/queries/crm/invoices';
import { crmInvoiceInsertSchema } from '@/schemas/crm/invoices';

const NewInvoiceFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/invoices' });
  const searchQuery = useSearch({ from: '/dashboard/crm/invoices/' });
  const { queryClient } = useRouteContext({ from: '/dashboard/crm/invoices/' });

  const createMutation = useMutation(createInvoice, queryClient);

  const form = useAppForm({
    defaultValues: {} as ORPCInputs['crm']['createInvoice'],
    validators: {
      onChange: crmInvoiceInsertSchema,
    },
    onSubmit: async ({ value }) =>
      createMutation.mutateAsync(value, {
        onSuccess: () => {
          navigate({ search: (prev) => ({ ...prev, new: undefined }) });
        },
      }),
  });

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Invoice</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new invoice record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <FieldGroup>
              <FieldSet>
                <FieldLegend>Invoice Details</FieldLegend>
                <FieldDescription>
                  Provide the essential information for the invoice.
                </FieldDescription>
                <FieldGroup>
                  <form.AppField name="issueDate">
                    {(field) => (
                      <field.DateField
                        label="Issue Date"
                        description="The date the invoice was issued."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="dueDate">
                    {(field) => (
                      <field.DateField
                        label="Due Date"
                        description="The date the invoice is due."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="paidAt">
                    {(field) => (
                      <field.DateField
                        label="Paid At"
                        description="The date the invoice was paid."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="sentAt">
                    {(field) => (
                      <field.DateField
                        label="Sent At"
                        description="The date the invoice was sent."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="opportunityId">
                    {(field) => (
                      <field.TextField
                        label="Opportunity ID"
                        description="The ID of the opportunity associated with this invoice."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="paymentMethod">
                    {(field) => (
                      <field.SelectField
                        label="Payment Method"
                        description="The method of payment for the invoice."
                        options={Object.values(CrmPaymentMethod).map(
                          (method) => ({
                            label: method,
                            value: method,
                          }),
                        )}
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="status">
                    {(field) => (
                      <field.SelectField
                        label="Status"
                        description="The current status of the invoice."
                        options={Object.values(CrmInvoiceStatus).map(
                          (status) => ({
                            label: status,
                            value: status,
                          }),
                        )}
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="total">
                    {(field) => (
                      <field.NumberField
                        label="Total Amount"
                        description="The total amount of the invoice."
                      />
                    )}
                  </form.AppField>
                </FieldGroup>
              </FieldSet>
              <form.SubmitButton>Create Invoice</form.SubmitButton>
            </FieldGroup>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewInvoiceFormDialog;
