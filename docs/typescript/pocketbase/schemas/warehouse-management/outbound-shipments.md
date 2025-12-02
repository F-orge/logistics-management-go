# pocketbase/schemas/warehouse-management/outbound-shipments

## Type Aliases

### OutboundShipments

```ts
type OutboundShipments = z.infer<typeof OutboundShipmentsSchema>;
```

## Variables

### OutboundShipmentsSchema

```ts
const OutboundShipmentsSchema: ZodObject<{
  id: ZodString;
  salesOrder: ZodString;
  status: ZodOptional<ZodEnum<{
     cancelled: "cancelled";
     delivered: "delivered";
     shipped: "shipped";
     picking: "picking";
     packed: "packed";
  }>>;
  trackingNumber: ZodString;
  carrier: ZodOptional<ZodString>;
  warehouse: ZodString;
  items: ZodArray<ZodString>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateOutboundShipmentsSchema()

```ts
function CreateOutboundShipmentsSchema(pocketbase: TypedPocketBase): ZodObject<{
  salesOrder: ZodString;
  status: ZodOptional<ZodEnum<{
     cancelled: "cancelled";
     delivered: "delivered";
     shipped: "shipped";
     picking: "picking";
     packed: "packed";
  }>>;
  trackingNumber: ZodString;
  carrier: ZodOptional<ZodString>;
  warehouse: ZodString;
  items: ZodArray<ZodObject<{
     outboundShipment: ZodString;
     salesOrderItem: ZodString;
     product: ZodString;
     batch: ZodOptional<ZodString>;
     quantityShipped: ZodNumber;
  }, $strip>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `salesOrder`: `ZodString`;
  `status`: `ZodOptional`\<`ZodEnum`\<\{
     `cancelled`: `"cancelled"`;
     `delivered`: `"delivered"`;
     `shipped`: `"shipped"`;
     `picking`: `"picking"`;
     `packed`: `"packed"`;
  \}\>\>;
  `trackingNumber`: `ZodString`;
  `carrier`: `ZodOptional`\<`ZodString`\>;
  `warehouse`: `ZodString`;
  `items`: `ZodArray`\<`ZodObject`\<\{
     `outboundShipment`: `ZodString`;
     `salesOrderItem`: `ZodString`;
     `product`: `ZodString`;
     `batch`: `ZodOptional`\<`ZodString`\>;
     `quantityShipped`: `ZodNumber`;
  \}, `$strip`\>\>;
\}, `$strip`\>

***

### UpdateOutboundShipmentsSchema()

```ts
function UpdateOutboundShipmentsSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementOutboundShipmentsRecord): ZodObject<{
  salesOrder: ZodOptional<ZodString>;
  status: ZodOptional<ZodOptional<ZodEnum<{
     cancelled: "cancelled";
     delivered: "delivered";
     shipped: "shipped";
     picking: "picking";
     packed: "packed";
  }>>>;
  trackingNumber: ZodOptional<ZodString>;
  carrier: ZodOptional<ZodOptional<ZodString>>;
  warehouse: ZodOptional<ZodString>;
  items: ZodOptional<ZodArray<ZodString>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementOutboundShipmentsRecord`](../../../lib/pb.types.md#warehousemanagementoutboundshipmentsrecord)

#### Returns

`ZodObject`\<\{
  `salesOrder`: `ZodOptional`\<`ZodString`\>;
  `status`: `ZodOptional`\<`ZodOptional`\<`ZodEnum`\<\{
     `cancelled`: `"cancelled"`;
     `delivered`: `"delivered"`;
     `shipped`: `"shipped"`;
     `picking`: `"picking"`;
     `packed`: `"packed"`;
  \}\>\>\>;
  `trackingNumber`: `ZodOptional`\<`ZodString`\>;
  `carrier`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `warehouse`: `ZodOptional`\<`ZodString`\>;
  `items`: `ZodOptional`\<`ZodArray`\<`ZodString`\>\>;
\}, `$strip`\>
