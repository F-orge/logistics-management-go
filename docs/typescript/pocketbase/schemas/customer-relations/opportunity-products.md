# pocketbase/schemas/customer-relations/opportunity-products

## Type Aliases

### OpportunityProducts

```ts
type OpportunityProducts = z.infer<typeof OpportunityProductsSchema>;
```

## Variables

### OpportunityProductsSchema

```ts
const OpportunityProductsSchema: ZodObject<{
  id: ZodString;
  opportunity: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  quantity: ZodNumber;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateOpportunityProductsSchema()

```ts
function CreateOpportunityProductsSchema(pocketbase: TypedPocketBase): ZodObject<{
  product: ZodOptional<ZodString>;
  quantity: ZodNumber;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `product`: `ZodOptional`\<`ZodString`\>;
  `quantity`: `ZodNumber`;
\}, `$strip`\>

***

### UpdateOpportunityProductsSchema()

```ts
function UpdateOpportunityProductsSchema(pocketbase: TypedPocketBase, record?: CustomerRelationsOpportunityProductsRecord): ZodObject<{
  opportunity: ZodOptional<ZodOptional<ZodString>>;
  product: ZodOptional<ZodOptional<ZodString>>;
  quantity: ZodOptional<ZodNumber>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`CustomerRelationsOpportunityProductsRecord`](../../../lib/pb.types.md#customerrelationsopportunityproductsrecord)

#### Returns

`ZodObject`\<\{
  `opportunity`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `product`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `quantity`: `ZodOptional`\<`ZodNumber`\>;
\}, `$strip`\>
