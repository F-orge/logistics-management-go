# pocketbase/schemas/delivery-management/tasks

## Type Aliases

### Tasks

```ts
type Tasks = z.infer<typeof TasksSchema>;
```

## Variables

### TasksSchema

```ts
const TasksSchema: ZodObject<{
  id: ZodString;
  package: ZodString;
  route: ZodString;
  sequence: ZodNumber;
  deliveryAddress: ZodString;
  recipientName: ZodOptional<ZodString>;
  recipientPhone: ZodOptional<ZodString>;
  deliveryInstructions: ZodOptional<ZodString>;
  estimatedArrivalTime: ZodOptional<ZodDate>;
  actualArrivalTime: ZodOptional<ZodDate>;
  deliveryTime: ZodOptional<ZodDate>;
  status: ZodOptional<ZodEnum<{
     cancelled: "cancelled";
     pending: "pending";
     assigned: "assigned";
     out-for-delivery: "out-for-delivery";
     delivered: "delivered";
     failed: "failed";
     rescheduled: "rescheduled";
  }>>;
  attempCount: ZodOptional<ZodNumber>;
  attachments: ZodOptional<ZodArray<ZodFile>>;
  failureReason: ZodOptional<ZodEnum<{
     other: "other";
     recipient-not-home: "recipient-not-home";
     address-not-found: "address-not-found";
     refused-delivery: "refused-delivery";
     damaged-package: "damaged-package";
     access-denied: "access-denied";
     weather-conditions: "weather-conditions";
     vehicle-breakdown: "vehicle-breakdown";
  }>>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateTasksSchema()

```ts
function CreateTasksSchema(pocketbase: TypedPocketBase): ZodObject<{
  package: ZodString;
  route: ZodString;
  sequence: ZodNumber;
  deliveryAddress: ZodString;
  recipientName: ZodOptional<ZodString>;
  recipientPhone: ZodOptional<ZodString>;
  deliveryInstructions: ZodOptional<ZodString>;
  estimatedArrivalTime: ZodOptional<ZodDate>;
  actualArrivalTime: ZodOptional<ZodDate>;
  deliveryTime: ZodOptional<ZodDate>;
  status: ZodOptional<ZodEnum<{
     cancelled: "cancelled";
     pending: "pending";
     assigned: "assigned";
     out-for-delivery: "out-for-delivery";
     delivered: "delivered";
     failed: "failed";
     rescheduled: "rescheduled";
  }>>;
  attempCount: ZodOptional<ZodNumber>;
  attachments: ZodOptional<ZodArray<ZodFile>>;
  failureReason: ZodOptional<ZodEnum<{
     other: "other";
     recipient-not-home: "recipient-not-home";
     address-not-found: "address-not-found";
     refused-delivery: "refused-delivery";
     damaged-package: "damaged-package";
     access-denied: "access-denied";
     weather-conditions: "weather-conditions";
     vehicle-breakdown: "vehicle-breakdown";
  }>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `package`: `ZodString`;
  `route`: `ZodString`;
  `sequence`: `ZodNumber`;
  `deliveryAddress`: `ZodString`;
  `recipientName`: `ZodOptional`\<`ZodString`\>;
  `recipientPhone`: `ZodOptional`\<`ZodString`\>;
  `deliveryInstructions`: `ZodOptional`\<`ZodString`\>;
  `estimatedArrivalTime`: `ZodOptional`\<`ZodDate`\>;
  `actualArrivalTime`: `ZodOptional`\<`ZodDate`\>;
  `deliveryTime`: `ZodOptional`\<`ZodDate`\>;
  `status`: `ZodOptional`\<`ZodEnum`\<\{
     `cancelled`: `"cancelled"`;
     `pending`: `"pending"`;
     `assigned`: `"assigned"`;
     `out-for-delivery`: `"out-for-delivery"`;
     `delivered`: `"delivered"`;
     `failed`: `"failed"`;
     `rescheduled`: `"rescheduled"`;
  \}\>\>;
  `attempCount`: `ZodOptional`\<`ZodNumber`\>;
  `attachments`: `ZodOptional`\<`ZodArray`\<`ZodFile`\>\>;
  `failureReason`: `ZodOptional`\<`ZodEnum`\<\{
     `other`: `"other"`;
     `recipient-not-home`: `"recipient-not-home"`;
     `address-not-found`: `"address-not-found"`;
     `refused-delivery`: `"refused-delivery"`;
     `damaged-package`: `"damaged-package"`;
     `access-denied`: `"access-denied"`;
     `weather-conditions`: `"weather-conditions"`;
     `vehicle-breakdown`: `"vehicle-breakdown"`;
  \}\>\>;
\}, `$strip`\>

***

### UpdateTasksSchema()

```ts
function UpdateTasksSchema(pocketbase: TypedPocketBase, record?: DeliveryManagementTasksRecord): ZodObject<{
  package: ZodOptional<ZodString>;
  route: ZodOptional<ZodString>;
  sequence: ZodOptional<ZodNumber>;
  deliveryAddress: ZodOptional<ZodString>;
  recipientName: ZodOptional<ZodOptional<ZodString>>;
  recipientPhone: ZodOptional<ZodOptional<ZodString>>;
  deliveryInstructions: ZodOptional<ZodOptional<ZodString>>;
  estimatedArrivalTime: ZodOptional<ZodOptional<ZodDate>>;
  actualArrivalTime: ZodOptional<ZodOptional<ZodDate>>;
  deliveryTime: ZodOptional<ZodOptional<ZodDate>>;
  status: ZodOptional<ZodOptional<ZodEnum<{
     cancelled: "cancelled";
     pending: "pending";
     assigned: "assigned";
     out-for-delivery: "out-for-delivery";
     delivered: "delivered";
     failed: "failed";
     rescheduled: "rescheduled";
  }>>>;
  attempCount: ZodOptional<ZodOptional<ZodNumber>>;
  attachments: ZodOptional<ZodOptional<ZodArray<ZodFile>>>;
  failureReason: ZodOptional<ZodOptional<ZodEnum<{
     other: "other";
     recipient-not-home: "recipient-not-home";
     address-not-found: "address-not-found";
     refused-delivery: "refused-delivery";
     damaged-package: "damaged-package";
     access-denied: "access-denied";
     weather-conditions: "weather-conditions";
     vehicle-breakdown: "vehicle-breakdown";
  }>>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`DeliveryManagementTasksRecord`](../../../lib/pb.types.md#deliverymanagementtasksrecord)

#### Returns

`ZodObject`\<\{
  `package`: `ZodOptional`\<`ZodString`\>;
  `route`: `ZodOptional`\<`ZodString`\>;
  `sequence`: `ZodOptional`\<`ZodNumber`\>;
  `deliveryAddress`: `ZodOptional`\<`ZodString`\>;
  `recipientName`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `recipientPhone`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `deliveryInstructions`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `estimatedArrivalTime`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
  `actualArrivalTime`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
  `deliveryTime`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
  `status`: `ZodOptional`\<`ZodOptional`\<`ZodEnum`\<\{
     `cancelled`: `"cancelled"`;
     `pending`: `"pending"`;
     `assigned`: `"assigned"`;
     `out-for-delivery`: `"out-for-delivery"`;
     `delivered`: `"delivered"`;
     `failed`: `"failed"`;
     `rescheduled`: `"rescheduled"`;
  \}\>\>\>;
  `attempCount`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `attachments`: `ZodOptional`\<`ZodOptional`\<`ZodArray`\<`ZodFile`\>\>\>;
  `failureReason`: `ZodOptional`\<`ZodOptional`\<`ZodEnum`\<\{
     `other`: `"other"`;
     `recipient-not-home`: `"recipient-not-home"`;
     `address-not-found`: `"address-not-found"`;
     `refused-delivery`: `"refused-delivery"`;
     `damaged-package`: `"damaged-package"`;
     `access-denied`: `"access-denied"`;
     `weather-conditions`: `"weather-conditions"`;
     `vehicle-breakdown`: `"vehicle-breakdown"`;
  \}\>\>\>;
\}, `$strip`\>
