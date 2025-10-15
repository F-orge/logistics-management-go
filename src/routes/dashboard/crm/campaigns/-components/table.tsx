import { useMutation } from '@tanstack/react-query'
import { useRouteContext } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import DateCell from '@/components/table/cells/date'
import NumberCell from '@/components/table/cells/number'
import StringCell from '@/components/table/cells/string'
import type { orpcClient } from '@/orpc/client'
import { updateCampaign } from '@/queries/crm/campaigns'

export const columns: ColumnDef<
  Awaited<ReturnType<typeof orpcClient.crm.paginateCampaign>>[number]
>[] = [
  {
    accessorKey: 'name',
    header: 'Campaign Name',
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/campaigns/',
      })
      const updateCampaignMutation = useMutation(updateCampaign, queryClient)

      return (
        <StringCell
          value={row.original.name}
          editable
          onSave={async (value) => {
            updateCampaignMutation.mutateAsync({
              id: row.original.id,
              value: { name: value },
            })
          }}
        />
      )
    },
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/campaigns/',
      })
      const updateCampaignMutation = useMutation(updateCampaign, queryClient)

      return (
        <DateCell
          value={row.original.startDate}
          showTime
          editable
          onSave={async (value) => {
            updateCampaignMutation.mutateAsync({
              id: row.original.id,
              value: { startDate: value },
            })
          }}
        />
      )
    },
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/campaigns/',
      })
      const updateCampaignMutation = useMutation(updateCampaign, queryClient)

      return (
        <DateCell
          value={row.original.endDate}
          showTime
          editable
          onSave={async (value) => {
            updateCampaignMutation.mutateAsync({
              id: row.original.id,
              value: { endDate: value },
            })
          }}
        />
      )
    },
  },
  {
    accessorKey: 'budget',
    header: 'Budget',
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/campaigns/',
      })
      const updateCampaignMutation = useMutation(updateCampaign, queryClient)

      return (
        <NumberCell
          value={row.original.budget}
          currency="PHP"
          editable
          onSave={async (value) => {
            updateCampaignMutation.mutateAsync({
              id: row.original.id,
              value: { budget: value },
            })
          }}
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
