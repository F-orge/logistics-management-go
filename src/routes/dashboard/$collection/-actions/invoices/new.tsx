import { useAppForm } from '@marahuyo/react-ui/forms/index';
import { Button } from '@marahuyo/react-ui/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@marahuyo/react-ui/ui/dialog';
import { useQueries } from '@tanstack/react-query';
import { Route } from '../..';
import {
  Collections,
  type CompaniesResponse,
  InvoicesStatusOptions,
  type OrdersResponse,
} from '../../../../../../lib/pocketbase.gen';
import { closeDialogButtonRef } from '../../../../../../lib/utils';
import {
  listRecordsQuery,
  useMutateCreateRecord,
} from '../../../../../queries';
import { pb } from '../../../../../../lib/pocketbase';

const NewInvoiceForm = () => {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const createInvoiceMutation = useMutateCreateRecord(Collections.Invoices);

  const [orders, customers] = useQueries({
    queries: [
      listRecordsQuery<OrdersResponse>(Collections.Orders, {
        page: 1,
        perPage: 500,
      }),
      listRecordsQuery<CompaniesResponse>(
        Collections.Companies,
        { page: 1, perPage: 500 },
        { filter: "type = 'customer'" },
      ),
    ],
  });

  const form = useAppForm({
    defaultValues: {
      invoiceNumber: '',
      orderRef: '',
      customer: '',
      invoiceDate: new Date(),
      dueDate: '',
      totalAmount: '',
      status: InvoicesStatusOptions.draft,
      invoicePdf: [] as File[],
    },
    onSubmit: async ({ value }) =>
      createInvoiceMutation.mutateAsync(value, {
        onSuccess: () =>
          navigate({ search: (prev) => ({ ...prev, new: undefined }) }),
      }),
  });

  return (
    <Dialog open={searchQuery.new}>
      {['executive', 'finance_dept'].includes(
        pb.authStore.record?.role || '',
      ) && (
        <DialogTrigger asChild>
          <Button
            isLoading={orders.isLoading || customers.isLoading}
            onClick={() =>
              navigate({ search: (prev) => ({ ...prev, new: true }) })
            }
            size={'sm'}
          >
            Create Invoice
          </Button>
        </DialogTrigger>
      )}
      <DialogContent
        className="!max-w-3/4 max-h-3/4 overflow-y-auto no-scrollbar"
        ref={(e) =>
          closeDialogButtonRef(e, () =>
            navigate({ search: (prev) => ({ ...prev, new: undefined }) }),
          )
        }
      >
        <DialogHeader>
          <DialogTitle>New Invoice</DialogTitle>
          <DialogDescription>Create a new invoice</DialogDescription>
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
            <form.AppField name="invoiceNumber">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-4' }}
                  labelProps={{ children: '* Invoice Number' }}
                />
              )}
            </form.AppField>
            <form.AppField name="orderRef">
              {(field) => (
                <field.SingleSelectField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: '* Order ID' }}
                  options={
                    orders.data?.items.map((order) => ({
                      label: order.orderIdCustom,
                      value: order.id,
                    })) || []
                  }
                />
              )}
            </form.AppField>
            <form.AppField name="customer">
              {(field) => (
                <field.SingleSelectField
                  containerProps={{ className: 'col-span-2' }}
                  labelProps={{ children: '* Customer' }}
                  options={
                    customers.data?.items.map((customer) => ({
                      label: customer.name,
                      value: customer.id,
                    })) || []
                  }
                />
              )}
            </form.AppField>
            <form.AppField name="invoiceDate">
              {(field) => (
                <field.SingleDateInputField
                  containerProps={{ className: 'col-span-1' }}
                  labelProps={{ children: '* Invoice Date' }}
                />
              )}
            </form.AppField>
            <form.AppField name="dueDate">
              {(field) => (
                <field.SingleDateInputField
                  containerProps={{ className: 'col-span-1' }}
                  labelProps={{ children: '* Due Date' }}
                />
              )}
            </form.AppField>
            <form.AppField name="totalAmount">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-1' }}
                  labelProps={{ children: '* Total Amount' }}
                  inputProps={{ type: 'number' }}
                />
              )}
            </form.AppField>
            <form.AppField name="status">
              {(field) => (
                <field.SingleSelectField
                  containerProps={{ className: 'col-span-1' }}
                  labelProps={{ children: '* Status' }}
                  options={Object.keys(InvoicesStatusOptions).map((option) => ({
                    label: option,
                    value: option,
                  }))}
                />
              )}
            </form.AppField>
            <form.AppField name="invoicePdf">
              {(field) => (
                <field.FileUploadField
                  containerProps={{ className: 'col-span-4' }}
                  labelProps={{ children: '* Invoice PDF' }}
                  fileUploadProps={{ maxFiles: 1 }}
                />
              )}
            </form.AppField>
            <form.SubscribeButton
              buttonProps={{
                className: 'col-span-4',
                children: 'Create Invoice',
              }}
            />
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewInvoiceForm;
