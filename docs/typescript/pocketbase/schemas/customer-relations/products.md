# pocketbase/schemas/customer-relations/products

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
  name: ZodString;
  sku: ZodString;
  price: ZodNumber;
  type: ZodEnum<{
     service: "service";
     good: "good";
     digital: "digital";
     subscription: "subscription";
  }>;
  description: ZodOptional<ZodUnknown>;
  attachments: ZodOptional<ZodArray<ZodFile>>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateProductsSchema()

```ts
function CreateProductsSchema(pocketbase: TypedPocketBase): ZodObject<{
  name: ZodString;
  sku: ZodString;
  price: ZodNumber;
  type: ZodEnum<{
     service: "service";
     good: "good";
     digital: "digital";
     subscription: "subscription";
  }>;
  description: ZodOptional<ZodUnknown>;
  attachments: ZodOptional<ZodArray<ZodFile>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `name`: `ZodString`;
  `sku`: `ZodString`;
  `price`: `ZodNumber`;
  `type`: `ZodEnum`\<\{
     `service`: `"service"`;
     `good`: `"good"`;
     `digital`: `"digital"`;
     `subscription`: `"subscription"`;
  \}\>;
  `description`: `ZodOptional`\<`ZodUnknown`\>;
  `attachments`: `ZodOptional`\<`ZodArray`\<`ZodFile`\>\>;
\}, `$strip`\>

***

### UpdateProductsSchema()

```ts
function UpdateProductsSchema(pocketbase: TypedPocketBase, record?: CustomerRelationsProductsRecord): ZodObject<{
  name: ZodOptional<ZodString>;
  sku: ZodOptional<ZodString>;
  price: ZodOptional<ZodNumber>;
  type: ZodOptional<ZodEnum<{
     service: "service";
     good: "good";
     digital: "digital";
     subscription: "subscription";
  }>>;
  description: ZodOptional<ZodOptional<ZodUnknown>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`CustomerRelationsProductsRecord`](../../../lib/pb.types.md#customerrelationsproductsrecord)

#### Returns

`ZodObject`\<\{
  `name`: `ZodOptional`\<`ZodString`\>;
  `sku`: `ZodOptional`\<`ZodString`\>;
  `price`: `ZodOptional`\<`ZodNumber`\>;
  `type`: `ZodOptional`\<`ZodEnum`\<\{
     `service`: `"service"`;
     `good`: `"good"`;
     `digital`: `"digital"`;
     `subscription`: `"subscription"`;
  \}\>\>;
  `description`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
\}, `$strip`\>
