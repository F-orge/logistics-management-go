# pocketbase/schemas/transport-management/drivers

## Type Aliases

### Drivers

```ts
type Drivers = z.infer<typeof DriversSchema>;
```

## Variables

### DriversSchema

```ts
const DriversSchema: ZodObject<{
  id: ZodString;
  user: ZodOptional<ZodString>;
  licenseNumber: ZodString;
  licenseExpiryDate: ZodOptional<ZodDate>;
  status: ZodEnum<{
     active: "active";
     inactive: "inactive";
     on-leave: "on-leave";
  }>;
  schedules: ZodOptional<ZodArray<ZodString>>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateDriversSchema()

```ts
function CreateDriversSchema(pocketbase: TypedPocketBase): ZodObject<{
  user: ZodOptional<ZodString>;
  licenseNumber: ZodString;
  licenseExpiryDate: ZodOptional<ZodDate>;
  status: ZodEnum<{
     active: "active";
     inactive: "inactive";
     on-leave: "on-leave";
  }>;
  schedules: ZodOptional<ZodArray<ZodString>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `user`: `ZodOptional`\<`ZodString`\>;
  `licenseNumber`: `ZodString`;
  `licenseExpiryDate`: `ZodOptional`\<`ZodDate`\>;
  `status`: `ZodEnum`\<\{
     `active`: `"active"`;
     `inactive`: `"inactive"`;
     `on-leave`: `"on-leave"`;
  \}\>;
  `schedules`: `ZodOptional`\<`ZodArray`\<`ZodString`\>\>;
\}, `$strip`\>

***

### UpdateDriversSchema()

```ts
function UpdateDriversSchema(pocketbase: TypedPocketBase, record?: TransportManagementDriversRecord): ZodObject<{
  user: ZodOptional<ZodOptional<ZodString>>;
  licenseNumber: ZodOptional<ZodString>;
  licenseExpiryDate: ZodOptional<ZodOptional<ZodDate>>;
  status: ZodOptional<ZodEnum<{
     active: "active";
     inactive: "inactive";
     on-leave: "on-leave";
  }>>;
  schedules: ZodOptional<ZodOptional<ZodArray<ZodString>>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`TransportManagementDriversRecord`](../../../lib/pb.types.md#transportmanagementdriversrecord)

#### Returns

`ZodObject`\<\{
  `user`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `licenseNumber`: `ZodOptional`\<`ZodString`\>;
  `licenseExpiryDate`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
  `status`: `ZodOptional`\<`ZodEnum`\<\{
     `active`: `"active"`;
     `inactive`: `"inactive"`;
     `on-leave`: `"on-leave"`;
  \}\>\>;
  `schedules`: `ZodOptional`\<`ZodOptional`\<`ZodArray`\<`ZodString`\>\>\>;
\}, `$strip`\>
