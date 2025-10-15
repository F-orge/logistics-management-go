import { Link } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import DateCell from '@/components/table/cells/date'
import NumberCell from '@/components/table/cells/number'
import StringCell from '@/components/table/cells/string'
import { Button } from '@/components/ui/button'
import { type ORPCOutputs, orpcClient } from '@/orpc/client'
import { CrmCampaign } from '@/schemas/crm/campaigns'
import { CrmCompany } from '@/schemas/crm/companies'
import { CrmContact } from '@/schemas/crm/contacts'
import { CrmOpportunityProduct } from '@/schemas/crm/opportunity_products'
import { CrmProduct } from '@/schemas/crm/products'

export const columns: ColumnDef<
  ORPCOutputs['crm']['paginateOpportunity'][number] & {
    campaign?: ORPCOutputs['crm']['inCampaign'][number]
    company?: ORPCOutputs['crm']['inCompany'][number]
    contact?: ORPCOutputs['crm']['inContact'][number]
    products?: (ORPCOutputs['crm']['inOpportunityProduct'][number] & {
      product?: ORPCOutputs['crm']['inProduct'][number]
    })[]
  }
>[] = [
  {
    accessorKey: 'name',
    header: 'Opportunity Name',
    cell: ({ row }) => {
      return <StringCell value={row.original.name} />
    },
  },
  {
    id: 'relatedEntities',
    header: 'Related Entities',
    cell: ({ row }) => {
      const entities = [
        row.original.ownerId ? `Owner ID: ${row.original.ownerId}` : null,
        row.original.campaign ? (
          <Button size={'sm'} variant={'outline'} className="w-full" asChild>
            <Link
              to="/dashboard/crm/campaigns"
              search={{
                view: true,
                id: row.original.campaign.id,
                filters: [
                  {
                    column: 'id',
                    operation: '=',
                    value: row.original.campaign.id,
                  },
                ],
              }}
            >
              <StringCell value={`Campaign: ${row.original.campaign?.name}`} />
            </Link>
          </Button>
        ) : null,
        row.original.company ? (
          <Button size={'sm'} variant={'outline'} className="w-full" asChild>
            <Link
              to="/dashboard/crm/companies"
              search={{
                view: true,
                id: row.original.company.id,
                filters: [
                  {
                    column: 'id',
                    operation: '=',
                    value: row.original.company.id,
                  },
                ],
              }}
            >
              <StringCell value={`Company: ${row.original.company?.name}`} />
            </Link>
          </Button>
        ) : null,
        row.original.contact ? (
          <Button size={'sm'} variant={'outline'} className="w-full" asChild>
            <Link
              to="/dashboard/crm/contacts"
              search={{
                view: true,
                id: row.original.contact.id,
                filters: [
                  {
                    column: 'id',
                    operation: '=',
                    value: row.original.contact.id,
                  },
                ],
              }}
            >
              <StringCell value={`Contact: ${row.original.contact?.name}`} />
            </Link>
          </Button>
        ) : null,
      ].filter(Boolean)
      return <div className="flex flex-col gap-2">{entities}</div>
    },
  },
  {
    id: 'products',
    header: 'Products',
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        {row.original.products?.length ? (
          row.original.products.map((item) => (
            <div key={item.id} className="flex justify-between">
              <StringCell value={item.product?.name || 'Unknown Product'} />
              <StringCell value={`x${item.quantity}`} />
            </div>
          ))
        ) : (
          <StringCell value={'No Products'} />
        )}
      </div>
    ),
  },
  {
    id: 'opportunityDetails',
    header: 'Opportunity Details',
    cell: ({ row }) => {
      const details = [
        row.original.dealValue ? `Deal Value: ${row.original.dealValue} PHP` : null,
        row.original.probability ? `Probability: ${row.original.probability}%` : null,
        row.original.source ? `Source: ${row.original.source}` : null,
        row.original.stage ? `Stage: ${row.original.stage}` : null,
        row.original.expectedCloseDate
          ? `Expected Close: ${new Date(row.original.expectedCloseDate).toLocaleDateString()}`
          : null,
        row.original.lostReason ? `Lost Reason: ${row.original.lostReason}` : null,
      ].filter(Boolean)
      return <StringCell value={details.join(' | ')} />
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
