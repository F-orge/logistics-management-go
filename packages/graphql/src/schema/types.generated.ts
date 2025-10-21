import { GraphQLResolveInfo } from 'graphql';
import { GraphQLContext } from '../context';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Companies = {
  __typename?: 'Companies';
  name: Scalars['String']['output'];
};

export type CompanyQueries = {
  __typename?: 'CompanyQueries';
  paginate: Array<Companies>;
};


export type CompanyQueriespaginateArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};

export type CrmMutation = {
  __typename?: 'CrmMutation';
};

export type CrmQuery = {
  __typename?: 'CrmQuery';
  companies: CompanyQueries;
};

export type Mutation = {
  __typename?: 'Mutation';
  crm?: Maybe<CrmMutation>;
};

export type Query = {
  __typename?: 'Query';
  crm?: Maybe<CrmQuery>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Companies: ResolverTypeWrapper<Companies>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  CompanyQueries: ResolverTypeWrapper<CompanyQueries>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  CrmMutation: ResolverTypeWrapper<CrmMutation>;
  CrmQuery: ResolverTypeWrapper<CrmQuery>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Companies: Companies;
  String: Scalars['String']['output'];
  CompanyQueries: CompanyQueries;
  Int: Scalars['Int']['output'];
  CrmMutation: CrmMutation;
  CrmQuery: CrmQuery;
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  Boolean: Scalars['Boolean']['output'];
};

export type CompaniesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Companies'] = ResolversParentTypes['Companies']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type CompanyQueriesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CompanyQueries'] = ResolversParentTypes['CompanyQueries']> = {
  paginate?: Resolver<Array<ResolversTypes['Companies']>, ParentType, ContextType, Partial<CompanyQueriespaginateArgs>>;
};

export type CrmQueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CrmQuery'] = ResolversParentTypes['CrmQuery']> = {
  companies?: Resolver<ResolversTypes['CompanyQueries'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  crm?: Resolver<Maybe<ResolversTypes['CrmMutation']>, ParentType, ContextType>;
};

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  crm?: Resolver<Maybe<ResolversTypes['CrmQuery']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  Companies?: CompaniesResolvers<ContextType>;
  CompanyQueries?: CompanyQueriesResolvers<ContextType>;
  CrmQuery?: CrmQueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

