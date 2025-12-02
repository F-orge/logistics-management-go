# pocketbase/schemas/transport-management/vehicles

## Type Aliases

### Vehicles

```ts
type Vehicles = z.infer<typeof VehiclesSchema>;
```

## Variables

### VehiclesSchema

```ts
const VehiclesSchema: ZodObject<{
  id: ZodString;
  registrationNumber: ZodString;
  model: ZodOptional<ZodString>;
  capacityVolume: ZodOptional<ZodNumber>;
  capacityWeight: ZodOptional<ZodNumber>;
  status: ZodEnum<{
     available: "available";
     in-maintenance: "in-maintenance";
     on-trip: "on-trip";
     out-of-service: "out-of-service";
  }>;
  maintenances: ZodOptional<ZodArray<ZodString>>;
  gps_pings: ZodOptional<ZodArray<ZodString>>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateVehiclesSchema()

```ts
function CreateVehiclesSchema(pocketbase: TypedPocketBase): ZodObject<{
  registrationNumber: ZodString;
  model: ZodOptional<ZodString>;
  capacityVolume: ZodOptional<ZodNumber>;
  capacityWeight: ZodOptional<ZodNumber>;
  status: ZodEnum<{
     available: "available";
     in-maintenance: "in-maintenance";
     on-trip: "on-trip";
     out-of-service: "out-of-service";
  }>;
  maintenances: ZodOptional<ZodArray<ZodString>>;
  gps_pings: ZodOptional<ZodArray<ZodString>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `registrationNumber`: `ZodString`;
  `model`: `ZodOptional`\<`ZodString`\>;
  `capacityVolume`: `ZodOptional`\<`ZodNumber`\>;
  `capacityWeight`: `ZodOptional`\<`ZodNumber`\>;
  `status`: `ZodEnum`\<\{
     `available`: `"available"`;
     `in-maintenance`: `"in-maintenance"`;
     `on-trip`: `"on-trip"`;
     `out-of-service`: `"out-of-service"`;
  \}\>;
  `maintenances`: `ZodOptional`\<`ZodArray`\<`ZodString`\>\>;
  `gps_pings`: `ZodOptional`\<`ZodArray`\<`ZodString`\>\>;
\}, `$strip`\>

***

### UpdateVehiclesSchema()

```ts
function UpdateVehiclesSchema(pocketbase: TypedPocketBase, record?: TransportManagementVehiclesRecord): ZodObject<{
  registrationNumber: ZodOptional<ZodString>;
  model: ZodOptional<ZodOptional<ZodString>>;
  capacityVolume: ZodOptional<ZodOptional<ZodNumber>>;
  capacityWeight: ZodOptional<ZodOptional<ZodNumber>>;
  status: ZodOptional<ZodEnum<{
     available: "available";
     in-maintenance: "in-maintenance";
     on-trip: "on-trip";
     out-of-service: "out-of-service";
  }>>;
  maintenances: ZodOptional<ZodOptional<ZodArray<ZodString>>>;
  gps_pings: ZodOptional<ZodOptional<ZodArray<ZodString>>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`TransportManagementVehiclesRecord`](../../../lib/pb.types.md#transportmanagementvehiclesrecord)

#### Returns

`ZodObject`\<\{
  `registrationNumber`: `ZodOptional`\<`ZodString`\>;
  `model`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `capacityVolume`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `capacityWeight`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `status`: `ZodOptional`\<`ZodEnum`\<\{
     `available`: `"available"`;
     `in-maintenance`: `"in-maintenance"`;
     `on-trip`: `"on-trip"`;
     `out-of-service`: `"out-of-service"`;
  \}\>\>;
  `maintenances`: `ZodOptional`\<`ZodOptional`\<`ZodArray`\<`ZodString`\>\>\>;
  `gps_pings`: `ZodOptional`\<`ZodOptional`\<`ZodArray`\<`ZodString`\>\>\>;
\}, `$strip`\>
