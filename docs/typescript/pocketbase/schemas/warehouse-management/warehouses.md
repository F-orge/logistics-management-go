# pocketbase/schemas/warehouse-management/warehouses

## Type Aliases

### Warehouses

```ts
type Warehouses = z.infer<typeof WarehousesSchema>;
```

## Variables

### WarehousesSchema

```ts
const WarehousesSchema: ZodObject<{
  id: ZodString;
  name: ZodString;
  address: ZodOptional<ZodString>;
  city: ZodOptional<ZodString>;
  state: ZodOptional<ZodString>;
  postalCode: ZodOptional<ZodString>;
  country: ZodOptional<ZodString>;
  timezone: ZodOptional<ZodString>;
  contactPerson: ZodOptional<ZodString>;
  contactEmail: ZodOptional<ZodEmail>;
  contactPhone: ZodOptional<ZodString>;
  isActive: ZodOptional<ZodUnknown>;
  images: ZodOptional<ZodArray<ZodFile>>;
  location: ZodOptional<ZodUnknown>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateWarehousesSchema()

```ts
function CreateWarehousesSchema(pocketbase: TypedPocketBase): ZodObject<{
  name: ZodString;
  address: ZodOptional<ZodString>;
  city: ZodOptional<ZodString>;
  state: ZodOptional<ZodString>;
  postalCode: ZodOptional<ZodString>;
  country: ZodOptional<ZodString>;
  timezone: ZodOptional<ZodString>;
  contactPerson: ZodOptional<ZodString>;
  contactEmail: ZodOptional<ZodEmail>;
  contactPhone: ZodOptional<ZodString>;
  isActive: ZodOptional<ZodUnknown>;
  images: ZodOptional<ZodArray<ZodFile>>;
  location: ZodOptional<ZodUnknown>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `name`: `ZodString`;
  `address`: `ZodOptional`\<`ZodString`\>;
  `city`: `ZodOptional`\<`ZodString`\>;
  `state`: `ZodOptional`\<`ZodString`\>;
  `postalCode`: `ZodOptional`\<`ZodString`\>;
  `country`: `ZodOptional`\<`ZodString`\>;
  `timezone`: `ZodOptional`\<`ZodString`\>;
  `contactPerson`: `ZodOptional`\<`ZodString`\>;
  `contactEmail`: `ZodOptional`\<`ZodEmail`\>;
  `contactPhone`: `ZodOptional`\<`ZodString`\>;
  `isActive`: `ZodOptional`\<`ZodUnknown`\>;
  `images`: `ZodOptional`\<`ZodArray`\<`ZodFile`\>\>;
  `location`: `ZodOptional`\<`ZodUnknown`\>;
\}, `$strip`\>

***

### UpdateWarehousesSchema()

```ts
function UpdateWarehousesSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementWarehousesRecord): ZodObject<{
  name: ZodOptional<ZodString>;
  address: ZodOptional<ZodOptional<ZodString>>;
  city: ZodOptional<ZodOptional<ZodString>>;
  state: ZodOptional<ZodOptional<ZodString>>;
  postalCode: ZodOptional<ZodOptional<ZodString>>;
  country: ZodOptional<ZodOptional<ZodString>>;
  timezone: ZodOptional<ZodOptional<ZodString>>;
  contactPerson: ZodOptional<ZodOptional<ZodString>>;
  contactEmail: ZodOptional<ZodOptional<ZodEmail>>;
  contactPhone: ZodOptional<ZodOptional<ZodString>>;
  isActive: ZodOptional<ZodOptional<ZodUnknown>>;
  images: ZodOptional<ZodOptional<ZodArray<ZodFile>>>;
  location: ZodOptional<ZodOptional<ZodUnknown>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementWarehousesRecord`](../../../lib/pb.types.md#warehousemanagementwarehousesrecord)

#### Returns

`ZodObject`\<\{
  `name`: `ZodOptional`\<`ZodString`\>;
  `address`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `city`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `state`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `postalCode`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `country`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `timezone`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `contactPerson`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `contactEmail`: `ZodOptional`\<`ZodOptional`\<`ZodEmail`\>\>;
  `contactPhone`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `isActive`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
  `images`: `ZodOptional`\<`ZodOptional`\<`ZodArray`\<`ZodFile`\>\>\>;
  `location`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
\}, `$strip`\>
