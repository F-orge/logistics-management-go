# pocketbase/schemas/customer-relations/cases

## Type Aliases

### Cases

```ts
type Cases = z.infer<typeof CasesSchema>;
```

## Variables

### CasesSchema

```ts
const CasesSchema: ZodObject<{
  id: ZodString;
  caseNumber: ZodString;
  status: ZodEnum<{
     new: "new";
     in-progress: "in-progress";
     waiting-for-customer: "waiting-for-customer";
     waiting-for-internal: "waiting-for-internal";
     escalated: "escalated";
     resolved: "resolved";
     closed: "closed";
     cancelled: "cancelled";
  }>;
  priority: ZodEnum<{
     critical: "critical";
     high: "high";
     medium: "medium";
     low: "low";
  }>;
  type: ZodEnum<{
     question: "question";
     problem: "problem";
     complaint: "complaint";
     feature-request: "feature-request";
     bug-report: "bug-report";
     technical-support: "technical-support";
  }>;
  owner: ZodString;
  contact: ZodOptional<ZodString>;
  description: ZodOptional<ZodUnknown>;
  attachments: ZodOptional<ZodArray<ZodFile>>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateCasesSchema()

```ts
function CreateCasesSchema(pocketbase: TypedPocketBase): ZodObject<{
  caseNumber: ZodString;
  status: ZodEnum<{
     new: "new";
     in-progress: "in-progress";
     waiting-for-customer: "waiting-for-customer";
     waiting-for-internal: "waiting-for-internal";
     escalated: "escalated";
     resolved: "resolved";
     closed: "closed";
     cancelled: "cancelled";
  }>;
  priority: ZodEnum<{
     critical: "critical";
     high: "high";
     medium: "medium";
     low: "low";
  }>;
  type: ZodEnum<{
     question: "question";
     problem: "problem";
     complaint: "complaint";
     feature-request: "feature-request";
     bug-report: "bug-report";
     technical-support: "technical-support";
  }>;
  owner: ZodString;
  contact: ZodOptional<ZodString>;
  description: ZodOptional<ZodUnknown>;
  attachments: ZodOptional<ZodArray<ZodFile>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `caseNumber`: `ZodString`;
  `status`: `ZodEnum`\<\{
     `new`: `"new"`;
     `in-progress`: `"in-progress"`;
     `waiting-for-customer`: `"waiting-for-customer"`;
     `waiting-for-internal`: `"waiting-for-internal"`;
     `escalated`: `"escalated"`;
     `resolved`: `"resolved"`;
     `closed`: `"closed"`;
     `cancelled`: `"cancelled"`;
  \}\>;
  `priority`: `ZodEnum`\<\{
     `critical`: `"critical"`;
     `high`: `"high"`;
     `medium`: `"medium"`;
     `low`: `"low"`;
  \}\>;
  `type`: `ZodEnum`\<\{
     `question`: `"question"`;
     `problem`: `"problem"`;
     `complaint`: `"complaint"`;
     `feature-request`: `"feature-request"`;
     `bug-report`: `"bug-report"`;
     `technical-support`: `"technical-support"`;
  \}\>;
  `owner`: `ZodString`;
  `contact`: `ZodOptional`\<`ZodString`\>;
  `description`: `ZodOptional`\<`ZodUnknown`\>;
  `attachments`: `ZodOptional`\<`ZodArray`\<`ZodFile`\>\>;
\}, `$strip`\>

***

### UpdateCasesSchema()

```ts
function UpdateCasesSchema(pocketbase: TypedPocketBase, record?: CustomerRelationsCasesRecord): ZodObject<{
  caseNumber: ZodOptional<ZodString>;
  status: ZodOptional<ZodEnum<{
     new: "new";
     in-progress: "in-progress";
     waiting-for-customer: "waiting-for-customer";
     waiting-for-internal: "waiting-for-internal";
     escalated: "escalated";
     resolved: "resolved";
     closed: "closed";
     cancelled: "cancelled";
  }>>;
  priority: ZodOptional<ZodEnum<{
     critical: "critical";
     high: "high";
     medium: "medium";
     low: "low";
  }>>;
  type: ZodOptional<ZodEnum<{
     question: "question";
     problem: "problem";
     complaint: "complaint";
     feature-request: "feature-request";
     bug-report: "bug-report";
     technical-support: "technical-support";
  }>>;
  owner: ZodOptional<ZodString>;
  contact: ZodOptional<ZodOptional<ZodString>>;
  description: ZodOptional<ZodOptional<ZodUnknown>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`CustomerRelationsCasesRecord`](../../../lib/pb.types.md#customerrelationscasesrecord)

#### Returns

`ZodObject`\<\{
  `caseNumber`: `ZodOptional`\<`ZodString`\>;
  `status`: `ZodOptional`\<`ZodEnum`\<\{
     `new`: `"new"`;
     `in-progress`: `"in-progress"`;
     `waiting-for-customer`: `"waiting-for-customer"`;
     `waiting-for-internal`: `"waiting-for-internal"`;
     `escalated`: `"escalated"`;
     `resolved`: `"resolved"`;
     `closed`: `"closed"`;
     `cancelled`: `"cancelled"`;
  \}\>\>;
  `priority`: `ZodOptional`\<`ZodEnum`\<\{
     `critical`: `"critical"`;
     `high`: `"high"`;
     `medium`: `"medium"`;
     `low`: `"low"`;
  \}\>\>;
  `type`: `ZodOptional`\<`ZodEnum`\<\{
     `question`: `"question"`;
     `problem`: `"problem"`;
     `complaint`: `"complaint"`;
     `feature-request`: `"feature-request"`;
     `bug-report`: `"bug-report"`;
     `technical-support`: `"technical-support"`;
  \}\>\>;
  `owner`: `ZodOptional`\<`ZodString`\>;
  `contact`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `description`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
\}, `$strip`\>
