# pocketbase/schemas/warehouse-management/sales-orders

## Type Aliases

### SalesOrders

```ts
type SalesOrders = z.infer<typeof SalesOrdersSchema>;
```

## Variables

### SalesOrdersSchema

```ts
const SalesOrdersSchema: ZodObject<{
  id: ZodString;
  shippingAddress: ZodOptional<ZodString>;
  client: ZodString;
  opportunity: ZodOptional<ZodString>;
  status: ZodEnum<{
     cancelled: "cancelled";
     pending: "pending";
     processing: "processing";
     completed: "completed";
     shipped: "shipped";
  }>;
  orderNumber: ZodString;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
  items: ZodArray<ZodString>;
}, $strip>;
```

## Functions

### CreateSalesOrdersSchema()

```ts
function CreateSalesOrdersSchema(pocketbase: TypedPocketBase): ZodObject<{
  shippingAddress: ZodOptional<ZodString>;
  client: ZodString;
  opportunity: ZodOptional<ZodString>;
  status: ZodEnum<{
     cancelled: "cancelled";
     pending: "pending";
     processing: "processing";
     completed: "completed";
     shipped: "shipped";
  }>;
  orderNumber: ZodString;
  items: ZodArray<ZodObject<{
     salesOrder: ZodOptional<ZodString>;
     product: ZodOptional<ZodString>;
     quantityOrdered: ZodNumber;
  }, $strip>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `shippingAddress`: `ZodOptional`\<`ZodString`\>;
  `client`: `ZodString`;
  `opportunity`: `ZodOptional`\<`ZodString`\>;
  `status`: `ZodEnum`\<\{
     `cancelled`: `"cancelled"`;
     `pending`: `"pending"`;
     `processing`: `"processing"`;
     `completed`: `"completed"`;
     `shipped`: `"shipped"`;
  \}\>;
  `orderNumber`: `ZodString`;
  `items`: `ZodArray`\<`ZodObject`\<\{
     `salesOrder`: `ZodOptional`\<`ZodString`\>;
     `product`: `ZodOptional`\<`ZodString`\>;
     `quantityOrdered`: `ZodNumber`;
  \}, `$strip`\>\>;
\}, `$strip`\>

***

### UpdateSalesOrdersSchema()

```ts
function UpdateSalesOrdersSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementSalesOrdersRecord): ZodObject<{
  shippingAddress: ZodOptional<ZodOptional<ZodString>>;
  client: ZodOptional<ZodString>;
  opportunity: ZodOptional<ZodOptional<ZodString>>;
  status: ZodOptional<ZodEnum<{
     cancelled: "cancelled";
     pending: "pending";
     processing: "processing";
     completed: "completed";
     shipped: "shipped";
  }>>;
  orderNumber: ZodOptional<ZodString>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementSalesOrdersRecord`](../../../lib/pb.types.md#warehousemanagementsalesordersrecord)

#### Returns

`ZodObject`\<\{
  `shippingAddress`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `client`: `ZodOptional`\<`ZodString`\>;
  `opportunity`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `status`: `ZodOptional`\<`ZodEnum`\<\{
     `cancelled`: `"cancelled"`;
     `pending`: `"pending"`;
     `processing`: `"processing"`;
     `completed`: `"completed"`;
     `shipped`: `"shipped"`;
  \}\>\>;
  `orderNumber`: `ZodOptional`\<`ZodString`\>;
\}, `$strip`\>
