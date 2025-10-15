import { useMutation } from '@tanstack/react-query'
import { useRouteContext } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/table'
import DateCell from '@/components/table/cells/date'
import NumberCell from '@/components/table/cells/number'
import TextCell from '@/components/table/cells/string'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { ORPCOutputs } from '@/orpc/client'
import { updateCompany } from '@/queries/crm'

type Company = ORPCOutputs['crm']['paginateCompany'][number] & {
  owner?: {
    name: string
    image?: string | null
    email: string
    id: string
  }
}

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Company Name" />,
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/companies/',
      })

      const updateMutation = useMutation(updateCompany, queryClient)

      return (
        <TextCell
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { name: value },
            })
          }
          editable
          value={row.original.name}
        />
      )
    },
  },

  {
    accessorKey: 'industry',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Industry" />,
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/companies/',
      })

      const updateMutation = useMutation(updateCompany, queryClient)

      return (
        <TextCell
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { industry: value },
            })
          }
          editable
          value={row.original.industry}
        />
      )
    },
  },
  {
    accessorKey: 'annualRevenue',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Annual Revenue" />,
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/companies/',
      })

      const updateMutation = useMutation(updateCompany, queryClient)

      return (
        <NumberCell
          currency="PHP"
          editable
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { annualRevenue: value },
            })
          }
          value={row.original.annualRevenue}
        />
      )
    },
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Phone Number" />,
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/companies/',
      })

      const updateMutation = useMutation(updateCompany, queryClient)

      return (
        <TextCell
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { phoneNumber: value },
            })
          }
          editable
          value={row.original.phoneNumber}
        />
      )
    },
  },
  {
    accessorKey: 'website',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Website" />,
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/companies/',
      })

      const updateMutation = useMutation(updateCompany, queryClient)

      return (
        <TextCell
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { website: value },
            })
          }
          editable
          value={row.original.website}
        />
      )
    },
  },
  {
    accessorKey: 'street',
    header: 'Street',
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/companies/',
      })

      const updateMutation = useMutation(updateCompany, queryClient)

      return (
        <TextCell
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { street: value },
            })
          }
          editable
          value={row.original.street}
        />
      )
    },
  },
  {
    accessorKey: 'city',
    header: 'City',
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/companies/',
      })

      const updateMutation = useMutation(updateCompany, queryClient)

      return (
        <TextCell
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { city: value },
            })
          }
          editable
          value={row.original.city}
        />
      )
    },
  },
  {
    accessorKey: 'state',
    header: 'State',
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/companies/',
      })

      const updateMutation = useMutation(updateCompany, queryClient)

      return (
        <TextCell
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { street: value },
            })
          }
          editable
          value={row.original.state}
        />
      )
    },
  },
  {
    accessorKey: 'postalCode',
    header: 'Postal Code',
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/companies/',
      })

      const updateMutation = useMutation(updateCompany, queryClient)

      return (
        <TextCell
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { postalCode: value },
            })
          }
          editable
          value={row.original.postalCode}
        />
      )
    },
  },
  {
    accessorKey: 'country',
    header: 'Country',
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/companies/',
      })

      const updateMutation = useMutation(updateCompany, queryClient)

      return (
        <TextCell
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { country: value },
            })
          }
          editable
          value={row.original.country}
        />
      )
    },
  },
  {
    accessorKey: 'owner.name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Owner" />,
    cell: ({ row }) => {
      const owner = row.original.owner

      if (!owner) {
        return <div className="text-muted-foreground">N/A</div>
      }

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarImage src={owner.image ?? ''} alt={owner.name} />
                <AvatarFallback>
                  {owner.name
                    .split(' ')
                    .filter((n: any, i: any, arr: any) => i === 0 || i === arr.length - 1)
                    .map((n: any) => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="truncate">{owner.name}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{owner.email}</p>
          </TooltipContent>
        </Tooltip>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
    cell: ({ row }) => <DateCell value={row.original.createdAt} />,
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Updated At" />,
    cell: ({ row }) => <DateCell value={row.original.updatedAt} />,
  },
]
