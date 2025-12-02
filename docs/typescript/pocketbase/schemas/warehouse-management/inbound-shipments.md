# pocketbase/schemas/warehouse-management/inbound-shipments

## Type Aliases

### InboundShipments

```ts
type InboundShipments = z.infer<typeof InboundShipmentsSchema>;
```

## Variables

### InboundShipmentsSchema

```ts
const InboundShipmentsSchema: ZodObject<{
  id: ZodString;
  client: ZodString;
  status: ZodOptional<ZodEnum<{
     cancelled: "cancelled";
     pending: "pending";
     arrived: "arrived";
     processing: "processing";
     completed: "completed";
  }>>;
  expectedArrivalDate: ZodOptional<ZodDate>;
  actualArrivalDate: ZodOptional<ZodDate>;
  warehouse: ZodString;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
  items: ZodOptional<ZodArray<ZodString>>;
}, $strip>;
```

## Functions

### CreateInboundShipmentsSchema()

```ts
function CreateInboundShipmentsSchema(pocketbase: TypedPocketBase): ZodObject<{
  client: ZodString;
  status: ZodOptional<ZodEnum<{
     cancelled: "cancelled";
     pending: "pending";
     arrived: "arrived";
     processing: "processing";
     completed: "completed";
  }>>;
  expectedArrivalDate: ZodOptional<ZodDate>;
  actualArrivalDate: ZodOptional<ZodDate>;
  warehouse: ZodString;
  items: ZodArray<ZodObject<{
     inboundShipment: ZodOptional<ZodString>;
     product: ZodOptional<ZodString>;
     expectedQuantity: ZodNumber;
     receivedQuantity: ZodOptional<ZodNumber>;
     discrepancyNotes: ZodOptional<ZodUnknown>;
  }, $strip>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `client`: `ZodString`;
  `status`: `ZodOptional`\<`ZodEnum`\<\{
     `cancelled`: `"cancelled"`;
     `pending`: `"pending"`;
     `arrived`: `"arrived"`;
     `processing`: `"processing"`;
     `completed`: `"completed"`;
  \}\>\>;
  `expectedArrivalDate`: `ZodOptional`\<`ZodDate`\>;
  `actualArrivalDate`: `ZodOptional`\<`ZodDate`\>;
  `warehouse`: `ZodString`;
  `items`: `ZodArray`\<`ZodObject`\<\{
     `inboundShipment`: `ZodOptional`\<`ZodString`\>;
     `product`: `ZodOptional`\<`ZodString`\>;
     `expectedQuantity`: `ZodNumber`;
     `receivedQuantity`: `ZodOptional`\<`ZodNumber`\>;
     `discrepancyNotes`: `ZodOptional`\<`ZodUnknown`\>;
  \}, `$strip`\>\>;
\}, `$strip`\>

***

### UpdateInboundShipmentsSchema()

```ts
function UpdateInboundShipmentsSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementInboundShipmentsRecord): ZodObject<{
  client: ZodOptional<ZodString>;
  status: ZodOptional<ZodOptional<ZodEnum<{
     cancelled: "cancelled";
     pending: "pending";
     arrived: "arrived";
     processing: "processing";
     completed: "completed";
  }>>>;
  expectedArrivalDate: ZodOptional<ZodOptional<ZodDate>>;
  actualArrivalDate: ZodOptional<ZodOptional<ZodDate>>;
  warehouse: ZodOptional<ZodString>;
  items: ZodOptional<ZodArray<ZodObject<{
     inboundShipment: ZodOptional<ZodString>;
     product: ZodOptional<ZodString>;
     expectedQuantity: ZodNumber;
     receivedQuantity: ZodOptional<ZodNumber>;
     discrepancyNotes: ZodOptional<ZodUnknown>;
  }, $strip>>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementInboundShipmentsRecord`](../../../lib/pb.types.md#warehousemanagementinboundshipmentsrecord)

#### Returns

`ZodObject`\<\{
  `client`: `ZodOptional`\<`ZodString`\>;
  `status`: `ZodOptional`\<`ZodOptional`\<`ZodEnum`\<\{
     `cancelled`: `"cancelled"`;
     `pending`: `"pending"`;
     `arrived`: `"arrived"`;
     `processing`: `"processing"`;
     `completed`: `"completed"`;
  \}\>\>\>;
  `expectedArrivalDate`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
  `actualArrivalDate`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
  `warehouse`: `ZodOptional`\<`ZodString`\>;
  `items`: `ZodOptional`\<`ZodArray`\<`ZodObject`\<\{
     `inboundShipment`: `ZodOptional`\<`ZodString`\>;
     `product`: `ZodOptional`\<`ZodString`\>;
     `expectedQuantity`: `ZodNumber`;
     `receivedQuantity`: `ZodOptional`\<`ZodNumber`\>;
     `discrepancyNotes`: `ZodOptional`\<`ZodUnknown`\>;
  \}, `$strip`\>\>\>;
\}, `$strip`\>
