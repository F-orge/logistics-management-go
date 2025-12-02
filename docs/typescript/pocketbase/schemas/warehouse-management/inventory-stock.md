# pocketbase/schemas/warehouse-management/inventory-stock

## Type Aliases

### InventoryStock

```ts
type InventoryStock = z.infer<typeof InventoryStockSchema>;
```

## Variables

### InventoryStockSchema

```ts
const InventoryStockSchema: ZodObject<{
  id: ZodString;
  location: ZodString;
  product: ZodString;
  batch: ZodOptional<ZodString>;
  quantity: ZodOptional<ZodNumber>;
  reservedQuantity: ZodOptional<ZodNumber>;
  status: ZodEnum<{
     available: "available";
     expired: "expired";
     allocated: "allocated";
     damaged: "damaged";
     quarantine: "quarantine";
     hold: "hold";
     shipped: "shipped";
  }>;
  lastCountedAt: ZodOptional<ZodDate>;
  lastMovementAt: ZodOptional<ZodDate>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateInventoryStockSchema()

```ts
function CreateInventoryStockSchema(pocketbase: TypedPocketBase): ZodObject<{
  location: ZodString;
  product: ZodString;
  batch: ZodOptional<ZodString>;
  quantity: ZodOptional<ZodNumber>;
  reservedQuantity: ZodOptional<ZodNumber>;
  status: ZodEnum<{
     available: "available";
     expired: "expired";
     allocated: "allocated";
     damaged: "damaged";
     quarantine: "quarantine";
     hold: "hold";
     shipped: "shipped";
  }>;
  lastCountedAt: ZodOptional<ZodDate>;
  lastMovementAt: ZodOptional<ZodDate>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `location`: `ZodString`;
  `product`: `ZodString`;
  `batch`: `ZodOptional`\<`ZodString`\>;
  `quantity`: `ZodOptional`\<`ZodNumber`\>;
  `reservedQuantity`: `ZodOptional`\<`ZodNumber`\>;
  `status`: `ZodEnum`\<\{
     `available`: `"available"`;
     `expired`: `"expired"`;
     `allocated`: `"allocated"`;
     `damaged`: `"damaged"`;
     `quarantine`: `"quarantine"`;
     `hold`: `"hold"`;
     `shipped`: `"shipped"`;
  \}\>;
  `lastCountedAt`: `ZodOptional`\<`ZodDate`\>;
  `lastMovementAt`: `ZodOptional`\<`ZodDate`\>;
\}, `$strip`\>

***

### UpdateInventoryStockSchema()

```ts
function UpdateInventoryStockSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementInventoryStockRecord): ZodObject<{
  location: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  batch: ZodOptional<ZodOptional<ZodString>>;
  quantity: ZodOptional<ZodOptional<ZodNumber>>;
  reservedQuantity: ZodOptional<ZodOptional<ZodNumber>>;
  status: ZodOptional<ZodEnum<{
     available: "available";
     expired: "expired";
     allocated: "allocated";
     damaged: "damaged";
     quarantine: "quarantine";
     hold: "hold";
     shipped: "shipped";
  }>>;
  lastCountedAt: ZodOptional<ZodOptional<ZodDate>>;
  lastMovementAt: ZodOptional<ZodOptional<ZodDate>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementInventoryStockRecord`](../../../lib/pb.types.md#warehousemanagementinventorystockrecord)

#### Returns

`ZodObject`\<\{
  `location`: `ZodOptional`\<`ZodString`\>;
  `product`: `ZodOptional`\<`ZodString`\>;
  `batch`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `quantity`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `reservedQuantity`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `status`: `ZodOptional`\<`ZodEnum`\<\{
     `available`: `"available"`;
     `expired`: `"expired"`;
     `allocated`: `"allocated"`;
     `damaged`: `"damaged"`;
     `quarantine`: `"quarantine"`;
     `hold`: `"hold"`;
     `shipped`: `"shipped"`;
  \}\>\>;
  `lastCountedAt`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
  `lastMovementAt`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
\}, `$strip`\>
