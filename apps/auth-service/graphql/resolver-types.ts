import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Timestamptz: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

/** Links a user to different authentication providers (e.g., email/password, Google, GitHub). */
export type Account = {
  __typename?: 'Account';
  /** The access token from the provider. */
  accessToken?: Maybe<Scalars['String']['output']>;
  /** The expiration timestamp for the access token. */
  accessTokenExpiresAt?: Maybe<Scalars['Timestamptz']['output']>;
  /** The ID of the account from the provider. */
  accountId: Scalars['String']['output'];
  /** Timestamp when the account was created. */
  createdAt: Scalars['Timestamptz']['output'];
  /** Unique identifier for the account. */
  id: Scalars['UUID']['output'];
  /** The ID token from the provider. */
  idToken?: Maybe<Scalars['String']['output']>;
  /** The hashed password for credentials-based authentication. */
  password?: Maybe<Scalars['String']['output']>;
  /** The ID of the authentication provider (e.g., 'credentials', 'google'). */
  providerId: Scalars['String']['output'];
  /** The refresh token from the provider. */
  refreshToken?: Maybe<Scalars['String']['output']>;
  /** The expiration timestamp for the refresh token. */
  refreshTokenExpiresAt?: Maybe<Scalars['Timestamptz']['output']>;
  /** The scope of permissions granted by the provider. */
  scope?: Maybe<Scalars['String']['output']>;
  /** Timestamp when the account was last updated. */
  updatedAt: Scalars['Timestamptz']['output'];
  /** The user associated with this account. */
  user: User;
  /** A foreign key referencing the user table. */
  userId: Scalars['UUID']['output'];
};

/** Root mutation type for authentication-related actions. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Revoke a specific session by ID. */
  revokeSession: RevokeSessionResponse;
  /** Send a verification code (OTP) to the user's email address. Returns true if sent successfully. */
  sendEmailVerification: SendEmailVerificationResponse;
  /** Sign in a user using email and password. Returns a session token. */
  signIn: SignInResponse;
  /** Sign out the current user (terminate session). */
  signOut: SignOutResponse;
  /** Register a new user with email and password. */
  signUp: SignUpResponse;
  /** Verify the email using the received OTP code. Marks the user's email as verified if successful. */
  verifyEmail: VerifyEmailResponse;
};


/** Root mutation type for authentication-related actions. */
export type MutationRevokeSessionArgs = {
  sessionId: Scalars['UUID']['input'];
};


/** Root mutation type for authentication-related actions. */
export type MutationSendEmailVerificationArgs = {
  email: Scalars['String']['input'];
};


/** Root mutation type for authentication-related actions. */
export type MutationSignInArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


/** Root mutation type for authentication-related actions. */
export type MutationSignOutArgs = {
  token: Scalars['String']['input'];
};


/** Root mutation type for authentication-related actions. */
export type MutationSignUpArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


/** Root mutation type for authentication-related actions. */
export type MutationVerifyEmailArgs = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

/** Root query type for authentication-related queries. */
export type Query = {
  __typename?: 'Query';
  /** Returns all active sessions for the current user. */
  activeSessions: Array<Session>;
  /** Returns the current authenticated user. */
  me?: Maybe<User>;
  /** Verifies if the current session token is valid. */
  verifySession: Scalars['Boolean']['output'];
};


/** Root query type for authentication-related queries. */
export type QueryVerifySessionArgs = {
  token: Scalars['String']['input'];
};

export type RevokeSessionResponse = {
  __typename?: 'RevokeSessionResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type SendEmailVerificationResponse = {
  __typename?: 'SendEmailVerificationResponse';
  expiresAt: Scalars['Timestamptz']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

/** Stores session information for logged-in users. */
export type Session = {
  __typename?: 'Session';
  /** Timestamp when the session was created. */
  createdAt: Scalars['Timestamptz']['output'];
  /** The timestamp when the session expires. */
  expiresAt: Scalars['Timestamptz']['output'];
  /** Unique identifier for the session. */
  id: Scalars['UUID']['output'];
  /** The user ID of the impersonator (optional). */
  impersonatedBy?: Maybe<User>;
  /** The IP address from which the session was created. */
  ipAddress?: Maybe<Scalars['String']['output']>;
  /** The unique token for the session. */
  token: Scalars['String']['output'];
  /** Timestamp when the session was last updated. */
  updatedAt: Scalars['Timestamptz']['output'];
  /** The user associated with this session. */
  user: User;
  /** The user agent of the client. */
  userAgent?: Maybe<Scalars['String']['output']>;
  /** A foreign key referencing the user table. */
  userId: Scalars['UUID']['output'];
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  redirect: Scalars['Boolean']['output'];
  token: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type SignOutResponse = {
  __typename?: 'SignOutResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type SignUpResponse = {
  __typename?: 'SignUpResponse';
  redirect: Scalars['Boolean']['output'];
  token: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
  user: Scalars['String']['output'];
};

/** Represents a user in the system. */
export type User = {
  __typename?: 'User';
  /** Accounts associated with the user. */
  accounts: Array<Account>;
  /** Timestamp when the ban expires (optional). */
  banExpires?: Maybe<Scalars['Timestamptz']['output']>;
  /** Reason for banning the user (optional). */
  banReason?: Maybe<Scalars['String']['output']>;
  /** Boolean flag indicating if the user is banned (default: false). */
  banned: Scalars['Boolean']['output'];
  /** Timestamp when the user was created. */
  createdAt: Scalars['Timestamptz']['output'];
  /** The user's email address, used for login and communication. */
  email: Scalars['String']['output'];
  /** A boolean flag to indicate if the user has verified their email address. */
  emailVerified: Scalars['Boolean']['output'];
  /** Unique identifier for the user. */
  id: Scalars['UUID']['output'];
  /** A URL to the user's profile picture. */
  image?: Maybe<Scalars['String']['output']>;
  /** The user's full name. */
  name: Scalars['String']['output'];
  /** The user's role (optional). */
  role?: Maybe<Scalars['String']['output']>;
  /** Sessions associated with the user. */
  sessions: Array<Session>;
  /** Timestamp when the user was last updated. */
  updatedAt: Scalars['Timestamptz']['output'];
};

/** Stores tokens for email verification or password reset. */
export type Verification = {
  __typename?: 'Verification';
  /** Timestamp when the verification record was created. */
  createdAt: Scalars['Timestamptz']['output'];
  /** The timestamp when the verification token expires. */
  expiresAt: Scalars['Timestamptz']['output'];
  /** Unique identifier for the verification record. */
  id: Scalars['UUID']['output'];
  /** The identifier for the verification (e.g., email address). */
  identifier: Scalars['String']['output'];
  /** Timestamp when the verification record was last updated. */
  updatedAt: Scalars['Timestamptz']['output'];
  /** The verification token. */
  value: Scalars['String']['output'];
};

export type VerifyEmailResponse = {
  __typename?: 'VerifyEmailResponse';
  message: Scalars['String']['output'];
  redirect: Scalars['Boolean']['output'];
  success: Scalars['Boolean']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

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
export type ResolversTypes = ResolversObject<{
  Account: ResolverTypeWrapper<Account>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  RevokeSessionResponse: ResolverTypeWrapper<RevokeSessionResponse>;
  SendEmailVerificationResponse: ResolverTypeWrapper<SendEmailVerificationResponse>;
  Session: ResolverTypeWrapper<Session>;
  SignInResponse: ResolverTypeWrapper<SignInResponse>;
  SignOutResponse: ResolverTypeWrapper<SignOutResponse>;
  SignUpResponse: ResolverTypeWrapper<SignUpResponse>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Timestamptz: ResolverTypeWrapper<Scalars['Timestamptz']['output']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']['output']>;
  User: ResolverTypeWrapper<User>;
  Verification: ResolverTypeWrapper<Verification>;
  VerifyEmailResponse: ResolverTypeWrapper<VerifyEmailResponse>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Account: Account;
  Boolean: Scalars['Boolean']['output'];
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  RevokeSessionResponse: RevokeSessionResponse;
  SendEmailVerificationResponse: SendEmailVerificationResponse;
  Session: Session;
  SignInResponse: SignInResponse;
  SignOutResponse: SignOutResponse;
  SignUpResponse: SignUpResponse;
  String: Scalars['String']['output'];
  Timestamptz: Scalars['Timestamptz']['output'];
  UUID: Scalars['UUID']['output'];
  User: User;
  Verification: Verification;
  VerifyEmailResponse: VerifyEmailResponse;
}>;

export type AccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = ResolversObject<{
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  accessTokenExpiresAt?: Resolver<Maybe<ResolversTypes['Timestamptz']>, ParentType, ContextType>;
  accountId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Timestamptz'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  idToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  providerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refreshTokenExpiresAt?: Resolver<Maybe<ResolversTypes['Timestamptz']>, ParentType, ContextType>;
  scope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamptz'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  revokeSession?: Resolver<ResolversTypes['RevokeSessionResponse'], ParentType, ContextType, RequireFields<MutationRevokeSessionArgs, 'sessionId'>>;
  sendEmailVerification?: Resolver<ResolversTypes['SendEmailVerificationResponse'], ParentType, ContextType, RequireFields<MutationSendEmailVerificationArgs, 'email'>>;
  signIn?: Resolver<ResolversTypes['SignInResponse'], ParentType, ContextType, RequireFields<MutationSignInArgs, 'email' | 'password'>>;
  signOut?: Resolver<ResolversTypes['SignOutResponse'], ParentType, ContextType, RequireFields<MutationSignOutArgs, 'token'>>;
  signUp?: Resolver<ResolversTypes['SignUpResponse'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'email' | 'name' | 'password'>>;
  verifyEmail?: Resolver<ResolversTypes['VerifyEmailResponse'], ParentType, ContextType, RequireFields<MutationVerifyEmailArgs, 'code' | 'email'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  activeSessions?: Resolver<Array<ResolversTypes['Session']>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  verifySession?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryVerifySessionArgs, 'token'>>;
}>;

export type RevokeSessionResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RevokeSessionResponse'] = ResolversParentTypes['RevokeSessionResponse']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
}>;

export type SendEmailVerificationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SendEmailVerificationResponse'] = ResolversParentTypes['SendEmailVerificationResponse']> = ResolversObject<{
  expiresAt?: Resolver<ResolversTypes['Timestamptz'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
}>;

export type SessionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Session'] = ResolversParentTypes['Session']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['Timestamptz'], ParentType, ContextType>;
  expiresAt?: Resolver<ResolversTypes['Timestamptz'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  impersonatedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  ipAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamptz'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userAgent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
}>;

export type SignInResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignInResponse'] = ResolversParentTypes['SignInResponse']> = ResolversObject<{
  redirect?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
}>;

export type SignOutResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignOutResponse'] = ResolversParentTypes['SignOutResponse']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
}>;

export type SignUpResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignUpResponse'] = ResolversParentTypes['SignUpResponse']> = ResolversObject<{
  redirect?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export interface TimestamptzScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamptz'], any> {
  name: 'Timestamptz';
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  accounts?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType>;
  banExpires?: Resolver<Maybe<ResolversTypes['Timestamptz']>, ParentType, ContextType>;
  banReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  banned?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Timestamptz'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emailVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sessions?: Resolver<Array<ResolversTypes['Session']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamptz'], ParentType, ContextType>;
}>;

export type VerificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Verification'] = ResolversParentTypes['Verification']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['Timestamptz'], ParentType, ContextType>;
  expiresAt?: Resolver<ResolversTypes['Timestamptz'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  identifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamptz'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type VerifyEmailResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['VerifyEmailResponse'] = ResolversParentTypes['VerifyEmailResponse']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  redirect?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Account?: AccountResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RevokeSessionResponse?: RevokeSessionResponseResolvers<ContextType>;
  SendEmailVerificationResponse?: SendEmailVerificationResponseResolvers<ContextType>;
  Session?: SessionResolvers<ContextType>;
  SignInResponse?: SignInResponseResolvers<ContextType>;
  SignOutResponse?: SignOutResponseResolvers<ContextType>;
  SignUpResponse?: SignUpResponseResolvers<ContextType>;
  Timestamptz?: GraphQLScalarType;
  UUID?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  Verification?: VerificationResolvers<ContextType>;
  VerifyEmailResponse?: VerifyEmailResponseResolvers<ContextType>;
}>;

