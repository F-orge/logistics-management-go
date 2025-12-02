# pocketbase/schemas/warehouse-management/outbound-shipment-items

## Type Aliases

### OutboundShipmentItems

```ts
type OutboundShipmentItems = z.infer<typeof OutboundShipmentItemsSchema>;
```

## Variables

### OutboundShipmentItemsSchema

```ts
const OutboundShipmentItemsSchema: ZodObject<{
  id: ZodString;
  outboundShipment: ZodString;
  salesOrderItem: ZodString;
  product: ZodString;
  batch: ZodOptional<ZodString>;
  quantityShipped: ZodNumber;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateOutboundShipmentItemsSchema()

```ts
function CreateOutboundShipmentItemsSchema(pocketbase: TypedPocketBase): ZodObject<{
  outboundShipment: ZodString;
  salesOrderItem: ZodString;
  product: ZodString;
  batch: ZodOptional<ZodString>;
  quantityShipped: ZodNumber;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `outboundShipment`: `ZodString`;
  `salesOrderItem`: `ZodString`;
  `product`: `ZodString`;
  `batch`: `ZodOptional`\<`ZodString`\>;
  `quantityShipped`: `ZodNumber`;
\}, `$strip`\>

***

### UpdateOutboundShipmentItemsSchema()

```ts
function UpdateOutboundShipmentItemsSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementOutboundShipmentItemsRecord): ZodObject<{
  outboundShipment: ZodOptional<ZodString>;
  salesOrderItem: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  batch: ZodOptional<ZodOptional<ZodString>>;
  quantityShipped: ZodOptional<ZodNumber>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementOutboundShipmentItemsRecord`](../../../lib/pb.types.md#warehousemanagementoutboundshipmentitemsrecord)

#### Returns

`ZodObject`\<\{
  `outboundShipment`: `ZodOptional`\<`ZodString`\>;
  `salesOrderItem`: `ZodOptional`\<`ZodString`\>;
  `product`: `ZodOptional`\<`ZodString`\>;
  `batch`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `quantityShipped`: `ZodOptional`\<`ZodNumber`\>;
\}, `$strip`\>
