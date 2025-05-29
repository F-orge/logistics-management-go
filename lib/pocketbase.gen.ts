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
  ChatMessagesOverallKPI = 'chatMessagesOverallKPI',
  ChatMessagesPerRoomKPI = 'chatMessagesPerRoomKPI',
  ChatMessagesSenderKPI = 'chatMessagesSenderKPI',
  ChatRooms = 'chatRooms',
  ChatRoomsOrderRelatedKPI = 'chatRoomsOrderRelatedKPI',
  ChatRoomsOverallKPI = 'chatRoomsOverallKPI',
  ChatRoomsTypeKPI = 'chatRoomsTypeKPI',
  Companies = 'companies',
  CompaniesOverallKPI = 'companiesOverallKPI',
  CompaniesTypeKPI = 'companiesTypeKPI',
  Departments = 'departments',
  DepartmentsManagerEmployeeCountKPI = 'departmentsManagerEmployeeCountKPI',
  DepartmentsOverallKPI = 'departmentsOverallKPI',
  InventoryItems = 'inventoryItems',
  InventoryItemsExpiryKPI = 'inventoryItemsExpiryKPI',
  InventoryItemsOverallKPI = 'inventoryItemsOverallKPI',
  InventoryItemsProductKPI = 'inventoryItemsProductKPI',
  InventoryItemsStatusKPI = 'inventoryItemsStatusKPI',
  InventoryItemsWarehouseKPI = 'inventoryItemsWarehouseKPI',
  Invoices = 'invoices',
  InvoicesCustomerKPI = 'invoicesCustomerKPI',
  InvoicesOverallKPI = 'invoicesOverallKPI',
  InvoicesStatusKPI = 'invoicesStatusKPI',
  Notifications = 'notifications',
  NotificationsOverallKPI = 'notificationsOverallKPI',
  NotificationsPriorityKPI = 'notificationsPriorityKPI',
  NotificationsTypeKPI = 'notificationsTypeKPI',
  NotificationsUnreadKPI = 'notificationsUnreadKPI',
  OrderLineItems = 'orderLineItems',
  OrderLineItemsOverallKPI = 'orderLineItemsOverallKPI',
  OrderLineItemsRevenue = 'orderLineItemsRevenue',
  OrderLineItemsTopSellingKPI = 'orderLineItemsTopSellingKPI',
  Orders = 'orders',
  OrdersCustomerKPI = 'ordersCustomerKPI',
  OrdersMonthlyKPI = 'ordersMonthlyKPI',
  OrdersOverallKPI = 'ordersOverallKPI',
  OrdersStatusKPI = 'ordersStatusKPI',
  Payments = 'payments',
  PaymentsMethodsKPI = 'paymentsMethodsKPI',
  PaymentsOverallKPI = 'paymentsOverallKPI',
  PaymentsStatusKPI = 'paymentsStatusKPI',
  Products = 'products',
  ProductsOverallKPI = 'productsOverallKPI',
  ProductsSupplierKPI = 'productsSupplierKPI',
  RouteSegments = 'routeSegments',
  RouteSegmentsAverageTimeKPI = 'routeSegmentsAverageTimeKPI',
  RouteSegmentsDelaysKPI = 'routeSegmentsDelaysKPI',
  RouteSegmentsOverallKPI = 'routeSegmentsOverallKPI',
  RouteSegmentsTypeKPI = 'routeSegmentsTypeKPI',
  Routes = 'routes',
  RoutesDriverKPI = 'routesDriverKPI',
  RoutesOverallKPI = 'routesOverallKPI',
  RoutesStatusKPI = 'routesStatusKPI',
  RoutesVehicleKPI = 'routesVehicleKPI',
  Shipments = 'shipments',
  ShipmentsCarrierKPI = 'shipmentsCarrierKPI',
  ShipmentsDriverKPI = 'shipmentsDriverKPI',
  ShipmentsOnTimeDeliveryKPI = 'shipmentsOnTimeDeliveryKPI',
  ShipmentsOverallKPI = 'shipmentsOverallKPI',
  ShipmentsStatusKPI = 'shipmentsStatusKPI',
  TaskMessages = 'taskMessages',
  TaskMessagesCountKPI = 'taskMessagesCountKPI',
  TaskMessagesOverallKPI = 'taskMessagesOverallKPI',
  Tasks = 'tasks',
  TasksDepartmentKPI = 'tasksDepartmentKPI',
  TasksOverallKPI = 'tasksOverallKPI',
  TasksPriorityKPI = 'tasksPriorityKPI',
  TasksSpecificTagKPI = 'tasksSpecificTagKPI',
  TasksStatusKPI = 'tasksStatusKPI',
  UserAccess = 'userAccess',
  Users = 'users',
  UsersCompanyKPI = 'usersCompanyKPI',
  UsersDepartmentKPI = 'usersDepartmentKPI',
  UsersOverallKPI = 'usersOverallKPI',
  UsersRoleKPI = 'usersRoleKPI',
  Vehicles = 'vehicles',
  VehiclesOverallKPI = 'vehiclesOverallKPI',
  VehiclesStatusKPI = 'vehiclesStatusKPI',
  VehiclesTypeKPI = 'vehiclesTypeKPI',
  Warehouses = 'warehouses',
  WarehousesManagerKPI = 'warehousesManagerKPI',
  WarehousesOverallKPI = 'warehousesOverallKPI',
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
  content: HTMLString;
  created?: IsoDateString;
  id: string;
  readBy?: RecordIdString[];
  room: RecordIdString;
  sender: RecordIdString;
  updated?: IsoDateString;
};

export type ChatMessagesOverallKPIRecord = {
  distinctSenders?: number;
  id: string;
  messagesWithAttachements?: number;
  roomsWithMessages?: number;
  totalChatMessages?: number;
};

export type ChatMessagesPerRoomKPIRecord<TroomID = unknown> = {
  id: string;
  messageCountInRoom?: number;
  roomID?: null | TroomID;
};

export type ChatMessagesSenderKPIRecord<TsenderId = unknown> = {
  id: string;
  messageCountFromSender?: number;
  senderId?: null | TsenderId;
};

export enum ChatRoomsTypeOptions {
  'direct-message' = 'direct-message',
  'group-chat' = 'group-chat',
  'order-chat' = 'order-chat',
  'support-chat' = 'support-chat',
}
export type ChatRoomsRecord = {
  created?: IsoDateString;
  id: string;
  lastMessageAt?: IsoDateString;
  name: string;
  participants: RecordIdString[];
  relatedOrder?: RecordIdString;
  type?: ChatRoomsTypeOptions;
  updated?: IsoDateString;
};

export type ChatRoomsOrderRelatedKPIRecord = {
  id: string;
  totalOrderChatRooms?: number;
};

export type ChatRoomsOverallKPIRecord = {
  distinctRoomTypes?: number;
  id: string;
  roomsActiveLast7Days?: number;
  totalChatRooms?: number;
};

export type ChatRoomsTypeKPIRecord<Ttype = unknown> = {
  id: string;
  roomCountPerType?: number;
  type?: null | Ttype;
};

export enum CompaniesTypeOptions {
  customer = 'customer',
  supplier = 'supplier',
  carrier = 'carrier',
  internal = 'internal',
}
export type CompaniesRecord = {
  address?: string;
  contactEmail: string;
  contactPhone: string;
  created?: IsoDateString;
  id: string;
  name: string;
  primaryContactPerson?: RecordIdString;
  type: CompaniesTypeOptions;
  updated?: IsoDateString;
};

export type CompaniesOverallKPIRecord = {
  distinctCompanyType?: number;
  id: string;
  totalCompanies?: number;
};

export enum CompaniesTypeKPITypeOptions {
  customer = 'customer',
  supplier = 'supplier',
  carrier = 'carrier',
  internal = 'internal',
}
export type CompaniesTypeKPIRecord = {
  companyCountPerType?: number;
  id: string;
  type: CompaniesTypeKPITypeOptions;
};

export type DepartmentsRecord = {
  avatar: string;
  coverPhoto: string;
  created?: IsoDateString;
  employees?: RecordIdString[];
  id: string;
  managers?: RecordIdString[];
  name: string;
  updated?: IsoDateString;
};

export type DepartmentsManagerEmployeeCountKPIRecord = {
  departmentName: string;
  employeeCount?: number;
  id: string;
  managerCount?: number;
};

export type DepartmentsOverallKPIRecord = {
  id: string;
  totalDepartments?: number;
};

export enum InventoryItemsStatusOptions {
  available = 'available',
  'on-hold' = 'on-hold',
  allocated = 'allocated',
  damaged = 'damaged',
  'in-transit-to-warehouse' = 'in-transit-to-warehouse',
}
export type InventoryItemsRecord = {
  created?: IsoDateString;
  expiryDate?: IsoDateString;
  id: string;
  lastCountedDate?: IsoDateString;
  lotNumber: string;
  product: RecordIdString;
  quantityOnHand?: number;
  serialNumber: string;
  status: InventoryItemsStatusOptions;
  storageLocationCode: string;
  updated?: IsoDateString;
  warehouse: RecordIdString;
};

export type InventoryItemsExpiryKPIRecord<TquantityExpiringSoon = unknown> = {
  id: string;
  itemsExpiringSoonCount?: number;
  quantityExpiringSoon?: null | TquantityExpiringSoon;
};

export type InventoryItemsOverallKPIRecord<
  TtotalQuantityOnHandAllProducts = unknown,
> = {
  distinctProductInInventory?: number;
  id: string;
  totalInventoryRecords?: number;
  totalQuantityOnHandAllProducts?: null | TtotalQuantityOnHandAllProducts;
};

export type InventoryItemsProductKPIRecord<
  TproductId = unknown,
  TtotalQuantityforProduct = unknown,
> = {
  id: string;
  productId?: null | TproductId;
  totalQuantityforProduct?: null | TtotalQuantityforProduct;
};

export type InventoryItemsStatusKPIRecord<
  TquantityByStatus = unknown,
  Tstatus = unknown,
> = {
  id: string;
  itemCountByStatus?: number;
  quantityByStatus?: null | TquantityByStatus;
  status?: null | Tstatus;
};

export type InventoryItemsWarehouseKPIRecord<
  TtotalQuantityInWarehouse = unknown,
  TwarehouseId = unknown,
> = {
  id: string;
  totalQuantityInWarehouse?: null | TtotalQuantityInWarehouse;
  warehouseId?: null | TwarehouseId;
};

export enum InvoicesStatusOptions {
  draft = 'draft',
  sent = 'sent',
  paid = 'paid',
  'partially-paid' = 'partially-paid',
  overdue = 'overdue',
  void = 'void',
}
export type InvoicesRecord = {
  created?: IsoDateString;
  customer: RecordIdString;
  dueDate: IsoDateString;
  id: string;
  invoiceDate: IsoDateString;
  invoiceNumber: string;
  invoicePdf?: string;
  orderRef: RecordIdString;
  status: InvoicesStatusOptions;
  totalAmount: number;
  updated?: IsoDateString;
};

export type InvoicesCustomerKPIRecord<TtotalInvoicedToCustomer = unknown> = {
  customerId?: RecordIdString;
  id: string;
  invoiceCountPerCustomer?: number;
  totalInvoicedToCustomer?: null | TtotalInvoicedToCustomer;
};

export type InvoicesOverallKPIRecord<
  TtotalAmountFromPaidInvoice = unknown,
  TtotalInvoiceAmount = unknown,
  TtotalOverdueAmount = unknown,
> = {
  id: string;
  overdueInvoicesCount?: number;
  paidInvoicesCount?: number;
  totalAmountFromPaidInvoice?: null | TtotalAmountFromPaidInvoice;
  totalInvoiceAmount?: null | TtotalInvoiceAmount;
  totalInvoices?: number;
  totalOverdueAmount?: null | TtotalOverdueAmount;
};

export enum InvoicesStatusKPIStatusOptions {
  draft = 'draft',
  sent = 'sent',
  paid = 'paid',
  partially_paid = 'partially_paid',
  overdue = 'overdue',
  void = 'void',
}
export type InvoicesStatusKPIRecord<TtotalAmountForStatus = unknown> = {
  id: string;
  invoiceCountPerStatus?: number;
  status: InvoicesStatusKPIStatusOptions;
  totalAmountForStatus?: null | TtotalAmountForStatus;
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

export enum NotificationsPriorityOptions {
  low = 'low',
  medium = 'medium',
  high = 'high',
}
export type NotificationsRecord = {
  created?: IsoDateString;
  id: string;
  isRead?: boolean;
  link?: string;
  message: string;
  priority: NotificationsPriorityOptions;
  readAt?: IsoDateString;
  title: string;
  type: NotificationsTypeOptions;
  updated?: IsoDateString;
  user: RecordIdString;
};

export type NotificationsOverallKPIRecord = {
  distinctNotificationTypes?: number;
  id: string;
  readNotifications?: number;
  totalNotifications?: number;
  unreadNotifications?: number;
};

export enum NotificationsPriorityKPIPriorityOptions {
  low = 'low',
  medium = 'medium',
  high = 'high',
}
export type NotificationsPriorityKPIRecord = {
  id: string;
  notificationCountPerPriority?: number;
  priority?: NotificationsPriorityKPIPriorityOptions;
};

export enum NotificationsTypeKPITypeOptions {
  new_task_assigned = 'new_task_assigned',
  task_updated = 'task_updated',
  order_status_updated = 'order_status_updated',
  shipment_alert = 'shipment_alert',
  new_chat_message = 'new_chat_message',
  system_announcement = 'system_announcement',
  mention = 'mention',
  task_comment = 'task_comment',
}
export type NotificationsTypeKPIRecord = {
  id: string;
  notification_count_per_type?: number;
  type?: NotificationsTypeKPITypeOptions;
};

export type NotificationsUnreadKPIRecord = {
  id: string;
  unreadNotificationCount?: number;
  userId?: RecordIdString;
};

export type OrderLineItemsRecord = {
  created?: IsoDateString;
  id: string;
  order: RecordIdString;
  pricePerUnit: number;
  product: RecordIdString;
  quantity: number;
  subtotal: number;
  updated?: IsoDateString;
};

export type OrderLineItemsOverallKPIRecord<
  TaveragePricePerUnit = unknown,
  TaverageQuantityPerLine = unknown,
  TtotalQuantitySold = unknown,
  TtotalSubtotalRevenue = unknown,
> = {
  averagePricePerUnit?: null | TaveragePricePerUnit;
  averageQuantityPerLine?: null | TaverageQuantityPerLine;
  id: string;
  totalLineItems?: number;
  totalQuantitySold?: null | TtotalQuantitySold;
  totalSubtotalRevenue?: null | TtotalSubtotalRevenue;
};

export type OrderLineItemsRevenueRecord<
  TproductId = unknown,
  TrevenuePerProduct = unknown,
> = {
  id: string;
  productId?: null | TproductId;
  revenuePerProduct?: null | TrevenuePerProduct;
};

export type OrderLineItemsTopSellingKPIRecord<
  TproductId = unknown,
  TtotalQuantitySold = unknown,
  TtotalRevenueFromProduct = unknown,
> = {
  id: string;
  productId?: null | TproductId;
  totalQuantitySold?: null | TtotalQuantitySold;
  totalRevenueFromProduct?: null | TtotalRevenueFromProduct;
};

export enum OrdersStatusOptions {
  'pending-validation' = 'pending-validation',
  validated = 'validated',
  allocated = 'allocated',
  picking = 'picking',
  packing = 'packing',
  'ready-for-shipment' = 'ready-for-shipment',
  shipped = 'shipped',
  delivered = 'delivered',
  cancelled = 'cancelled',
  'on-hold' = 'on-hold',
}
export type OrdersRecord = {
  assignedWarehouse: RecordIdString;
  billingAddress: string;
  created?: IsoDateString;
  createdBy: RecordIdString;
  customer: RecordIdString;
  id: string;
  orderDate: IsoDateString;
  orderIdCustom: string;
  shippingAddress: string;
  status: OrdersStatusOptions;
  totalAmount: number;
  updated?: IsoDateString;
};

export type OrdersCustomerKPIRecord<TtotalSpentByCustomer = unknown> = {
  customerId: RecordIdString;
  id: string;
  orderCountPerCustomer?: number;
  totalSpentByCustomer?: null | TtotalSpentByCustomer;
};

export type OrdersMonthlyKPIRecord<
  TmontlyRevenue = unknown,
  TyearMonth = unknown,
> = {
  id: string;
  montlyOrderCount?: number;
  montlyRevenue?: null | TmontlyRevenue;
  yearMonth?: null | TyearMonth;
};

export type OrdersOverallKPIRecord<
  TaverageOrderValue = unknown,
  TtotalRevenueFromOrders = unknown,
> = {
  averageOrderValue?: null | TaverageOrderValue;
  cancelledOrders?: number;
  deliveredOrders?: number;
  id: string;
  pendingValidationOrders?: number;
  shippedOrders?: number;
  totalOrders?: number;
  totalRevenueFromOrders?: null | TtotalRevenueFromOrders;
};

export enum OrdersStatusKPIStatusOptions {
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
export type OrdersStatusKPIRecord<TtotalAmountPerStatus = unknown> = {
  id: string;
  orderCountPerStatus?: number;
  status?: OrdersStatusKPIStatusOptions;
  totalAmountPerStatus?: null | TtotalAmountPerStatus;
};

export enum PaymentsPaymentMethodOptions {
  'credit-card' = 'credit-card',
  'bank-transfer' = 'bank-transfer',
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
  amountPaid?: number;
  created?: IsoDateString;
  id: string;
  invoice: RecordIdString;
  notes?: string;
  paymentDate: IsoDateString;
  paymentMethod?: PaymentsPaymentMethodOptions;
  status: PaymentsStatusOptions;
  transactionId: string;
  updated?: IsoDateString;
};

export enum PaymentsMethodsKPIPaymentMethodOptions {
  credit_card = 'credit_card',
  bank_transfer = 'bank_transfer',
  ach = 'ach',
  check = 'check',
  cash = 'cash',
  other = 'other',
}
export type PaymentsMethodsKPIRecord<TtotalAmountByMethod = unknown> = {
  id: string;
  paymentCountPerMethod?: number;
  paymentMethod?: PaymentsMethodsKPIPaymentMethodOptions;
  totalAmountByMethod?: null | TtotalAmountByMethod;
};

export type PaymentsOverallKPIRecord<
  TaveragePaymentAmount = unknown,
  TtotalAmountPaid = unknown,
> = {
  averagePaymentAmount?: null | TaveragePaymentAmount;
  completedPayments?: number;
  failedPayments?: number;
  id: string;
  refundedPayments?: number;
  totalAmountPaid?: null | TtotalAmountPaid;
  totalPaymentsRecorded?: number;
};

export enum PaymentsStatusKPIStatusOptions {
  pending = 'pending',
  completed = 'completed',
  failed = 'failed',
  refunded = 'refunded',
}
export type PaymentsStatusKPIRecord<Ttotal_amount_for_status = unknown> = {
  id: string;
  payment_count_per_status?: number;
  status: PaymentsStatusKPIStatusOptions;
  total_amount_for_status?: null | Ttotal_amount_for_status;
};

export type ProductsRecord = {
  cost: number;
  created?: IsoDateString;
  description?: HTMLString;
  dimensionsHeight: number;
  dimensionsLength: number;
  dimensionsWidth: number;
  id: string;
  image: string[];
  name: string;
  sku: string;
  supplier: RecordIdString;
  updated?: IsoDateString;
  weight: number;
};

export type ProductsOverallKPIRecord<TaverageProductCost = unknown> = {
  averageProductCost?: null | TaverageProductCost;
  id: string;
  productsWithImages?: number;
  productsWithoutImages?: number;
  totalProducts?: number;
};

export type ProductsSupplierKPIRecord = {
  id: string;
  productCountPerSupplier?: number;
  supplierId: RecordIdString;
};

export enum RouteSegmentsSegmentTypeOptions {
  'start-point' = 'start-point',
  pickup = 'pickup',
  delivery = 'delivery',
  waypoint = 'waypoint',
}
export type RouteSegmentsRecord = {
  actualArrivalTime?: IsoDateString;
  actualDepartureTime?: IsoDateString;
  addressText: string;
  created?: IsoDateString;
  estimatedArrivalTime?: IsoDateString;
  estimatedDepartureTime?: IsoDateString;
  id: string;
  instructions?: string;
  latitude: string;
  longitude: string;
  relatedShipment: RecordIdString;
  route: RecordIdString;
  segmentType: RouteSegmentsSegmentTypeOptions;
  sequenceNumber: number;
  updated?: IsoDateString;
};

export type RouteSegmentsAverageTimeKPIRecord<
  TavgDurationMinutesAtSegment = unknown,
  TsegmentType = unknown,
> = {
  avgDurationMinutesAtSegment?: null | TavgDurationMinutesAtSegment;
  id: string;
  segmentType?: null | TsegmentType;
};

export type RouteSegmentsDelaysKPIRecord<TsegmentType = unknown> = {
  delayedSegmentsCount?: number;
  id: string;
  segmentType?: null | TsegmentType;
};

export type RouteSegmentsOverallKPIRecord = {
  distinctRoutesWithSegments?: number;
  id: string;
  totalRouteSegment?: number;
};

export type RouteSegmentsTypeKPIRecord<TsegmentType = unknown> = {
  id: string;
  segmentCountPerType?: number;
  segmentType?: null | TsegmentType;
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
  driverAssigned?: RecordIdString;
  id: string;
  latitude: number;
  longitude: number;
  plannedEndTime?: IsoDateString;
  plannedStartTime?: IsoDateString;
  routeName: string;
  shipmentsOnRoute?: RecordIdString[];
  status: RoutesStatusOptions;
  updated?: IsoDateString;
  vehicleAssigned?: RecordIdString;
};

export type RoutesDriverKPIRecord = {
  driverId?: RecordIdString;
  id: string;
  routeCountPerDriver?: number;
};

export type RoutesOverallKPIRecord = {
  completedRoutes?: number;
  id: string;
  plannedRoutes?: number;
  routesInProgress?: number;
  totalRoutes?: number;
};

export enum RoutesStatusKPIStatusOptions {
  planned = 'planned',
  in_progress = 'in_progress',
  completed = 'completed',
  delayed = 'delayed',
  cancelled = 'cancelled',
}
export type RoutesStatusKPIRecord = {
  id: string;
  routeCountPerStatus?: number;
  status?: RoutesStatusKPIStatusOptions;
};

export type RoutesVehicleKPIRecord = {
  id: string;
  routeCountPerVehicle?: number;
  vehicleId?: RecordIdString;
};

export enum ShipmentsStatusOptions {
  'label-created' = 'label-created',
  'pending-pickup' = 'pending-pickup',
  'in-transit' = 'in-transit',
  'out-for-delivery' = 'out-for-delivery',
  delivered = 'delivered',
  exception = 'exception',
  returned = 'returned',
}
export type ShipmentsRecord = {
  actualDeliveryDate?: IsoDateString;
  carrier: RecordIdString;
  created?: IsoDateString;
  currentLocationNotes?: string;
  departmentAssigned: RecordIdString;
  driver?: RecordIdString;
  estimatedDeliveryDate: IsoDateString;
  id: string;
  orderRef: RecordIdString;
  proofOfDelivery?: string[];
  status: ShipmentsStatusOptions;
  trackingNumber: string;
  updated?: IsoDateString;
};

export type ShipmentsCarrierKPIRecord = {
  carrierId?: RecordIdString;
  id: string;
  shipmentCountPerCarrier?: number;
};

export type ShipmentsDriverKPIRecord = {
  driverId?: RecordIdString;
  id: string;
  shipmentCountPerDriver?: number;
};

export type ShipmentsOnTimeDeliveryKPIRecord<
  TonTimeDeliveryPercentage = unknown,
  TonTimeShipments = unknown,
> = {
  id: string;
  onTimeDeliveryPercentage?: null | TonTimeDeliveryPercentage;
  onTimeShipments?: null | TonTimeShipments;
  totalComparableDeliveredShipments?: number;
};

export type ShipmentsOverallKPIRecord = {
  deliveredShipments?: number;
  id: string;
  shipmentExceptions?: number;
  shipmentWithPod?: number;
  shipmentsInTransit?: number;
  totalShipments?: number;
};

export enum ShipmentsStatusKPIStatusOptions {
  label_created = 'label_created',
  pending_pickup = 'pending_pickup',
  in_transit = 'in_transit',
  out_for_delivery = 'out_for_delivery',
  delivered = 'delivered',
  exception = 'exception',
  returned = 'returned',
}
export type ShipmentsStatusKPIRecord = {
  id: string;
  shipmentCountPerStatus?: number;
  status?: ShipmentsStatusKPIStatusOptions;
};

export type TaskMessagesRecord = {
  attachments?: string[];
  content: HTMLString;
  created?: IsoDateString;
  id: string;
  readBy?: RecordIdString[];
  sender: RecordIdString;
  task: RecordIdString;
  updated?: IsoDateString;
};

export type TaskMessagesCountKPIRecord<TtaskId = unknown> = {
  id: string;
  messageCountInTask?: number;
  taskId?: null | TtaskId;
};

export type TaskMessagesOverallKPIRecord = {
  distinctTaskMessageSenders?: number;
  id: string;
  taskMessagesWithAttachments?: number;
  tasksWithMessages?: number;
  totalTaskMessages?: number;
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
  dueDate?: IsoDateString;
  id: string;
  orderRef?: RecordIdString;
  priority: TasksPriorityOptions;
  relatedShipment?: RecordIdString;
  status: TasksStatusOptions;
  tags: TasksTagsOptions;
  title: string;
  updated?: IsoDateString;
};

export type TasksDepartmentKPIRecord = {
  department: RecordIdString;
  id: string;
  taskCountPerDepartment?: number;
};

export type TasksOverallKPIRecord = {
  blockedTasks?: number;
  completedTasks?: number;
  id: string;
  in_progressTasks?: number;
  overdueTasks?: number;
  todoTasks?: number;
  totalTasks?: number;
};

export enum TasksPriorityKPIPriorityOptions {
  low = 'low',
  medium = 'medium',
  high = 'high',
  urgent = 'urgent',
}
export type TasksPriorityKPIRecord = {
  id: string;
  priority: TasksPriorityKPIPriorityOptions;
  taskCountPerPriority?: number;
};

export type TasksSpecificTagKPIRecord<Ttagname = unknown> = {
  id: string;
  tagname?: null | Ttagname;
  taskswithtagcount?: number;
};

export enum TasksStatusKPIStatusOptions {
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
export type TasksStatusKPIRecord = {
  id: string;
  status: TasksStatusKPIStatusOptions;
  taskCountPerStatus?: number;
};

export enum UserAccessFieldOptions {
  users = 'users',
  inventory = 'inventory',
  tasks = 'tasks',
  chats = 'chats',
}
export type UserAccessRecord = {
  created?: IsoDateString;
  field?: UserAccessFieldOptions[];
  id: string;
  updated?: IsoDateString;
  user?: RecordIdString;
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
  phone: string;
  role: UsersRoleOptions;
  tokenKey: string;
  updated?: IsoDateString;
  verified?: boolean;
};

export type UsersCompanyKPIRecord = {
  companyId?: RecordIdString;
  id: string;
  userCountPerCompany?: number;
};

export type UsersDepartmentKPIRecord = {
  departmentId?: RecordIdString;
  id: string;
  userCountPerDepartment?: number;
};

export type UsersOverallKPIRecord = {
  distinctRoles?: number;
  id: string;
  totalUsers?: number;
  unverifiedUsers?: number;
  verifiedUsers?: number;
};

export enum UsersRoleKPIRoleOptions {
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
export type UsersRoleKPIRecord = {
  id: string;
  role: UsersRoleKPIRoleOptions;
  userCountPerRole?: number;
};

export enum VehiclesStatusOptions {
  available = 'available',
  'in-use' = 'in-use',
  maintenance = 'maintenance',
  'out-of-service' = 'out-of-service',
}
export type VehiclesRecord = {
  capacityVolume: number;
  capacityWeight: number;
  created?: IsoDateString;
  currentDriver?: RecordIdString;
  id: string;
  licensePlate: string;
  make: string;
  model: string;
  status: VehiclesStatusOptions;
  type: string;
  updated?: IsoDateString;
};

export type VehiclesOverallKPIRecord<
  TaverageVolumeCapacity = unknown,
  TaverageWeightCapacity = unknown,
> = {
  availableVehicles?: number;
  averageVolumeCapacity?: null | TaverageVolumeCapacity;
  averageWeightCapacity?: null | TaverageWeightCapacity;
  id: string;
  totalVehicles?: number;
  vehiclesInMaintainance?: number;
  vehiclesInUse?: number;
};

export enum VehiclesStatusKPIStatusOptions {
  available = 'available',
  in_use = 'in_use',
  maintenance = 'maintenance',
  out_of_service = 'out_of_service',
}
export type VehiclesStatusKPIRecord = {
  id: string;
  status?: VehiclesStatusKPIStatusOptions;
  vehicleCountPerStatus?: number;
};

export type VehiclesTypeKPIRecord = {
  id: string;
  vehicleCountPerType?: number;
  vehicleType?: string;
};

export type WarehousesRecord = {
  address: string;
  created?: IsoDateString;
  id: string;
  latitude: string;
  longitude: string;
  manager: RecordIdString;
  name: string;
  updated?: IsoDateString;
};

export type WarehousesManagerKPIRecord = {
  id: string;
  managerId: RecordIdString;
  warehouseCountPerManager?: number;
};

export type WarehousesOverallKPIRecord = {
  id: string;
  totalWarehouses?: number;
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
export type ChatMessagesOverallKPIResponse<Texpand = unknown> =
  Required<ChatMessagesOverallKPIRecord> & BaseSystemFields<Texpand>;
export type ChatMessagesPerRoomKPIResponse<
  TroomID = unknown,
  Texpand = unknown,
> = Required<ChatMessagesPerRoomKPIRecord<TroomID>> & BaseSystemFields<Texpand>;
export type ChatMessagesSenderKPIResponse<
  TsenderId = unknown,
  Texpand = unknown,
> = Required<ChatMessagesSenderKPIRecord<TsenderId>> &
  BaseSystemFields<Texpand>;
export type ChatRoomsResponse<Texpand = unknown> = Required<ChatRoomsRecord> &
  BaseSystemFields<Texpand>;
export type ChatRoomsOrderRelatedKPIResponse<Texpand = unknown> =
  Required<ChatRoomsOrderRelatedKPIRecord> & BaseSystemFields<Texpand>;
export type ChatRoomsOverallKPIResponse<Texpand = unknown> =
  Required<ChatRoomsOverallKPIRecord> & BaseSystemFields<Texpand>;
export type ChatRoomsTypeKPIResponse<
  Ttype = unknown,
  Texpand = unknown,
> = Required<ChatRoomsTypeKPIRecord<Ttype>> & BaseSystemFields<Texpand>;
export type CompaniesResponse<Texpand = unknown> = Required<CompaniesRecord> &
  BaseSystemFields<Texpand>;
export type CompaniesOverallKPIResponse<Texpand = unknown> =
  Required<CompaniesOverallKPIRecord> & BaseSystemFields<Texpand>;
export type CompaniesTypeKPIResponse<Texpand = unknown> =
  Required<CompaniesTypeKPIRecord> & BaseSystemFields<Texpand>;
export type DepartmentsResponse<Texpand = unknown> =
  Required<DepartmentsRecord> & BaseSystemFields<Texpand>;
export type DepartmentsManagerEmployeeCountKPIResponse<Texpand = unknown> =
  Required<DepartmentsManagerEmployeeCountKPIRecord> &
    BaseSystemFields<Texpand>;
export type DepartmentsOverallKPIResponse<Texpand = unknown> =
  Required<DepartmentsOverallKPIRecord> & BaseSystemFields<Texpand>;
export type InventoryItemsResponse<Texpand = unknown> =
  Required<InventoryItemsRecord> & BaseSystemFields<Texpand>;
export type InventoryItemsExpiryKPIResponse<
  TquantityExpiringSoon = unknown,
  Texpand = unknown,
> = Required<InventoryItemsExpiryKPIRecord<TquantityExpiringSoon>> &
  BaseSystemFields<Texpand>;
export type InventoryItemsOverallKPIResponse<
  TtotalQuantityOnHandAllProducts = unknown,
  Texpand = unknown,
> = Required<InventoryItemsOverallKPIRecord<TtotalQuantityOnHandAllProducts>> &
  BaseSystemFields<Texpand>;
export type InventoryItemsProductKPIResponse<
  TproductId = unknown,
  TtotalQuantityforProduct = unknown,
  Texpand = unknown,
> = Required<
  InventoryItemsProductKPIRecord<TproductId, TtotalQuantityforProduct>
> &
  BaseSystemFields<Texpand>;
export type InventoryItemsStatusKPIResponse<
  TquantityByStatus = unknown,
  Tstatus = unknown,
  Texpand = unknown,
> = Required<InventoryItemsStatusKPIRecord<TquantityByStatus, Tstatus>> &
  BaseSystemFields<Texpand>;
export type InventoryItemsWarehouseKPIResponse<
  TtotalQuantityInWarehouse = unknown,
  TwarehouseId = unknown,
  Texpand = unknown,
> = Required<
  InventoryItemsWarehouseKPIRecord<TtotalQuantityInWarehouse, TwarehouseId>
> &
  BaseSystemFields<Texpand>;
export type InvoicesResponse<Texpand = unknown> = Required<InvoicesRecord> &
  BaseSystemFields<Texpand>;
export type InvoicesCustomerKPIResponse<
  TtotalInvoicedToCustomer = unknown,
  Texpand = unknown,
> = Required<InvoicesCustomerKPIRecord<TtotalInvoicedToCustomer>> &
  BaseSystemFields<Texpand>;
export type InvoicesOverallKPIResponse<
  TtotalAmountFromPaidInvoice = unknown,
  TtotalInvoiceAmount = unknown,
  TtotalOverdueAmount = unknown,
  Texpand = unknown,
> = Required<
  InvoicesOverallKPIRecord<
    TtotalAmountFromPaidInvoice,
    TtotalInvoiceAmount,
    TtotalOverdueAmount
  >
> &
  BaseSystemFields<Texpand>;
export type InvoicesStatusKPIResponse<
  TtotalAmountForStatus = unknown,
  Texpand = unknown,
> = Required<InvoicesStatusKPIRecord<TtotalAmountForStatus>> &
  BaseSystemFields<Texpand>;
export type NotificationsResponse<Texpand = unknown> =
  Required<NotificationsRecord> & BaseSystemFields<Texpand>;
export type NotificationsOverallKPIResponse<Texpand = unknown> =
  Required<NotificationsOverallKPIRecord> & BaseSystemFields<Texpand>;
export type NotificationsPriorityKPIResponse<Texpand = unknown> =
  Required<NotificationsPriorityKPIRecord> & BaseSystemFields<Texpand>;
export type NotificationsTypeKPIResponse<Texpand = unknown> =
  Required<NotificationsTypeKPIRecord> & BaseSystemFields<Texpand>;
export type NotificationsUnreadKPIResponse<Texpand = unknown> =
  Required<NotificationsUnreadKPIRecord> & BaseSystemFields<Texpand>;
export type OrderLineItemsResponse<Texpand = unknown> =
  Required<OrderLineItemsRecord> & BaseSystemFields<Texpand>;
export type OrderLineItemsOverallKPIResponse<
  TaveragePricePerUnit = unknown,
  TaverageQuantityPerLine = unknown,
  TtotalQuantitySold = unknown,
  TtotalSubtotalRevenue = unknown,
  Texpand = unknown,
> = Required<
  OrderLineItemsOverallKPIRecord<
    TaveragePricePerUnit,
    TaverageQuantityPerLine,
    TtotalQuantitySold,
    TtotalSubtotalRevenue
  >
> &
  BaseSystemFields<Texpand>;
export type OrderLineItemsRevenueResponse<
  TproductId = unknown,
  TrevenuePerProduct = unknown,
  Texpand = unknown,
> = Required<OrderLineItemsRevenueRecord<TproductId, TrevenuePerProduct>> &
  BaseSystemFields<Texpand>;
export type OrderLineItemsTopSellingKPIResponse<
  TproductId = unknown,
  TtotalQuantitySold = unknown,
  TtotalRevenueFromProduct = unknown,
  Texpand = unknown,
> = Required<
  OrderLineItemsTopSellingKPIRecord<
    TproductId,
    TtotalQuantitySold,
    TtotalRevenueFromProduct
  >
> &
  BaseSystemFields<Texpand>;
export type OrdersResponse<Texpand = unknown> = Required<OrdersRecord> &
  BaseSystemFields<Texpand>;
export type OrdersCustomerKPIResponse<
  TtotalSpentByCustomer = unknown,
  Texpand = unknown,
> = Required<OrdersCustomerKPIRecord<TtotalSpentByCustomer>> &
  BaseSystemFields<Texpand>;
export type OrdersMonthlyKPIResponse<
  TmontlyRevenue = unknown,
  TyearMonth = unknown,
  Texpand = unknown,
> = Required<OrdersMonthlyKPIRecord<TmontlyRevenue, TyearMonth>> &
  BaseSystemFields<Texpand>;
export type OrdersOverallKPIResponse<
  TaverageOrderValue = unknown,
  TtotalRevenueFromOrders = unknown,
  Texpand = unknown,
> = Required<
  OrdersOverallKPIRecord<TaverageOrderValue, TtotalRevenueFromOrders>
> &
  BaseSystemFields<Texpand>;
export type OrdersStatusKPIResponse<
  TtotalAmountPerStatus = unknown,
  Texpand = unknown,
> = Required<OrdersStatusKPIRecord<TtotalAmountPerStatus>> &
  BaseSystemFields<Texpand>;
export type PaymentsResponse<Texpand = unknown> = Required<PaymentsRecord> &
  BaseSystemFields<Texpand>;
export type PaymentsMethodsKPIResponse<
  TtotalAmountByMethod = unknown,
  Texpand = unknown,
> = Required<PaymentsMethodsKPIRecord<TtotalAmountByMethod>> &
  BaseSystemFields<Texpand>;
export type PaymentsOverallKPIResponse<
  TaveragePaymentAmount = unknown,
  TtotalAmountPaid = unknown,
  Texpand = unknown,
> = Required<
  PaymentsOverallKPIRecord<TaveragePaymentAmount, TtotalAmountPaid>
> &
  BaseSystemFields<Texpand>;
export type PaymentsStatusKPIResponse<
  Ttotal_amount_for_status = unknown,
  Texpand = unknown,
> = Required<PaymentsStatusKPIRecord<Ttotal_amount_for_status>> &
  BaseSystemFields<Texpand>;
export type ProductsResponse<Texpand = unknown> = Required<ProductsRecord> &
  BaseSystemFields<Texpand>;
export type ProductsOverallKPIResponse<
  TaverageProductCost = unknown,
  Texpand = unknown,
> = Required<ProductsOverallKPIRecord<TaverageProductCost>> &
  BaseSystemFields<Texpand>;
export type ProductsSupplierKPIResponse<Texpand = unknown> =
  Required<ProductsSupplierKPIRecord> & BaseSystemFields<Texpand>;
export type RouteSegmentsResponse<Texpand = unknown> =
  Required<RouteSegmentsRecord> & BaseSystemFields<Texpand>;
export type RouteSegmentsAverageTimeKPIResponse<
  TavgDurationMinutesAtSegment = unknown,
  TsegmentType = unknown,
  Texpand = unknown,
> = Required<
  RouteSegmentsAverageTimeKPIRecord<TavgDurationMinutesAtSegment, TsegmentType>
> &
  BaseSystemFields<Texpand>;
export type RouteSegmentsDelaysKPIResponse<
  TsegmentType = unknown,
  Texpand = unknown,
> = Required<RouteSegmentsDelaysKPIRecord<TsegmentType>> &
  BaseSystemFields<Texpand>;
export type RouteSegmentsOverallKPIResponse<Texpand = unknown> =
  Required<RouteSegmentsOverallKPIRecord> & BaseSystemFields<Texpand>;
export type RouteSegmentsTypeKPIResponse<
  TsegmentType = unknown,
  Texpand = unknown,
> = Required<RouteSegmentsTypeKPIRecord<TsegmentType>> &
  BaseSystemFields<Texpand>;
export type RoutesResponse<Texpand = unknown> = Required<RoutesRecord> &
  BaseSystemFields<Texpand>;
export type RoutesDriverKPIResponse<Texpand = unknown> =
  Required<RoutesDriverKPIRecord> & BaseSystemFields<Texpand>;
export type RoutesOverallKPIResponse<Texpand = unknown> =
  Required<RoutesOverallKPIRecord> & BaseSystemFields<Texpand>;
export type RoutesStatusKPIResponse<Texpand = unknown> =
  Required<RoutesStatusKPIRecord> & BaseSystemFields<Texpand>;
export type RoutesVehicleKPIResponse<Texpand = unknown> =
  Required<RoutesVehicleKPIRecord> & BaseSystemFields<Texpand>;
export type ShipmentsResponse<Texpand = unknown> = Required<ShipmentsRecord> &
  BaseSystemFields<Texpand>;
export type ShipmentsCarrierKPIResponse<Texpand = unknown> =
  Required<ShipmentsCarrierKPIRecord> & BaseSystemFields<Texpand>;
export type ShipmentsDriverKPIResponse<Texpand = unknown> =
  Required<ShipmentsDriverKPIRecord> & BaseSystemFields<Texpand>;
export type ShipmentsOnTimeDeliveryKPIResponse<
  TonTimeDeliveryPercentage = unknown,
  TonTimeShipments = unknown,
  Texpand = unknown,
> = Required<
  ShipmentsOnTimeDeliveryKPIRecord<TonTimeDeliveryPercentage, TonTimeShipments>
> &
  BaseSystemFields<Texpand>;
export type ShipmentsOverallKPIResponse<Texpand = unknown> =
  Required<ShipmentsOverallKPIRecord> & BaseSystemFields<Texpand>;
export type ShipmentsStatusKPIResponse<Texpand = unknown> =
  Required<ShipmentsStatusKPIRecord> & BaseSystemFields<Texpand>;
export type TaskMessagesResponse<Texpand = unknown> =
  Required<TaskMessagesRecord> & BaseSystemFields<Texpand>;
export type TaskMessagesCountKPIResponse<
  TtaskId = unknown,
  Texpand = unknown,
> = Required<TaskMessagesCountKPIRecord<TtaskId>> & BaseSystemFields<Texpand>;
export type TaskMessagesOverallKPIResponse<Texpand = unknown> =
  Required<TaskMessagesOverallKPIRecord> & BaseSystemFields<Texpand>;
export type TasksResponse<Texpand = unknown> = Required<TasksRecord> &
  BaseSystemFields<Texpand>;
export type TasksDepartmentKPIResponse<Texpand = unknown> =
  Required<TasksDepartmentKPIRecord> & BaseSystemFields<Texpand>;
export type TasksOverallKPIResponse<Texpand = unknown> =
  Required<TasksOverallKPIRecord> & BaseSystemFields<Texpand>;
export type TasksPriorityKPIResponse<Texpand = unknown> =
  Required<TasksPriorityKPIRecord> & BaseSystemFields<Texpand>;
export type TasksSpecificTagKPIResponse<
  Ttagname = unknown,
  Texpand = unknown,
> = Required<TasksSpecificTagKPIRecord<Ttagname>> & BaseSystemFields<Texpand>;
export type TasksStatusKPIResponse<Texpand = unknown> =
  Required<TasksStatusKPIRecord> & BaseSystemFields<Texpand>;
export type UserAccessResponse<Texpand = unknown> = Required<UserAccessRecord> &
  BaseSystemFields<Texpand>;
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> &
  AuthSystemFields<Texpand>;
export type UsersCompanyKPIResponse<Texpand = unknown> =
  Required<UsersCompanyKPIRecord> & BaseSystemFields<Texpand>;
export type UsersDepartmentKPIResponse<Texpand = unknown> =
  Required<UsersDepartmentKPIRecord> & BaseSystemFields<Texpand>;
export type UsersOverallKPIResponse<Texpand = unknown> =
  Required<UsersOverallKPIRecord> & BaseSystemFields<Texpand>;
export type UsersRoleKPIResponse<Texpand = unknown> =
  Required<UsersRoleKPIRecord> & BaseSystemFields<Texpand>;
export type VehiclesResponse<Texpand = unknown> = Required<VehiclesRecord> &
  BaseSystemFields<Texpand>;
export type VehiclesOverallKPIResponse<
  TaverageVolumeCapacity = unknown,
  TaverageWeightCapacity = unknown,
  Texpand = unknown,
> = Required<
  VehiclesOverallKPIRecord<TaverageVolumeCapacity, TaverageWeightCapacity>
> &
  BaseSystemFields<Texpand>;
export type VehiclesStatusKPIResponse<Texpand = unknown> =
  Required<VehiclesStatusKPIRecord> & BaseSystemFields<Texpand>;
export type VehiclesTypeKPIResponse<Texpand = unknown> =
  Required<VehiclesTypeKPIRecord> & BaseSystemFields<Texpand>;
export type WarehousesResponse<Texpand = unknown> = Required<WarehousesRecord> &
  BaseSystemFields<Texpand>;
export type WarehousesManagerKPIResponse<Texpand = unknown> =
  Required<WarehousesManagerKPIRecord> & BaseSystemFields<Texpand>;
export type WarehousesOverallKPIResponse<Texpand = unknown> =
  Required<WarehousesOverallKPIRecord> & BaseSystemFields<Texpand>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  _authOrigins: AuthoriginsRecord;
  _externalAuths: ExternalauthsRecord;
  _mfas: MfasRecord;
  _otps: OtpsRecord;
  _superusers: SuperusersRecord;
  chatMessages: ChatMessagesRecord;
  chatMessagesOverallKPI: ChatMessagesOverallKPIRecord;
  chatMessagesPerRoomKPI: ChatMessagesPerRoomKPIRecord;
  chatMessagesSenderKPI: ChatMessagesSenderKPIRecord;
  chatRooms: ChatRoomsRecord;
  chatRoomsOrderRelatedKPI: ChatRoomsOrderRelatedKPIRecord;
  chatRoomsOverallKPI: ChatRoomsOverallKPIRecord;
  chatRoomsTypeKPI: ChatRoomsTypeKPIRecord;
  companies: CompaniesRecord;
  companiesOverallKPI: CompaniesOverallKPIRecord;
  companiesTypeKPI: CompaniesTypeKPIRecord;
  departments: DepartmentsRecord;
  departmentsManagerEmployeeCountKPI: DepartmentsManagerEmployeeCountKPIRecord;
  departmentsOverallKPI: DepartmentsOverallKPIRecord;
  inventoryItems: InventoryItemsRecord;
  inventoryItemsExpiryKPI: InventoryItemsExpiryKPIRecord;
  inventoryItemsOverallKPI: InventoryItemsOverallKPIRecord;
  inventoryItemsProductKPI: InventoryItemsProductKPIRecord;
  inventoryItemsStatusKPI: InventoryItemsStatusKPIRecord;
  inventoryItemsWarehouseKPI: InventoryItemsWarehouseKPIRecord;
  invoices: InvoicesRecord;
  invoicesCustomerKPI: InvoicesCustomerKPIRecord;
  invoicesOverallKPI: InvoicesOverallKPIRecord;
  invoicesStatusKPI: InvoicesStatusKPIRecord;
  notifications: NotificationsRecord;
  notificationsOverallKPI: NotificationsOverallKPIRecord;
  notificationsPriorityKPI: NotificationsPriorityKPIRecord;
  notificationsTypeKPI: NotificationsTypeKPIRecord;
  notificationsUnreadKPI: NotificationsUnreadKPIRecord;
  orderLineItems: OrderLineItemsRecord;
  orderLineItemsOverallKPI: OrderLineItemsOverallKPIRecord;
  orderLineItemsRevenue: OrderLineItemsRevenueRecord;
  orderLineItemsTopSellingKPI: OrderLineItemsTopSellingKPIRecord;
  orders: OrdersRecord;
  ordersCustomerKPI: OrdersCustomerKPIRecord;
  ordersMonthlyKPI: OrdersMonthlyKPIRecord;
  ordersOverallKPI: OrdersOverallKPIRecord;
  ordersStatusKPI: OrdersStatusKPIRecord;
  payments: PaymentsRecord;
  paymentsMethodsKPI: PaymentsMethodsKPIRecord;
  paymentsOverallKPI: PaymentsOverallKPIRecord;
  paymentsStatusKPI: PaymentsStatusKPIRecord;
  products: ProductsRecord;
  productsOverallKPI: ProductsOverallKPIRecord;
  productsSupplierKPI: ProductsSupplierKPIRecord;
  routeSegments: RouteSegmentsRecord;
  routeSegmentsAverageTimeKPI: RouteSegmentsAverageTimeKPIRecord;
  routeSegmentsDelaysKPI: RouteSegmentsDelaysKPIRecord;
  routeSegmentsOverallKPI: RouteSegmentsOverallKPIRecord;
  routeSegmentsTypeKPI: RouteSegmentsTypeKPIRecord;
  routes: RoutesRecord;
  routesDriverKPI: RoutesDriverKPIRecord;
  routesOverallKPI: RoutesOverallKPIRecord;
  routesStatusKPI: RoutesStatusKPIRecord;
  routesVehicleKPI: RoutesVehicleKPIRecord;
  shipments: ShipmentsRecord;
  shipmentsCarrierKPI: ShipmentsCarrierKPIRecord;
  shipmentsDriverKPI: ShipmentsDriverKPIRecord;
  shipmentsOnTimeDeliveryKPI: ShipmentsOnTimeDeliveryKPIRecord;
  shipmentsOverallKPI: ShipmentsOverallKPIRecord;
  shipmentsStatusKPI: ShipmentsStatusKPIRecord;
  taskMessages: TaskMessagesRecord;
  taskMessagesCountKPI: TaskMessagesCountKPIRecord;
  taskMessagesOverallKPI: TaskMessagesOverallKPIRecord;
  tasks: TasksRecord;
  tasksDepartmentKPI: TasksDepartmentKPIRecord;
  tasksOverallKPI: TasksOverallKPIRecord;
  tasksPriorityKPI: TasksPriorityKPIRecord;
  tasksSpecificTagKPI: TasksSpecificTagKPIRecord;
  tasksStatusKPI: TasksStatusKPIRecord;
  userAccess: UserAccessRecord;
  users: UsersRecord;
  usersCompanyKPI: UsersCompanyKPIRecord;
  usersDepartmentKPI: UsersDepartmentKPIRecord;
  usersOverallKPI: UsersOverallKPIRecord;
  usersRoleKPI: UsersRoleKPIRecord;
  vehicles: VehiclesRecord;
  vehiclesOverallKPI: VehiclesOverallKPIRecord;
  vehiclesStatusKPI: VehiclesStatusKPIRecord;
  vehiclesTypeKPI: VehiclesTypeKPIRecord;
  warehouses: WarehousesRecord;
  warehousesManagerKPI: WarehousesManagerKPIRecord;
  warehousesOverallKPI: WarehousesOverallKPIRecord;
};

export type CollectionResponses = {
  _authOrigins: AuthoriginsResponse;
  _externalAuths: ExternalauthsResponse;
  _mfas: MfasResponse;
  _otps: OtpsResponse;
  _superusers: SuperusersResponse;
  chatMessages: ChatMessagesResponse;
  chatMessagesOverallKPI: ChatMessagesOverallKPIResponse;
  chatMessagesPerRoomKPI: ChatMessagesPerRoomKPIResponse;
  chatMessagesSenderKPI: ChatMessagesSenderKPIResponse;
  chatRooms: ChatRoomsResponse;
  chatRoomsOrderRelatedKPI: ChatRoomsOrderRelatedKPIResponse;
  chatRoomsOverallKPI: ChatRoomsOverallKPIResponse;
  chatRoomsTypeKPI: ChatRoomsTypeKPIResponse;
  companies: CompaniesResponse;
  companiesOverallKPI: CompaniesOverallKPIResponse;
  companiesTypeKPI: CompaniesTypeKPIResponse;
  departments: DepartmentsResponse;
  departmentsManagerEmployeeCountKPI: DepartmentsManagerEmployeeCountKPIResponse;
  departmentsOverallKPI: DepartmentsOverallKPIResponse;
  inventoryItems: InventoryItemsResponse;
  inventoryItemsExpiryKPI: InventoryItemsExpiryKPIResponse;
  inventoryItemsOverallKPI: InventoryItemsOverallKPIResponse;
  inventoryItemsProductKPI: InventoryItemsProductKPIResponse;
  inventoryItemsStatusKPI: InventoryItemsStatusKPIResponse;
  inventoryItemsWarehouseKPI: InventoryItemsWarehouseKPIResponse;
  invoices: InvoicesResponse;
  invoicesCustomerKPI: InvoicesCustomerKPIResponse;
  invoicesOverallKPI: InvoicesOverallKPIResponse;
  invoicesStatusKPI: InvoicesStatusKPIResponse;
  notifications: NotificationsResponse;
  notificationsOverallKPI: NotificationsOverallKPIResponse;
  notificationsPriorityKPI: NotificationsPriorityKPIResponse;
  notificationsTypeKPI: NotificationsTypeKPIResponse;
  notificationsUnreadKPI: NotificationsUnreadKPIResponse;
  orderLineItems: OrderLineItemsResponse;
  orderLineItemsOverallKPI: OrderLineItemsOverallKPIResponse;
  orderLineItemsRevenue: OrderLineItemsRevenueResponse;
  orderLineItemsTopSellingKPI: OrderLineItemsTopSellingKPIResponse;
  orders: OrdersResponse;
  ordersCustomerKPI: OrdersCustomerKPIResponse;
  ordersMonthlyKPI: OrdersMonthlyKPIResponse;
  ordersOverallKPI: OrdersOverallKPIResponse;
  ordersStatusKPI: OrdersStatusKPIResponse;
  payments: PaymentsResponse;
  paymentsMethodsKPI: PaymentsMethodsKPIResponse;
  paymentsOverallKPI: PaymentsOverallKPIResponse;
  paymentsStatusKPI: PaymentsStatusKPIResponse;
  products: ProductsResponse;
  productsOverallKPI: ProductsOverallKPIResponse;
  productsSupplierKPI: ProductsSupplierKPIResponse;
  routeSegments: RouteSegmentsResponse;
  routeSegmentsAverageTimeKPI: RouteSegmentsAverageTimeKPIResponse;
  routeSegmentsDelaysKPI: RouteSegmentsDelaysKPIResponse;
  routeSegmentsOverallKPI: RouteSegmentsOverallKPIResponse;
  routeSegmentsTypeKPI: RouteSegmentsTypeKPIResponse;
  routes: RoutesResponse;
  routesDriverKPI: RoutesDriverKPIResponse;
  routesOverallKPI: RoutesOverallKPIResponse;
  routesStatusKPI: RoutesStatusKPIResponse;
  routesVehicleKPI: RoutesVehicleKPIResponse;
  shipments: ShipmentsResponse;
  shipmentsCarrierKPI: ShipmentsCarrierKPIResponse;
  shipmentsDriverKPI: ShipmentsDriverKPIResponse;
  shipmentsOnTimeDeliveryKPI: ShipmentsOnTimeDeliveryKPIResponse;
  shipmentsOverallKPI: ShipmentsOverallKPIResponse;
  shipmentsStatusKPI: ShipmentsStatusKPIResponse;
  taskMessages: TaskMessagesResponse;
  taskMessagesCountKPI: TaskMessagesCountKPIResponse;
  taskMessagesOverallKPI: TaskMessagesOverallKPIResponse;
  tasks: TasksResponse;
  tasksDepartmentKPI: TasksDepartmentKPIResponse;
  tasksOverallKPI: TasksOverallKPIResponse;
  tasksPriorityKPI: TasksPriorityKPIResponse;
  tasksSpecificTagKPI: TasksSpecificTagKPIResponse;
  tasksStatusKPI: TasksStatusKPIResponse;
  userAccess: UserAccessResponse;
  users: UsersResponse;
  usersCompanyKPI: UsersCompanyKPIResponse;
  usersDepartmentKPI: UsersDepartmentKPIResponse;
  usersOverallKPI: UsersOverallKPIResponse;
  usersRoleKPI: UsersRoleKPIResponse;
  vehicles: VehiclesResponse;
  vehiclesOverallKPI: VehiclesOverallKPIResponse;
  vehiclesStatusKPI: VehiclesStatusKPIResponse;
  vehiclesTypeKPI: VehiclesTypeKPIResponse;
  warehouses: WarehousesResponse;
  warehousesManagerKPI: WarehousesManagerKPIResponse;
  warehousesOverallKPI: WarehousesOverallKPIResponse;
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
  collection(
    idOrName: 'chatMessagesOverallKPI',
  ): RecordService<ChatMessagesOverallKPIResponse>;
  collection(
    idOrName: 'chatMessagesPerRoomKPI',
  ): RecordService<ChatMessagesPerRoomKPIResponse>;
  collection(
    idOrName: 'chatMessagesSenderKPI',
  ): RecordService<ChatMessagesSenderKPIResponse>;
  collection(idOrName: 'chatRooms'): RecordService<ChatRoomsResponse>;
  collection(
    idOrName: 'chatRoomsOrderRelatedKPI',
  ): RecordService<ChatRoomsOrderRelatedKPIResponse>;
  collection(
    idOrName: 'chatRoomsOverallKPI',
  ): RecordService<ChatRoomsOverallKPIResponse>;
  collection(
    idOrName: 'chatRoomsTypeKPI',
  ): RecordService<ChatRoomsTypeKPIResponse>;
  collection(idOrName: 'companies'): RecordService<CompaniesResponse>;
  collection(
    idOrName: 'companiesOverallKPI',
  ): RecordService<CompaniesOverallKPIResponse>;
  collection(
    idOrName: 'companiesTypeKPI',
  ): RecordService<CompaniesTypeKPIResponse>;
  collection(idOrName: 'departments'): RecordService<DepartmentsResponse>;
  collection(
    idOrName: 'departmentsManagerEmployeeCountKPI',
  ): RecordService<DepartmentsManagerEmployeeCountKPIResponse>;
  collection(
    idOrName: 'departmentsOverallKPI',
  ): RecordService<DepartmentsOverallKPIResponse>;
  collection(idOrName: 'inventoryItems'): RecordService<InventoryItemsResponse>;
  collection(
    idOrName: 'inventoryItemsExpiryKPI',
  ): RecordService<InventoryItemsExpiryKPIResponse>;
  collection(
    idOrName: 'inventoryItemsOverallKPI',
  ): RecordService<InventoryItemsOverallKPIResponse>;
  collection(
    idOrName: 'inventoryItemsProductKPI',
  ): RecordService<InventoryItemsProductKPIResponse>;
  collection(
    idOrName: 'inventoryItemsStatusKPI',
  ): RecordService<InventoryItemsStatusKPIResponse>;
  collection(
    idOrName: 'inventoryItemsWarehouseKPI',
  ): RecordService<InventoryItemsWarehouseKPIResponse>;
  collection(idOrName: 'invoices'): RecordService<InvoicesResponse>;
  collection(
    idOrName: 'invoicesCustomerKPI',
  ): RecordService<InvoicesCustomerKPIResponse>;
  collection(
    idOrName: 'invoicesOverallKPI',
  ): RecordService<InvoicesOverallKPIResponse>;
  collection(
    idOrName: 'invoicesStatusKPI',
  ): RecordService<InvoicesStatusKPIResponse>;
  collection(idOrName: 'notifications'): RecordService<NotificationsResponse>;
  collection(
    idOrName: 'notificationsOverallKPI',
  ): RecordService<NotificationsOverallKPIResponse>;
  collection(
    idOrName: 'notificationsPriorityKPI',
  ): RecordService<NotificationsPriorityKPIResponse>;
  collection(
    idOrName: 'notificationsTypeKPI',
  ): RecordService<NotificationsTypeKPIResponse>;
  collection(
    idOrName: 'notificationsUnreadKPI',
  ): RecordService<NotificationsUnreadKPIResponse>;
  collection(idOrName: 'orderLineItems'): RecordService<OrderLineItemsResponse>;
  collection(
    idOrName: 'orderLineItemsOverallKPI',
  ): RecordService<OrderLineItemsOverallKPIResponse>;
  collection(
    idOrName: 'orderLineItemsRevenue',
  ): RecordService<OrderLineItemsRevenueResponse>;
  collection(
    idOrName: 'orderLineItemsTopSellingKPI',
  ): RecordService<OrderLineItemsTopSellingKPIResponse>;
  collection(idOrName: 'orders'): RecordService<OrdersResponse>;
  collection(
    idOrName: 'ordersCustomerKPI',
  ): RecordService<OrdersCustomerKPIResponse>;
  collection(
    idOrName: 'ordersMonthlyKPI',
  ): RecordService<OrdersMonthlyKPIResponse>;
  collection(
    idOrName: 'ordersOverallKPI',
  ): RecordService<OrdersOverallKPIResponse>;
  collection(
    idOrName: 'ordersStatusKPI',
  ): RecordService<OrdersStatusKPIResponse>;
  collection(idOrName: 'payments'): RecordService<PaymentsResponse>;
  collection(
    idOrName: 'paymentsMethodsKPI',
  ): RecordService<PaymentsMethodsKPIResponse>;
  collection(
    idOrName: 'paymentsOverallKPI',
  ): RecordService<PaymentsOverallKPIResponse>;
  collection(
    idOrName: 'paymentsStatusKPI',
  ): RecordService<PaymentsStatusKPIResponse>;
  collection(idOrName: 'products'): RecordService<ProductsResponse>;
  collection(
    idOrName: 'productsOverallKPI',
  ): RecordService<ProductsOverallKPIResponse>;
  collection(
    idOrName: 'productsSupplierKPI',
  ): RecordService<ProductsSupplierKPIResponse>;
  collection(idOrName: 'routeSegments'): RecordService<RouteSegmentsResponse>;
  collection(
    idOrName: 'routeSegmentsAverageTimeKPI',
  ): RecordService<RouteSegmentsAverageTimeKPIResponse>;
  collection(
    idOrName: 'routeSegmentsDelaysKPI',
  ): RecordService<RouteSegmentsDelaysKPIResponse>;
  collection(
    idOrName: 'routeSegmentsOverallKPI',
  ): RecordService<RouteSegmentsOverallKPIResponse>;
  collection(
    idOrName: 'routeSegmentsTypeKPI',
  ): RecordService<RouteSegmentsTypeKPIResponse>;
  collection(idOrName: 'routes'): RecordService<RoutesResponse>;
  collection(
    idOrName: 'routesDriverKPI',
  ): RecordService<RoutesDriverKPIResponse>;
  collection(
    idOrName: 'routesOverallKPI',
  ): RecordService<RoutesOverallKPIResponse>;
  collection(
    idOrName: 'routesStatusKPI',
  ): RecordService<RoutesStatusKPIResponse>;
  collection(
    idOrName: 'routesVehicleKPI',
  ): RecordService<RoutesVehicleKPIResponse>;
  collection(idOrName: 'shipments'): RecordService<ShipmentsResponse>;
  collection(
    idOrName: 'shipmentsCarrierKPI',
  ): RecordService<ShipmentsCarrierKPIResponse>;
  collection(
    idOrName: 'shipmentsDriverKPI',
  ): RecordService<ShipmentsDriverKPIResponse>;
  collection(
    idOrName: 'shipmentsOnTimeDeliveryKPI',
  ): RecordService<ShipmentsOnTimeDeliveryKPIResponse>;
  collection(
    idOrName: 'shipmentsOverallKPI',
  ): RecordService<ShipmentsOverallKPIResponse>;
  collection(
    idOrName: 'shipmentsStatusKPI',
  ): RecordService<ShipmentsStatusKPIResponse>;
  collection(idOrName: 'taskMessages'): RecordService<TaskMessagesResponse>;
  collection(
    idOrName: 'taskMessagesCountKPI',
  ): RecordService<TaskMessagesCountKPIResponse>;
  collection(
    idOrName: 'taskMessagesOverallKPI',
  ): RecordService<TaskMessagesOverallKPIResponse>;
  collection(idOrName: 'tasks'): RecordService<TasksResponse>;
  collection(
    idOrName: 'tasksDepartmentKPI',
  ): RecordService<TasksDepartmentKPIResponse>;
  collection(
    idOrName: 'tasksOverallKPI',
  ): RecordService<TasksOverallKPIResponse>;
  collection(
    idOrName: 'tasksPriorityKPI',
  ): RecordService<TasksPriorityKPIResponse>;
  collection(
    idOrName: 'tasksSpecificTagKPI',
  ): RecordService<TasksSpecificTagKPIResponse>;
  collection(idOrName: 'tasksStatusKPI'): RecordService<TasksStatusKPIResponse>;
  collection(idOrName: 'userAccess'): RecordService<UserAccessResponse>;
  collection(idOrName: 'users'): RecordService<UsersResponse>;
  collection(
    idOrName: 'usersCompanyKPI',
  ): RecordService<UsersCompanyKPIResponse>;
  collection(
    idOrName: 'usersDepartmentKPI',
  ): RecordService<UsersDepartmentKPIResponse>;
  collection(
    idOrName: 'usersOverallKPI',
  ): RecordService<UsersOverallKPIResponse>;
  collection(idOrName: 'usersRoleKPI'): RecordService<UsersRoleKPIResponse>;
  collection(idOrName: 'vehicles'): RecordService<VehiclesResponse>;
  collection(
    idOrName: 'vehiclesOverallKPI',
  ): RecordService<VehiclesOverallKPIResponse>;
  collection(
    idOrName: 'vehiclesStatusKPI',
  ): RecordService<VehiclesStatusKPIResponse>;
  collection(
    idOrName: 'vehiclesTypeKPI',
  ): RecordService<VehiclesTypeKPIResponse>;
  collection(idOrName: 'warehouses'): RecordService<WarehousesResponse>;
  collection(
    idOrName: 'warehousesManagerKPI',
  ): RecordService<WarehousesManagerKPIResponse>;
  collection(
    idOrName: 'warehousesOverallKPI',
  ): RecordService<WarehousesOverallKPIResponse>;
};
