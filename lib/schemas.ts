import { z } from 'zod';
import {
  ChatRoomsTypeOptions,
  CompaniesTypeOptions,
  InventoryItemsStatusOptions,
  InvoicesStatusOptions,
  NotificationsTypeOptions,
  OrdersStatusOptions,
  PaymentsPaymentMethodOptions,
  PaymentsStatusOptions,
  RouteSegmentsSegmentTypeOptions,
  RoutesStatusOptions,
  TasksPriorityOptions,
  TasksStatusOptions,
  TasksTagsOptions,
  UsersRoleOptions,
  VehiclesStatusOptions,
} from './pocketbase.gen';

export const BaseSystemFieldsSchema = z.object({
  id: z.string(),
  collectionId: z.string(),
  collectionName: z.string(),
  created: z.coerce.date(),
  updated: z.coerce.date(),
});

export const UsersRecordSchema = BaseSystemFieldsSchema.extend({
  address: z.string().optional(),
  avatar: z.string().optional(),
  email: z.string().email(),
  name: z.string(),
  phone: z.string().optional(),
  role: z.nativeEnum(UsersRoleOptions),
}).refine((v) => ({
  ...v,
  avatar: `/api/files/_pb_${v.collectionName}_auth_/${v.id}/${v.avatar}`,
}));

export const ChatMessagesRecordSchema = BaseSystemFieldsSchema.extend({
  attachments: z.array(z.string()).optional(),
  content: z.string().optional(),
  read_by: z.array(z.string()),
  room: z.string(),
  sender: z.string(),
}).refine((v) => ({
  ...v,
  attachments: v.attachments?.map(
    (f) => `/api/files/${v.collectionName}/${v.id}/${f}`,
  ),
}));

export const ChatRoomsRecordSchema = BaseSystemFieldsSchema.extend({
  name: z.string().optional(),
  participants: z.array(z.string()),
  related_order: z.string().optional(),
  type: z.nativeEnum(ChatRoomsTypeOptions),
  last_message_at: z.coerce.date().optional(),
});

export const CompaniesRecordSchema = BaseSystemFieldsSchema.extend({
  address: z.string().optional(),
  contact_email: z.string().optional(),
  contact_phone: z.string().optional(),
  name: z.string(),
  type: z.nativeEnum(CompaniesTypeOptions),
});

export const DepartmentsRecordSchema = BaseSystemFieldsSchema.extend({
  avatar: z.string().optional(),
  cover_photo: z.string().optional(),
  employees: z.array(z.string()).optional(),
  managers: z.array(z.string()).optional(),
  name: z.string(),
}).refine((v) => ({
  ...v,
  avatar: `/api/files/${v.collectionName}/${v.id}/${v.avatar}`,
  cover_photo: `/api/files/${v.collectionName}/${v.id}/${v.cover_photo}`,
}));

export const InventoryItemsRecordSchema = BaseSystemFieldsSchema.extend({
  expiry_date: z.coerce.date().optional(),
  last_counted_date: z.coerce.date().optional(),
  lot_number: z.string().optional(),
  product: z.string(),
  quantity_on_hand: z.number().optional(),
  serial_number: z.string().optional(),
  status: z.nativeEnum(InventoryItemsStatusOptions),
  storage_location_code: z.string().optional(),
  warehouse: z.string(),
});

export const InvoicesRecordSchema = BaseSystemFieldsSchema.extend({
  customer: z.string(),
  due_date: z.coerce.date(),
  invoice_date: z.coerce.date(),
  invoice_number: z.coerce.number(),
  invoice_pdf: z.string().optional(),
  order_ref: z.string().optional(),
  status: z.nativeEnum(InvoicesStatusOptions),
  total_amount: z.number().optional(),
}).refine((v) => ({
  ...v,
  invoice_pdf:
    v.invoice_pdf && `/api/files/${v.collectionName}/${v.id}/${v.invoice_pdf}`,
}));

export const NotificationsRecordSchema = BaseSystemFieldsSchema.extend({
  is_read: z.boolean().optional(),
  link: z.string().url().optional(),
  message: z.string(),
  read_at: z.coerce.date(),
  title: z.string(),
  type: z.nativeEnum(NotificationsTypeOptions),
  user: z.string().optional(),
});

export const OrderLineItemsRecordSchema = BaseSystemFieldsSchema.extend({
  order: z.string(),
  price_per_unit: z.number().optional(),
  product: z.string(),
  quantity: z.number(),
  subtotal: z.number().optional(),
});

export const OrdersRecordSchema = BaseSystemFieldsSchema.extend({
  assigned_warehouse: z.string().optional(),
  billing_adress: z.string(),
  created_by: z.string().optional(),
  customer: z.string(),
  order_date: z.coerce.date(),
  order_id_custom: z.string(),
  shioing_address: z.string(),
  status: z.nativeEnum(OrdersStatusOptions),
  total_amount: z.string().optional(),
});

export const PaymentsRecordSchema = BaseSystemFieldsSchema.extend({
  amount_paid: z.number().optional(),
  invoice: z.string(),
  notes: z.string().optional(),
  payment_date: z.coerce.date(),
  payment_method: z.nativeEnum(PaymentsPaymentMethodOptions),
  status: z.nativeEnum(PaymentsStatusOptions),
  transaction_id: z.string().optional(),
});

export const ProductsRecordSchema = BaseSystemFieldsSchema.extend({
  description: z.string().optional(),
  dimensions: z.string().optional(),
  image: z.array(z.string()).optional(),
  name: z.string(),
  sku: z.string(),
  supplier: z.string().optional(),
  weight: z.number().optional(),
}).refine((v) => ({
  ...v,
  image: v.image?.map((f) => `/api/files/${v.collectionName}/${v.id}/${f}`),
}));

export const RouteSegmentsRecordSchema = BaseSystemFieldsSchema.extend({
  actual_arrival_time: z.coerce.date().optional(),
  actual_departure_time: z.coerce.date().optional(),
  address_text: z.string().optional(),
  estimated_arrival_time: z.coerce.date().optional(),
  estimated_departure_time: z.coerce.date().optional(),
  instructions: z.string().optional(),
  latitude: z.string(),
  longitude: z.string(),
  related_shipment: z.string().optional(),
  route: z.string(),
  segment_type: z.nativeEnum(RouteSegmentsSegmentTypeOptions),
  sequence_number: z.string(),
});

export const RoutesRecordSchema = BaseSystemFieldsSchema.extend({
  driver_assigned: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  planned_end_time: z.coerce.date().optional(),
  planned_start_time: z.coerce.date().optional(),
  route_name: z.string(),
  shipments_on_route: z.string().optional(),
  status: z.nativeEnum(RoutesStatusOptions).optional(),
  vehicle_assigned: z.string().optional(),
});

export const ShipmentsRecordSchema = BaseSystemFieldsSchema.extend({
  actual_delivery_date: z.coerce.date().optional(),
  carrier: z.string().optional(),
  current_location_notes: z.string().optional(),
  department_assigned: z.string().optional(),
  driver: z.string(),
  estimated_delivered_date: z.string(),
  order_ref: z.string(),
  proof_of_delivery: z.array(z.string()).optional(),
  tracking_number: z.string().optional(),
}).refine((v) => ({
  ...v,
  proof_of_delivery: v.proof_of_delivery?.map(
    (f) => `/api/files/${v.collectionName}/${v.id}/${f}`,
  ),
}));

export const TaskMessagesRecordSchema = BaseSystemFieldsSchema.extend({
  attachments: z.array(z.string()).optional(),
  content: z.string(),
  read_by: z.array(z.string()).optional(),
  sender: z.string(),
  task: z.string(),
});

export const TasksRecordSchema = BaseSystemFieldsSchema.extend({
  assignees: z.array(z.string()).optional(),
  assigner: z.string(),
  attachments: z.array(z.string()).optional(),
  department: z.string(),
  description: z.string().optional(),
  due_date: z.coerce.date().optional(),
  kanban_order: z.number().optional(),
  order_ref: z.string().optional(),
  priority: z.nativeEnum(TasksPriorityOptions),
  related_shipment: z.string().optional(),
  status: z.nativeEnum(TasksStatusOptions),
  tags: z.nativeEnum(TasksTagsOptions),
  title: z.string(),
});

export const VehiclesRecordSchema = BaseSystemFieldsSchema.extend({
  capacity_volume: z.number().optional(),
  capacity_weight: z.number().optional(),
  current_driver: z.string().optional(),
  license_plate: z.string(),
  make: z.string().optional(),
  model: z.string().optional(),
  status: z.nativeEnum(VehiclesStatusOptions),
  type: z.string().optional(),
});

export const WarehousesRecordSchema = BaseSystemFieldsSchema.extend({
  address: z.string(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  manager: z.string().optional(),
  name: z.string(),
});
