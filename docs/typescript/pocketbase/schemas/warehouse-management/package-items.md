# pocketbase/schemas/warehouse-management/package-items

## Type Aliases

### PackageItems

```ts
type PackageItems = z.infer<typeof PackageItemsSchema>;
```

## Variables

### PackageItemsSchema

```ts
const PackageItemsSchema: ZodObject<{
  id: ZodString;
  package: ZodString;
  product: ZodString;
  batch: ZodOptional<ZodString>;
  quantity: ZodNumber;
  lotNumber: ZodOptional<ZodString>;
  expiryDate: ZodOptional<ZodDate>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreatePackageItemsSchema()

```ts
function CreatePackageItemsSchema(pocketbase: TypedPocketBase): ZodObject<{
  package: ZodString;
  product: ZodString;
  batch: ZodOptional<ZodString>;
  quantity: ZodNumber;
  lotNumber: ZodOptional<ZodString>;
  expiryDate: ZodOptional<ZodDate>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `package`: `ZodString`;
  `product`: `ZodString`;
  `batch`: `ZodOptional`\<`ZodString`\>;
  `quantity`: `ZodNumber`;
  `lotNumber`: `ZodOptional`\<`ZodString`\>;
  `expiryDate`: `ZodOptional`\<`ZodDate`\>;
\}, `$strip`\>

***

### UpdatePackageItemsSchema()

```ts
function UpdatePackageItemsSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementPackageItemsRecord): ZodObject<{
  package: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  batch: ZodOptional<ZodOptional<ZodString>>;
  quantity: ZodOptional<ZodNumber>;
  lotNumber: ZodOptional<ZodOptional<ZodString>>;
  expiryDate: ZodOptional<ZodOptional<ZodDate>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementPackageItemsRecord`](../../../lib/pb.types.md#warehousemanagementpackageitemsrecord)

#### Returns

`ZodObject`\<\{
  `package`: `ZodOptional`\<`ZodString`\>;
  `product`: `ZodOptional`\<`ZodString`\>;
  `batch`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `quantity`: `ZodOptional`\<`ZodNumber`\>;
  `lotNumber`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `expiryDate`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
\}, `$strip`\>
