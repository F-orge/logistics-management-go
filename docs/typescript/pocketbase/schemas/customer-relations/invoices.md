# pocketbase/schemas/customer-relations/invoices

## Type Aliases

### Invoices

```ts
type Invoices = z.infer<typeof InvoicesSchema>;
```

## Variables

### InvoicesSchema

```ts
const InvoicesSchema: ZodObject<{
  id: ZodString;
  invoiceNumber: ZodString;
  opportunity: ZodString;
  status: ZodOptional<ZodEnum<{
     cancelled: "cancelled";
     draft: "draft";
     sent: "sent";
     paid: "paid";
     overdue: "overdue";
  }>>;
  total: ZodOptional<ZodNumber>;
  issueDate: ZodDefault<ZodOptional<ZodDate>>;
  dueDate: ZodOptional<ZodDate>;
  sentAt: ZodOptional<ZodDate>;
  paidAt: ZodOptional<ZodDate>;
  paymentMethod: ZodOptional<ZodEnum<{
     check: "check";
     other: "other";
     credit-card: "credit-card";
     bank-transfer: "bank-transfer";
     cash: "cash";
     paypal: "paypal";
     stripe: "stripe";
     wire-transfer: "wire-transfer";
     maya: "maya";
     gcash: "gcash";
  }>>;
  attachments: ZodOptional<ZodArray<ZodFile>>;
  items: ZodArray<ZodString>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateInvoicesSchema()

```ts
function CreateInvoicesSchema(pocketbase: TypedPocketBase): ZodObject<{
  invoiceNumber: ZodString;
  opportunity: ZodString;
  status: ZodOptional<ZodEnum<{
     cancelled: "cancelled";
     draft: "draft";
     sent: "sent";
     paid: "paid";
     overdue: "overdue";
  }>>;
  total: ZodOptional<ZodNumber>;
  issueDate: ZodDefault<ZodOptional<ZodDate>>;
  dueDate: ZodOptional<ZodDate>;
  sentAt: ZodOptional<ZodDate>;
  paidAt: ZodOptional<ZodDate>;
  paymentMethod: ZodOptional<ZodEnum<{
     check: "check";
     other: "other";
     credit-card: "credit-card";
     bank-transfer: "bank-transfer";
     cash: "cash";
     paypal: "paypal";
     stripe: "stripe";
     wire-transfer: "wire-transfer";
     maya: "maya";
     gcash: "gcash";
  }>>;
  attachments: ZodOptional<ZodArray<ZodFile>>;
  items: ZodArray<ZodObject<{
     product: ZodString;
     quantity: ZodNumber;
  }, $strip>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `invoiceNumber`: `ZodString`;
  `opportunity`: `ZodString`;
  `status`: `ZodOptional`\<`ZodEnum`\<\{
     `cancelled`: `"cancelled"`;
     `draft`: `"draft"`;
     `sent`: `"sent"`;
     `paid`: `"paid"`;
     `overdue`: `"overdue"`;
  \}\>\>;
  `total`: `ZodOptional`\<`ZodNumber`\>;
  `issueDate`: `ZodDefault`\<`ZodOptional`\<`ZodDate`\>\>;
  `dueDate`: `ZodOptional`\<`ZodDate`\>;
  `sentAt`: `ZodOptional`\<`ZodDate`\>;
  `paidAt`: `ZodOptional`\<`ZodDate`\>;
  `paymentMethod`: `ZodOptional`\<`ZodEnum`\<\{
     `check`: `"check"`;
     `other`: `"other"`;
     `credit-card`: `"credit-card"`;
     `bank-transfer`: `"bank-transfer"`;
     `cash`: `"cash"`;
     `paypal`: `"paypal"`;
     `stripe`: `"stripe"`;
     `wire-transfer`: `"wire-transfer"`;
     `maya`: `"maya"`;
     `gcash`: `"gcash"`;
  \}\>\>;
  `attachments`: `ZodOptional`\<`ZodArray`\<`ZodFile`\>\>;
  `items`: `ZodArray`\<`ZodObject`\<\{
     `product`: `ZodString`;
     `quantity`: `ZodNumber`;
  \}, `$strip`\>\>;
\}, `$strip`\>

***

### UpdateInvoicesSchema()

```ts
function UpdateInvoicesSchema(pocketbase: TypedPocketBase, record?: CustomerRelationsInvoicesRecord): ZodObject<{
  invoiceNumber: ZodOptional<ZodString>;
  opportunity: ZodOptional<ZodString>;
  status: ZodOptional<ZodOptional<ZodEnum<{
     cancelled: "cancelled";
     draft: "draft";
     sent: "sent";
     paid: "paid";
     overdue: "overdue";
  }>>>;
  total: ZodOptional<ZodOptional<ZodNumber>>;
  issueDate: ZodOptional<ZodDefault<ZodOptional<ZodDate>>>;
  dueDate: ZodOptional<ZodOptional<ZodDate>>;
  sentAt: ZodOptional<ZodOptional<ZodDate>>;
  paidAt: ZodOptional<ZodOptional<ZodDate>>;
  paymentMethod: ZodOptional<ZodOptional<ZodEnum<{
     check: "check";
     other: "other";
     credit-card: "credit-card";
     bank-transfer: "bank-transfer";
     cash: "cash";
     paypal: "paypal";
     stripe: "stripe";
     wire-transfer: "wire-transfer";
     maya: "maya";
     gcash: "gcash";
  }>>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`CustomerRelationsInvoicesRecord`](../../../lib/pb.types.md#customerrelationsinvoicesrecord)

#### Returns

`ZodObject`\<\{
  `invoiceNumber`: `ZodOptional`\<`ZodString`\>;
  `opportunity`: `ZodOptional`\<`ZodString`\>;
  `status`: `ZodOptional`\<`ZodOptional`\<`ZodEnum`\<\{
     `cancelled`: `"cancelled"`;
     `draft`: `"draft"`;
     `sent`: `"sent"`;
     `paid`: `"paid"`;
     `overdue`: `"overdue"`;
  \}\>\>\>;
  `total`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `issueDate`: `ZodOptional`\<`ZodDefault`\<`ZodOptional`\<`ZodDate`\>\>\>;
  `dueDate`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
  `sentAt`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
  `paidAt`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
  `paymentMethod`: `ZodOptional`\<`ZodOptional`\<`ZodEnum`\<\{
     `check`: `"check"`;
     `other`: `"other"`;
     `credit-card`: `"credit-card"`;
     `bank-transfer`: `"bank-transfer"`;
     `cash`: `"cash"`;
     `paypal`: `"paypal"`;
     `stripe`: `"stripe"`;
     `wire-transfer`: `"wire-transfer"`;
     `maya`: `"maya"`;
     `gcash`: `"gcash"`;
  \}\>\>\>;
\}, `$strip`\>
