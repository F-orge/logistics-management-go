import { useSuspenseQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAppForm, withForm } from '@/components/ui/form';
import { pb, type UpdateRecord } from '@/pocketbase';
import {
  type CrmCompaniesRecord,
  type CrmContactsRecord,
  type CrmInvoicesRecord,
  CrmInvoicesStatusOptions,
} from '@/pocketbase/types';

export const EditInvoiceForm = withForm({
  defaultValues: {} as UpdateRecord<CrmInvoicesRecord>,
  props: {} as {
    companies: CrmCompaniesRecord[];
    contacts: CrmContactsRecord[];
  },
  render: function ({ form, companies, contacts }) {
    return (
      <>
        <form.AppField name="invoice_number">
          {(field) => (
            <field.TextField
              label="Invoice Number"
              required
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="status">
          {(field) => (
            <field.SelectField
              options={Object.keys(CrmInvoicesStatusOptions).map((val) => ({
                label: val.charAt(0).toUpperCase() + val.slice(1),
                value: val,
              }))}
              label="Status"
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="company">
          {(field) => (
            <field.SelectField
              options={companies.map((val) => ({
                label: val.name,
                value: val.id,
              }))}
              label="Company"
              required
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="contact">
          {(field) => (
            <field.SelectField
              options={contacts.map((val) => ({
                label: `${val.first_name} ${val.last_name}`,
                value: val.id,
              }))}
              label="Contact"
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="invoice_date">
          {(field) => (
            <field.DateField
              label="Invoice Date"
              required
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="due_date">
          {(field) => (
            <field.DateField label="Due Date" required className="col-span-2" />
          )}
        </form.AppField>
        <form.AppField name="currency">
          {(field) => (
            <field.TextField
              label="Currency"
              placeholder="USD"
              required
              className="col-span-1"
            />
          )}
        </form.AppField>
        <form.AppField name="subtotal">
          {(field) => (
            <field.TextField label="Subtotal" required className="col-span-1" />
          )}
        </form.AppField>
        <form.AppField name="tax_amount">
          {(field) => (
            <field.TextField
              label="Tax Amount"
              required
              className="col-span-2"
            />
          )}
        </form.AppField>
        <form.AppField name="payment_terms">
          {(field) => (
            <field.TextField label="Payment Terms" className="col-span-full" />
          )}
        </form.AppField>
      </>
    );
  },
});

const EditInvoiceDialog = () => {
  const route = getRouteApi('/dashboard/crm/invoices/');

  const navigate = route.useNavigate();
  const searchParams = route.useSearch();

  const { data: invoice } = useSuspenseQuery({
    queryKey: ['invoices', searchParams.id],
    queryFn: () => pb.collection('crm_invoices').getOne(searchParams.id ?? ''),
  });

  const { data: companies } = useSuspenseQuery({
    queryKey: ['companies', searchParams.id],
    queryFn: () => pb.collection('crm_companies').getList(1, 50),
  });

  const { data: contacts } = useSuspenseQuery({
    queryKey: ['contacts', searchParams.id],
    queryFn: () => pb.collection('crm_contacts').getList(1, 50),
  });

  const form = useAppForm({
    defaultValues: invoice as UpdateRecord<CrmInvoicesRecord>,
    onSubmit: async ({ value }) => {
      await toast
        .promise(
          pb.collection('crm_invoices').update(searchParams.id ?? '', value),
          {
            success: 'Invoice Updated Successfully',
            error: 'An Error Occurred when updating the record',
          },
        )
        .unwrap();

      navigate({
        search: (prev) => ({ ...prev, editInvoice: undefined, id: undefined }),
      });
    },
  });

  return (
    <Dialog
      open={searchParams.editInvoice}
      onOpenChange={() =>
        navigate({
          search: (prev) => ({
            ...prev,
            editInvoice: undefined,
            id: undefined,
          }),
        })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Invoice Information</DialogTitle>
          <DialogDescription>
            Change the information for invoice: {invoice.invoice_number}
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid grid-cols-4 gap-2.5"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <EditInvoiceForm
              form={form}
              companies={companies.items}
              contacts={contacts.items}
            />
            <form.SubmitButton>Edit Invoice</form.SubmitButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditInvoiceDialog;
