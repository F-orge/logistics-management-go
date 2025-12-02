# pocketbase/schemas/delivery-management/driver-location

## Type Aliases

### DriverLocation

```ts
type DriverLocation = z.infer<typeof DriverLocationSchema>;
```

## Variables

### DriverLocationSchema

```ts
const DriverLocationSchema: ZodObject<{
  id: ZodString;
  driver: ZodString;
  coordinates: ZodObject<{
     lon: ZodNumber;
     lat: ZodNumber;
  }, $strip>;
  heading: ZodObject<{
     lon: ZodNumber;
     lat: ZodNumber;
  }, $strip>;
  timestamp: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateDriverLocationSchema()

```ts
function CreateDriverLocationSchema(pocketbase: TypedPocketBase): ZodObject<{
  driver: ZodString;
  coordinates: ZodObject<{
     lon: ZodNumber;
     lat: ZodNumber;
  }, $strip>;
  heading: ZodObject<{
     lon: ZodNumber;
     lat: ZodNumber;
  }, $strip>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `driver`: `ZodString`;
  `coordinates`: `ZodObject`\<\{
     `lon`: `ZodNumber`;
     `lat`: `ZodNumber`;
  \}, `$strip`\>;
  `heading`: `ZodObject`\<\{
     `lon`: `ZodNumber`;
     `lat`: `ZodNumber`;
  \}, `$strip`\>;
\}, `$strip`\>

***

### UpdateDriverLocationSchema()

```ts
function UpdateDriverLocationSchema(pocketbase: TypedPocketBase, record?: DeliveryManagementDriverLocationRecord): ZodObject<{
  driver: ZodOptional<ZodString>;
  coordinates: ZodOptional<ZodObject<{
     lon: ZodNumber;
     lat: ZodNumber;
  }, $strip>>;
  heading: ZodOptional<ZodObject<{
     lon: ZodNumber;
     lat: ZodNumber;
  }, $strip>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`DeliveryManagementDriverLocationRecord`](../../../lib/pb.types.md#deliverymanagementdriverlocationrecord)

#### Returns

`ZodObject`\<\{
  `driver`: `ZodOptional`\<`ZodString`\>;
  `coordinates`: `ZodOptional`\<`ZodObject`\<\{
     `lon`: `ZodNumber`;
     `lat`: `ZodNumber`;
  \}, `$strip`\>\>;
  `heading`: `ZodOptional`\<`ZodObject`\<\{
     `lon`: `ZodNumber`;
     `lat`: `ZodNumber`;
  \}, `$strip`\>\>;
\}, `$strip`\>
