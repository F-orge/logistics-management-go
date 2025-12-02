# pocketbase/schemas/delivery-management/proof-of-deliveries

## Type Aliases

### ProofOfDeliveries

```ts
type ProofOfDeliveries = z.infer<typeof ProofOfDeliveriesSchema>;
```

## Variables

### ProofOfDeliveriesSchema

```ts
const ProofOfDeliveriesSchema: ZodObject<{
  id: ZodString;
  task: ZodString;
  signatureData: ZodOptional<ZodFile>;
  recipientName: ZodOptional<ZodString>;
  coordinates: ZodOptional<ZodObject<{
     lon: ZodNumber;
     lat: ZodNumber;
  }, $strip>>;
  timestamp: ZodOptional<ZodISODateTime>;
  attachments: ZodOptional<ZodArray<ZodFile>>;
}, $strip>;
```

## Functions

### CreateProofOfDeliveriesSchema()

```ts
function CreateProofOfDeliveriesSchema(pocketbase: TypedPocketBase): ZodObject<{
  task: ZodString;
  signatureData: ZodOptional<ZodFile>;
  recipientName: ZodOptional<ZodString>;
  coordinates: ZodOptional<ZodObject<{
     lon: ZodNumber;
     lat: ZodNumber;
  }, $strip>>;
  attachments: ZodOptional<ZodArray<ZodFile>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `task`: `ZodString`;
  `signatureData`: `ZodOptional`\<`ZodFile`\>;
  `recipientName`: `ZodOptional`\<`ZodString`\>;
  `coordinates`: `ZodOptional`\<`ZodObject`\<\{
     `lon`: `ZodNumber`;
     `lat`: `ZodNumber`;
  \}, `$strip`\>\>;
  `attachments`: `ZodOptional`\<`ZodArray`\<`ZodFile`\>\>;
\}, `$strip`\>

***

### UpdateProofOfDeliveriesSchema()

```ts
function UpdateProofOfDeliveriesSchema(pocketbase: TypedPocketBase, record?: DeliveryManagementProofOfDeliveriesRecord): ZodObject<{
  task: ZodOptional<ZodString>;
  signatureData: ZodOptional<ZodOptional<ZodFile>>;
  recipientName: ZodOptional<ZodOptional<ZodString>>;
  coordinates: ZodOptional<ZodOptional<ZodObject<{
     lon: ZodNumber;
     lat: ZodNumber;
  }, $strip>>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`DeliveryManagementProofOfDeliveriesRecord`](../../../lib/pb.types.md#deliverymanagementproofofdeliveriesrecord)

#### Returns

`ZodObject`\<\{
  `task`: `ZodOptional`\<`ZodString`\>;
  `signatureData`: `ZodOptional`\<`ZodOptional`\<`ZodFile`\>\>;
  `recipientName`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `coordinates`: `ZodOptional`\<`ZodOptional`\<`ZodObject`\<\{
     `lon`: `ZodNumber`;
     `lat`: `ZodNumber`;
  \}, `$strip`\>\>\>;
\}, `$strip`\>
