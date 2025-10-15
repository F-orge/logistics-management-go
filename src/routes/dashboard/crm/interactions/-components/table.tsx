import { useMutation, useQuery } from '@tanstack/react-query'
import { Link, useRouteContext } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import DateCell from '@/components/table/cells/date'
import RelationCell from '@/components/table/cells/relation'
import StringCell from '@/components/table/cells/string'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { CrmInteractionType } from '@/db/types'
import { type ORPCOutputs, orpcClient } from '@/orpc/client'
import { paginateCase, paginateContact, updateInteraction } from '@/queries/crm'

export const columns: ColumnDef<
  ORPCOutputs['crm']['paginateInteraction'][number] & {
    contact?: ORPCOutputs['crm']['inContact'][number]
    case?: ORPCOutputs['crm']['inCase'][number]
    user?: ORPCOutputs['auth']['inUser'][number]
  }
>[] = [
  {
    accessorKey: 'contact.name',
    header: 'Contact',
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/interactions/',
      })

      const updateMutation = useMutation(updateInteraction, queryClient)

      const { data: contacts } = useQuery(
        {
          ...paginateContact({
            page: 1,
            perPage: 100,
          }),
          enabled: !!row.original.contact,
        },
        queryClient,
      )

      return (
        <RelationCell
          editable
          value={row.original.contactId}
          options={
            contacts?.map((row) => ({
              label: row.name,
              value: row.id,
              searchValue: row.name,
            })) || []
          }
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { contactId: value },
            })
          }
        >
          <Button size={'sm'} variant={'outline'}>
            {row.original.contact?.name || 'Not Avaiable'}
          </Button>
        </RelationCell>
      )
    },
  },
  {
    accessorFn: (row) => row.case?.caseNumber,
    header: 'Case',
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/interactions/',
      })

      const updateMutation = useMutation(updateInteraction, queryClient)

      const { data: cases } = useQuery(
        {
          ...paginateCase({
            page: 1,
            perPage: 100,
          }),
          enabled: !!row.original.case,
        },
        queryClient,
      )

      return (
        <RelationCell
          editable
          value={row.original.caseId}
          options={
            cases?.map((row) => ({
              label: row.caseNumber,
              value: row.id,
              searchValue: row.caseNumber,
            })) || []
          }
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { caseId: value },
            })
          }
        >
          <Button size={'sm'} variant={'outline'}>
            {row.original.case?.caseNumber || 'Not Available'}
          </Button>
        </RelationCell>
      )
    },
  },
  {
    accessorKey: 'userId',
    header: 'User',
    cell: ({ row }) => {
      const user = row.original.user
      if (!user) {
        return <div className="text-muted-foreground">N/A</div>
      }
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarImage src={user.image ?? ''} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(' ')
                    .filter((n: any, i: any, arr: any) => i === 0 || i === arr.length - 1)
                    .map((n: any) => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="truncate">{user.name}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{user.email}</p>
          </TooltipContent>
        </Tooltip>
      )
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/interactions/',
      })

      const updateMutation = useMutation(updateInteraction, queryClient)

      return (
        <StringCell
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { type: value as CrmInteractionType },
            })
          }
          editable
          value={row.original.type}
        />
      )
    },
  },
  {
    accessorKey: 'interactionDate',
    header: 'Interaction Date',
    cell: ({ row }) => <DateCell value={row.original.interactionDate} showTime />,
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/interactions/',
      })

      const updateMutation = useMutation(updateInteraction, queryClient)

      return (
        <StringCell
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { notes: value },
            })
          }
          editable
          value={row.original.notes}
        />
      )
    },
  },
  {
    accessorKey: 'outcome',
    header: 'Outcome',
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/interactions/',
      })

      const updateMutation = useMutation(updateInteraction, queryClient)

      return (
        <StringCell
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { outcome: value },
            })
          }
          editable
          value={row.original.outcome}
        />
      )
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
]
