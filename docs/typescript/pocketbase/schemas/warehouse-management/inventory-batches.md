# pocketbase/schemas/warehouse-management/inventory-batches

## Type Aliases

### InventoryBatches

```ts
type InventoryBatches = z.infer<typeof InventoryBatchesSchema>;
```

## Variables

### InventoryBatchesSchema

```ts
const InventoryBatchesSchema: ZodObject<{
  id: ZodString;
  product: ZodString;
  batchNumber: ZodString;
  expirationDate: ZodOptional<ZodDate>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateInventoryBatchesSchema()

```ts
function CreateInventoryBatchesSchema(pocketbase: TypedPocketBase): ZodObject<{
  product: ZodString;
  batchNumber: ZodString;
  expirationDate: ZodOptional<ZodDate>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `product`: `ZodString`;
  `batchNumber`: `ZodString`;
  `expirationDate`: `ZodOptional`\<`ZodDate`\>;
\}, `$strip`\>

***

### UpdateInventoryBatchesSchema()

```ts
function UpdateInventoryBatchesSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementInventoryBatchesRecord): ZodObject<{
  product: ZodOptional<ZodString>;
  batchNumber: ZodOptional<ZodString>;
  expirationDate: ZodOptional<ZodOptional<ZodDate>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementInventoryBatchesRecord`](../../../lib/pb.types.md#warehousemanagementinventorybatchesrecord)

#### Returns

`ZodObject`\<\{
  `product`: `ZodOptional`\<`ZodString`\>;
  `batchNumber`: `ZodOptional`\<`ZodString`\>;
  `expirationDate`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
\}, `$strip`\>
