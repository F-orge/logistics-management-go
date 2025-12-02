# pocketbase/schemas/customer-relations/interactions

## Type Aliases

### Interactions

```ts
type Interactions = z.infer<typeof InteractionsSchema>;
```

## Variables

### InteractionsSchema

```ts
const InteractionsSchema: ZodObject<{
  id: ZodString;
  contact: ZodString;
  user: ZodString;
  case: ZodOptional<ZodString>;
  type: ZodOptional<ZodEnum<{
     text: "text";
     email: "email";
     call: "call";
     meeting: "meeting";
  }>>;
  outcome: ZodOptional<ZodString>;
  notes: ZodOptional<ZodString>;
  attachments: ZodOptional<ZodArray<ZodFile>>;
  interactionDate: ZodOptional<ZodDate>;
}, $strip>;
```

## Functions

### CreateInteractionsSchema()

```ts
function CreateInteractionsSchema(pocketbase: TypedPocketBase): ZodObject<{
  contact: ZodString;
  user: ZodString;
  case: ZodOptional<ZodString>;
  type: ZodOptional<ZodEnum<{
     text: "text";
     email: "email";
     call: "call";
     meeting: "meeting";
  }>>;
  outcome: ZodOptional<ZodString>;
  notes: ZodOptional<ZodString>;
  attachments: ZodOptional<ZodArray<ZodFile>>;
  interactionDate: ZodOptional<ZodDate>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `contact`: `ZodString`;
  `user`: `ZodString`;
  `case`: `ZodOptional`\<`ZodString`\>;
  `type`: `ZodOptional`\<`ZodEnum`\<\{
     `text`: `"text"`;
     `email`: `"email"`;
     `call`: `"call"`;
     `meeting`: `"meeting"`;
  \}\>\>;
  `outcome`: `ZodOptional`\<`ZodString`\>;
  `notes`: `ZodOptional`\<`ZodString`\>;
  `attachments`: `ZodOptional`\<`ZodArray`\<`ZodFile`\>\>;
  `interactionDate`: `ZodOptional`\<`ZodDate`\>;
\}, `$strip`\>

***

### UpdateInteractionsSchema()

```ts
function UpdateInteractionsSchema(pocketbase: TypedPocketBase, record?: CustomerRelationsInteractionsRecord): ZodObject<{
  contact: ZodOptional<ZodString>;
  user: ZodOptional<ZodString>;
  case: ZodOptional<ZodOptional<ZodString>>;
  type: ZodOptional<ZodOptional<ZodEnum<{
     text: "text";
     email: "email";
     call: "call";
     meeting: "meeting";
  }>>>;
  outcome: ZodOptional<ZodOptional<ZodString>>;
  notes: ZodOptional<ZodOptional<ZodString>>;
  interactionDate: ZodOptional<ZodOptional<ZodDate>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`CustomerRelationsInteractionsRecord`](../../../lib/pb.types.md#customerrelationsinteractionsrecord)

#### Returns

`ZodObject`\<\{
  `contact`: `ZodOptional`\<`ZodString`\>;
  `user`: `ZodOptional`\<`ZodString`\>;
  `case`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `type`: `ZodOptional`\<`ZodOptional`\<`ZodEnum`\<\{
     `text`: `"text"`;
     `email`: `"email"`;
     `call`: `"call"`;
     `meeting`: `"meeting"`;
  \}\>\>\>;
  `outcome`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `notes`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `interactionDate`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
\}, `$strip`\>
