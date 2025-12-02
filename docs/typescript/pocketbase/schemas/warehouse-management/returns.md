# pocketbase/schemas/warehouse-management/returns

## Type Aliases

### Returns

```ts
type Returns = z.infer<typeof ReturnsSchema>;
```

## Variables

### ReturnsSchema

```ts
const ReturnsSchema: ZodObject<{
  id: ZodString;
  returnNumber: ZodOptional<ZodString>;
  salesOrder: ZodOptional<ZodString>;
  client: ZodOptional<ZodString>;
  status: ZodEnum<{
     requested: "requested";
     approved: "approved";
     rejected: "rejected";
     received: "received";
     processed: "processed";
  }>;
  reason: ZodOptional<ZodUnknown>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
  items: ZodArray<ZodString>;
}, $strip>;
```

## Functions

### CreateReturnsSchema()

```ts
function CreateReturnsSchema(pocketbase: TypedPocketBase): ZodObject<{
  returnNumber: ZodOptional<ZodString>;
  salesOrder: ZodOptional<ZodString>;
  client: ZodOptional<ZodString>;
  status: ZodEnum<{
     requested: "requested";
     approved: "approved";
     rejected: "rejected";
     received: "received";
     processed: "processed";
  }>;
  reason: ZodOptional<ZodUnknown>;
  items: ZodArray<ZodObject<{
     return: ZodString;
     product: ZodString;
     quantityExpected: ZodOptional<ZodNumber>;
     quantityReceived: ZodOptional<ZodNumber>;
     condition: ZodOptional<ZodEnum<{
        expired: "expired";
        damaged: "damaged";
        sellable: "sellable";
        defective: "defective";
        unsellable: "unsellable";
     }>>;
  }, $strip>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `returnNumber`: `ZodOptional`\<`ZodString`\>;
  `salesOrder`: `ZodOptional`\<`ZodString`\>;
  `client`: `ZodOptional`\<`ZodString`\>;
  `status`: `ZodEnum`\<\{
     `requested`: `"requested"`;
     `approved`: `"approved"`;
     `rejected`: `"rejected"`;
     `received`: `"received"`;
     `processed`: `"processed"`;
  \}\>;
  `reason`: `ZodOptional`\<`ZodUnknown`\>;
  `items`: `ZodArray`\<`ZodObject`\<\{
     `return`: `ZodString`;
     `product`: `ZodString`;
     `quantityExpected`: `ZodOptional`\<`ZodNumber`\>;
     `quantityReceived`: `ZodOptional`\<`ZodNumber`\>;
     `condition`: `ZodOptional`\<`ZodEnum`\<\{
        `expired`: `"expired"`;
        `damaged`: `"damaged"`;
        `sellable`: `"sellable"`;
        `defective`: `"defective"`;
        `unsellable`: `"unsellable"`;
     \}\>\>;
  \}, `$strip`\>\>;
\}, `$strip`\>

***

### UpdateReturnsSchema()

```ts
function UpdateReturnsSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementReturnsRecord): ZodObject<{
  returnNumber: ZodOptional<ZodOptional<ZodString>>;
  salesOrder: ZodOptional<ZodOptional<ZodString>>;
  client: ZodOptional<ZodOptional<ZodString>>;
  status: ZodOptional<ZodEnum<{
     requested: "requested";
     approved: "approved";
     rejected: "rejected";
     received: "received";
     processed: "processed";
  }>>;
  reason: ZodOptional<ZodOptional<ZodUnknown>>;
  items: ZodOptional<ZodArray<ZodString>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementReturnsRecord`](../../../lib/pb.types.md#warehousemanagementreturnsrecord)

#### Returns

`ZodObject`\<\{
  `returnNumber`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `salesOrder`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `client`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `status`: `ZodOptional`\<`ZodEnum`\<\{
     `requested`: `"requested"`;
     `approved`: `"approved"`;
     `rejected`: `"rejected"`;
     `received`: `"received"`;
     `processed`: `"processed"`;
  \}\>\>;
  `reason`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
  `items`: `ZodOptional`\<`ZodArray`\<`ZodString`\>\>;
\}, `$strip`\>
