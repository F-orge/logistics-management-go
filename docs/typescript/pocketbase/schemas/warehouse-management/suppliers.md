# pocketbase/schemas/warehouse-management/suppliers

## Type Aliases

### Suppliers

```ts
type Suppliers = z.infer<typeof SuppliersSchema>;
```

## Variables

### SuppliersSchema

```ts
const SuppliersSchema: ZodObject<{
  id: ZodString;
  name: ZodString;
  contactPerson: ZodOptional<ZodString>;
  email: ZodOptional<ZodEmail>;
  phoneNumber: ZodOptional<ZodString>;
  client: ZodOptional<ZodString>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateSuppliersSchema()

```ts
function CreateSuppliersSchema(pocketbase: TypedPocketBase): ZodObject<{
  name: ZodString;
  contactPerson: ZodOptional<ZodString>;
  email: ZodOptional<ZodEmail>;
  phoneNumber: ZodOptional<ZodString>;
  client: ZodOptional<ZodString>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `name`: `ZodString`;
  `contactPerson`: `ZodOptional`\<`ZodString`\>;
  `email`: `ZodOptional`\<`ZodEmail`\>;
  `phoneNumber`: `ZodOptional`\<`ZodString`\>;
  `client`: `ZodOptional`\<`ZodString`\>;
\}, `$strip`\>

***

### UpdateSuppliersSchema()

```ts
function UpdateSuppliersSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementSuppliersRecord): ZodObject<{
  name: ZodOptional<ZodString>;
  contactPerson: ZodOptional<ZodOptional<ZodString>>;
  email: ZodOptional<ZodOptional<ZodEmail>>;
  phoneNumber: ZodOptional<ZodOptional<ZodString>>;
  client: ZodOptional<ZodOptional<ZodString>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementSuppliersRecord`](../../../lib/pb.types.md#warehousemanagementsuppliersrecord)

#### Returns

`ZodObject`\<\{
  `name`: `ZodOptional`\<`ZodString`\>;
  `contactPerson`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `email`: `ZodOptional`\<`ZodOptional`\<`ZodEmail`\>\>;
  `phoneNumber`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `client`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
\}, `$strip`\>
