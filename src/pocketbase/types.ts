/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	CrmCampaignContacts = "crm_campaign_contacts",
	CrmCampaigns = "crm_campaigns",
	CrmCases = "crm_cases",
	CrmCompanies = "crm_companies",
	CrmContacts = "crm_contacts",
	CrmInteractions = "crm_interactions",
	CrmLeads = "crm_leads",
	CrmOpportunities = "crm_opportunities",
	CrmOpportunityProducts = "crm_opportunity_products",
	CrmProducts = "crm_products",
	OrgOrganization = "org_organization",
	OrgRoleActions = "org_role_actions",
	OrgRoles = "org_roles",
	OrgTeamMembers = "org_team_members",
	OrgTeamResources = "org_team_resources",
	OrgTeamRoles = "org_team_roles",
	OrgTeams = "org_teams",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

type ExpandType<T> = unknown extends T
	? T extends unknown
		? { expand?: unknown }
		: { expand: T }
	: { expand: T }

// System fields
export type BaseSystemFields<T = unknown> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
} & ExpandType<T>

export type AuthSystemFields<T = unknown> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created?: IsoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated?: IsoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated?: IsoDateString
}

export type MfasRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	method: string
	recordRef: string
	updated?: IsoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated?: IsoDateString
}

export type SuperusersRecord = {
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export enum CrmCampaignContactsStatusOptions {
	"sent" = "sent",
	"opened" = "opened",
	"clicked" = "clicked",
	"responded" = "responded",
	"unsubscribe" = "unsubscribe",
}
export type CrmCampaignContactsRecord = {
	campaign: RecordIdString
	contact: RecordIdString
	created?: IsoDateString
	id: string
	interaction_date: IsoDateString
	status: CrmCampaignContactsStatusOptions
	updated?: IsoDateString
}

export enum CrmCampaignsStatusOptions {
	"planned" = "planned",
	"active" = "active",
	"completed" = "completed",
	"paused" = "paused",
}
export type CrmCampaignsRecord = {
	budget?: number
	created?: IsoDateString
	description?: HTMLString
	end_date?: IsoDateString
	id: string
	name: string
	start_date: IsoDateString
	status?: CrmCampaignsStatusOptions
	updated?: IsoDateString
}

export enum CrmCasesStatusOptions {
	"open" = "open",
	"in_progress" = "in_progress",
	"pending_customer" = "pending_customer",
	"closed" = "closed",
}

export enum CrmCasesPriorityOptions {
	"low" = "low",
	"medium" = "medium",
	"high" = "high",
	"critical" = "critical",
}
export type CrmCasesRecord = {
	closed_at?: IsoDateString
	contact?: RecordIdString
	created?: IsoDateString
	description: HTMLString
	id: string
	priority?: CrmCasesPriorityOptions
	status: CrmCasesStatusOptions
	subject: string
	updated?: IsoDateString
}

export type CrmCompaniesRecord = {
	created?: IsoDateString
	description?: HTMLString
	email?: string
	id: string
	industry?: string
	name: string
	phone_number?: string
	updated?: IsoDateString
	website?: string
}

export enum CrmContactsStatusOptions {
	"lead" = "lead",
	"prospect" = "prospect",
	"customer" = "customer",
	"inactive" = "inactive",
}
export type CrmContactsRecord = {
	birth_date?: IsoDateString
	company?: RecordIdString
	created?: IsoDateString
	email: string
	first_name: string
	id: string
	job_title?: string
	last_name: string
	lead_source?: string
	phone_number?: string
	status?: CrmContactsStatusOptions
	updated?: IsoDateString
}

export enum CrmInteractionsTypeOptions {
	"call" = "call",
	"email" = "email",
	"meeting" = "meeting",
	"chat" = "chat",
	"note" = "note",
}
export type CrmInteractionsRecord = {
	contact?: RecordIdString
	created?: IsoDateString
	description?: HTMLString
	id: string
	interaction_date: IsoDateString
	opportunity?: RecordIdString
	subject?: string
	type: CrmInteractionsTypeOptions
	updated?: IsoDateString
}

export enum CrmLeadsLeadStatusOptions {
	"new" = "new",
	"qualified" = "qualified",
	"contacted" = "contacted",
	"unqualified" = "unqualified",
}
export type CrmLeadsRecord = {
	company_name?: string
	converted_to_contact?: RecordIdString
	created?: IsoDateString
	email: string
	first_name: string
	id: string
	last_name: string
	lead_score?: number
	lead_source?: string
	lead_status?: CrmLeadsLeadStatusOptions
	phone_number?: string
	updated?: IsoDateString
}

export enum CrmOpportunitiesStageOptions {
	"prospecting" = "prospecting",
	"qualification" = "qualification",
	"proposal" = "proposal",
	"closed-won" = "closed-won",
	"closed-lost" = "closed-lost",
}
export type CrmOpportunitiesRecord = {
	amount: number
	close_date?: IsoDateString
	company?: RecordIdString
	created?: IsoDateString
	id: string
	name: string
	primary_contact?: RecordIdString
	probability?: number
	stage: CrmOpportunitiesStageOptions
	updated?: IsoDateString
}

export type CrmOpportunityProductsRecord = {
	created?: IsoDateString
	id: string
	opportunity: RecordIdString
	product: RecordIdString
	quantity: number
	unit_price: number
	updated?: IsoDateString
}

export type CrmProductsRecord = {
	created?: IsoDateString
	description?: HTMLString
	id: string
	name: string
	price?: number
	sku?: string
	updated?: IsoDateString
}

export type OrgOrganizationRecord = {
	created?: IsoDateString
	id: string
	name: string
	owner: RecordIdString
	updated?: IsoDateString
}

export enum OrgRoleActionsActionOptions {
	"create" = "create",
	"read" = "read",
	"update" = "update",
	"delete" = "delete",
}
export type OrgRoleActionsRecord = {
	action: OrgRoleActionsActionOptions
	created?: IsoDateString
	id: string
	role: RecordIdString
	updated?: IsoDateString
}

export type OrgRolesRecord = {
	created?: IsoDateString
	description?: HTMLString
	id: string
	name: string
	organization?: RecordIdString
	updated?: IsoDateString
}

export type OrgTeamMembersRecord = {
	created?: IsoDateString
	id: string
	team: RecordIdString
	updated?: IsoDateString
	user: RecordIdString
}

export type OrgTeamResourcesRecord = {
	created?: IsoDateString
	id: string
	resource: string
	updated?: IsoDateString
}

export type OrgTeamRolesRecord = {
	created?: IsoDateString
	id: string
	roles: RecordIdString
	team: RecordIdString
	updated?: IsoDateString
}

export type OrgTeamsRecord = {
	created?: IsoDateString
	description: HTMLString
	id: string
	name: string
	organization: RecordIdString
	updated?: IsoDateString
}

export type UsersRecord = {
	avatar?: string
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	name?: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type CrmCampaignContactsResponse<Texpand = unknown> = Required<CrmCampaignContactsRecord> & BaseSystemFields<Texpand>
export type CrmCampaignsResponse<Texpand = unknown> = Required<CrmCampaignsRecord> & BaseSystemFields<Texpand>
export type CrmCasesResponse<Texpand = unknown> = Required<CrmCasesRecord> & BaseSystemFields<Texpand>
export type CrmCompaniesResponse<Texpand = unknown> = Required<CrmCompaniesRecord> & BaseSystemFields<Texpand>
export type CrmContactsResponse<Texpand = unknown> = Required<CrmContactsRecord> & BaseSystemFields<Texpand>
export type CrmInteractionsResponse<Texpand = unknown> = Required<CrmInteractionsRecord> & BaseSystemFields<Texpand>
export type CrmLeadsResponse<Texpand = unknown> = Required<CrmLeadsRecord> & BaseSystemFields<Texpand>
export type CrmOpportunitiesResponse<Texpand = unknown> = Required<CrmOpportunitiesRecord> & BaseSystemFields<Texpand>
export type CrmOpportunityProductsResponse<Texpand = unknown> = Required<CrmOpportunityProductsRecord> & BaseSystemFields<Texpand>
export type CrmProductsResponse<Texpand = unknown> = Required<CrmProductsRecord> & BaseSystemFields<Texpand>
export type OrgOrganizationResponse<Texpand = unknown> = Required<OrgOrganizationRecord> & BaseSystemFields<Texpand>
export type OrgRoleActionsResponse<Texpand = unknown> = Required<OrgRoleActionsRecord> & BaseSystemFields<Texpand>
export type OrgRolesResponse<Texpand = unknown> = Required<OrgRolesRecord> & BaseSystemFields<Texpand>
export type OrgTeamMembersResponse<Texpand = unknown> = Required<OrgTeamMembersRecord> & BaseSystemFields<Texpand>
export type OrgTeamResourcesResponse<Texpand = unknown> = Required<OrgTeamResourcesRecord> & BaseSystemFields<Texpand>
export type OrgTeamRolesResponse<Texpand = unknown> = Required<OrgTeamRolesRecord> & BaseSystemFields<Texpand>
export type OrgTeamsResponse<Texpand = unknown> = Required<OrgTeamsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	crm_campaign_contacts: CrmCampaignContactsRecord
	crm_campaigns: CrmCampaignsRecord
	crm_cases: CrmCasesRecord
	crm_companies: CrmCompaniesRecord
	crm_contacts: CrmContactsRecord
	crm_interactions: CrmInteractionsRecord
	crm_leads: CrmLeadsRecord
	crm_opportunities: CrmOpportunitiesRecord
	crm_opportunity_products: CrmOpportunityProductsRecord
	crm_products: CrmProductsRecord
	org_organization: OrgOrganizationRecord
	org_role_actions: OrgRoleActionsRecord
	org_roles: OrgRolesRecord
	org_team_members: OrgTeamMembersRecord
	org_team_resources: OrgTeamResourcesRecord
	org_team_roles: OrgTeamRolesRecord
	org_teams: OrgTeamsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	crm_campaign_contacts: CrmCampaignContactsResponse
	crm_campaigns: CrmCampaignsResponse
	crm_cases: CrmCasesResponse
	crm_companies: CrmCompaniesResponse
	crm_contacts: CrmContactsResponse
	crm_interactions: CrmInteractionsResponse
	crm_leads: CrmLeadsResponse
	crm_opportunities: CrmOpportunitiesResponse
	crm_opportunity_products: CrmOpportunityProductsResponse
	crm_products: CrmProductsResponse
	org_organization: OrgOrganizationResponse
	org_role_actions: OrgRoleActionsResponse
	org_roles: OrgRolesResponse
	org_team_members: OrgTeamMembersResponse
	org_team_resources: OrgTeamResourcesResponse
	org_team_roles: OrgTeamRolesResponse
	org_teams: OrgTeamsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>
	collection(idOrName: '_mfas'): RecordService<MfasResponse>
	collection(idOrName: '_otps'): RecordService<OtpsResponse>
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>
	collection(idOrName: 'crm_campaign_contacts'): RecordService<CrmCampaignContactsResponse>
	collection(idOrName: 'crm_campaigns'): RecordService<CrmCampaignsResponse>
	collection(idOrName: 'crm_cases'): RecordService<CrmCasesResponse>
	collection(idOrName: 'crm_companies'): RecordService<CrmCompaniesResponse>
	collection(idOrName: 'crm_contacts'): RecordService<CrmContactsResponse>
	collection(idOrName: 'crm_interactions'): RecordService<CrmInteractionsResponse>
	collection(idOrName: 'crm_leads'): RecordService<CrmLeadsResponse>
	collection(idOrName: 'crm_opportunities'): RecordService<CrmOpportunitiesResponse>
	collection(idOrName: 'crm_opportunity_products'): RecordService<CrmOpportunityProductsResponse>
	collection(idOrName: 'crm_products'): RecordService<CrmProductsResponse>
	collection(idOrName: 'org_organization'): RecordService<OrgOrganizationResponse>
	collection(idOrName: 'org_role_actions'): RecordService<OrgRoleActionsResponse>
	collection(idOrName: 'org_roles'): RecordService<OrgRolesResponse>
	collection(idOrName: 'org_team_members'): RecordService<OrgTeamMembersResponse>
	collection(idOrName: 'org_team_resources'): RecordService<OrgTeamResourcesResponse>
	collection(idOrName: 'org_team_roles'): RecordService<OrgTeamRolesResponse>
	collection(idOrName: 'org_teams'): RecordService<OrgTeamsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
