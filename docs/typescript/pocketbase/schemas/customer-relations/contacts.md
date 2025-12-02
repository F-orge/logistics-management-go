# pocketbase/schemas/customer-relations/contacts

## Type Aliases

### Contacts

```ts
type Contacts = z.infer<typeof ContactsSchema>;
```

## Variables

### ContactsSchema

```ts
const ContactsSchema: ZodObject<{
  id: ZodString;
  name: ZodString;
  email: ZodEmail;
  phoneNumber: ZodOptional<ZodString>;
  jobTitle: ZodOptional<ZodString>;
  company: ZodOptional<ZodString>;
  owner: ZodString;
  attachments: ZodOptional<ZodArray<ZodFile>>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateContactsSchema()

```ts
function CreateContactsSchema(pocketbase: TypedPocketBase): ZodObject<{
  name: ZodString;
  email: ZodEmail;
  phoneNumber: ZodOptional<ZodString>;
  jobTitle: ZodOptional<ZodString>;
  company: ZodOptional<ZodString>;
  owner: ZodString;
  attachments: ZodOptional<ZodArray<ZodFile>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `name`: `ZodString`;
  `email`: `ZodEmail`;
  `phoneNumber`: `ZodOptional`\<`ZodString`\>;
  `jobTitle`: `ZodOptional`\<`ZodString`\>;
  `company`: `ZodOptional`\<`ZodString`\>;
  `owner`: `ZodString`;
  `attachments`: `ZodOptional`\<`ZodArray`\<`ZodFile`\>\>;
\}, `$strip`\>

***

### UpdateContactsSchema()

```ts
function UpdateContactsSchema(pocketbase: TypedPocketBase, record?: CustomerRelationsContactsRecord): ZodObject<{
  name: ZodOptional<ZodString>;
  email: ZodOptional<ZodEmail>;
  phoneNumber: ZodOptional<ZodOptional<ZodString>>;
  jobTitle: ZodOptional<ZodOptional<ZodString>>;
  company: ZodOptional<ZodOptional<ZodString>>;
  owner: ZodOptional<ZodString>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`CustomerRelationsContactsRecord`](../../../lib/pb.types.md#customerrelationscontactsrecord)

#### Returns

`ZodObject`\<\{
  `name`: `ZodOptional`\<`ZodString`\>;
  `email`: `ZodOptional`\<`ZodEmail`\>;
  `phoneNumber`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `jobTitle`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `company`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `owner`: `ZodOptional`\<`ZodString`\>;
\}, `$strip`\>
