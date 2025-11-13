import React from "react";

/**
 * Format a number as USD currency
 */
export const formatCurrency = (amount: number | undefined): string => {
  if (amount === undefined) return "-";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

/**
 * Format a date string to locale date
 */
export const formatDate = (date: string | undefined): string => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString();
};

/**
 * Replace hyphens with spaces
 */
export const formatHyphens = (text: string | undefined): string => {
  return text ? text.replace(/-/g, " ") : "-";
};

/**
 * Truncate text to a specified length with ellipsis
 */
export const truncateText = (
  text: string | undefined,
  length: number = 50
): string => {
  if (!text) return "-";
  return text.length > length ? text.substring(0, length) + "..." : text;
};

/**
 * Capitalize first letter of text
 */
export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Render a currency value as JSX
 */
export const currencyCell = (amount: number | undefined): React.ReactNode => {
  return formatCurrency(amount);
};

/**
 * Render a date as JSX
 */
export const dateCell = (date: string | undefined): React.ReactNode => {
  return formatDate(date);
};

/**
 * Render an email link as JSX
 */
export const emailCell = (email: string | undefined): React.ReactNode => {
  if (!email) return "-";
  return React.createElement(
    "a",
    {
      href: `mailto:${email}`,
      className: "text-blue-500 hover:underline",
    },
    email
  );
};

/**
 * Render a text link as JSX
 */
export const urlCell = (url: string | undefined): React.ReactNode => {
  if (!url) return "-";
  return React.createElement(
    "a",
    {
      href: url,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "text-blue-500 hover:underline",
    },
    url
  );
};

/**
 * Render a badge with status color mapping
 */
export const statusBadgeCell = (
  status: string | undefined,
  colorMap: Record<string, string>
): React.ReactNode => {
  if (!status) return "-";
  const colorClass = colorMap[status] || "";
  return React.createElement(
    "span",
    {
      className: `px-2 py-1 rounded text-sm ${colorClass}`,
    },
    formatHyphens(status)
  );
};

/**
 * Render a percentage value as JSX
 */
export const percentageCell = (value: number | undefined): React.ReactNode => {
  if (value === undefined) return "-";
  return `${value}%`;
};

/**
 * Case status badge color map
 */
export const caseStatusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  "in-progress": "bg-yellow-100 text-yellow-800",
  "waiting-for-customer": "bg-orange-100 text-orange-800",
  "waiting-for-internal": "bg-purple-100 text-purple-800",
  escalated: "bg-red-100 text-red-800",
  resolved: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
};

/**
 * Case priority badge color map
 */
export const casePriorityColors: Record<string, string> = {
  critical: "bg-red-100 text-red-800",
  high: "bg-orange-100 text-orange-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
};

/**
 * Lead status badge color map
 */
export const leadStatusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  qualified: "bg-green-100 text-green-800",
  unqualified: "bg-red-100 text-red-800",
  converted: "bg-green-100 text-green-800",
};

/**
 * Opportunity stage badge color map
 */
export const opportunityStageColors: Record<string, string> = {
  prospecting: "bg-blue-100 text-blue-800",
  qualification: "bg-blue-100 text-blue-800",
  "need-analysis": "bg-purple-100 text-purple-800",
  demo: "bg-yellow-100 text-yellow-800",
  proposal: "bg-orange-100 text-orange-800",
  negotiation: "bg-orange-100 text-orange-800",
  "closed-won": "bg-green-100 text-green-800",
  "closed-lost": "bg-red-100 text-red-800",
};

/**
 * Interaction type icon map
 */
export const interactionTypeIcons: Record<string, string> = {
  call: "📞",
  meeting: "🤝",
  text: "💬",
  email: "📧",
};

/**
 * Render an interaction type with icon
 */
export const interactionTypeCell = (
  type: string | undefined
): React.ReactNode => {
  const icon = interactionTypeIcons[type || ""] || "";
  return `${icon} ${type || "-"}`;
};

/**
 * Format date-time to locale string
 */
export const formatDateTime = (date: string | undefined): string => {
  if (!date) return "-";
  return new Date(date).toLocaleString();
};

/**
 * Format coordinates to fixed precision
 */
export const formatCoordinates = (
  coords: { lon: number; lat: number } | undefined
): string => {
  if (!coords) return "-";
  return `${coords.lat.toFixed(6)}, ${coords.lon.toFixed(6)}`;
};

/**
 * Render coordinates as JSX
 */
export const coordinatesCell = (
  coords: { lon: number; lat: number } | undefined
): React.ReactNode => {
  if (!coords) return "-";
  return React.createElement(
    "span",
    { className: "font-mono text-sm" },
    formatCoordinates(coords)
  );
};

/**
 * Route status badge color map
 */
export const routeStatusColors: Record<string, string> = {
  planned: "bg-gray-100 text-gray-800",
  "in-progress": "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  paused: "bg-yellow-100 text-yellow-800",
};

/**
 * Task status badge color map
 */
export const taskStatusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  assigned: "bg-blue-100 text-blue-800",
  "out-for-delivery": "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  cancelled: "bg-red-100 text-red-800",
  rescheduled: "bg-yellow-100 text-yellow-800",
};

/**
 * Task event status badge color map
 */
export const taskEventStatusColors: Record<string, string> = {
  assigned: "bg-blue-100 text-blue-800",
  started: "bg-blue-100 text-blue-800",
  arrived: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  exception: "bg-orange-100 text-orange-800",
  cancelled: "bg-red-100 text-red-800",
  rescheduled: "bg-yellow-100 text-yellow-800",
};

/**
 * Render a signature badge
 */
export const signatureCell = (signatureData: any): React.ReactNode => {
  return signatureData
    ? React.createElement(
        "span",
        { className: "px-2 py-1 bg-green-100 text-green-800 rounded text-sm" },
        "✓ Signed"
      )
    : "-";
};

/**
 * Driver status badge color map
 */
export const driverStatusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  "on-leave": "bg-yellow-100 text-yellow-800",
};

/**
 * Render an expiry date with expired styling
 */
export const expiryDateCell = (date: string | undefined): React.ReactNode => {
  if (!date) return "-";
  const expDate = new Date(date);
  const today = new Date();
  const isExpired = expDate < today;
  return React.createElement(
    "span",
    { className: isExpired ? "text-red-600 font-semibold" : "" },
    expDate.toLocaleDateString()
  );
};

/**
 * Vehicle status badge color map
 */
export const vehicleStatusColors: Record<string, string> = {
  available: "bg-green-100 text-green-800",
  "in-maintenance": "bg-orange-100 text-orange-800",
  "on-trip": "bg-blue-100 text-blue-800",
  "out-of-service": "bg-red-100 text-red-800",
};

/**
 * Render a registration number with special formatting
 */
export const registrationNumberCell = (
  text: string | undefined
): React.ReactNode => {
  if (!text) return "-";
  return React.createElement(
    "span",
    { className: "font-mono font-semibold text-lg" },
    text
  );
};

/**
 * Expense status badge color map
 */
export const expenseStatusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  reimbursed: "bg-blue-100 text-blue-800",
};

/**
 * Geofence event icon map
 */
export const geofenceEventIcons: Record<string, string> = {
  enter: "📍",
  exit: "🚀",
};

/**
 * Render a geofence event with icon
 */
export const geofenceEventTypeCell = (
  type: string | undefined
): React.ReactNode => {
  if (!type) return "-";
  const icon = geofenceEventIcons[type] || "";
  return `${icon} ${capitalize(type)}`;
};

/**
 * Invoice status badge color map
 */
export const invoiceStatusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-green-100 text-green-800",
  disputed: "bg-orange-100 text-orange-800",
  overdue: "bg-red-100 text-red-800",
  cancelled: "bg-gray-100 text-gray-800",
};

/**
 * Shipment leg status badge color map
 */
export const shipmentLegStatusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-transit": "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  failed: "bg-red-100 text-red-800",
};

/**
 * Trip stop status badge color map
 */
export const tripStopStatusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  arrived: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  skipped: "bg-gray-100 text-gray-800",
};

/**
 * Trip status badge color map
 */
export const tripStatusColors: Record<string, string> = {
  planned: "bg-gray-100 text-gray-800",
  "in-progress": "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

/**
 * Format currency with dynamic currency code
 */
export const formatDynamicCurrency = (
  amount: number | undefined,
  currencyCode: string | undefined
): string => {
  if (amount === undefined) return "-";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode || "USD",
  }).format(amount);
};

/**
 * Inbound shipment status badge color map
 */
export const inboundShipmentStatusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
  received: "bg-green-100 text-green-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

/**
 * Outbound shipment status badge color map
 */
export const outboundShipmentStatusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processed: "bg-blue-100 text-blue-800",
  shipped: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

/**
 * Inventory stock status badge color map
 */
export const inventoryStockStatusColors: Record<string, string> = {
  available: "bg-green-100 text-green-800",
  reserved: "bg-yellow-100 text-yellow-800",
  damaged: "bg-red-100 text-red-800",
  expired: "bg-red-100 text-red-800",
};

/**
 * Pick batch status badge color map
 */
export const pickBatchStatusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

/**
 * Sales order status badge color map
 */
export const salesOrderStatusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  ready: "bg-blue-100 text-blue-800",
  shipped: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

/**
 * Return status badge color map
 */
export const returnStatusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  received: "bg-blue-100 text-blue-800",
  inspected: "bg-blue-100 text-blue-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  restocked: "bg-green-100 text-green-800",
};

/**
 * Stock transfer status badge color map
 */
export const stockTransferStatusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-transit": "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

/**
 * Warehouse task status badge color map
 */
export const warehouseTaskStatusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

/**
 * Format location type by replacing hyphens with spaces
 */
export const formatLocationType = (locationType: string): string => {
  return locationType.replace(/-/g, " ");
};

/**
 * Boolean badge cell renderer (for checkboxes as ✓ or -)
 */
export const booleanBadgeCell = (value: boolean | undefined): string => {
  return value ? "✓" : "-";
};

/**
 * Account transaction type status badge color map
 */
export const accountTransactionStatusColors: Record<string, string> = {
  credit: "bg-green-100 text-green-800",
  debit: "bg-red-100 text-red-800",
  "top-up": "bg-blue-100 text-blue-800",
  refund: "bg-purple-100 text-purple-800",
  adjustment: "bg-yellow-100 text-yellow-800",
  fee: "bg-orange-100 text-orange-800",
};

/**
 * Billing invoice status badge color map (different from delivery invoice)
 */
export const billingInvoiceStatusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-800",
  sent: "bg-blue-100 text-blue-800",
  viewed: "bg-blue-100 text-blue-800",
  paid: "bg-green-100 text-green-800",
  "partial-paid": "bg-yellow-100 text-yellow-800",
  "past-due": "bg-red-100 text-red-800",
  disputed: "bg-orange-100 text-orange-800",
  cancelled: "bg-red-100 text-red-800",
  void: "bg-red-100 text-red-800",
};

/**
 * Dispute status badge color map
 */
export const disputeStatusColors: Record<string, string> = {
  open: "bg-yellow-100 text-yellow-800",
  "under-review": "bg-blue-100 text-blue-800",
  approved: "bg-green-100 text-green-800",
  denied: "bg-red-100 text-red-800",
  escalated: "bg-red-100 text-red-800",
  closed: "bg-gray-100 text-gray-800",
};

/**
 * Payment status badge color map
 */
export const paymentStatusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  successful: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  cancelled: "bg-gray-100 text-gray-800",
  refunded: "bg-purple-100 text-purple-800",
};

/**
 * Log sync status badge color map
 */
export const logSyncStatusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
  success: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  retry: "bg-orange-100 text-orange-800",
};

/**
 * Quote status badge color map
 */
export const quoteStatusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  accepted: "bg-green-100 text-green-800",
  expired: "bg-red-100 text-red-800",
  cancelled: "bg-gray-100 text-gray-800",
  converted: "bg-blue-100 text-blue-800",
};
