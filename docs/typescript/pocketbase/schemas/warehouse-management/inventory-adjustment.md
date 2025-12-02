# pocketbase/schemas/warehouse-management/inventory-adjustment

## Type Aliases

### InventoryAdjustment

```ts
type InventoryAdjustment = z.infer<typeof InventoryAdjustmentSchema>;
```

## Variables

### InventoryAdjustmentSchema

```ts
const InventoryAdjustmentSchema: ZodObject<{
  id: ZodString;
  product: ZodString;
  user: ZodString;
  quantityChange: ZodNumber;
  reason: ZodEnum<{
     cycle-count: "cycle-count";
     damaged-goods: "damaged-goods";
     theft: "theft";
     expired: "expired";
     return-to-vendor: "return-to-vendor";
     manual-correction: "manual-correction";
  }>;
  notes: ZodOptional<ZodUnknown>;
  warehouse: ZodString;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateInventoryAdjustmentSchema()

```ts
function CreateInventoryAdjustmentSchema(pocketbase: TypedPocketBase): ZodObject<{
  product: ZodString;
  user: ZodString;
  quantityChange: ZodNumber;
  reason: ZodEnum<{
     cycle-count: "cycle-count";
     damaged-goods: "damaged-goods";
     theft: "theft";
     expired: "expired";
     return-to-vendor: "return-to-vendor";
     manual-correction: "manual-correction";
  }>;
  notes: ZodOptional<ZodUnknown>;
  warehouse: ZodString;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `product`: `ZodString`;
  `user`: `ZodString`;
  `quantityChange`: `ZodNumber`;
  `reason`: `ZodEnum`\<\{
     `cycle-count`: `"cycle-count"`;
     `damaged-goods`: `"damaged-goods"`;
     `theft`: `"theft"`;
     `expired`: `"expired"`;
     `return-to-vendor`: `"return-to-vendor"`;
     `manual-correction`: `"manual-correction"`;
  \}\>;
  `notes`: `ZodOptional`\<`ZodUnknown`\>;
  `warehouse`: `ZodString`;
\}, `$strip`\>

***

### UpdateInventoryAdjustmentSchema()

```ts
function UpdateInventoryAdjustmentSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementInventoryAdjustmentRecord): ZodObject<{
  product: ZodOptional<ZodString>;
  user: ZodOptional<ZodString>;
  quantityChange: ZodOptional<ZodNumber>;
  reason: ZodOptional<ZodEnum<{
     cycle-count: "cycle-count";
     damaged-goods: "damaged-goods";
     theft: "theft";
     expired: "expired";
     return-to-vendor: "return-to-vendor";
     manual-correction: "manual-correction";
  }>>;
  notes: ZodOptional<ZodOptional<ZodUnknown>>;
  warehouse: ZodOptional<ZodString>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementInventoryAdjustmentRecord`](../../../lib/pb.types.md#warehousemanagementinventoryadjustmentrecord)

#### Returns

`ZodObject`\<\{
  `product`: `ZodOptional`\<`ZodString`\>;
  `user`: `ZodOptional`\<`ZodString`\>;
  `quantityChange`: `ZodOptional`\<`ZodNumber`\>;
  `reason`: `ZodOptional`\<`ZodEnum`\<\{
     `cycle-count`: `"cycle-count"`;
     `damaged-goods`: `"damaged-goods"`;
     `theft`: `"theft"`;
     `expired`: `"expired"`;
     `return-to-vendor`: `"return-to-vendor"`;
     `manual-correction`: `"manual-correction"`;
  \}\>\>;
  `notes`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
  `warehouse`: `ZodOptional`\<`ZodString`\>;
\}, `$strip`\>
