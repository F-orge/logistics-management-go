import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import {
  MoreHorizontal,
  Pencil,
  Plus,
  ScanSearch,
  SearchIcon,
} from 'lucide-react';
import { useState } from 'react';
import z from 'zod';
import { DataTable } from '@/components/table';
import DeleteRecordDialog from '@/components/table/dialogs/delete';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  ContextMenuItem,
  ContextMenuSeparator,
} from '@/components/ui/context-menu';
import { Input } from '@/components/ui/input';
import {
  inCampaign,
  inCompany,
  inContact,
  inOpportunityProduct,
  inProduct,
} from '@/queries/crm';
import {
  deleteOpportunity,
  paginateOpportunity,
  rangeOpportunity,
} from '@/queries/crm/opportunities';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import { crmOpportunitySchema } from '@/schemas/crm/opportunities';
import NewOpportunityFormDialog from './-components/new';
import { columns } from './-components/table';
import ViewOpportunityFormDialog from './-components/view';

export const Route = createFileRoute('/dashboard/crm/opportunities/')({
  component: RouteComponent,
  validateSearch: zodValidator(
    paginateTransformer().extend({
      filters: filterTransformer(crmOpportunitySchema),
      sort: sortTransformer(crmOpportunitySchema),
      new: z.boolean().optional(),
      delete: z.boolean().optional(),
      view: z.boolean().optional(),
      edit: z.boolean().optional(),
      id: z.string().optional(),
    }),
  ),
  beforeLoad: (ctx) => ({ search: ctx.search }),
  async loader({ context }) {
    const from = new Date();
    const to = new Date();
    to.setFullYear(from.getFullYear() + 1);

    const opportunities = await context.queryClient.fetchQuery(
      paginateOpportunity(context.search),
    );

    // campaigns
    const campaignIds = opportunities
      .map((row) => row.campaignId)
      .filter(nonEmpty);

    const campaigns = await context.queryClient.fetchQuery(
      inCampaign(campaignIds),
    );

    // companies
    const companyIds = opportunities
      .map((row) => row.companyId)
      .filter(nonEmpty);

    const companies = await context.queryClient.fetchQuery(
      inCompany(companyIds),
    );

    // contacts
    const contactIds = opportunities
      .map((row) => row.contactId)
      .filter(nonEmpty);

    const contacts = await context.queryClient.fetchQuery(
      inContact(contactIds),
    );

    // opportunity products
    const opportunityIds = opportunities.map((row) => row.id);
    const opportunityProducts = await context.queryClient.fetchQuery(
      inOpportunityProduct(opportunityIds),
    );

    // products for opportunity products
    const productIds = opportunityProducts
      .map((item) => item.productId)
      .filter(nonEmpty);

    const products = await context.queryClient.fetchQuery(
      inProduct(productIds),
    );

    // Create maps for quick lookup
    const campaignMap = new Map(
      campaigns.map((campaign) => [campaign.id, campaign]),
    );
    const companyMap = new Map(
      companies.map((company) => [company.id, company]),
    );
    const contactMap = new Map(
      contacts.map((contact) => [contact.id, contact]),
    );
    const productMap = new Map(
      products.map((product) => [product.id, product]),
    );

    // Merge product data into opportunity products
    const opportunityProductsWithProducts = opportunityProducts.map((item) => ({
      ...item,
      product: item.productId ? (productMap.get(item.productId) ?? null) : null,
    }));

    // Group opportunity products by opportunityId
    const groupedOpportunityProducts = opportunityProductsWithProducts.reduce<
      Record<string, typeof opportunityProductsWithProducts>
    >((acc, item) => {
      if (!acc[item.opportunityId]) {
        acc[item.opportunityId] = [];
      }
      acc[item.opportunityId].push(item);
      return acc;
    }, {});

    // Merge related data into each opportunity row
    const dataTable = opportunities.map((row) => ({
      ...row,
      campaign: row.campaignId
        ? (campaignMap.get(row.campaignId) ?? null)
        : null,
      company: row.companyId ? (companyMap.get(row.companyId) ?? null) : null,
      contact: row.contactId ? (contactMap.get(row.contactId) ?? null) : null,
      products: groupedOpportunityProducts[row.id] || [],
    }));

    return {
      dataTable,
      chart: await context.queryClient.fetchQuery(
        rangeOpportunity({ from, to }),
      ),
    };
  },
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const searchQuery = Route.useSearch();
  const data = Route.useLoaderData();
  const { queryClient } = Route.useRouteContext();
  const [currentSearch, setCurrentSearch] = useState<string>('');

  const deleteMutation = useMutation(deleteOpportunity, queryClient);

  return (
    <article className="grid grid-cols-12 gap-5">
      <section className="col-span-full">
        <h1 className="text-2xl font-bold">Opportunities</h1>
      </section>
      <section className="col-span-full flex justify-between items-center">
        <ButtonGroup className="col-span-4">
          <Input
            onChange={(e) => setCurrentSearch(e.target.value)}
            placeholder="Search..."
          />
          <Button
            onClick={() =>
              navigate({
                search: (prev) => ({
                  ...prev,
                  filters: [
                    {
                      column: 'name',
                      operation: 'like',
                      value: `%${currentSearch}%`,
                    },
                  ],
                }),
              })
            }
            variant="outline"
            aria-label="Search"
          >
            <SearchIcon />
          </Button>
        </ButtonGroup>
        <ButtonGroup className="col-span-6 col-start-10">
          <Button
            onClick={() => {
              navigate({
                search: (prev) => ({
                  ...prev,
                  new: true,
                }),
              });
            }}
            variant={'outline'}
          >
            Create
            <Plus />
          </Button>
          <Button variant={'outline'} size={'icon'}>
            <MoreHorizontal />
          </Button>
        </ButtonGroup>
      </section>
      <section className="col-span-full">
        <DataTable
          data={data.dataTable}
          columns={columns}
          onNextPage={() => {
            navigate({
              search: (prev) => ({ ...prev, page: prev.page + 1 }),
              replace: true,
            });
            queryClient.invalidateQueries();
          }}
          onPreviousPage={() => {
            navigate({
              search: (prev) => ({ ...prev, page: prev.page - 1 }),
              replace: true,
            });
            queryClient.invalidateQueries();
          }}
          enableNextPage={data.dataTable.length !== 0}
          enablePreviousPage={searchQuery.page !== 1}
        >
          {(row) => (
            <>
              <ContextMenuItem
                onClick={() =>
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      view: true,
                      id: row.original.id,
                    }),
                  })
                }
              >
                <ScanSearch />
                View Information
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem
                onClick={() =>
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      edit: true,
                      id: row.original.id,
                    }),
                  })
                }
              >
                <Pencil />
                Edit Information
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem
                onClick={() =>
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      delete: true,
                      id: row.original.id,
                    }),
                    replace: true,
                  })
                }
                variant="destructive"
              >
                Delete
              </ContextMenuItem>
            </>
          )}
        </DataTable>
      </section>
      <section>
        <DeleteRecordDialog
          open={searchQuery.delete}
          onOpenChange={() =>
            navigate({
              search: (prev) => ({ ...prev, delete: undefined, id: undefined }),
              replace: true,
            })
          }
          title="Are you sure you want to delete this record"
          description="Deleting this record is permanent"
          onConfirm={async () =>
            deleteMutation.mutateAsync(searchQuery.id!, {
              onSuccess: () => {
                navigate({
                  search: (prev) => ({
                    ...prev,
                    delete: undefined,
                    id: undefined,
                  }),
                  replace: true,
                });
              },
              onError: () => {
                navigate({
                  search: (prev) => ({
                    ...prev,
                    delete: undefined,
                    id: undefined,
                  }),
                  replace: true,
                });
              },
            })
          }
        />
        <NewOpportunityFormDialog />
        <ViewOpportunityFormDialog />
      </section>
    </article>
  );
}
