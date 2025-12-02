# pocketbase/schemas/warehouse-management/products

## Type Aliases

### Products

```ts
type Products = z.infer<typeof ProductsSchema>;
```

## Variables

### ProductsSchema

```ts
const ProductsSchema: ZodObject<{
  id: ZodString;
  sku: ZodString;
  name: ZodString;
  barcode: ZodOptional<ZodString>;
  description: ZodOptional<ZodString>;
  category: ZodOptional<ZodString>;
  price: ZodOptional<ZodNumber>;
  unit: ZodOptional<ZodString>;
  weight: ZodOptional<ZodNumber>;
  length: ZodOptional<ZodNumber>;
  width: ZodOptional<ZodNumber>;
  height: ZodOptional<ZodNumber>;
  status: ZodOptional<ZodEnum<{
     active: "active";
     discontinued: "discontinued";
     obsolete: "obsolete";
  }>>;
  supplier: ZodOptional<ZodString>;
  client: ZodOptional<ZodString>;
  images: ZodOptional<ZodArray<ZodString>>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateProductsSchema()

```ts
function CreateProductsSchema(pocketbase: TypedPocketBase): ZodObject<{
  sku: ZodString;
  name: ZodString;
  barcode: ZodOptional<ZodString>;
  description: ZodOptional<ZodString>;
  category: ZodOptional<ZodString>;
  price: ZodOptional<ZodNumber>;
  unit: ZodOptional<ZodString>;
  weight: ZodOptional<ZodNumber>;
  length: ZodOptional<ZodNumber>;
  width: ZodOptional<ZodNumber>;
  height: ZodOptional<ZodNumber>;
  status: ZodOptional<ZodEnum<{
     active: "active";
     discontinued: "discontinued";
     obsolete: "obsolete";
  }>>;
  supplier: ZodOptional<ZodString>;
  client: ZodOptional<ZodString>;
  images: ZodOptional<ZodArray<ZodString>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `sku`: `ZodString`;
  `name`: `ZodString`;
  `barcode`: `ZodOptional`\<`ZodString`\>;
  `description`: `ZodOptional`\<`ZodString`\>;
  `category`: `ZodOptional`\<`ZodString`\>;
  `price`: `ZodOptional`\<`ZodNumber`\>;
  `unit`: `ZodOptional`\<`ZodString`\>;
  `weight`: `ZodOptional`\<`ZodNumber`\>;
  `length`: `ZodOptional`\<`ZodNumber`\>;
  `width`: `ZodOptional`\<`ZodNumber`\>;
  `height`: `ZodOptional`\<`ZodNumber`\>;
  `status`: `ZodOptional`\<`ZodEnum`\<\{
     `active`: `"active"`;
     `discontinued`: `"discontinued"`;
     `obsolete`: `"obsolete"`;
  \}\>\>;
  `supplier`: `ZodOptional`\<`ZodString`\>;
  `client`: `ZodOptional`\<`ZodString`\>;
  `images`: `ZodOptional`\<`ZodArray`\<`ZodString`\>\>;
\}, `$strip`\>

***

### UpdateProductsSchema()

```ts
function UpdateProductsSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementProductsRecord): ZodObject<{
  sku: ZodOptional<ZodString>;
  name: ZodOptional<ZodString>;
  barcode: ZodOptional<ZodOptional<ZodString>>;
  description: ZodOptional<ZodOptional<ZodString>>;
  category: ZodOptional<ZodOptional<ZodString>>;
  price: ZodOptional<ZodOptional<ZodNumber>>;
  unit: ZodOptional<ZodOptional<ZodString>>;
  weight: ZodOptional<ZodOptional<ZodNumber>>;
  length: ZodOptional<ZodOptional<ZodNumber>>;
  width: ZodOptional<ZodOptional<ZodNumber>>;
  height: ZodOptional<ZodOptional<ZodNumber>>;
  status: ZodOptional<ZodOptional<ZodEnum<{
     active: "active";
     discontinued: "discontinued";
     obsolete: "obsolete";
  }>>>;
  supplier: ZodOptional<ZodOptional<ZodString>>;
  client: ZodOptional<ZodOptional<ZodString>>;
  images: ZodOptional<ZodOptional<ZodArray<ZodString>>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementProductsRecord`](../../../lib/pb.types.md#warehousemanagementproductsrecord)

#### Returns

`ZodObject`\<\{
  `sku`: `ZodOptional`\<`ZodString`\>;
  `name`: `ZodOptional`\<`ZodString`\>;
  `barcode`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `description`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `category`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `price`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `unit`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `weight`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `length`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `width`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `height`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `status`: `ZodOptional`\<`ZodOptional`\<`ZodEnum`\<\{
     `active`: `"active"`;
     `discontinued`: `"discontinued"`;
     `obsolete`: `"obsolete"`;
  \}\>\>\>;
  `supplier`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `client`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `images`: `ZodOptional`\<`ZodOptional`\<`ZodArray`\<`ZodString`\>\>\>;
\}, `$strip`\>
