/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from 'pocketbase';
import type { RecordService } from 'pocketbase';

export enum Collections {
  Authorigins = '_authOrigins',
  Externalauths = '_externalAuths',
  Mfas = '_mfas',
  Otps = '_otps',
  Superusers = '_superusers',
  ChatMessages = 'chatMessages',
  ChatRooms = 'chatRooms',
  Companies = 'companies',
  Departments = 'departments',
  InventoryItems = 'inventoryItems',
  Invoices = 'invoices',
  Notifications = 'notifications',
  OrderLineItems = 'orderLineItems',
  Orders = 'orders',
  Payments = 'payments',
  Products = 'products',
  RouteSegments = 'routeSegments',
  Routes = 'routes',
  Shipments = 'shipments',
  TaskMessages = 'taskMessages',
  Tasks = 'tasks',
  TasksKPI = 'tasksKPI',
  Users = 'users',
  Vehicles = 'vehicles',
  Warehouses = 'warehouses',
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

type ExpandType<T> = unknown extends T
  ? T extends unknown
    ? { expand?: unknown }
    : { expand: T }
  : { expand: T };

// System fields
export type BaseSystemFields<T = unknown> = {
  id: RecordIdString;
  collectionId: string;
  collectionName: Collections;
} & ExpandType<T>;

export type AuthSystemFields<T = unknown> = {
  email: string;
  emailVisibility: boolean;
  username: string;
  verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export type AuthoriginsRecord = {
  collectionRef: string;
  created?: IsoDateString;
  fingerprint: string;
  id: string;
  recordRef: string;
  updated?: IsoDateString;
};

export type ExternalauthsRecord = {
  collectionRef: string;
  created?: IsoDateString;
  id: string;
  provider: string;
  providerId: string;
  recordRef: string;
  updated?: IsoDateString;
};

export type MfasRecord = {
  collectionRef: string;
  created?: IsoDateString;
  id: string;
  method: string;
  recordRef: string;
  updated?: IsoDateString;
};

export type OtpsRecord = {
  collectionRef: string;
  created?: IsoDateString;
  id: string;
  password: string;
  recordRef: string;
  sentTo?: string;
  updated?: IsoDateString;
};

export type SuperusersRecord = {
  created?: IsoDateString;
  email: string;
  emailVisibility?: boolean;
  id: string;
  password: string;
  tokenKey: string;
  updated?: IsoDateString;
  verified?: boolean;
};

export type ChatMessagesRecord = {
  attachments?: string[];
  content?: HTMLString;
  created?: IsoDateString;
  id: string;
  read_by?: RecordIdString[];
  room?: RecordIdString;
  sender?: RecordIdString;
  updated?: IsoDateString;
};

export enum ChatRoomsTypeOptions {
  direct_message = 'direct_message',
  group_chat = 'group_chat',
  order_chat = 'order_chat',
  support_chat = 'support_chat',
}
export type ChatRoomsRecord = {
  created?: IsoDateString;
  id: string;
  last_message_at?: IsoDateString;
  name?: string;
  participants: RecordIdString[];
  related_order?: RecordIdString;
  type?: ChatRoomsTypeOptions;
  updated?: IsoDateString;
};

export enum CompaniesTypeOptions {
  customer = 'customer',
  supplier = 'supplier',
  carrier = 'carrier',
  internal = 'internal',
}
export type CompaniesRecord = {
  address?: string;
  contactEmail?: string;
  contactPhone?: string;
  created?: IsoDateString;
  id: string;
  name: string;
  primaryContactPerson?: RecordIdString;
  type: CompaniesTypeOptions;
  updated?: IsoDateString;
};

export type DepartmentsRecord = {
  avatar?: string;
  cover_photo?: string;
  created?: IsoDateString;
  employees?: RecordIdString[];
  id: string;
  managers?: RecordIdString[];
  name: string;
  updated?: IsoDateString;
};

export enum InventoryItemsStatusOptions {
  available = 'available',
  on_hold = 'on_hold',
  allocated = 'allocated',
  damaged = 'damaged',
  in_transit_to_warehouse = 'in_transit_to_warehouse',
}
export type InventoryItemsRecord = {
  created?: IsoDateString;
  expiry_date?: IsoDateString;
  id: string;
  last_counted_date?: IsoDateString;
  lot_number?: string;
  product: RecordIdString;
  quantity_on_hand?: number;
  serial_number?: string;
  status?: InventoryItemsStatusOptions;
  storage_location_code?: string;
  updated?: IsoDateString;
  warehouse: RecordIdString;
};

export enum InvoicesStatusOptions {
  draft = 'draft',
  sent = 'sent',
  paid = 'paid',
  partially_paid = 'partially_paid',
  overdue = 'overdue',
  void = 'void',
}
export type InvoicesRecord = {
  created?: IsoDateString;
  customer?: RecordIdString;
  due_date: IsoDateString;
  id: string;
  invoice_date: IsoDateString;
  invoice_number: string;
  invoice_pdf?: string;
  order_ref?: RecordIdString;
  status: InvoicesStatusOptions;
  total_amount?: number;
  updated?: IsoDateString;
};

export enum NotificationsTypeOptions {
  new_task_assigned = 'new_task_assigned',
  task_updated = 'task_updated',
  order_status_updated = 'order_status_updated',
  shipment_alert = 'shipment_alert',
  new_chat_message = 'new_chat_message',
  system_announcement = 'system_announcement',
  mention = 'mention',
  task_comment = 'task_comment',
}
export type NotificationsRecord = {
  created?: IsoDateString;
  id: string;
  is_read?: boolean;
  link?: string;
  message: string;
  read_at?: IsoDateString;
  title: string;
  type?: NotificationsTypeOptions;
  updated?: IsoDateString;
  user?: RecordIdString;
};

export type OrderLineItemsRecord = {
  created?: IsoDateString;
  id: string;
  order: RecordIdString;
  price_per_unit?: number;
  product: RecordIdString;
  quantity: number;
  subtotal?: number;
  updated?: IsoDateString;
};

export enum OrdersStatusOptions {
  pending_validation = 'pending_validation',
  validated = 'validated',
  allocated = 'allocated',
  picking = 'picking',
  packing = 'packing',
  ready_for_shipment = 'ready_for_shipment',
  shipped = 'shipped',
  delivered = 'delivered',
  cancelled = 'cancelled',
  on_hold = 'on_hold',
}
export type OrdersRecord = {
  assigned_warehouse?: RecordIdString;
  billing_address: string;
  created?: IsoDateString;
  created_by?: RecordIdString;
  customer: RecordIdString;
  id: string;
  order_date: IsoDateString;
  order_id_custom: string;
  shipping_address: string;
  status?: OrdersStatusOptions;
  total_amount?: number;
  updated?: IsoDateString;
};

export enum PaymentsPaymentMethodOptions {
  credit_card = 'credit_card',
  bank_transfer = 'bank_transfer',
  ach = 'ach',
  check = 'check',
  cash = 'cash',
  other = 'other',
}

export enum PaymentsStatusOptions {
  pending = 'pending',
  completed = 'completed',
  failed = 'failed',
  refunded = 'refunded',
}
export type PaymentsRecord = {
  amount_paid?: number;
  created?: IsoDateString;
  id: string;
  invoice: RecordIdString;
  notes?: string;
  payment_date: IsoDateString;
  payment_method?: PaymentsPaymentMethodOptions;
  status: PaymentsStatusOptions;
  transaction_id?: string;
  updated?: IsoDateString;
};

export type ProductsRecord = {
  cost?: number;
  created?: IsoDateString;
  description?: HTMLString;
  dimensions?: string;
  id: string;
  image?: string[];
  name: string;
  sku: string;
  supplier?: RecordIdString;
  updated?: IsoDateString;
  weight?: number;
};

export enum RouteSegmentsSegmentTypeOptions {
  start_point = 'start_point',
  pickup = 'pickup',
  delivery = 'delivery',
  waypoint = 'waypoint',
}
export type RouteSegmentsRecord = {
  actual_arrival_time?: IsoDateString;
  actual_departure_time?: IsoDateString;
  address_text?: string;
  created?: IsoDateString;
  estimated_arrival_time?: IsoDateString;
  estimated_departure_time?: IsoDateString;
  id: string;
  instructions?: string;
  latitude?: string;
  longitude?: string;
  related_shipment?: RecordIdString;
  route: RecordIdString;
  segment_type: RouteSegmentsSegmentTypeOptions;
  sequence_number?: number;
  updated?: IsoDateString;
};

export enum RoutesStatusOptions {
  planned = 'planned',
  in_progress = 'in_progress',
  completed = 'completed',
  delayed = 'delayed',
  cancelled = 'cancelled',
}
export type RoutesRecord = {
  created?: IsoDateString;
  driver_assigned?: RecordIdString;
  id: string;
  latitude?: number;
  longitude?: number;
  planned_end_time?: IsoDateString;
  planned_start_time?: IsoDateString;
  route_name: string;
  shipments_on_route?: RecordIdString;
  status?: RoutesStatusOptions;
  updated?: IsoDateString;
  vehicle_assigned?: RecordIdString;
};

export enum ShipmentsStatusOptions {
  label_created = 'label_created',
  pending_pickup = 'pending_pickup',
  in_transit = 'in_transit',
  out_for_delivery = 'out_for_delivery',
  delivered = 'delivered',
  exception = 'exception',
  returned = 'returned',
}
export type ShipmentsRecord = {
  actual_delivered_date?: IsoDateString;
  carrier?: RecordIdString;
  created?: IsoDateString;
  current_location_notes?: string;
  department_assigned?: RecordIdString;
  driver?: RecordIdString;
  estimated_delivered_date?: IsoDateString;
  id: string;
  order_ref: RecordIdString;
  proof_of_delivery?: string[];
  status?: ShipmentsStatusOptions;
  tracking_number?: string;
  updated?: IsoDateString;
};

export type TaskMessagesRecord = {
  attachments?: string[];
  content: HTMLString;
  created?: IsoDateString;
  id: string;
  read_by?: RecordIdString[];
  sender: RecordIdString;
  task: RecordIdString;
  updated?: IsoDateString;
};

export enum TasksStatusOptions {
  todo = 'todo',
  scheduled = 'scheduled',
  picking = 'picking',
  packing = 'packing',
  'ready-for-dispatch' = 'ready-for-dispatch',
  'in-progress' = 'in-progress',
  blocked = 'blocked',
  review = 'review',
  done = 'done',
  cancelled = 'cancelled',
}

export enum TasksPriorityOptions {
  low = 'low',
  medium = 'medium',
  high = 'high',
  urgent = 'urgent',
}

export enum TasksTagsOptions {
  dispatch = 'dispatch',
  warehouse = 'warehouse',
  'customer-update' = 'customer-update',
  'inventory-check' = 'inventory-check',
  'finance-review' = 'finance-review',
}
export type TasksRecord = {
  assignees?: RecordIdString[];
  assigner: RecordIdString;
  attachments?: string[];
  created?: IsoDateString;
  department: RecordIdString;
  description?: HTMLString;
  due_date?: IsoDateString;
  id: string;
  kanban_order?: number;
  order_ref?: RecordIdString;
  priority: TasksPriorityOptions;
  related_shipment?: RecordIdString;
  status: TasksStatusOptions;
  tags: TasksTagsOptions;
  title: string;
  updated?: IsoDateString;
};

export type TasksKPIRecord = {
  blocked_tasks?: number;
  completed_tasks?: number;
  id: string;
  in_progress_tasks?: number;
  overdue_tasks?: number;
  todo_tasks?: number;
  total_tasks?: number;
};

export enum UsersRoleOptions {
  executive = 'executive',
  warehouse_manager = 'warehouse_manager',
  dispatch_coordinator = 'dispatch_coordinator',
  delivery_driver = 'delivery_driver',
  customer_service_rep = 'customer_service_rep',
  finance_dept = 'finance_dept',
  customer_rep = 'customer_rep',
  department_manager = 'department_manager',
  department_employee = 'department_employee',
}
export type UsersRecord = {
  address?: HTMLString;
  avatar?: string;
  company?: RecordIdString;
  created?: IsoDateString;
  department?: RecordIdString;
  email: string;
  emailVisibility?: boolean;
  id: string;
  name: string;
  password: string;
  phone?: string;
  role: UsersRoleOptions;
  tokenKey: string;
  updated?: IsoDateString;
  verified?: boolean;
};

export enum VehiclesStatusOptions {
  available = 'available',
  in_use = 'in_use',
  maintenance = 'maintenance',
  out_of_service = 'out_of_service',
}
export type VehiclesRecord = {
  capacity_volume?: number;
  capacity_weight?: number;
  created?: IsoDateString;
  current_driver?: RecordIdString;
  id: string;
  license_plate: string;
  make?: string;
  model?: string;
  status?: VehiclesStatusOptions;
  type?: string;
  updated?: IsoDateString;
};

export type WarehousesRecord = {
  address: string;
  created?: IsoDateString;
  id: string;
  latitude?: string;
  longitude?: string;
  manager?: RecordIdString;
  name: string;
  updated?: IsoDateString;
};

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> =
  Required<AuthoriginsRecord> & BaseSystemFields<Texpand>;
export type ExternalauthsResponse<Texpand = unknown> =
  Required<ExternalauthsRecord> & BaseSystemFields<Texpand>;
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> &
  BaseSystemFields<Texpand>;
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> &
  BaseSystemFields<Texpand>;
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> &
  AuthSystemFields<Texpand>;
export type ChatMessagesResponse<Texpand = unknown> =
  Required<ChatMessagesRecord> & BaseSystemFields<Texpand>;
export type ChatRoomsResponse<Texpand = unknown> = Required<ChatRoomsRecord> &
  BaseSystemFields<Texpand>;
export type CompaniesResponse<Texpand = unknown> = Required<CompaniesRecord> &
  BaseSystemFields<Texpand>;
export type DepartmentsResponse<Texpand = unknown> =
  Required<DepartmentsRecord> & BaseSystemFields<Texpand>;
export type InventoryItemsResponse<Texpand = unknown> =
  Required<InventoryItemsRecord> & BaseSystemFields<Texpand>;
export type InvoicesResponse<Texpand = unknown> = Required<InvoicesRecord> &
  BaseSystemFields<Texpand>;
export type NotificationsResponse<Texpand = unknown> =
  Required<NotificationsRecord> & BaseSystemFields<Texpand>;
export type OrderLineItemsResponse<Texpand = unknown> =
  Required<OrderLineItemsRecord> & BaseSystemFields<Texpand>;
export type OrdersResponse<Texpand = unknown> = Required<OrdersRecord> &
  BaseSystemFields<Texpand>;
export type PaymentsResponse<Texpand = unknown> = Required<PaymentsRecord> &
  BaseSystemFields<Texpand>;
export type ProductsResponse<Texpand = unknown> = Required<ProductsRecord> &
  BaseSystemFields<Texpand>;
export type RouteSegmentsResponse<Texpand = unknown> =
  Required<RouteSegmentsRecord> & BaseSystemFields<Texpand>;
export type RoutesResponse<Texpand = unknown> = Required<RoutesRecord> &
  BaseSystemFields<Texpand>;
export type ShipmentsResponse<Texpand = unknown> = Required<ShipmentsRecord> &
  BaseSystemFields<Texpand>;
export type TaskMessagesResponse<Texpand = unknown> =
  Required<TaskMessagesRecord> & BaseSystemFields<Texpand>;
export type TasksResponse<Texpand = unknown> = Required<TasksRecord> &
  BaseSystemFields<Texpand>;
export type TasksKPIResponse<Texpand = unknown> = Required<TasksKPIRecord> &
  BaseSystemFields<Texpand>;
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> &
  AuthSystemFields<Texpand>;
export type VehiclesResponse<Texpand = unknown> = Required<VehiclesRecord> &
  BaseSystemFields<Texpand>;
export type WarehousesResponse<Texpand = unknown> = Required<WarehousesRecord> &
  BaseSystemFields<Texpand>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  _authOrigins: AuthoriginsRecord;
  _externalAuths: ExternalauthsRecord;
  _mfas: MfasRecord;
  _otps: OtpsRecord;
  _superusers: SuperusersRecord;
  chatMessages: ChatMessagesRecord;
  chatRooms: ChatRoomsRecord;
  companies: CompaniesRecord;
  departments: DepartmentsRecord;
  inventoryItems: InventoryItemsRecord;
  invoices: InvoicesRecord;
  notifications: NotificationsRecord;
  orderLineItems: OrderLineItemsRecord;
  orders: OrdersRecord;
  payments: PaymentsRecord;
  products: ProductsRecord;
  routeSegments: RouteSegmentsRecord;
  routes: RoutesRecord;
  shipments: ShipmentsRecord;
  taskMessages: TaskMessagesRecord;
  tasks: TasksRecord;
  tasksKPI: TasksKPIRecord;
  users: UsersRecord;
  vehicles: VehiclesRecord;
  warehouses: WarehousesRecord;
};

export type CollectionResponses = {
  _authOrigins: AuthoriginsResponse;
  _externalAuths: ExternalauthsResponse;
  _mfas: MfasResponse;
  _otps: OtpsResponse;
  _superusers: SuperusersResponse;
  chatMessages: ChatMessagesResponse;
  chatRooms: ChatRoomsResponse;
  companies: CompaniesResponse;
  departments: DepartmentsResponse;
  inventoryItems: InventoryItemsResponse;
  invoices: InvoicesResponse;
  notifications: NotificationsResponse;
  orderLineItems: OrderLineItemsResponse;
  orders: OrdersResponse;
  payments: PaymentsResponse;
  products: ProductsResponse;
  routeSegments: RouteSegmentsResponse;
  routes: RoutesResponse;
  shipments: ShipmentsResponse;
  taskMessages: TaskMessagesResponse;
  tasks: TasksResponse;
  tasksKPI: TasksKPIResponse;
  users: UsersResponse;
  vehicles: VehiclesResponse;
  warehouses: WarehousesResponse;
};

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
  collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>;
  collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>;
  collection(idOrName: '_mfas'): RecordService<MfasResponse>;
  collection(idOrName: '_otps'): RecordService<OtpsResponse>;
  collection(idOrName: '_superusers'): RecordService<SuperusersResponse>;
  collection(idOrName: 'chatMessages'): RecordService<ChatMessagesResponse>;
  collection(idOrName: 'chatRooms'): RecordService<ChatRoomsResponse>;
  collection(idOrName: 'companies'): RecordService<CompaniesResponse>;
  collection(idOrName: 'departments'): RecordService<DepartmentsResponse>;
  collection(idOrName: 'inventoryItems'): RecordService<InventoryItemsResponse>;
  collection(idOrName: 'invoices'): RecordService<InvoicesResponse>;
  collection(idOrName: 'notifications'): RecordService<NotificationsResponse>;
  collection(idOrName: 'orderLineItems'): RecordService<OrderLineItemsResponse>;
  collection(idOrName: 'orders'): RecordService<OrdersResponse>;
  collection(idOrName: 'payments'): RecordService<PaymentsResponse>;
  collection(idOrName: 'products'): RecordService<ProductsResponse>;
  collection(idOrName: 'routeSegments'): RecordService<RouteSegmentsResponse>;
  collection(idOrName: 'routes'): RecordService<RoutesResponse>;
  collection(idOrName: 'shipments'): RecordService<ShipmentsResponse>;
  collection(idOrName: 'taskMessages'): RecordService<TaskMessagesResponse>;
  collection(idOrName: 'tasks'): RecordService<TasksResponse>;
  collection(idOrName: 'tasksKPI'): RecordService<TasksKPIResponse>;
  collection(idOrName: 'users'): RecordService<UsersResponse>;
  collection(idOrName: 'vehicles'): RecordService<VehiclesResponse>;
  collection(idOrName: 'warehouses'): RecordService<WarehousesResponse>;
};
