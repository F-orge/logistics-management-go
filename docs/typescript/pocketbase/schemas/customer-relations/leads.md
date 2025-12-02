# pocketbase/schemas/customer-relations/leads

## Type Aliases

### Leads

```ts
type Leads = z.infer<typeof LeadsSchema>;
```

## Variables

### LeadsSchema

```ts
const LeadsSchema: ZodObject<{
  id: ZodString;
  name: ZodString;
  email: ZodOptional<ZodString>;
  source: ZodEnum<{
     website: "website";
     other: "other";
     referral: "referral";
     social-media: "social-media";
     email-campaign: "email-campaign";
     cold-call: "cold-call";
     event: "event";
     advertisment: "advertisment";
     partner: "partner";
  }>;
  status: ZodOptional<ZodEnum<{
     new: "new";
     contacted: "contacted";
     qualified: "qualified";
     unqualified: "unqualified";
     converted: "converted";
  }>>;
  score: ZodNumber;
  owner: ZodString;
  campaign: ZodOptional<ZodString>;
  convertedAt: ZodOptional<ZodDate>;
  convertedContact: ZodOptional<ZodString>;
  convertedCompany: ZodOptional<ZodString>;
  convertedOpportunity: ZodOptional<ZodString>;
  attachments: ZodOptional<ZodArray<ZodFile>>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateLeadsSchema()

```ts
function CreateLeadsSchema(pocketbase: TypedPocketBase): ZodObject<{
  name: ZodString;
  email: ZodOptional<ZodString>;
  source: ZodEnum<{
     website: "website";
     other: "other";
     referral: "referral";
     social-media: "social-media";
     email-campaign: "email-campaign";
     cold-call: "cold-call";
     event: "event";
     advertisment: "advertisment";
     partner: "partner";
  }>;
  status: ZodOptional<ZodEnum<{
     new: "new";
     contacted: "contacted";
     qualified: "qualified";
     unqualified: "unqualified";
     converted: "converted";
  }>>;
  score: ZodNumber;
  owner: ZodString;
  campaign: ZodOptional<ZodString>;
  convertedAt: ZodOptional<ZodDate>;
  convertedContact: ZodOptional<ZodString>;
  convertedCompany: ZodOptional<ZodString>;
  convertedOpportunity: ZodOptional<ZodString>;
  attachments: ZodOptional<ZodArray<ZodFile>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `name`: `ZodString`;
  `email`: `ZodOptional`\<`ZodString`\>;
  `source`: `ZodEnum`\<\{
     `website`: `"website"`;
     `other`: `"other"`;
     `referral`: `"referral"`;
     `social-media`: `"social-media"`;
     `email-campaign`: `"email-campaign"`;
     `cold-call`: `"cold-call"`;
     `event`: `"event"`;
     `advertisment`: `"advertisment"`;
     `partner`: `"partner"`;
  \}\>;
  `status`: `ZodOptional`\<`ZodEnum`\<\{
     `new`: `"new"`;
     `contacted`: `"contacted"`;
     `qualified`: `"qualified"`;
     `unqualified`: `"unqualified"`;
     `converted`: `"converted"`;
  \}\>\>;
  `score`: `ZodNumber`;
  `owner`: `ZodString`;
  `campaign`: `ZodOptional`\<`ZodString`\>;
  `convertedAt`: `ZodOptional`\<`ZodDate`\>;
  `convertedContact`: `ZodOptional`\<`ZodString`\>;
  `convertedCompany`: `ZodOptional`\<`ZodString`\>;
  `convertedOpportunity`: `ZodOptional`\<`ZodString`\>;
  `attachments`: `ZodOptional`\<`ZodArray`\<`ZodFile`\>\>;
\}, `$strip`\>

***

### UpdateLeadsSchema()

```ts
function UpdateLeadsSchema(pocketbase: TypedPocketBase, record?: CustomerRelationsLeadsRecord): ZodObject<{
  name: ZodOptional<ZodString>;
  email: ZodOptional<ZodOptional<ZodString>>;
  source: ZodOptional<ZodEnum<{
     website: "website";
     other: "other";
     referral: "referral";
     social-media: "social-media";
     email-campaign: "email-campaign";
     cold-call: "cold-call";
     event: "event";
     advertisment: "advertisment";
     partner: "partner";
  }>>;
  status: ZodOptional<ZodOptional<ZodEnum<{
     new: "new";
     contacted: "contacted";
     qualified: "qualified";
     unqualified: "unqualified";
     converted: "converted";
  }>>>;
  score: ZodOptional<ZodNumber>;
  owner: ZodOptional<ZodString>;
  campaign: ZodOptional<ZodOptional<ZodString>>;
  convertedAt: ZodOptional<ZodOptional<ZodDate>>;
  convertedContact: ZodOptional<ZodOptional<ZodString>>;
  convertedCompany: ZodOptional<ZodOptional<ZodString>>;
  convertedOpportunity: ZodOptional<ZodOptional<ZodString>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`CustomerRelationsLeadsRecord`](../../../lib/pb.types.md#customerrelationsleadsrecord)

#### Returns

`ZodObject`\<\{
  `name`: `ZodOptional`\<`ZodString`\>;
  `email`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `source`: `ZodOptional`\<`ZodEnum`\<\{
     `website`: `"website"`;
     `other`: `"other"`;
     `referral`: `"referral"`;
     `social-media`: `"social-media"`;
     `email-campaign`: `"email-campaign"`;
     `cold-call`: `"cold-call"`;
     `event`: `"event"`;
     `advertisment`: `"advertisment"`;
     `partner`: `"partner"`;
  \}\>\>;
  `status`: `ZodOptional`\<`ZodOptional`\<`ZodEnum`\<\{
     `new`: `"new"`;
     `contacted`: `"contacted"`;
     `qualified`: `"qualified"`;
     `unqualified`: `"unqualified"`;
     `converted`: `"converted"`;
  \}\>\>\>;
  `score`: `ZodOptional`\<`ZodNumber`\>;
  `owner`: `ZodOptional`\<`ZodString`\>;
  `campaign`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `convertedAt`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
  `convertedContact`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `convertedCompany`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `convertedOpportunity`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
\}, `$strip`\>
