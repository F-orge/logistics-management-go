import { queryOptions } from '@tanstack/react-query';

import { getProduct, getProducts } from '@/graphql/queries/crm/products';
import { execute, type GraphQLError } from '@/lib/graphql/client/execute';
import type {
  GetProductQuery,
  GetProductQueryVariables,
  GetProductsQuery,
  GetProductsQueryVariables,
} from '@/lib/graphql/client/graphql';

export const getProductQueryOptions = ({ id }: GetProductQueryVariables) =>
  queryOptions<GetProductQuery['crm']['product'], GraphQLError[]>({
    queryKey: ['crm', 'product', { id }],
    queryFn: () => execute(getProduct, { id }).then((data) => data.crm.product),
    enabled: !!id,
  });

export const getProductsQueryOptions = ({ limit = 10, page = 1 }: GetProductsQueryVariables) =>
  queryOptions<GetProductsQuery['crm']['products'], GraphQLError[]>({
    queryKey: ['crm', 'products', { limit, page }],
    queryFn: () => execute(getProducts, { limit, page }).then((data) => data.crm.products),
  });
