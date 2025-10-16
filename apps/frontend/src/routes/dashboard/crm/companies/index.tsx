import { createFileRoute } from '@tanstack/react-router'
import {generateColumn} from "@packages/ui/components/ui/data-table/helpers"
import * as contract from "@packages/rpc/src/contracts/crm/companies"
import {DataTable} from "@packages/ui/components/ui/data-table/index"
import { zodValidator } from '@tanstack/zod-adapter'
import { useEffect, useState } from 'react'
import type { PaginationState } from '@tanstack/react-table'

const columns = generateColumn(contract.PaginateCompanyContract['~orpc'].outputSchema!.unwrap())

export const Route = createFileRoute('/dashboard/crm/companies/')({
  component: RouteComponent,
  validateSearch:zodValidator(contract.PaginateCompanyContract['~orpc'].inputSchema!),
  beforeLoad:({search}) => ({search}),
  loader:async ({context}) => {
    return context.orpcClient.crm.PaginateCompany(context.search)
  }
})

function RouteComponent() {

  const searchQuery = Route.useSearch()
  const navigate = Route.useNavigate()

  const [pagination,setPagination] = useState<PaginationState>({pageSize:searchQuery.perPage,pageIndex:searchQuery.page})

  useEffect(() => {
    navigate({search:(prev) => ({...prev,page:pagination.pageIndex,perPage:pagination.pageSize})})
  },[pagination])

  const data = Route.useLoaderData()

  return <article className='grid grid-cols-12'>
    <section className='col-span-full'>
      <DataTable columns={columns} data={data} onPaginationChange={setPagination} paginationState={pagination} />
    </section>
  </article>
}
