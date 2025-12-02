# components/utils

## Variables

### caseStatusColors

```ts
const caseStatusColors: Record<string, string>;
```

Case status badge color map

***

### casePriorityColors

```ts
const casePriorityColors: Record<string, string>;
```

Case priority badge color map

***

### leadStatusColors

```ts
const leadStatusColors: Record<string, string>;
```

Lead status badge color map

***

### opportunityStageColors

```ts
const opportunityStageColors: Record<string, string>;
```

Opportunity stage badge color map

***

### interactionTypeIcons

```ts
const interactionTypeIcons: Record<string, string>;
```

Interaction type icon map

***

### routeStatusColors

```ts
const routeStatusColors: Record<string, string>;
```

Route status badge color map

***

### taskStatusColors

```ts
const taskStatusColors: Record<string, string>;
```

Task status badge color map

***

### taskEventStatusColors

```ts
const taskEventStatusColors: Record<string, string>;
```

Task event status badge color map

***

### driverStatusColors

```ts
const driverStatusColors: Record<string, string>;
```

Driver status badge color map

***

### vehicleStatusColors

```ts
const vehicleStatusColors: Record<string, string>;
```

Vehicle status badge color map

***

### expenseStatusColors

```ts
const expenseStatusColors: Record<string, string>;
```

Expense status badge color map

***

### geofenceEventIcons

```ts
const geofenceEventIcons: Record<string, string>;
```

Geofence event icon map

***

### invoiceStatusColors

```ts
const invoiceStatusColors: Record<string, string>;
```

Invoice status badge color map

***

### shipmentLegStatusColors

```ts
const shipmentLegStatusColors: Record<string, string>;
```

Shipment leg status badge color map

***

### tripStopStatusColors

```ts
const tripStopStatusColors: Record<string, string>;
```

Trip stop status badge color map

***

### tripStatusColors

```ts
const tripStatusColors: Record<string, string>;
```

Trip status badge color map

***

### inboundShipmentStatusColors

```ts
const inboundShipmentStatusColors: Record<string, string>;
```

Inbound shipment status badge color map

***

### outboundShipmentStatusColors

```ts
const outboundShipmentStatusColors: Record<string, string>;
```

Outbound shipment status badge color map

***

### inventoryStockStatusColors

```ts
const inventoryStockStatusColors: Record<string, string>;
```

Inventory stock status badge color map

***

### pickBatchStatusColors

```ts
const pickBatchStatusColors: Record<string, string>;
```

Pick batch status badge color map

***

### salesOrderStatusColors

```ts
const salesOrderStatusColors: Record<string, string>;
```

Sales order status badge color map

***

### returnStatusColors

```ts
const returnStatusColors: Record<string, string>;
```

Return status badge color map

***

### stockTransferStatusColors

```ts
const stockTransferStatusColors: Record<string, string>;
```

Stock transfer status badge color map

***

### warehouseTaskStatusColors

```ts
const warehouseTaskStatusColors: Record<string, string>;
```

Warehouse task status badge color map

***

### accountTransactionStatusColors

```ts
const accountTransactionStatusColors: Record<string, string>;
```

Account transaction type status badge color map

***

### billingInvoiceStatusColors

```ts
const billingInvoiceStatusColors: Record<string, string>;
```

Billing invoice status badge color map (different from delivery invoice)

***

### disputeStatusColors

```ts
const disputeStatusColors: Record<string, string>;
```

Dispute status badge color map

***

### paymentStatusColors

```ts
const paymentStatusColors: Record<string, string>;
```

Payment status badge color map

***

### logSyncStatusColors

```ts
const logSyncStatusColors: Record<string, string>;
```

Log sync status badge color map

***

### quoteStatusColors

```ts
const quoteStatusColors: Record<string, string>;
```

Quote status badge color map

## Functions

### formatCurrency()

```ts
function formatCurrency(amount: number | undefined): string;
```

Format a number as USD currency

#### Parameters

##### amount

`number` | `undefined`

#### Returns

`string`

***

### formatDate()

```ts
function formatDate(date: string | undefined): string;
```

Format a date string to locale date

#### Parameters

##### date

`string` | `undefined`

#### Returns

`string`

***

### formatHyphens()

```ts
function formatHyphens(text: string | undefined): string;
```

Replace hyphens with spaces

#### Parameters

##### text

`string` | `undefined`

#### Returns

`string`

***

### truncateText()

```ts
function truncateText(text: string | undefined, length: number): string;
```

Truncate text to a specified length with ellipsis

#### Parameters

##### text

`string` | `undefined`

##### length

`number` = `50`

#### Returns

`string`

***

### capitalize()

```ts
function capitalize(text: string): string;
```

Capitalize first letter of text

#### Parameters

##### text

`string`

#### Returns

`string`

***

### currencyCell()

```ts
function currencyCell(amount: number | undefined): ReactNode;
```

Render a currency value as JSX

#### Parameters

##### amount

`number` | `undefined`

#### Returns

`ReactNode`

***

### dateCell()

```ts
function dateCell(date: string | undefined): ReactNode;
```

Render a date as JSX

#### Parameters

##### date

`string` | `undefined`

#### Returns

`ReactNode`

***

### emailCell()

```ts
function emailCell(email: string | undefined): ReactNode;
```

Render an email link as JSX

#### Parameters

##### email

`string` | `undefined`

#### Returns

`ReactNode`

***

### urlCell()

```ts
function urlCell(url: string | undefined): ReactNode;
```

Render a text link as JSX

#### Parameters

##### url

`string` | `undefined`

#### Returns

`ReactNode`

***

### statusBadgeCell()

```ts
function statusBadgeCell(status: string | undefined, colorMap: Record<string, string>): ReactNode;
```

Render a badge with status color mapping

#### Parameters

##### status

`string` | `undefined`

##### colorMap

`Record`\<`string`, `string`\>

#### Returns

`ReactNode`

***

### percentageCell()

```ts
function percentageCell(value: number | undefined): ReactNode;
```

Render a percentage value as JSX

#### Parameters

##### value

`number` | `undefined`

#### Returns

`ReactNode`

***

### interactionTypeCell()

```ts
function interactionTypeCell(type: string | undefined): ReactNode;
```

Render an interaction type with icon

#### Parameters

##### type

`string` | `undefined`

#### Returns

`ReactNode`

***

### formatDateTime()

```ts
function formatDateTime(date: string | undefined): string;
```

Format date-time to locale string

#### Parameters

##### date

`string` | `undefined`

#### Returns

`string`

***

### formatCoordinates()

```ts
function formatCoordinates(coords: 
  | {
  lon: number;
  lat: number;
}
  | undefined): string;
```

Format coordinates to fixed precision

#### Parameters

##### coords

\{
`lon`: `number`;
`lat`: `number`;
\} | `undefined`

#### Returns

`string`

***

### coordinatesCell()

```ts
function coordinatesCell(coords: 
  | {
  lon: number;
  lat: number;
}
  | undefined): ReactNode;
```

Render coordinates as JSX

#### Parameters

##### coords

\{
`lon`: `number`;
`lat`: `number`;
\} | `undefined`

#### Returns

`ReactNode`

***

### signatureCell()

```ts
function signatureCell(signatureData: any): ReactNode;
```

Render a signature badge

#### Parameters

##### signatureData

`any`

#### Returns

`ReactNode`

***

### expiryDateCell()

```ts
function expiryDateCell(date: string | undefined): ReactNode;
```

Render an expiry date with expired styling

#### Parameters

##### date

`string` | `undefined`

#### Returns

`ReactNode`

***

### registrationNumberCell()

```ts
function registrationNumberCell(text: string | undefined): ReactNode;
```

Render a registration number with special formatting

#### Parameters

##### text

`string` | `undefined`

#### Returns

`ReactNode`

***

### geofenceEventTypeCell()

```ts
function geofenceEventTypeCell(type: string | undefined): ReactNode;
```

Render a geofence event with icon

#### Parameters

##### type

`string` | `undefined`

#### Returns

`ReactNode`

***

### formatDynamicCurrency()

```ts
function formatDynamicCurrency(amount: number | undefined, currencyCode: string | undefined): string;
```

Format currency with dynamic currency code

#### Parameters

##### amount

`number` | `undefined`

##### currencyCode

`string` | `undefined`

#### Returns

`string`

***

### formatLocationType()

```ts
function formatLocationType(locationType: string): string;
```

Format location type by replacing hyphens with spaces

#### Parameters

##### locationType

`string`

#### Returns

`string`

***

### booleanBadgeCell()

```ts
function booleanBadgeCell(value: boolean | undefined): string;
```

Boolean badge cell renderer (for checkboxes as ✓ or -)

#### Parameters

##### value

`boolean` | `undefined`

#### Returns

`string`
