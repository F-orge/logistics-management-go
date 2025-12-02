# pocketbase/schemas/warehouse-management/return-items

## Type Aliases

### ReturnItems

```ts
type ReturnItems = z.infer<typeof ReturnItemsSchema>;
```

## Variables

### ReturnItemsSchema

```ts
const ReturnItemsSchema: ZodObject<{
  id: ZodString;
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
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateReturnItemsSchema()

```ts
function CreateReturnItemsSchema(pocketbase: TypedPocketBase): ZodObject<{
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
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
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
\}, `$strip`\>

***

### UpdateReturnItemsSchema()

```ts
function UpdateReturnItemsSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementReturnItemsRecord): ZodObject<{
  return: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  quantityExpected: ZodOptional<ZodOptional<ZodNumber>>;
  quantityReceived: ZodOptional<ZodOptional<ZodNumber>>;
  condition: ZodOptional<ZodOptional<ZodEnum<{
     expired: "expired";
     damaged: "damaged";
     sellable: "sellable";
     defective: "defective";
     unsellable: "unsellable";
  }>>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementReturnItemsRecord`](../../../lib/pb.types.md#warehousemanagementreturnitemsrecord)

#### Returns

`ZodObject`\<\{
  `return`: `ZodOptional`\<`ZodString`\>;
  `product`: `ZodOptional`\<`ZodString`\>;
  `quantityExpected`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `quantityReceived`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `condition`: `ZodOptional`\<`ZodOptional`\<`ZodEnum`\<\{
     `expired`: `"expired"`;
     `damaged`: `"damaged"`;
     `sellable`: `"sellable"`;
     `defective`: `"defective"`;
     `unsellable`: `"unsellable"`;
  \}\>\>\>;
\}, `$strip`\>
