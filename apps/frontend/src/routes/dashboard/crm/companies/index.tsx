import { createFileRoute } from '@tanstack/react-router'
import {generateColumn} from "@packages/ui/components/ui/data-table/helpers"
import * as contract from "@packages/rpc/src/contracts/crm/companies"
import {DataTable} from "@packages/ui/components/ui/data-table/index"

const columns = generateColumn(contract.PaginateCompanyContract['~orpc'].outputSchema!.unwrap())

export const Route = createFileRoute('/dashboard/crm/companies/')({
  component: RouteComponent,
  loader:async ({context}) => {
    return context.orpcClient.crm.PaginateCompany({page:1,perPage:10})
  }
})

function RouteComponent() {

  const data = Route.useLoaderData()

  return <DataTable columns={columns} data={data} />
}
