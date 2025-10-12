import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['tms']['paginatePartnerInvoiceItem'][number] & {
    partnerInvoice?: ORPCOutputs['tms']['inPartnerInvoice'][number];
    shipmentLeg?: ORPCOutputs['tms']['inShipmentLeg'][number];
  }
>[] = [
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => <NumberCell value={row.original.amount} />,
  },
  {
    id: 'partnerInvoice',
    header: 'Partner Invoice',
    cell: ({ row }) =>
      row.original.partnerInvoice ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/tms/partner-invoices"
            search={{
              view: true,
              id: row.original.partnerInvoice.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.partnerInvoice.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.partnerInvoice.id} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    id: 'shipmentLeg',
    header: 'Shipment Leg',
    cell: ({ row }) =>
      row.original.shipmentLeg ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/tms/shipment-legs"
            search={{
              view: true,
              id: row.original.shipmentLeg.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.shipmentLeg.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.shipmentLeg.id} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
];
