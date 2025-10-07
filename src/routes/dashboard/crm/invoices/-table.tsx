import { useMutation } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';
import { selectCrmInvoice } from '@/actions/crm/invoices'; // Assuming this action exists
import DateCell from '@/components/table/cells/date';
import EnumCell from '@/components/table/cells/enum';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { crmInvoiceUpdateMutationOption } from '@/queries/crm/invoices'; // Assuming this query exists
import { CrmInvoiceStatus, CrmPaymentMethod } from '@/db/types'; // Import enums

const crmInvoiceStatusOptions = Object.values(CrmInvoiceStatus).map((type) => ({
  value: type,
  label: type,
}));

const crmPaymentMethodOptions = Object.values(CrmPaymentMethod).map((type) => ({
  value: type,
  label: type,
}));

export const columns: ColumnDef<
  Awaited<ReturnType<typeof selectCrmInvoice>>[number]
>[] = [
  {
    accessorKey: 'issueDate',
    header: 'Issue Date',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmInvoiceUpdateMutationOption(row.original.id),
      );

      return (
        <DateCell
          editable
          value={row.original.issueDate}
          onSave={(value) =>
            mutation.mutate(
              { issueDate: value },
              {
                onSuccess: () => toast.success('Update Success'),
              },
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmInvoiceUpdateMutationOption(row.original.id),
      );

      return (
        <DateCell
          editable
          value={row.original.dueDate}
          onSave={(value) =>
            mutation.mutate(
              { dueDate: value },
              {
                onSuccess: () => toast.success('Update Success'),
              },
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'paidAt',
    header: 'Paid At',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmInvoiceUpdateMutationOption(row.original.id),
      );

      return (
        <DateCell
          editable
          value={row.original.paidAt}
          showTime
          onSave={(value) =>
            mutation.mutate(
              { paidAt: value },
              {
                onSuccess: () => toast.success('Update Success'),
              },
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'sentAt',
    header: 'Sent At',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmInvoiceUpdateMutationOption(row.original.id),
      );

      return (
        <DateCell
          editable
          value={row.original.sentAt}
          showTime
          onSave={(value) =>
            mutation.mutate(
              { sentAt: value },
              {
                onSuccess: () => toast.success('Update Success'),
              },
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'opportunityId',
    header: 'Opportunity ID',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmInvoiceUpdateMutationOption(row.original.id),
      );

      return (
        <StringCell
          editable
          value={row.original.opportunityId}
          onSave={(value) =>
            mutation.mutate(
              { opportunityId: value },
              {
                onSuccess: () => toast.success('Update Success'),
              },
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Payment Method',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmInvoiceUpdateMutationOption(row.original.id),
      );

      return (
        <EnumCell
          editable
          value={row.original.paymentMethod}
          options={crmPaymentMethodOptions}
          onSave={(value) =>
            mutation.mutate(
              { paymentMethod: value as CrmPaymentMethod },
              {
                onSuccess: () => toast.success('Update Success'),
              },
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmInvoiceUpdateMutationOption(row.original.id),
      );

      return (
        <EnumCell
          editable
          value={row.original.status}
          options={crmInvoiceStatusOptions}
          onSave={(value) =>
            mutation.mutate(
              { status: value as CrmInvoiceStatus },
              {
                onSuccess: () => toast.success('Update Success'),
              },
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmInvoiceUpdateMutationOption(row.original.id),
      );

      return (
        <NumberCell
          editable
          currency="PHP"
          value={row.original.total ?? 0}
          onSave={(value) =>
            mutation.mutate(
              { total: value },
              {
                onSuccess: () => toast.success('Update Success'),
              },
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => <DateCell value={row.original.createdAt} showTime />,
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => <DateCell value={row.original.updatedAt} showTime />,
  },
];
