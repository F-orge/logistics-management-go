import { Route } from '../..';
import { useQueries } from '@tanstack/react-query';
import {
  listRecordsQuery,
  useMutateUpdateRecord,
  viewRecordsQuery,
} from '../../../../../queries';
import {
  Collections,
  type OrdersResponse,
  InvoicesStatusOptions,
  type InvoicesResponse,
  type CompaniesResponse,
} from '../../../../../../lib/pocketbase.gen';
import { useAppForm } from '@marahuyo/react-ui/forms/index';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@marahuyo/react-ui/ui/dialog';
import { closeDialogButtonRef } from '../../../../../../lib/utils';
import { useFiles } from '../../../../../hooks/useFile';

const EditInvoiceForm = () => {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const editInvoiceMutation = useMutateUpdateRecord(
    Collections.Invoices,
    searchQuery.id,
  );

  const [invoice, orders, customers] = useQueries({
    queries: [
      viewRecordsQuery<InvoicesResponse>(Collections.Invoices, searchQuery.id),
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

  const invoicePDFFile = useFiles([
    `/api/files/invoices/${searchQuery.id}/${invoice.data?.invoicePdf}`,
  ]);

  const form = useAppForm({
    defaultValues: {
      invoiceNumber: invoice.data?.invoiceNumber,
      orderRef: invoice.data?.orderRef,
      customer: invoice.data?.customer,
      invoiceDate: invoice.data?.invoiceDate
        ? new Date(invoice.data?.invoiceDate)
        : '',
      dueDate: invoice.data?.dueDate ? new Date(invoice.data?.dueDate) : '',
      totalAmount: invoice.data?.totalAmount,
      status: invoice.data?.status,
      invoicePdf: invoicePDFFile.data,
    },
    onSubmit: async ({ value }) =>
      editInvoiceMutation.mutateAsync(value, {
        onSuccess: () =>
          navigate({
            search: (prev) => ({ ...prev, edit: undefined, id: undefined }),
          }),
      }),
  });

  return (
    <Dialog
      open={
        searchQuery.edit &&
        !(
          orders.isLoading ||
          customers.isLoading ||
          invoice.isLoading ||
          invoicePDFFile.isLoading
        )
      }
    >
      <DialogContent
        className="!max-w-3/4 max-h-3/4 overflow-y-auto no-scrollbar"
        ref={(e) =>
          closeDialogButtonRef(e, () =>
            navigate({
              search: (prev) => ({ ...prev, edit: undefined, id: undefined }),
            }),
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
                  selectProps={{ defaultValue: invoice.data?.orderRef }}
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
                  selectProps={{ defaultValue: invoice.data?.customer }}
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

export default EditInvoiceForm;
