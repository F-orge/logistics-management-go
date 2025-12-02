# pocketbase/schemas/warehouse-management/inbound-shipment-items

## Type Aliases

### InboundShipmentItems

```ts
type InboundShipmentItems = z.infer<typeof InboundShipmentItemsSchema>;
```

## Variables

### InboundShipmentItemsSchema

```ts
const InboundShipmentItemsSchema: ZodObject<{
  id: ZodString;
  inboundShipment: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  expectedQuantity: ZodNumber;
  receivedQuantity: ZodOptional<ZodNumber>;
  discrepancyNotes: ZodOptional<ZodUnknown>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateInboundShipmentItemsSchema()

```ts
function CreateInboundShipmentItemsSchema(pocketbase: TypedPocketBase): ZodObject<{
  inboundShipment: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  expectedQuantity: ZodNumber;
  receivedQuantity: ZodOptional<ZodNumber>;
  discrepancyNotes: ZodOptional<ZodUnknown>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `inboundShipment`: `ZodOptional`\<`ZodString`\>;
  `product`: `ZodOptional`\<`ZodString`\>;
  `expectedQuantity`: `ZodNumber`;
  `receivedQuantity`: `ZodOptional`\<`ZodNumber`\>;
  `discrepancyNotes`: `ZodOptional`\<`ZodUnknown`\>;
\}, `$strip`\>

***

### UpdateInboundShipmentItemsSchema()

```ts
function UpdateInboundShipmentItemsSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementInboundShipmentItemsRecord): ZodObject<{
  inboundShipment: ZodOptional<ZodOptional<ZodString>>;
  product: ZodOptional<ZodOptional<ZodString>>;
  expectedQuantity: ZodOptional<ZodNumber>;
  receivedQuantity: ZodOptional<ZodOptional<ZodNumber>>;
  discrepancyNotes: ZodOptional<ZodOptional<ZodUnknown>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementInboundShipmentItemsRecord`](../../../lib/pb.types.md#warehousemanagementinboundshipmentitemsrecord)

#### Returns

`ZodObject`\<\{
  `inboundShipment`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `product`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `expectedQuantity`: `ZodOptional`\<`ZodNumber`\>;
  `receivedQuantity`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `discrepancyNotes`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
\}, `$strip`\>
