import { getRouteApi } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableColumnHeader } from '@/components/ui/kibo-ui/table';
import type {
  CrmCompaniesResponse,
  CrmContactsResponse,
  LmsAddressesResponse,
  LmsShipmentsResponse,
  LmsShippingServicesResponse,
  UsersResponse,
} from '@/pocketbase/types';

// Define the expanded shipment type
export type ShipmentWithExpands = LmsShipmentsResponse<{
  sender_company?: CrmCompaniesResponse;
  sender_contact?: CrmContactsResponse;
  sender_address?: LmsAddressesResponse;
  receiver_company?: CrmCompaniesResponse;
  receiver_contact?: CrmContactsResponse;
  receiver_address?: LmsAddressesResponse;
  shipping_service?: LmsShippingServicesResponse;
  created_by?: UsersResponse;
}>;

export const columns: ColumnDef<ShipmentWithExpands>[] = [
  {
    accessorKey: 'id',
    header: 'Action',
    cell: ({ row }) => {
      const route = getRouteApi('/dashboard/lms/shipments/');

      const navigate = route.useNavigate();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant={'ghost'}>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Action</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() =>
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      editShipment: true,
                      id: row.original.id,
                    }),
                  })
                }
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() =>
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      deleteShipment: true,
                      id: row.original.id,
                    }),
                  })
                }
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: 'tracking_number',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Tracking Number" />
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const statusColors = {
        created: 'secondary' as const,
        picked_up: 'default' as const,
        in_transit: 'secondary' as const,
        out_for_delivery: 'secondary' as const,
        delivered: 'default' as const,
        exception: 'destructive' as const,
        cancelled: 'outline' as const,
      };
      return (
        <Badge
          variant={
            statusColors[status as keyof typeof statusColors] || 'secondary'
          }
        >
          {status.replace('_', ' ').toUpperCase()}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'expand.sender_company',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Sender" />
    ),
    cell: ({ row }) => {
      const senderCompany = row.original.expand?.sender_company;
      const senderContact = row.original.expand?.sender_contact;
      if (senderCompany) {
        return <div>{senderCompany.name}</div>;
      }
      if (senderContact) {
        return (
          <div>
            {senderContact.first_name} {senderContact.last_name}
          </div>
        );
      }
      return <div>-</div>;
    },
  },
  {
    accessorKey: 'expand.receiver_company',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Receiver" />
    ),
    cell: ({ row }) => {
      const receiverCompany = row.original.expand?.receiver_company;
      const receiverContact = row.original.expand?.receiver_contact;
      if (receiverCompany) {
        return <div>{receiverCompany.name}</div>;
      }
      if (receiverContact) {
        return (
          <div>
            {receiverContact.first_name} {receiverContact.last_name}
          </div>
        );
      }
      return <div>-</div>;
    },
  },
  {
    accessorKey: 'primary_transport_mode',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Transport Mode" />
    ),
    cell: ({ row }) => {
      const mode = row.getValue('primary_transport_mode') as string;
      const modeLabels = {
        air: 'Air',
        sea: 'Sea',
        road: 'Road',
        rail: 'Rail',
      };
      return (
        <Badge variant="outline">
          {modeLabels[mode as keyof typeof modeLabels] || mode}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'total_weight',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Weight" />
    ),
    cell: ({ row }) => {
      const weight = row.getValue('total_weight') as number;
      return <div>{weight} kg</div>;
    },
  },
  {
    accessorKey: 'total_value',
    header: ({ column }) => <TableColumnHeader column={column} title="Value" />,
    cell: ({ row }) => {
      const value = row.getValue('total_value') as number;
      const currency = row.original.currency;
      if (!value) return <div>-</div>;
      return (
        <div>
          {currency} {value.toFixed(2)}
        </div>
      );
    },
  },
  {
    accessorKey: 'shipping_cost',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Shipping Cost" />
    ),
    cell: ({ row }) => {
      const cost = row.getValue('shipping_cost') as number;
      const currency = row.original.currency;
      if (!cost) return <div>-</div>;
      return (
        <div>
          {currency} {cost.toFixed(2)}
        </div>
      );
    },
  },
  {
    accessorKey: 'pickup_date',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Pickup Date" />
    ),
    cell: ({ row }) => {
      const pickupDate = row.getValue('pickup_date') as string;
      if (!pickupDate) return <div>-</div>;
      return <div>{new Date(pickupDate).toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: 'estimated_delivery_date',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Est. Delivery" />
    ),
    cell: ({ row }) => {
      const estDate = row.getValue('estimated_delivery_date') as string;
      if (!estDate) return <div>-</div>;
      return <div>{new Date(estDate).toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: 'created',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      const created = row.getValue('created') as string;
      return <div>{new Date(created).toLocaleDateString()}</div>;
    },
  },
];
