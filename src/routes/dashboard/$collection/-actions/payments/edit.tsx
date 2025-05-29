import { useAppForm } from '@marahuyo/react-ui/forms/index';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@marahuyo/react-ui/ui/dialog';
import { useQueries } from '@tanstack/react-query';
import { Route } from '../..';
import {
  Collections,
  type InvoicesResponse,
  PaymentsPaymentMethodOptions,
  type PaymentsResponse,
  PaymentsStatusOptions,
} from '../../../../../../lib/pocketbase.gen';
import { closeDialogButtonRef } from '../../../../../../lib/utils';
import {
  listRecordsQuery,
  useMutateUpdateRecord,
  viewRecordsQuery,
} from '../../../../../queries';

const EditPaymentForm = () => {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const editPaymentMutation = useMutateUpdateRecord(
    Collections.Payments,
    searchQuery.id,
  );

  const [payment, invoices] = useQueries({
    queries: [
      viewRecordsQuery<PaymentsResponse>(Collections.Payments, searchQuery.id),
      listRecordsQuery<InvoicesResponse>(Collections.Invoices, {
        page: 1,
        perPage: 500,
      }),
    ],
  });

  const form = useAppForm({
    defaultValues: {
      invoice: payment.data?.invoice,
      paymentDate: payment.data?.paymentDate
        ? new Date(payment.data.paymentDate)
        : '',
      amountPaid: payment.data?.amountPaid,
      paymentMethod: payment.data?.paymentMethod,
      transactionId: payment.data?.transactionId,
      status: payment.data?.status,
      notes: payment.data?.notes,
    },
    onSubmit: async ({ value }) =>
      editPaymentMutation.mutateAsync(value, {
        onSuccess: () =>
          navigate({ search: (prev) => ({ ...prev, edit: undefined }) }),
      }),
  });

  return (
    <Dialog
      open={searchQuery.edit && !(payment.isLoading || invoices.isLoading)}
    >
      <DialogContent
        className="!max-w-3/4 max-h-3/4 overflow-y-auto no-scrollbar"
        ref={(e) =>
          closeDialogButtonRef(e, () =>
            navigate({ search: (prev) => ({ ...prev, edit: undefined }) }),
          )
        }
      >
        <DialogHeader>
          <DialogTitle>Edit Payment</DialogTitle>
          <DialogDescription>Edit payment information</DialogDescription>
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
            <form.AppField name="invoice">
              {(field) => (
                <field.SingleSelectField
                  containerProps={{ className: 'col-span-4' }}
                  labelProps={{ children: '* Invoice' }}
                  options={
                    invoices.data?.items.map((invoice) => ({
                      label: invoice.invoiceNumber,
                      value: invoice.id,
                    })) || []
                  }
                  selectProps={{ defaultValue: payment.data?.invoice }}
                />
              )}
            </form.AppField>
            <form.AppField name="transactionId">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-4' }}
                  labelProps={{ children: '* Transaction ID' }}
                />
              )}
            </form.AppField>
            <form.AppField name="paymentDate">
              {(field) => (
                <field.SingleDateInputField
                  containerProps={{ className: 'col-span-1' }}
                  labelProps={{ children: '* Payment Date' }}
                />
              )}
            </form.AppField>
            <form.AppField name="amountPaid">
              {(field) => (
                <field.TextInputField
                  containerProps={{ className: 'col-span-1' }}
                  labelProps={{ children: '* Amount Paid' }}
                  inputProps={{ type: 'number' }}
                />
              )}
            </form.AppField>
            <form.AppField name="paymentMethod">
              {(field) => (
                <field.SingleSelectField
                  containerProps={{ className: 'col-span-1' }}
                  labelProps={{ children: '* Payment Method' }}
                  options={Object.keys(PaymentsPaymentMethodOptions).map(
                    (option) => ({
                      label: option,
                      value: option,
                    }),
                  )}
                  selectProps={{ defaultValue: payment.data?.paymentMethod }}
                />
              )}
            </form.AppField>
            <form.AppField name="status">
              {(field) => (
                <field.SingleSelectField
                  containerProps={{ className: 'col-span-1' }}
                  labelProps={{ children: '* Status' }}
                  options={Object.keys(PaymentsStatusOptions).map((option) => ({
                    label: option,
                    value: option,
                  }))}
                  selectProps={{ defaultValue: payment.data?.status }}
                />
              )}
            </form.AppField>

            <form.AppField name="notes">
              {(field) => (
                <field.TextAreaInputField
                  containerProps={{ className: 'col-span-4' }}
                  labelProps={{ children: 'Notes' }}
                />
              )}
            </form.AppField>
            <form.SubscribeButton
              buttonProps={{
                className: 'col-span-4',
                children: 'Update Payment',
              }}
            />
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPaymentForm;
