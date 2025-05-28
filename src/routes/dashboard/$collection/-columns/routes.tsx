import type { ColumnDef } from '@tanstack/react-table';
import type { ExpandedRoutesResponse } from '../-schemas/routes';
import { DataTableColumnHeader } from '@marahuyo/react-ui/data-table/data-table-column-header';

export const columns: ColumnDef<ExpandedRoutesResponse>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="ID"
      />
    ),
  },
  {
    id: 'routeName',
    accessorKey: 'routeName',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Route Name"
      />
    ),
  },
  {
    id: 'vehicleAssigned',
    accessorKey: 'vehicleAssigned',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Vehicle Assigned"
      />
    ),
  },
  {
    id: 'driverAssigned',
    accessorKey: 'driverAssigned',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Driver Assigned"
      />
    ),
  },
  {
    id: 'plannedStartTime',
    accessorKey: 'plannedStartTime',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Planned Start Time"
      />
    ),
  },
  {
    id: 'plannedEndTime',
    accessorKey: 'plannedEndTime',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Planned End time"
      />
    ),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Status"
      />
    ),
  },
  {
    id: 'longitude',
    accessorKey: 'longitude',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Longitude"
      />
    ),
  },
  {
    id: 'latitude',
    accessorKey: 'latitude',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Latitude"
      />
    ),
  },
  {
    id: 'shipmentsOnRoute',
    accessorKey: 'shipmentsOnRoute',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Shipment On Route"
      />
    ),
  },
];
