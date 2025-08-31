import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/ui/kibo-ui/table/data-table';
import { pb } from '@/pocketbase';
import type {
  CrmCompaniesRecord,
  CrmContactsRecord,
  CrmOpportunitiesResponse,
} from '@/pocketbase/types';
import DeleteOpportunityDialog from './-actions/delete';
import EditOpportunityDialog from './-actions/edit';
import NewOpportunityDialog from './-actions/new';
import LoadingPage from './-loading';
import { columns } from './-table';

export const Route = createFileRoute('/dashboard/crm/opportunities/')({
  component: RouteComponent,
  pendingComponent: LoadingPage,
  validateSearch: zodValidator(
    z.object({
      page: z.number().nonnegative().default(1).catch(1),
      perPage: z.number().nonnegative().default(10).catch(10),
      newOpportunity: z.boolean().optional(),
      editOpportunity: z.boolean().optional(),
      deleteOpportunity: z.boolean().optional(),
      id: z.string().optional(),
      sort: z.array(z.string()).default(['-created']),
      filter: z.array(z.string()).optional(),
    }),
  ),
  beforeLoad: ({ search }) => ({ search }),
  preload: true,
  loader: ({ context }) =>
    pb
      .collection('crm_opportunities')
      .getList<
        CrmOpportunitiesResponse<{
          company: CrmCompaniesRecord;
          primary_contact: CrmContactsRecord;
        }>
      >(context.search.page, context.search.perPage, {
        sort: context.search.sort.join(' '),
        filter: context.search.filter?.join(' '),
        expand: 'company,primary_contact',
      }),
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  const searchParams = Route.useSearch();

  const opportunities = Route.useLoaderData();

  return (
    <article className="grid grid-cols-12 gap-2.5">
      <section className="col-span-full">
        {/* Heading */}
        <h1 className="text-3xl font-medium border-b pb-4">Opportunities</h1>
      </section>
      <section>{/* Key statistics */}</section>
      <section className="flex flex-row justify-end col-span-full">
        {/* Table actions */}
        <Button
          onClick={() =>
            navigate({ search: (prev) => ({ ...prev, newOpportunity: true }) })
          }
          variant={'outline'}
        >
          Create Opportunity
        </Button>
      </section>
      <section className="col-span-full">
        <DataTable columns={columns} data={opportunities} />
      </section>
      <section>
        {/* Action dialogs */}
        {searchParams.newOpportunity && <NewOpportunityDialog />}
        {searchParams.editOpportunity && <EditOpportunityDialog />}
        {searchParams.deleteOpportunity && <DeleteOpportunityDialog />}
      </section>
    </article>
  );
}
