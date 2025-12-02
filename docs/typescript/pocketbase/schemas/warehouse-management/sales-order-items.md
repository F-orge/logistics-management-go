# pocketbase/schemas/warehouse-management/sales-order-items

## Type Aliases

### SalesOrderItems

```ts
type SalesOrderItems = z.infer<typeof SalesOrderItemsSchema>;
```

## Variables

### SalesOrderItemsSchema

```ts
const SalesOrderItemsSchema: ZodObject<{
  id: ZodString;
  salesOrder: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  quantityOrdered: ZodNumber;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateSalesOrderItemsSchema()

```ts
function CreateSalesOrderItemsSchema(pocketbase: TypedPocketBase): ZodObject<{
  salesOrder: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  quantityOrdered: ZodNumber;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `salesOrder`: `ZodOptional`\<`ZodString`\>;
  `product`: `ZodOptional`\<`ZodString`\>;
  `quantityOrdered`: `ZodNumber`;
\}, `$strip`\>

***

### UpdateSalesOrderItemsSchema()

```ts
function UpdateSalesOrderItemsSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementSalesOrderItemsRecord): ZodObject<{
  salesOrder: ZodOptional<ZodOptional<ZodString>>;
  product: ZodOptional<ZodOptional<ZodString>>;
  quantityOrdered: ZodOptional<ZodNumber>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementSalesOrderItemsRecord`](../../../lib/pb.types.md#warehousemanagementsalesorderitemsrecord)

#### Returns

`ZodObject`\<\{
  `salesOrder`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `product`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `quantityOrdered`: `ZodOptional`\<`ZodNumber`\>;
\}, `$strip`\>
