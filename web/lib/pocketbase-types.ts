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
	ChatMessage = "chat_message",
	Department = "department",
	Employee = "employee",
	MarketingServices = "marketing_services",
	Notification = "notification",
	Shipment = "shipment",
	ShipmentItem = "shipment_item",
	Tasks = "tasks",
	TasksMessages = "tasks_messages",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
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

export type ChatMessageRecord = {
	attachments?: string[]
	content?: HTMLString
	created?: IsoDateString
	id: string
	receiver_id?: RecordIdString
	sender_id?: RecordIdString
	updated?: IsoDateString
}

export type DepartmentRecord = {
	avatar?: string
	cover_photo?: string
	created?: IsoDateString
	employees?: RecordIdString[]
	id: string
	managers?: RecordIdString[]
	name?: string
	updated?: IsoDateString
}

export type EmployeeRecord = {
	created?: IsoDateString
	first_name?: string
	id: string
	job_role?: string
	last_name?: string
	middle_name?: string
	updated?: IsoDateString
	user_id?: RecordIdString
}

export enum MarketingServicesLayoutStyleOptions {
	"centered" = "centered",
	"grid" = "grid",
}
export type MarketingServicesRecord = {
	created?: IsoDateString
	description: HTMLString
	id: string
	images?: string[]
	layout_style: MarketingServicesLayoutStyleOptions
	title: string
	updated?: IsoDateString
}

export type NotificationRecord = {
	created?: IsoDateString
	id: string
	link?: string
	message?: string
	title?: string
	updated?: IsoDateString
	user?: RecordIdString
}

export enum ShipmentTransportModeOptions {
	"land" = "land",
	"air" = "air",
	"sea" = "sea",
}

export enum ShipmentPriorityOptions {
	"highest" = "highest",
	"high" = "high",
	"medium" = "medium",
	"low" = "low",
}

export enum ShipmentWeightTypeOptions {
	"kgs" = "kgs",
	"gs" = "gs",
	"lbs" = "lbs",
	"tons" = "tons",
}

export enum ShipmentShipmentTypeOptions {
	"perishable" = "perishable",
	"non-perishable" = "non-perishable",
}

export enum ShipmentStatusOptions {
	"pending" = "pending",
	"in-process" = "in-process",
	"in-transit" = "in-transit",
	"delivered" = "delivered",
	"returned" = "returned",
	"destroyed" = "destroyed",
}

export enum ShipmentPriceCurrencyOptions {
	"php" = "php",
	"usd" = "usd",
	"euro" = "euro",
}

export enum ShipmentPaymentModeOptions {
	"cash" = "cash",
	"credit" = "credit",
	"e-wallet" = "e-wallet",
}
export type ShipmentRecord = {
	address: HTMLString
	attachments?: string[]
	chat_messages: RecordIdString[]
	created?: IsoDateString
	delivery_attempts: number
	documents: string[]
	id: string
	payment_mode: ShipmentPaymentModeOptions
	payment_reference_id: string
	price: number
	price_currency: ShipmentPriceCurrencyOptions
	priority: ShipmentPriorityOptions
	proof_of_delivery: string[]
	receiver_name: string
	return_attempts?: number
	sender_id: RecordIdString
	shipment_type: ShipmentShipmentTypeOptions
	status: ShipmentStatusOptions
	transport_mode: ShipmentTransportModeOptions
	transport_reference_id: string
	updated?: IsoDateString
	weight: number
	weight_type: ShipmentWeightTypeOptions
}

export type ShipmentItemRecord = {
	created?: IsoDateString
	description?: HTMLString
	id: string
	name?: string
	product_photo?: string[]
	shipment_id?: RecordIdString
	updated?: IsoDateString
}

export enum TasksStatusOptions {
	"pending" = "pending",
	"in-progress" = "in-progress",
	"complete" = "complete",
	"rejected" = "rejected",
}
export type TasksRecord = {
	assignees?: RecordIdString[]
	assigner?: RecordIdString
	attachments?: string[]
	created?: IsoDateString
	department?: RecordIdString
	description?: HTMLString
	id: string
	status?: TasksStatusOptions
	title?: string
	updated?: IsoDateString
}

export type TasksMessagesRecord = {
	attachments?: string[]
	content?: HTMLString
	created?: IsoDateString
	id: string
	sender_id?: RecordIdString
	task_id?: RecordIdString
	updated?: IsoDateString
}

export enum UsersRoleOptions {
	"admin" = "admin",
	"employee" = "employee",
	"customer" = "customer",
}
export type UsersRecord = {
	address?: HTMLString
	avatar?: string
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	name?: string
	password: string
	role?: UsersRoleOptions
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
export type ChatMessageResponse<Texpand = unknown> = Required<ChatMessageRecord> & BaseSystemFields<Texpand>
export type DepartmentResponse<Texpand = unknown> = Required<DepartmentRecord> & BaseSystemFields<Texpand>
export type EmployeeResponse<Texpand = unknown> = Required<EmployeeRecord> & BaseSystemFields<Texpand>
export type MarketingServicesResponse<Texpand = unknown> = Required<MarketingServicesRecord> & BaseSystemFields<Texpand>
export type NotificationResponse<Texpand = unknown> = Required<NotificationRecord> & BaseSystemFields<Texpand>
export type ShipmentResponse<Texpand = unknown> = Required<ShipmentRecord> & BaseSystemFields<Texpand>
export type ShipmentItemResponse<Texpand = unknown> = Required<ShipmentItemRecord> & BaseSystemFields<Texpand>
export type TasksResponse<Texpand = unknown> = Required<TasksRecord> & BaseSystemFields<Texpand>
export type TasksMessagesResponse<Texpand = unknown> = Required<TasksMessagesRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	chat_message: ChatMessageRecord
	department: DepartmentRecord
	employee: EmployeeRecord
	marketing_services: MarketingServicesRecord
	notification: NotificationRecord
	shipment: ShipmentRecord
	shipment_item: ShipmentItemRecord
	tasks: TasksRecord
	tasks_messages: TasksMessagesRecord
	users: UsersRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	chat_message: ChatMessageResponse
	department: DepartmentResponse
	employee: EmployeeResponse
	marketing_services: MarketingServicesResponse
	notification: NotificationResponse
	shipment: ShipmentResponse
	shipment_item: ShipmentItemResponse
	tasks: TasksResponse
	tasks_messages: TasksMessagesResponse
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
	collection(idOrName: 'chat_message'): RecordService<ChatMessageResponse>
	collection(idOrName: 'department'): RecordService<DepartmentResponse>
	collection(idOrName: 'employee'): RecordService<EmployeeResponse>
	collection(idOrName: 'marketing_services'): RecordService<MarketingServicesResponse>
	collection(idOrName: 'notification'): RecordService<NotificationResponse>
	collection(idOrName: 'shipment'): RecordService<ShipmentResponse>
	collection(idOrName: 'shipment_item'): RecordService<ShipmentItemResponse>
	collection(idOrName: 'tasks'): RecordService<TasksResponse>
	collection(idOrName: 'tasks_messages'): RecordService<TasksMessagesResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
