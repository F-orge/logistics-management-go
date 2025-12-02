# pocketbase/schemas/delivery-management/task-events

## Type Aliases

### TaskEvents

```ts
type TaskEvents = z.infer<typeof TaskEventsSchema>;
```

## Variables

### TaskEventsSchema

```ts
const TaskEventsSchema: ZodObject<{
  id: ZodString;
  task: ZodString;
  status: ZodOptional<ZodEnum<{
     cancelled: "cancelled";
     assigned: "assigned";
     delivered: "delivered";
     failed: "failed";
     rescheduled: "rescheduled";
     arrived: "arrived";
     started: "started";
     exception: "exception";
  }>>;
  reason: ZodOptional<ZodString>;
  notes: ZodOptional<ZodString>;
  coordinates: ZodOptional<ZodObject<{
     lon: ZodNumber;
     lat: ZodNumber;
  }, $strip>>;
  timestamp: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateTaskEventsSchema()

```ts
function CreateTaskEventsSchema(pocketbase: TypedPocketBase): ZodObject<{
  task: ZodString;
  status: ZodOptional<ZodEnum<{
     cancelled: "cancelled";
     assigned: "assigned";
     delivered: "delivered";
     failed: "failed";
     rescheduled: "rescheduled";
     arrived: "arrived";
     started: "started";
     exception: "exception";
  }>>;
  reason: ZodOptional<ZodString>;
  notes: ZodOptional<ZodString>;
  coordinates: ZodOptional<ZodObject<{
     lon: ZodNumber;
     lat: ZodNumber;
  }, $strip>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `task`: `ZodString`;
  `status`: `ZodOptional`\<`ZodEnum`\<\{
     `cancelled`: `"cancelled"`;
     `assigned`: `"assigned"`;
     `delivered`: `"delivered"`;
     `failed`: `"failed"`;
     `rescheduled`: `"rescheduled"`;
     `arrived`: `"arrived"`;
     `started`: `"started"`;
     `exception`: `"exception"`;
  \}\>\>;
  `reason`: `ZodOptional`\<`ZodString`\>;
  `notes`: `ZodOptional`\<`ZodString`\>;
  `coordinates`: `ZodOptional`\<`ZodObject`\<\{
     `lon`: `ZodNumber`;
     `lat`: `ZodNumber`;
  \}, `$strip`\>\>;
\}, `$strip`\>

***

### UpdateTaskEventsSchema()

```ts
function UpdateTaskEventsSchema(pocketbase: TypedPocketBase, record?: DeliveryManagementTaskEventsRecord): ZodObject<{
  task: ZodOptional<ZodString>;
  status: ZodOptional<ZodOptional<ZodEnum<{
     cancelled: "cancelled";
     assigned: "assigned";
     delivered: "delivered";
     failed: "failed";
     rescheduled: "rescheduled";
     arrived: "arrived";
     started: "started";
     exception: "exception";
  }>>>;
  reason: ZodOptional<ZodOptional<ZodString>>;
  notes: ZodOptional<ZodOptional<ZodString>>;
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

[`DeliveryManagementTaskEventsRecord`](../../../lib/pb.types.md#deliverymanagementtaskeventsrecord)

#### Returns

`ZodObject`\<\{
  `task`: `ZodOptional`\<`ZodString`\>;
  `status`: `ZodOptional`\<`ZodOptional`\<`ZodEnum`\<\{
     `cancelled`: `"cancelled"`;
     `assigned`: `"assigned"`;
     `delivered`: `"delivered"`;
     `failed`: `"failed"`;
     `rescheduled`: `"rescheduled"`;
     `arrived`: `"arrived"`;
     `started`: `"started"`;
     `exception`: `"exception"`;
  \}\>\>\>;
  `reason`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `notes`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `coordinates`: `ZodOptional`\<`ZodOptional`\<`ZodObject`\<\{
     `lon`: `ZodNumber`;
     `lat`: `ZodNumber`;
  \}, `$strip`\>\>\>;
\}, `$strip`\>
