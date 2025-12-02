# pocketbase/schemas/customer-relations/campaigns

## Type Aliases

### Campaigns

```ts
type Campaigns = z.infer<typeof CampaignsSchema>;
```

## Variables

### CampaignsSchema

```ts
const CampaignsSchema: ZodObject<{
  id: ZodString;
  name: ZodString;
  budget: ZodNumber;
  startDate: ZodOptional<ZodDate>;
  endDate: ZodOptional<ZodDate>;
  attachments: ZodOptional<ZodArray<ZodFile>>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateCampaignsSchema()

```ts
function CreateCampaignsSchema(pocketbase: TypedPocketBase): ZodObject<{
  name: ZodString;
  budget: ZodNumber;
  startDate: ZodOptional<ZodDate>;
  endDate: ZodOptional<ZodDate>;
  attachments: ZodOptional<ZodArray<ZodFile>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `name`: `ZodString`;
  `budget`: `ZodNumber`;
  `startDate`: `ZodOptional`\<`ZodDate`\>;
  `endDate`: `ZodOptional`\<`ZodDate`\>;
  `attachments`: `ZodOptional`\<`ZodArray`\<`ZodFile`\>\>;
\}, `$strip`\>

***

### UpdateCampaignsSchema()

```ts
function UpdateCampaignsSchema(pocketbase: TypedPocketBase, record?: CustomerRelationsCampaignsRecord): ZodObject<{
  name: ZodOptional<ZodString>;
  budget: ZodOptional<ZodNumber>;
  startDate: ZodOptional<ZodOptional<ZodDate>>;
  endDate: ZodOptional<ZodOptional<ZodDate>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`CustomerRelationsCampaignsRecord`](../../../lib/pb.types.md#customerrelationscampaignsrecord)

#### Returns

`ZodObject`\<\{
  `name`: `ZodOptional`\<`ZodString`\>;
  `budget`: `ZodOptional`\<`ZodNumber`\>;
  `startDate`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
  `endDate`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
\}, `$strip`\>
