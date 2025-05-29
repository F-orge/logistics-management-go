import { Route } from '../..';
import { useQueries } from '@tanstack/react-query';
import {
  listRecordsQuery,
  useMutateCreateRecord,
} from '../../../../../queries';
import {
  Collections,
  type InvoicesResponse,
  PaymentsStatusOptions,
  PaymentsPaymentMethodOptions,
} from '../../../../../../lib/pocketbase.gen';
import { useAppForm } from '@marahuyo/react-ui/forms/index';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@marahuyo/react-ui/ui/dialog';
import { closeDialogButtonRef } from '../../../../../../lib/utils';
import { Button } from '@marahuyo/react-ui/ui/button';

const NewPaymentForm = () => {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const createPaymentMutation = useMutateCreateRecord(Collections.Payments);

  const [invoices] = useQueries({
    queries: [
      listRecordsQuery<InvoicesResponse>(Collections.Invoices, {
        page: 1,
        perPage: 500,
      }),
    ],
  });

  const form = useAppForm({
    defaultValues: {
      invoice: '',
      paymentDate: '',
      amountPaid: 0,
      paymentMethod: PaymentsPaymentMethodOptions.other,
      transactionId: '',
      status: PaymentsStatusOptions.pending,
      notes: '',
    },
    onSubmit: async ({ value }) =>
      createPaymentMutation.mutateAsync(value, {
        onSuccess: () =>
          navigate({ search: (prev) => ({ ...prev, new: undefined }) }),
      }),
  });

  return (
    <Dialog open={searchQuery.new}>
      <DialogTrigger asChild>
        <Button
          isLoading={invoices.isLoading}
          onClick={() =>
            navigate({ search: (prev) => ({ ...prev, new: true }) })
          }
          size={'sm'}
        >
          Create Payment
        </Button>
      </DialogTrigger>
      <DialogContent
        className="!max-w-3/4 max-h-3/4 overflow-y-auto no-scrollbar"
        ref={(e) =>
          closeDialogButtonRef(e, () =>
            navigate({ search: (prev) => ({ ...prev, new: undefined }) }),
          )
        }
      >
        <DialogHeader>
          <DialogTitle>New Payment</DialogTitle>
          <DialogDescription>Create a new payment</DialogDescription>
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
                children: 'Create Invoice',
              }}
            />
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewPaymentForm;
