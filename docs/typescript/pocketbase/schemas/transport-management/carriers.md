# pocketbase/schemas/transport-management/carriers

## Type Aliases

### Carriers

```ts
type Carriers = z.infer<typeof CarriersSchema>;
```

## Variables

### CarriersSchema

```ts
const CarriersSchema: ZodObject<{
  id: ZodString;
  name: ZodString;
  contactDetails: ZodOptional<ZodUnknown>;
  serviceOffered: ZodOptional<ZodUnknown>;
  image: ZodOptional<ZodFile>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateCarriersSchema()

```ts
function CreateCarriersSchema(pocketbase: TypedPocketBase): ZodObject<{
  name: ZodString;
  contactDetails: ZodOptional<ZodUnknown>;
  serviceOffered: ZodOptional<ZodUnknown>;
  image: ZodOptional<ZodFile>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `name`: `ZodString`;
  `contactDetails`: `ZodOptional`\<`ZodUnknown`\>;
  `serviceOffered`: `ZodOptional`\<`ZodUnknown`\>;
  `image`: `ZodOptional`\<`ZodFile`\>;
\}, `$strip`\>

***

### UpdateCarriersSchema()

```ts
function UpdateCarriersSchema(pocketbase: TypedPocketBase, record?: TransportManagementCarriersRecord): ZodObject<{
  name: ZodOptional<ZodString>;
  contactDetails: ZodOptional<ZodOptional<ZodUnknown>>;
  serviceOffered: ZodOptional<ZodOptional<ZodUnknown>>;
  image: ZodOptional<ZodOptional<ZodFile>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`TransportManagementCarriersRecord`](../../../lib/pb.types.md#transportmanagementcarriersrecord)

#### Returns

`ZodObject`\<\{
  `name`: `ZodOptional`\<`ZodString`\>;
  `contactDetails`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
  `serviceOffered`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
  `image`: `ZodOptional`\<`ZodOptional`\<`ZodFile`\>\>;
\}, `$strip`\>
