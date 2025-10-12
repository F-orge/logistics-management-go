import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';
import { BillingDocumentTypeEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['billing']['paginateDocument'][number] & {
    uploadedByUser?: ORPCOutputs['auth']['inUser'][number];
  }
>[] = [
  {
    accessorKey: 'fileName',
    header: 'File Name',
    cell: ({ row }) => <StringCell value={row.original.fileName} />,
  },
  {
    accessorKey: 'documentType',
    header: 'Document Type',
    cell: ({ row }) => <StringCell value={row.original.documentType} />,
  },
  {
    accessorKey: 'filePath',
    header: 'File Path',
    cell: ({ row }) =>
      row.original.filePath ? (
        <a href={row.original.filePath} target="_blank" rel="noopener noreferrer">
          <StringCell value="View Document" />
        </a>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    accessorKey: 'fileSize',
    header: 'File Size',
    cell: ({ row }) => <NumberCell value={row.original.fileSize} />,
  },
  {
    accessorKey: 'mimeType',
    header: 'MIME Type',
    cell: ({ row }) => <StringCell value={row.original.mimeType} />,
  },
  {
    accessorKey: 'recordType',
    header: 'Record Type',
    cell: ({ row }) => <StringCell value={row.original.recordType} />,
  },
  {
    accessorKey: 'recordId',
    header: 'Record ID',
    cell: ({ row }) => <StringCell value={row.original.recordId} />,
  },
  {
    id: 'uploadedByUser',
    header: 'Uploaded By',
    cell: ({ row }) =>
      row.original.uploadedByUser ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/auth/users"
            search={{
              view: true,
              id: row.original.uploadedByUser.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.uploadedByUser.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.uploadedByUser.name} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
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
