# pocketbase/schemas/customer-relations/invoice-items

## Type Aliases

### InvoiceItems

```ts
type InvoiceItems = z.infer<typeof InvoiceItemsSchema>;
```

## Variables

### InvoiceItemsSchema

```ts
const InvoiceItemsSchema: ZodObject<{
  id: ZodString;
  invoice: ZodString;
  product: ZodString;
  quantity: ZodNumber;
  price: ZodNumber;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateInvoiceItemsSchema()

```ts
function CreateInvoiceItemsSchema(pocketbase: TypedPocketBase): ZodObject<{
  product: ZodString;
  quantity: ZodNumber;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `product`: `ZodString`;
  `quantity`: `ZodNumber`;
\}, `$strip`\>

***

### UpdateInvoiceItemsSchema()

```ts
function UpdateInvoiceItemsSchema(pocketbase: TypedPocketBase, record?: CustomerRelationsInvoiceItemsRecord): ZodObject<{
  product: ZodOptional<ZodString>;
  quantity: ZodOptional<ZodNumber>;
  price: ZodOptional<ZodNumber>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`CustomerRelationsInvoiceItemsRecord`](../../../lib/pb.types.md#customerrelationsinvoiceitemsrecord)

#### Returns

`ZodObject`\<\{
  `product`: `ZodOptional`\<`ZodString`\>;
  `quantity`: `ZodOptional`\<`ZodNumber`\>;
  `price`: `ZodOptional`\<`ZodNumber`\>;
\}, `$strip`\>
