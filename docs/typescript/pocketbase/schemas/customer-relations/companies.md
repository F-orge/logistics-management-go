# pocketbase/schemas/customer-relations/companies

## Type Aliases

### Companies

```ts
type Companies = z.infer<typeof CompaniesSchema>;
```

## Variables

### CompaniesSchema

```ts
const CompaniesSchema: ZodObject<{
  id: ZodString;
  name: ZodString;
  street: ZodOptional<ZodString>;
  city: ZodOptional<ZodString>;
  state: ZodOptional<ZodString>;
  postalCode: ZodOptional<ZodString>;
  country: ZodOptional<ZodString>;
  phoneNumber: ZodOptional<ZodString>;
  industry: ZodOptional<ZodString>;
  website: ZodOptional<ZodString>;
  annualRevenue: ZodOptional<ZodNumber>;
  owner: ZodOptional<ZodString>;
  attachments: ZodOptional<ZodArray<ZodUnion<readonly [ZodCustom<File, File>, ZodString]>>>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateCompaniesSchema()

```ts
function CreateCompaniesSchema(pocketbase: TypedPocketBase): ZodObject<{
  name: ZodString;
  street: ZodOptional<ZodString>;
  city: ZodOptional<ZodString>;
  state: ZodOptional<ZodString>;
  postalCode: ZodOptional<ZodString>;
  country: ZodOptional<ZodString>;
  phoneNumber: ZodOptional<ZodString>;
  industry: ZodOptional<ZodString>;
  website: ZodOptional<ZodString>;
  annualRevenue: ZodOptional<ZodNumber>;
  owner: ZodOptional<ZodString>;
  attachments: ZodOptional<ZodArray<ZodUnion<readonly [ZodCustom<File, File>, ZodString]>>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `name`: `ZodString`;
  `street`: `ZodOptional`\<`ZodString`\>;
  `city`: `ZodOptional`\<`ZodString`\>;
  `state`: `ZodOptional`\<`ZodString`\>;
  `postalCode`: `ZodOptional`\<`ZodString`\>;
  `country`: `ZodOptional`\<`ZodString`\>;
  `phoneNumber`: `ZodOptional`\<`ZodString`\>;
  `industry`: `ZodOptional`\<`ZodString`\>;
  `website`: `ZodOptional`\<`ZodString`\>;
  `annualRevenue`: `ZodOptional`\<`ZodNumber`\>;
  `owner`: `ZodOptional`\<`ZodString`\>;
  `attachments`: `ZodOptional`\<`ZodArray`\<`ZodUnion`\<readonly \[`ZodCustom`\<`File`, `File`\>, `ZodString`\]\>\>\>;
\}, `$strip`\>

***

### UpdateCompaniesSchema()

```ts
function UpdateCompaniesSchema(pocketbase: TypedPocketBase, record?: CustomerRelationsCompaniesRecord): ZodObject<{
  name: ZodOptional<ZodString>;
  street: ZodOptional<ZodOptional<ZodString>>;
  city: ZodOptional<ZodOptional<ZodString>>;
  state: ZodOptional<ZodOptional<ZodString>>;
  postalCode: ZodOptional<ZodOptional<ZodString>>;
  country: ZodOptional<ZodOptional<ZodString>>;
  phoneNumber: ZodOptional<ZodOptional<ZodString>>;
  industry: ZodOptional<ZodOptional<ZodString>>;
  website: ZodOptional<ZodOptional<ZodString>>;
  annualRevenue: ZodOptional<ZodOptional<ZodNumber>>;
  owner: ZodOptional<ZodOptional<ZodString>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`CustomerRelationsCompaniesRecord`](../../../lib/pb.types.md#customerrelationscompaniesrecord)

#### Returns

`ZodObject`\<\{
  `name`: `ZodOptional`\<`ZodString`\>;
  `street`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `city`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `state`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `postalCode`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `country`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `phoneNumber`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `industry`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `website`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `annualRevenue`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `owner`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
\}, `$strip`\>
