# pocketbase/schemas/customer-relations/opportunities

## Type Aliases

### Opportunities

```ts
type Opportunities = z.infer<typeof OpportunitiesSchema>;
```

## Variables

### OpportunitiesSchema

```ts
const OpportunitiesSchema: ZodObject<{
  id: ZodString;
  name: ZodString;
  stage: ZodOptional<ZodEnum<{
     prospecting: "prospecting";
     qualification: "qualification";
     need-analysis: "need-analysis";
     demo: "demo";
     proposal: "proposal";
     negotiation: "negotiation";
     closed-won: "closed-won";
     closed-lost: "closed-lost";
  }>>;
  dealValue: ZodOptional<ZodNumber>;
  probability: ZodOptional<ZodNumber>;
  expectedCloseDate: ZodOptional<ZodDate>;
  lostReason: ZodOptional<ZodString>;
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
     existing-customer: "existing-customer";
  }>;
  owner: ZodString;
  contact: ZodOptional<ZodString>;
  company: ZodOptional<ZodString>;
  campaign: ZodOptional<ZodString>;
  products: ZodArray<ZodString>;
  attachments: ZodOptional<ZodArray<ZodFile>>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateOpportunitiesSchema()

```ts
function CreateOpportunitiesSchema(pocketbase: TypedPocketBase): ZodObject<{
  name: ZodString;
  stage: ZodOptional<ZodEnum<{
     prospecting: "prospecting";
     qualification: "qualification";
     need-analysis: "need-analysis";
     demo: "demo";
     proposal: "proposal";
     negotiation: "negotiation";
     closed-won: "closed-won";
     closed-lost: "closed-lost";
  }>>;
  dealValue: ZodOptional<ZodNumber>;
  probability: ZodOptional<ZodNumber>;
  expectedCloseDate: ZodOptional<ZodDate>;
  lostReason: ZodOptional<ZodString>;
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
     existing-customer: "existing-customer";
  }>;
  owner: ZodString;
  contact: ZodOptional<ZodString>;
  company: ZodOptional<ZodString>;
  campaign: ZodOptional<ZodString>;
  attachments: ZodOptional<ZodArray<ZodFile>>;
  products: ZodArray<ZodObject<{
     product: ZodOptional<ZodString>;
     quantity: ZodNumber;
  }, $strip>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `name`: `ZodString`;
  `stage`: `ZodOptional`\<`ZodEnum`\<\{
     `prospecting`: `"prospecting"`;
     `qualification`: `"qualification"`;
     `need-analysis`: `"need-analysis"`;
     `demo`: `"demo"`;
     `proposal`: `"proposal"`;
     `negotiation`: `"negotiation"`;
     `closed-won`: `"closed-won"`;
     `closed-lost`: `"closed-lost"`;
  \}\>\>;
  `dealValue`: `ZodOptional`\<`ZodNumber`\>;
  `probability`: `ZodOptional`\<`ZodNumber`\>;
  `expectedCloseDate`: `ZodOptional`\<`ZodDate`\>;
  `lostReason`: `ZodOptional`\<`ZodString`\>;
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
     `existing-customer`: `"existing-customer"`;
  \}\>;
  `owner`: `ZodString`;
  `contact`: `ZodOptional`\<`ZodString`\>;
  `company`: `ZodOptional`\<`ZodString`\>;
  `campaign`: `ZodOptional`\<`ZodString`\>;
  `attachments`: `ZodOptional`\<`ZodArray`\<`ZodFile`\>\>;
  `products`: `ZodArray`\<`ZodObject`\<\{
     `product`: `ZodOptional`\<`ZodString`\>;
     `quantity`: `ZodNumber`;
  \}, `$strip`\>\>;
\}, `$strip`\>

***

### UpdateOpportunitiesSchema()

```ts
function UpdateOpportunitiesSchema(pocketbase: TypedPocketBase, record?: CustomerRelationsOpportunitiesRecord): ZodObject<{
  name: ZodOptional<ZodString>;
  stage: ZodOptional<ZodOptional<ZodEnum<{
     prospecting: "prospecting";
     qualification: "qualification";
     need-analysis: "need-analysis";
     demo: "demo";
     proposal: "proposal";
     negotiation: "negotiation";
     closed-won: "closed-won";
     closed-lost: "closed-lost";
  }>>>;
  dealValue: ZodOptional<ZodOptional<ZodNumber>>;
  probability: ZodOptional<ZodOptional<ZodNumber>>;
  expectedCloseDate: ZodOptional<ZodOptional<ZodDate>>;
  lostReason: ZodOptional<ZodOptional<ZodString>>;
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
     existing-customer: "existing-customer";
  }>>;
  owner: ZodOptional<ZodString>;
  contact: ZodOptional<ZodOptional<ZodString>>;
  company: ZodOptional<ZodOptional<ZodString>>;
  campaign: ZodOptional<ZodOptional<ZodString>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`CustomerRelationsOpportunitiesRecord`](../../../lib/pb.types.md#customerrelationsopportunitiesrecord)

#### Returns

`ZodObject`\<\{
  `name`: `ZodOptional`\<`ZodString`\>;
  `stage`: `ZodOptional`\<`ZodOptional`\<`ZodEnum`\<\{
     `prospecting`: `"prospecting"`;
     `qualification`: `"qualification"`;
     `need-analysis`: `"need-analysis"`;
     `demo`: `"demo"`;
     `proposal`: `"proposal"`;
     `negotiation`: `"negotiation"`;
     `closed-won`: `"closed-won"`;
     `closed-lost`: `"closed-lost"`;
  \}\>\>\>;
  `dealValue`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `probability`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `expectedCloseDate`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
  `lostReason`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
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
     `existing-customer`: `"existing-customer"`;
  \}\>\>;
  `owner`: `ZodOptional`\<`ZodString`\>;
  `contact`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `company`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `campaign`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
\}, `$strip`\>
