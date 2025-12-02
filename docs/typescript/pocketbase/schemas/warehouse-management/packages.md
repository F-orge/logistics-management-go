# pocketbase/schemas/warehouse-management/packages

## Type Aliases

### Packages

```ts
type Packages = z.infer<typeof PackagesSchema>;
```

## Variables

### PackagesSchema

```ts
const PackagesSchema: ZodObject<{
  id: ZodString;
  salesOrder: ZodString;
  packageNumber: ZodString;
  warehouse: ZodString;
  type: ZodOptional<ZodString>;
  weight: ZodOptional<ZodNumber>;
  length: ZodOptional<ZodNumber>;
  width: ZodOptional<ZodNumber>;
  height: ZodOptional<ZodNumber>;
  packedByUser: ZodOptional<ZodString>;
  packedAt: ZodOptional<ZodDate>;
  shippedAt: ZodOptional<ZodDate>;
  isFragile: ZodOptional<ZodUnknown>;
  isHazmat: ZodOptional<ZodUnknown>;
  requireSignature: ZodOptional<ZodUnknown>;
  insuranceValue: ZodOptional<ZodNumber>;
  images: ZodOptional<ZodArray<ZodFile>>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
  items: ZodArray<ZodString>;
}, $strip>;
```

## Functions

### CreatePackagesSchema()

```ts
function CreatePackagesSchema(pocketbase: TypedPocketBase): ZodObject<{
  salesOrder: ZodString;
  packageNumber: ZodString;
  warehouse: ZodString;
  type: ZodOptional<ZodString>;
  weight: ZodOptional<ZodNumber>;
  length: ZodOptional<ZodNumber>;
  width: ZodOptional<ZodNumber>;
  height: ZodOptional<ZodNumber>;
  packedByUser: ZodOptional<ZodString>;
  packedAt: ZodOptional<ZodDate>;
  shippedAt: ZodOptional<ZodDate>;
  isFragile: ZodOptional<ZodUnknown>;
  isHazmat: ZodOptional<ZodUnknown>;
  requireSignature: ZodOptional<ZodUnknown>;
  insuranceValue: ZodOptional<ZodNumber>;
  images: ZodOptional<ZodArray<ZodFile>>;
  items: ZodArray<ZodObject<{
     package: ZodString;
     product: ZodString;
     batch: ZodOptional<ZodString>;
     quantity: ZodNumber;
     lotNumber: ZodOptional<ZodString>;
     expiryDate: ZodOptional<ZodDate>;
  }, $strip>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `salesOrder`: `ZodString`;
  `packageNumber`: `ZodString`;
  `warehouse`: `ZodString`;
  `type`: `ZodOptional`\<`ZodString`\>;
  `weight`: `ZodOptional`\<`ZodNumber`\>;
  `length`: `ZodOptional`\<`ZodNumber`\>;
  `width`: `ZodOptional`\<`ZodNumber`\>;
  `height`: `ZodOptional`\<`ZodNumber`\>;
  `packedByUser`: `ZodOptional`\<`ZodString`\>;
  `packedAt`: `ZodOptional`\<`ZodDate`\>;
  `shippedAt`: `ZodOptional`\<`ZodDate`\>;
  `isFragile`: `ZodOptional`\<`ZodUnknown`\>;
  `isHazmat`: `ZodOptional`\<`ZodUnknown`\>;
  `requireSignature`: `ZodOptional`\<`ZodUnknown`\>;
  `insuranceValue`: `ZodOptional`\<`ZodNumber`\>;
  `images`: `ZodOptional`\<`ZodArray`\<`ZodFile`\>\>;
  `items`: `ZodArray`\<`ZodObject`\<\{
     `package`: `ZodString`;
     `product`: `ZodString`;
     `batch`: `ZodOptional`\<`ZodString`\>;
     `quantity`: `ZodNumber`;
     `lotNumber`: `ZodOptional`\<`ZodString`\>;
     `expiryDate`: `ZodOptional`\<`ZodDate`\>;
  \}, `$strip`\>\>;
\}, `$strip`\>

***

### UpdatePackagesSchema()

```ts
function UpdatePackagesSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementPackagesRecord): ZodObject<{
  salesOrder: ZodOptional<ZodString>;
  packageNumber: ZodOptional<ZodString>;
  warehouse: ZodOptional<ZodString>;
  type: ZodOptional<ZodOptional<ZodString>>;
  weight: ZodOptional<ZodOptional<ZodNumber>>;
  length: ZodOptional<ZodOptional<ZodNumber>>;
  width: ZodOptional<ZodOptional<ZodNumber>>;
  height: ZodOptional<ZodOptional<ZodNumber>>;
  packedByUser: ZodOptional<ZodOptional<ZodString>>;
  packedAt: ZodOptional<ZodOptional<ZodDate>>;
  shippedAt: ZodOptional<ZodOptional<ZodDate>>;
  isFragile: ZodOptional<ZodOptional<ZodUnknown>>;
  isHazmat: ZodOptional<ZodOptional<ZodUnknown>>;
  requireSignature: ZodOptional<ZodOptional<ZodUnknown>>;
  insuranceValue: ZodOptional<ZodOptional<ZodNumber>>;
  images: ZodOptional<ZodOptional<ZodArray<ZodFile>>>;
  items: ZodOptional<ZodArray<ZodString>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementPackagesRecord`](../../../lib/pb.types.md#warehousemanagementpackagesrecord)

#### Returns

`ZodObject`\<\{
  `salesOrder`: `ZodOptional`\<`ZodString`\>;
  `packageNumber`: `ZodOptional`\<`ZodString`\>;
  `warehouse`: `ZodOptional`\<`ZodString`\>;
  `type`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `weight`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `length`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `width`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `height`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `packedByUser`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `packedAt`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
  `shippedAt`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
  `isFragile`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
  `isHazmat`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
  `requireSignature`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
  `insuranceValue`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `images`: `ZodOptional`\<`ZodOptional`\<`ZodArray`\<`ZodFile`\>\>\>;
  `items`: `ZodOptional`\<`ZodArray`\<`ZodString`\>\>;
\}, `$strip`\>
