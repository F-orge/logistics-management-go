# hooks/use-debounce

## Functions

### useDebounce()

```ts
function useDebounce<T>(value: T, delay: number): T;
```

#### Type Parameters

##### T

`T`

#### Parameters

##### value

`T`

##### delay

`number`

#### Returns

`T`
# hooks/use-mobile

## Functions

### useIsMobile()

```ts
function useIsMobile(): boolean;
```

#### Returns

`boolean`
# index
# pocketbase/hooks

## Functions

### useCreateRecord()

```ts
function useCreateRecord<T>(collection: Collections): {
  create: (data: Omit<T, "id" | "created" | "updated">) => Promise<T>;
};
```

Hook for creating records in a PocketBase collection

#### Type Parameters

##### T

`T` *extends* `RecordModel`

#### Parameters

##### collection

[`Collections`](../lib/pb.types.md#collections)

#### Returns

```ts
{
  create: (data: Omit<T, "id" | "created" | "updated">) => Promise<T>;
}
```

##### create()

```ts
create: (data: Omit<T, "id" | "created" | "updated">) => Promise<T>;
```

###### Parameters

###### data

`Omit`\<`T`, `"id"` \| `"created"` \| `"updated"`\>

###### Returns

`Promise`\<`T`\>

***

### useUpdateRecord()

```ts
function useUpdateRecord<T>(collection: Collections): {
  update: (id: string, data: Partial<Omit<T, "id" | "created" | "updated">>) => Promise<T>;
};
```

Hook for updating records in a PocketBase collection

#### Type Parameters

##### T

`T` *extends* `RecordModel`

#### Parameters

##### collection

[`Collections`](../lib/pb.types.md#collections)

#### Returns

```ts
{
  update: (id: string, data: Partial<Omit<T, "id" | "created" | "updated">>) => Promise<T>;
}
```

##### update()

```ts
update: (id: string, data: Partial<Omit<T, "id" | "created" | "updated">>) => Promise<T>;
```

###### Parameters

###### id

`string`

###### data

`Partial`\<`Omit`\<`T`, `"id"` \| `"created"` \| `"updated"`\>\>

###### Returns

`Promise`\<`T`\>

***

### useDeleteRecord()

```ts
function useDeleteRecord(collection: Collections): {
  deleteRecord: (id: string) => Promise<void>;
};
```

Hook for deleting records from a PocketBase collection

#### Parameters

##### collection

[`Collections`](../lib/pb.types.md#collections)

#### Returns

```ts
{
  deleteRecord: (id: string) => Promise<void>;
}
```

##### deleteRecord()

```ts
deleteRecord: (id: string) => Promise<void>;
```

###### Parameters

###### id

`string`

###### Returns

`Promise`\<`void`\>

***

### useFetchRecord()

```ts
function useFetchRecord<T>(
   collection: Collections, 
   id: string | null, 
   options?: {
  queryParams?: Record<string, unknown>;
}): {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};
```

Hook for fetching a single record from a PocketBase collection

#### Type Parameters

##### T

`T` *extends* `RecordModel`

#### Parameters

##### collection

[`Collections`](../lib/pb.types.md#collections)

##### id

`string` | `null`

##### options?

###### queryParams?

`Record`\<`string`, `unknown`\>

#### Returns

```ts
{
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}
```

##### data

```ts
data: T | null;
```

##### isLoading

```ts
isLoading: boolean;
```

##### error

```ts
error: Error | null;
```

***

### useFetchRecords()

```ts
function useFetchRecords<T>(collection: Collections, options?: RecordListOptions): {
  data: T[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
};
```

Hook for fetching multiple records from a PocketBase collection

#### Type Parameters

##### T

`T` *extends* `RecordModel`

#### Parameters

##### collection

[`Collections`](../lib/pb.types.md#collections)

##### options?

`RecordListOptions`

#### Returns

```ts
{
  data: T[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}
```

##### data

```ts
data: T[];
```

##### isLoading

```ts
isLoading: boolean;
```

##### error

```ts
error: Error | null;
```

##### refetch()

```ts
refetch: () => Promise<void>;
```

###### Returns

`Promise`\<`void`\>

***

### useSubscribeCollection()

```ts
function useSubscribeCollection<T>(collection: string, onMessage: (data: {
  action: string;
  record: T;
}) => void): void;
```

Hook for subscribing to real-time changes in a PocketBase collection

#### Type Parameters

##### T

`T` *extends* `RecordModel`

#### Parameters

##### collection

`string`

##### onMessage

(`data`: \{
  `action`: `string`;
  `record`: `T`;
\}) => `void`

#### Returns

`void`

***

### useSubscribeRecord()

```ts
function useSubscribeRecord<T>(
   collection: string, 
   id: string, 
   onMessage: (data: {
  action: string;
  record: T;
}) => void): void;
```

Hook for subscribing to real-time changes of a specific record

#### Type Parameters

##### T

`T` *extends* `RecordModel`

#### Parameters

##### collection

`string`

##### id

`string`

##### onMessage

(`data`: \{
  `action`: `string`;
  `record`: `T`;
\}) => `void`

#### Returns

`void`
# pocketbase/schemas/system

## References

### AuthoriginsSchema

Re-exports [AuthoriginsSchema](system/authorigins.md#authoriginsschema)

***

### Authorigins

Re-exports [Authorigins](system/authorigins.md#authorigins)

***

### ExternalauthsSchema

Re-exports [ExternalauthsSchema](system/externalauths.md#externalauthsschema)

***

### Externalauths

Re-exports [Externalauths](system/externalauths.md#externalauths)

***

### MfasSchema

Re-exports [MfasSchema](system/mfas.md#mfasschema)

***

### Mfas

Re-exports [Mfas](system/mfas.md#mfas)

***

### NotificationsSchema

Re-exports [NotificationsSchema](system/notifications.md#notificationsschema)

***

### Notifications

Re-exports [Notifications](system/notifications.md#notifications)

***

### OtpsSchema

Re-exports [OtpsSchema](system/otps.md#otpsschema)

***

### Otps

Re-exports [Otps](system/otps.md#otps)

***

### SuperusersSchema

Re-exports [SuperusersSchema](system/superusers.md#superusersschema)

***

### Superusers

Re-exports [Superusers](system/superusers.md#superusers)

***

### UsersSchema

Re-exports [UsersSchema](system/users.md#usersschema)

***

### Users

Re-exports [Users](system/users.md#users)
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
# pocketbase/schemas/transport-management/carriers

## Type Aliases

### Carriers

```ts
type Carriers = z.infer<typeof CarriersSchema>;
```

## Variables

### CarriersSchema

```ts
const CarriersSchema: ZodObject<{
  id: ZodString;
  name: ZodString;
  contactDetails: ZodOptional<ZodUnknown>;
  serviceOffered: ZodOptional<ZodUnknown>;
  image: ZodOptional<ZodFile>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateCarriersSchema()

```ts
function CreateCarriersSchema(pocketbase: TypedPocketBase): ZodObject<{
  name: ZodString;
  contactDetails: ZodOptional<ZodUnknown>;
  serviceOffered: ZodOptional<ZodUnknown>;
  image: ZodOptional<ZodFile>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `name`: `ZodString`;
  `contactDetails`: `ZodOptional`\<`ZodUnknown`\>;
  `serviceOffered`: `ZodOptional`\<`ZodUnknown`\>;
  `image`: `ZodOptional`\<`ZodFile`\>;
\}, `$strip`\>

***

### UpdateCarriersSchema()

```ts
function UpdateCarriersSchema(pocketbase: TypedPocketBase, record?: TransportManagementCarriersRecord): ZodObject<{
  name: ZodOptional<ZodString>;
  contactDetails: ZodOptional<ZodOptional<ZodUnknown>>;
  serviceOffered: ZodOptional<ZodOptional<ZodUnknown>>;
  image: ZodOptional<ZodOptional<ZodFile>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`TransportManagementCarriersRecord`](../../../lib/pb.types.md#transportmanagementcarriersrecord)

#### Returns

`ZodObject`\<\{
  `name`: `ZodOptional`\<`ZodString`\>;
  `contactDetails`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
  `serviceOffered`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
  `image`: `ZodOptional`\<`ZodOptional`\<`ZodFile`\>\>;
\}, `$strip`\>
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
# pocketbase/schemas/customer-relations/contacts

## Type Aliases

### Contacts

```ts
type Contacts = z.infer<typeof ContactsSchema>;
```

## Variables

### ContactsSchema

```ts
const ContactsSchema: ZodObject<{
  id: ZodString;
  name: ZodString;
  email: ZodEmail;
  phoneNumber: ZodOptional<ZodString>;
  jobTitle: ZodOptional<ZodString>;
  company: ZodOptional<ZodString>;
  owner: ZodString;
  attachments: ZodOptional<ZodArray<ZodFile>>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateContactsSchema()

```ts
function CreateContactsSchema(pocketbase: TypedPocketBase): ZodObject<{
  name: ZodString;
  email: ZodEmail;
  phoneNumber: ZodOptional<ZodString>;
  jobTitle: ZodOptional<ZodString>;
  company: ZodOptional<ZodString>;
  owner: ZodString;
  attachments: ZodOptional<ZodArray<ZodFile>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `name`: `ZodString`;
  `email`: `ZodEmail`;
  `phoneNumber`: `ZodOptional`\<`ZodString`\>;
  `jobTitle`: `ZodOptional`\<`ZodString`\>;
  `company`: `ZodOptional`\<`ZodString`\>;
  `owner`: `ZodString`;
  `attachments`: `ZodOptional`\<`ZodArray`\<`ZodFile`\>\>;
\}, `$strip`\>

***

### UpdateContactsSchema()

```ts
function UpdateContactsSchema(pocketbase: TypedPocketBase, record?: CustomerRelationsContactsRecord): ZodObject<{
  name: ZodOptional<ZodString>;
  email: ZodOptional<ZodEmail>;
  phoneNumber: ZodOptional<ZodOptional<ZodString>>;
  jobTitle: ZodOptional<ZodOptional<ZodString>>;
  company: ZodOptional<ZodOptional<ZodString>>;
  owner: ZodOptional<ZodString>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`CustomerRelationsContactsRecord`](../../../lib/pb.types.md#customerrelationscontactsrecord)

#### Returns

`ZodObject`\<\{
  `name`: `ZodOptional`\<`ZodString`\>;
  `email`: `ZodOptional`\<`ZodEmail`\>;
  `phoneNumber`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `jobTitle`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `company`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `owner`: `ZodOptional`\<`ZodString`\>;
\}, `$strip`\>
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
# pocketbase/schemas/customer-relations/companies

## Type Aliases

### Companies

```ts
type Companies = z.infer<typeof CompaniesSchema>;
```

## Variables

### CompaniesSchema

```ts
const CompaniesSchema: ZodObject<{
  id: ZodString;
  name: ZodString;
  street: ZodOptional<ZodString>;
  city: ZodOptional<ZodString>;
  state: ZodOptional<ZodString>;
  postalCode: ZodOptional<ZodString>;
  country: ZodOptional<ZodString>;
  phoneNumber: ZodOptional<ZodString>;
  industry: ZodOptional<ZodString>;
  website: ZodOptional<ZodString>;
  annualRevenue: ZodOptional<ZodNumber>;
  owner: ZodOptional<ZodString>;
  attachments: ZodOptional<ZodArray<ZodUnion<readonly [ZodCustom<File, File>, ZodString]>>>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateCompaniesSchema()

```ts
function CreateCompaniesSchema(pocketbase: TypedPocketBase): ZodObject<{
  name: ZodString;
  street: ZodOptional<ZodString>;
  city: ZodOptional<ZodString>;
  state: ZodOptional<ZodString>;
  postalCode: ZodOptional<ZodString>;
  country: ZodOptional<ZodString>;
  phoneNumber: ZodOptional<ZodString>;
  industry: ZodOptional<ZodString>;
  website: ZodOptional<ZodString>;
  annualRevenue: ZodOptional<ZodNumber>;
  owner: ZodOptional<ZodString>;
  attachments: ZodOptional<ZodArray<ZodUnion<readonly [ZodCustom<File, File>, ZodString]>>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `name`: `ZodString`;
  `street`: `ZodOptional`\<`ZodString`\>;
  `city`: `ZodOptional`\<`ZodString`\>;
  `state`: `ZodOptional`\<`ZodString`\>;
  `postalCode`: `ZodOptional`\<`ZodString`\>;
  `country`: `ZodOptional`\<`ZodString`\>;
  `phoneNumber`: `ZodOptional`\<`ZodString`\>;
  `industry`: `ZodOptional`\<`ZodString`\>;
  `website`: `ZodOptional`\<`ZodString`\>;
  `annualRevenue`: `ZodOptional`\<`ZodNumber`\>;
  `owner`: `ZodOptional`\<`ZodString`\>;
  `attachments`: `ZodOptional`\<`ZodArray`\<`ZodUnion`\<readonly \[`ZodCustom`\<`File`, `File`\>, `ZodString`\]\>\>\>;
\}, `$strip`\>

***

### UpdateCompaniesSchema()

```ts
function UpdateCompaniesSchema(pocketbase: TypedPocketBase, record?: CustomerRelationsCompaniesRecord): ZodObject<{
  name: ZodOptional<ZodString>;
  street: ZodOptional<ZodOptional<ZodString>>;
  city: ZodOptional<ZodOptional<ZodString>>;
  state: ZodOptional<ZodOptional<ZodString>>;
  postalCode: ZodOptional<ZodOptional<ZodString>>;
  country: ZodOptional<ZodOptional<ZodString>>;
  phoneNumber: ZodOptional<ZodOptional<ZodString>>;
  industry: ZodOptional<ZodOptional<ZodString>>;
  website: ZodOptional<ZodOptional<ZodString>>;
  annualRevenue: ZodOptional<ZodOptional<ZodNumber>>;
  owner: ZodOptional<ZodOptional<ZodString>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`CustomerRelationsCompaniesRecord`](../../../lib/pb.types.md#customerrelationscompaniesrecord)

#### Returns

`ZodObject`\<\{
  `name`: `ZodOptional`\<`ZodString`\>;
  `street`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `city`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `state`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `postalCode`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `country`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `phoneNumber`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `industry`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `website`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `annualRevenue`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `owner`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
\}, `$strip`\>
# pocketbase/schemas/customer-relations/products

## Type Aliases

### Products

```ts
type Products = z.infer<typeof ProductsSchema>;
```

## Variables

### ProductsSchema

```ts
const ProductsSchema: ZodObject<{
  id: ZodString;
  name: ZodString;
  sku: ZodString;
  price: ZodNumber;
  type: ZodEnum<{
     service: "service";
     good: "good";
     digital: "digital";
     subscription: "subscription";
  }>;
  description: ZodOptional<ZodUnknown>;
  attachments: ZodOptional<ZodArray<ZodFile>>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateProductsSchema()

```ts
function CreateProductsSchema(pocketbase: TypedPocketBase): ZodObject<{
  name: ZodString;
  sku: ZodString;
  price: ZodNumber;
  type: ZodEnum<{
     service: "service";
     good: "good";
     digital: "digital";
     subscription: "subscription";
  }>;
  description: ZodOptional<ZodUnknown>;
  attachments: ZodOptional<ZodArray<ZodFile>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `name`: `ZodString`;
  `sku`: `ZodString`;
  `price`: `ZodNumber`;
  `type`: `ZodEnum`\<\{
     `service`: `"service"`;
     `good`: `"good"`;
     `digital`: `"digital"`;
     `subscription`: `"subscription"`;
  \}\>;
  `description`: `ZodOptional`\<`ZodUnknown`\>;
  `attachments`: `ZodOptional`\<`ZodArray`\<`ZodFile`\>\>;
\}, `$strip`\>

***

### UpdateProductsSchema()

```ts
function UpdateProductsSchema(pocketbase: TypedPocketBase, record?: CustomerRelationsProductsRecord): ZodObject<{
  name: ZodOptional<ZodString>;
  sku: ZodOptional<ZodString>;
  price: ZodOptional<ZodNumber>;
  type: ZodOptional<ZodEnum<{
     service: "service";
     good: "good";
     digital: "digital";
     subscription: "subscription";
  }>>;
  description: ZodOptional<ZodOptional<ZodUnknown>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`CustomerRelationsProductsRecord`](../../../lib/pb.types.md#customerrelationsproductsrecord)

#### Returns

`ZodObject`\<\{
  `name`: `ZodOptional`\<`ZodString`\>;
  `sku`: `ZodOptional`\<`ZodString`\>;
  `price`: `ZodOptional`\<`ZodNumber`\>;
  `type`: `ZodOptional`\<`ZodEnum`\<\{
     `service`: `"service"`;
     `good`: `"good"`;
     `digital`: `"digital"`;
     `subscription`: `"subscription"`;
  \}\>\>;
  `description`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
\}, `$strip`\>
# pocketbase/schemas/customer-relations/opportunity-products

## Type Aliases

### OpportunityProducts

```ts
type OpportunityProducts = z.infer<typeof OpportunityProductsSchema>;
```

## Variables

### OpportunityProductsSchema

```ts
const OpportunityProductsSchema: ZodObject<{
  id: ZodString;
  opportunity: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  quantity: ZodNumber;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateOpportunityProductsSchema()

```ts
function CreateOpportunityProductsSchema(pocketbase: TypedPocketBase): ZodObject<{
  product: ZodOptional<ZodString>;
  quantity: ZodNumber;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `product`: `ZodOptional`\<`ZodString`\>;
  `quantity`: `ZodNumber`;
\}, `$strip`\>

***

### UpdateOpportunityProductsSchema()

```ts
function UpdateOpportunityProductsSchema(pocketbase: TypedPocketBase, record?: CustomerRelationsOpportunityProductsRecord): ZodObject<{
  opportunity: ZodOptional<ZodOptional<ZodString>>;
  product: ZodOptional<ZodOptional<ZodString>>;
  quantity: ZodOptional<ZodNumber>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`CustomerRelationsOpportunityProductsRecord`](../../../lib/pb.types.md#customerrelationsopportunityproductsrecord)

#### Returns

`ZodObject`\<\{
  `opportunity`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `product`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `quantity`: `ZodOptional`\<`ZodNumber`\>;
\}, `$strip`\>
# pocketbase/schemas/customer-relations/leads

## Type Aliases

### Leads

```ts
type Leads = z.infer<typeof LeadsSchema>;
```

## Variables

### LeadsSchema

```ts
const LeadsSchema: ZodObject<{
  id: ZodString;
  name: ZodString;
  email: ZodOptional<ZodString>;
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
  }>;
  status: ZodOptional<ZodEnum<{
     new: "new";
     contacted: "contacted";
     qualified: "qualified";
     unqualified: "unqualified";
     converted: "converted";
  }>>;
  score: ZodNumber;
  owner: ZodString;
  campaign: ZodOptional<ZodString>;
  convertedAt: ZodOptional<ZodDate>;
  convertedContact: ZodOptional<ZodString>;
  convertedCompany: ZodOptional<ZodString>;
  convertedOpportunity: ZodOptional<ZodString>;
  attachments: ZodOptional<ZodArray<ZodFile>>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateLeadsSchema()

```ts
function CreateLeadsSchema(pocketbase: TypedPocketBase): ZodObject<{
  name: ZodString;
  email: ZodOptional<ZodString>;
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
  }>;
  status: ZodOptional<ZodEnum<{
     new: "new";
     contacted: "contacted";
     qualified: "qualified";
     unqualified: "unqualified";
     converted: "converted";
  }>>;
  score: ZodNumber;
  owner: ZodString;
  campaign: ZodOptional<ZodString>;
  convertedAt: ZodOptional<ZodDate>;
  convertedContact: ZodOptional<ZodString>;
  convertedCompany: ZodOptional<ZodString>;
  convertedOpportunity: ZodOptional<ZodString>;
  attachments: ZodOptional<ZodArray<ZodFile>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `name`: `ZodString`;
  `email`: `ZodOptional`\<`ZodString`\>;
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
  \}\>;
  `status`: `ZodOptional`\<`ZodEnum`\<\{
     `new`: `"new"`;
     `contacted`: `"contacted"`;
     `qualified`: `"qualified"`;
     `unqualified`: `"unqualified"`;
     `converted`: `"converted"`;
  \}\>\>;
  `score`: `ZodNumber`;
  `owner`: `ZodString`;
  `campaign`: `ZodOptional`\<`ZodString`\>;
  `convertedAt`: `ZodOptional`\<`ZodDate`\>;
  `convertedContact`: `ZodOptional`\<`ZodString`\>;
  `convertedCompany`: `ZodOptional`\<`ZodString`\>;
  `convertedOpportunity`: `ZodOptional`\<`ZodString`\>;
  `attachments`: `ZodOptional`\<`ZodArray`\<`ZodFile`\>\>;
\}, `$strip`\>

***

### UpdateLeadsSchema()

```ts
function UpdateLeadsSchema(pocketbase: TypedPocketBase, record?: CustomerRelationsLeadsRecord): ZodObject<{
  name: ZodOptional<ZodString>;
  email: ZodOptional<ZodOptional<ZodString>>;
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
  }>>;
  status: ZodOptional<ZodOptional<ZodEnum<{
     new: "new";
     contacted: "contacted";
     qualified: "qualified";
     unqualified: "unqualified";
     converted: "converted";
  }>>>;
  score: ZodOptional<ZodNumber>;
  owner: ZodOptional<ZodString>;
  campaign: ZodOptional<ZodOptional<ZodString>>;
  convertedAt: ZodOptional<ZodOptional<ZodDate>>;
  convertedContact: ZodOptional<ZodOptional<ZodString>>;
  convertedCompany: ZodOptional<ZodOptional<ZodString>>;
  convertedOpportunity: ZodOptional<ZodOptional<ZodString>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`CustomerRelationsLeadsRecord`](../../../lib/pb.types.md#customerrelationsleadsrecord)

#### Returns

`ZodObject`\<\{
  `name`: `ZodOptional`\<`ZodString`\>;
  `email`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
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
  \}\>\>;
  `status`: `ZodOptional`\<`ZodOptional`\<`ZodEnum`\<\{
     `new`: `"new"`;
     `contacted`: `"contacted"`;
     `qualified`: `"qualified"`;
     `unqualified`: `"unqualified"`;
     `converted`: `"converted"`;
  \}\>\>\>;
  `score`: `ZodOptional`\<`ZodNumber`\>;
  `owner`: `ZodOptional`\<`ZodString`\>;
  `campaign`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `convertedAt`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
  `convertedContact`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `convertedCompany`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `convertedOpportunity`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
\}, `$strip`\>
# pocketbase/schemas/customer-relations/invoice-items

## Type Aliases

### InvoiceItems

```ts
type InvoiceItems = z.infer<typeof InvoiceItemsSchema>;
```

## Variables

### InvoiceItemsSchema

```ts
const InvoiceItemsSchema: ZodObject<{
  id: ZodString;
  invoice: ZodString;
  product: ZodString;
  quantity: ZodNumber;
  price: ZodNumber;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateInvoiceItemsSchema()

```ts
function CreateInvoiceItemsSchema(pocketbase: TypedPocketBase): ZodObject<{
  product: ZodString;
  quantity: ZodNumber;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `product`: `ZodString`;
  `quantity`: `ZodNumber`;
\}, `$strip`\>

***

### UpdateInvoiceItemsSchema()

```ts
function UpdateInvoiceItemsSchema(pocketbase: TypedPocketBase, record?: CustomerRelationsInvoiceItemsRecord): ZodObject<{
  product: ZodOptional<ZodString>;
  quantity: ZodOptional<ZodNumber>;
  price: ZodOptional<ZodNumber>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`CustomerRelationsInvoiceItemsRecord`](../../../lib/pb.types.md#customerrelationsinvoiceitemsrecord)

#### Returns

`ZodObject`\<\{
  `product`: `ZodOptional`\<`ZodString`\>;
  `quantity`: `ZodOptional`\<`ZodNumber`\>;
  `price`: `ZodOptional`\<`ZodNumber`\>;
\}, `$strip`\>
# pocketbase/schemas/customer-relations/interactions

## Type Aliases

### Interactions

```ts
type Interactions = z.infer<typeof InteractionsSchema>;
```

## Variables

### InteractionsSchema

```ts
const InteractionsSchema: ZodObject<{
  id: ZodString;
  contact: ZodString;
  user: ZodString;
  case: ZodOptional<ZodString>;
  type: ZodOptional<ZodEnum<{
     text: "text";
     email: "email";
     call: "call";
     meeting: "meeting";
  }>>;
  outcome: ZodOptional<ZodString>;
  notes: ZodOptional<ZodString>;
  attachments: ZodOptional<ZodArray<ZodFile>>;
  interactionDate: ZodOptional<ZodDate>;
}, $strip>;
```

## Functions

### CreateInteractionsSchema()

```ts
function CreateInteractionsSchema(pocketbase: TypedPocketBase): ZodObject<{
  contact: ZodString;
  user: ZodString;
  case: ZodOptional<ZodString>;
  type: ZodOptional<ZodEnum<{
     text: "text";
     email: "email";
     call: "call";
     meeting: "meeting";
  }>>;
  outcome: ZodOptional<ZodString>;
  notes: ZodOptional<ZodString>;
  attachments: ZodOptional<ZodArray<ZodFile>>;
  interactionDate: ZodOptional<ZodDate>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `contact`: `ZodString`;
  `user`: `ZodString`;
  `case`: `ZodOptional`\<`ZodString`\>;
  `type`: `ZodOptional`\<`ZodEnum`\<\{
     `text`: `"text"`;
     `email`: `"email"`;
     `call`: `"call"`;
     `meeting`: `"meeting"`;
  \}\>\>;
  `outcome`: `ZodOptional`\<`ZodString`\>;
  `notes`: `ZodOptional`\<`ZodString`\>;
  `attachments`: `ZodOptional`\<`ZodArray`\<`ZodFile`\>\>;
  `interactionDate`: `ZodOptional`\<`ZodDate`\>;
\}, `$strip`\>

***

### UpdateInteractionsSchema()

```ts
function UpdateInteractionsSchema(pocketbase: TypedPocketBase, record?: CustomerRelationsInteractionsRecord): ZodObject<{
  contact: ZodOptional<ZodString>;
  user: ZodOptional<ZodString>;
  case: ZodOptional<ZodOptional<ZodString>>;
  type: ZodOptional<ZodOptional<ZodEnum<{
     text: "text";
     email: "email";
     call: "call";
     meeting: "meeting";
  }>>>;
  outcome: ZodOptional<ZodOptional<ZodString>>;
  notes: ZodOptional<ZodOptional<ZodString>>;
  interactionDate: ZodOptional<ZodOptional<ZodDate>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`CustomerRelationsInteractionsRecord`](../../../lib/pb.types.md#customerrelationsinteractionsrecord)

#### Returns

`ZodObject`\<\{
  `contact`: `ZodOptional`\<`ZodString`\>;
  `user`: `ZodOptional`\<`ZodString`\>;
  `case`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `type`: `ZodOptional`\<`ZodOptional`\<`ZodEnum`\<\{
     `text`: `"text"`;
     `email`: `"email"`;
     `call`: `"call"`;
     `meeting`: `"meeting"`;
  \}\>\>\>;
  `outcome`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `notes`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `interactionDate`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
\}, `$strip`\>
# pocketbase/schemas/customer-relations/campaigns

## Type Aliases

### Campaigns

```ts
type Campaigns = z.infer<typeof CampaignsSchema>;
```

## Variables

### CampaignsSchema

```ts
const CampaignsSchema: ZodObject<{
  id: ZodString;
  name: ZodString;
  budget: ZodNumber;
  startDate: ZodOptional<ZodDate>;
  endDate: ZodOptional<ZodDate>;
  attachments: ZodOptional<ZodArray<ZodFile>>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateCampaignsSchema()

```ts
function CreateCampaignsSchema(pocketbase: TypedPocketBase): ZodObject<{
  name: ZodString;
  budget: ZodNumber;
  startDate: ZodOptional<ZodDate>;
  endDate: ZodOptional<ZodDate>;
  attachments: ZodOptional<ZodArray<ZodFile>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `name`: `ZodString`;
  `budget`: `ZodNumber`;
  `startDate`: `ZodOptional`\<`ZodDate`\>;
  `endDate`: `ZodOptional`\<`ZodDate`\>;
  `attachments`: `ZodOptional`\<`ZodArray`\<`ZodFile`\>\>;
\}, `$strip`\>

***

### UpdateCampaignsSchema()

```ts
function UpdateCampaignsSchema(pocketbase: TypedPocketBase, record?: CustomerRelationsCampaignsRecord): ZodObject<{
  name: ZodOptional<ZodString>;
  budget: ZodOptional<ZodNumber>;
  startDate: ZodOptional<ZodOptional<ZodDate>>;
  endDate: ZodOptional<ZodOptional<ZodDate>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`CustomerRelationsCampaignsRecord`](../../../lib/pb.types.md#customerrelationscampaignsrecord)

#### Returns

`ZodObject`\<\{
  `name`: `ZodOptional`\<`ZodString`\>;
  `budget`: `ZodOptional`\<`ZodNumber`\>;
  `startDate`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
  `endDate`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
\}, `$strip`\>
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
# pocketbase/schemas/system/mfas

## Type Aliases

### Mfas

```ts
type Mfas = z.infer<typeof MfasSchema>;
```

## Variables

### MfasSchema

```ts
const MfasSchema: ZodObject<{
  collectionRef: ZodString;
  created: ZodDate;
  id: ZodString;
  method: ZodString;
  recordRef: ZodString;
  updated: ZodDate;
}, $strip>;
```
# pocketbase/schemas/system/otps

## Type Aliases

### Otps

```ts
type Otps = z.infer<typeof OtpsSchema>;
```

## Variables

### OtpsSchema

```ts
const OtpsSchema: ZodObject<{
  collectionRef: ZodString;
  created: ZodDate;
  id: ZodString;
  password: ZodString;
  recordRef: ZodString;
  sentTo: ZodOptional<ZodString>;
  updated: ZodDate;
}, $strip>;
```
# pocketbase/schemas/system/users

## Type Aliases

### Users

```ts
type Users = z.infer<typeof UsersSchema>;
```

## Variables

### UsersSchema

```ts
const UsersSchema: ZodObject<{
  id: ZodString;
  password: ZodUnknown;
  tokenKey: ZodString;
  email: ZodEmail;
  emailVisibility: ZodOptional<ZodUnknown>;
  verified: ZodOptional<ZodUnknown>;
  name: ZodOptional<ZodString>;
  avatar: ZodOptional<ZodFile>;
  roles: ZodOptional<ZodArray<ZodEnum<{
     user: "user";
     driver: "driver";
     client: "client";
     carrier: "carrier";
     admin: "admin";
     developer: "developer";
     client-admin: "client-admin";
     end-customer: "end-customer";
     inventory-manager: "inventory-manager";
     warehouse-manager: "warehouse-manager";
     receiving-manager: "receiving-manager";
     warehouse-operator: "warehouse-operator";
     picker: "picker";
     packer: "packer";
     returns-processor: "returns-processor";
     qc-manager: "qc-manager";
     logistics-coordinator: "logistics-coordinator";
     logistics-manager: "logistics-manager";
     logistics-planner: "logistics-planner";
     dispatcher: "dispatcher";
     fleet-manager: "fleet-manager";
     transport-manager: "transport-manager";
     account-manager: "account-manager";
     pricing-analyst: "pricing-analyst";
     finance-manager: "finance-manager";
     accountant: "accountant";
     sdr: "sdr";
     sales-rep: "sales-rep";
     sales-manager: "sales-manager";
     marketing-manager: "marketing-manager";
     customer-support-agent: "customer-support-agent";
     product-manager: "product-manager";
  }>>>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```
# pocketbase/schemas/system/notifications

## Type Aliases

### Notifications

```ts
type Notifications = z.infer<typeof NotificationsSchema>;
```

## Variables

### NotificationsSchema

```ts
const NotificationsSchema: ZodObject<{
  id: ZodString;
  user: ZodString;
  message: ZodUnknown;
  isRead: ZodOptional<ZodUnknown>;
  link: ZodOptional<ZodURL>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```
# pocketbase/schemas/system/externalauths

## Type Aliases

### Externalauths

```ts
type Externalauths = z.infer<typeof ExternalauthsSchema>;
```

## Variables

### ExternalauthsSchema

```ts
const ExternalauthsSchema: ZodObject<{
  collectionRef: ZodString;
  created: ZodDate;
  id: ZodString;
  provider: ZodString;
  providerId: ZodString;
  recordRef: ZodString;
  updated: ZodDate;
}, $strip>;
```
# pocketbase/schemas/system/authorigins

## Type Aliases

### Authorigins

```ts
type Authorigins = z.infer<typeof AuthoriginsSchema>;
```

## Variables

### AuthoriginsSchema

```ts
const AuthoriginsSchema: ZodObject<{
  collectionRef: ZodString;
  created: ZodDate;
  fingerprint: ZodString;
  id: ZodString;
  recordRef: ZodString;
  updated: ZodDate;
}, $strip>;
```
# pocketbase/schemas/system/superusers

## Type Aliases

### Superusers

```ts
type Superusers = z.infer<typeof SuperusersSchema>;
```

## Variables

### SuperusersSchema

```ts
const SuperusersSchema: ZodObject<{
  created: ZodDate;
  email: ZodString;
  emailVisibility: ZodOptional<ZodBoolean>;
  id: ZodString;
  password: ZodString;
  tokenKey: ZodString;
  updated: ZodDate;
  verified: ZodOptional<ZodBoolean>;
}, $strip>;
```
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
# pocketbase/schemas/warehouse-management

## References

### InboundShipmentItemsSchema

Re-exports [InboundShipmentItemsSchema](warehouse-management/inbound-shipment-items.md#inboundshipmentitemsschema)

***

### InboundShipmentItems

Re-exports [InboundShipmentItems](warehouse-management/inbound-shipment-items.md#inboundshipmentitems)

***

### CreateInboundShipmentItemsSchema

Re-exports [CreateInboundShipmentItemsSchema](warehouse-management/inbound-shipment-items.md#createinboundshipmentitemsschema)

***

### UpdateInboundShipmentItemsSchema

Re-exports [UpdateInboundShipmentItemsSchema](warehouse-management/inbound-shipment-items.md#updateinboundshipmentitemsschema)

***

### InboundShipmentsSchema

Re-exports [InboundShipmentsSchema](warehouse-management/inbound-shipments.md#inboundshipmentsschema)

***

### InboundShipments

Re-exports [InboundShipments](warehouse-management/inbound-shipments.md#inboundshipments)

***

### CreateInboundShipmentsSchema

Re-exports [CreateInboundShipmentsSchema](warehouse-management/inbound-shipments.md#createinboundshipmentsschema)

***

### UpdateInboundShipmentsSchema

Re-exports [UpdateInboundShipmentsSchema](warehouse-management/inbound-shipments.md#updateinboundshipmentsschema)

***

### InventoryAdjustmentSchema

Re-exports [InventoryAdjustmentSchema](warehouse-management/inventory-adjustment.md#inventoryadjustmentschema)

***

### InventoryAdjustment

Re-exports [InventoryAdjustment](warehouse-management/inventory-adjustment.md#inventoryadjustment)

***

### CreateInventoryAdjustmentSchema

Re-exports [CreateInventoryAdjustmentSchema](warehouse-management/inventory-adjustment.md#createinventoryadjustmentschema)

***

### UpdateInventoryAdjustmentSchema

Re-exports [UpdateInventoryAdjustmentSchema](warehouse-management/inventory-adjustment.md#updateinventoryadjustmentschema)

***

### InventoryBatchesSchema

Re-exports [InventoryBatchesSchema](warehouse-management/inventory-batches.md#inventorybatchesschema)

***

### InventoryBatches

Re-exports [InventoryBatches](warehouse-management/inventory-batches.md#inventorybatches)

***

### CreateInventoryBatchesSchema

Re-exports [CreateInventoryBatchesSchema](warehouse-management/inventory-batches.md#createinventorybatchesschema)

***

### UpdateInventoryBatchesSchema

Re-exports [UpdateInventoryBatchesSchema](warehouse-management/inventory-batches.md#updateinventorybatchesschema)

***

### InventoryStockSchema

Re-exports [InventoryStockSchema](warehouse-management/inventory-stock.md#inventorystockschema)

***

### InventoryStock

Re-exports [InventoryStock](warehouse-management/inventory-stock.md#inventorystock)

***

### CreateInventoryStockSchema

Re-exports [CreateInventoryStockSchema](warehouse-management/inventory-stock.md#createinventorystockschema)

***

### UpdateInventoryStockSchema

Re-exports [UpdateInventoryStockSchema](warehouse-management/inventory-stock.md#updateinventorystockschema)

***

### LocationsSchema

Re-exports [LocationsSchema](warehouse-management/locations.md#locationsschema)

***

### Locations

Re-exports [Locations](warehouse-management/locations.md#locations)

***

### CreateLocationsSchema

Re-exports [CreateLocationsSchema](warehouse-management/locations.md#createlocationsschema)

***

### UpdateLocationsSchema

Re-exports [UpdateLocationsSchema](warehouse-management/locations.md#updatelocationsschema)

***

### OutboundShipmentItemsSchema

Re-exports [OutboundShipmentItemsSchema](warehouse-management/outbound-shipment-items.md#outboundshipmentitemsschema)

***

### OutboundShipmentItems

Re-exports [OutboundShipmentItems](warehouse-management/outbound-shipment-items.md#outboundshipmentitems)

***

### CreateOutboundShipmentItemsSchema

Re-exports [CreateOutboundShipmentItemsSchema](warehouse-management/outbound-shipment-items.md#createoutboundshipmentitemsschema)

***

### UpdateOutboundShipmentItemsSchema

Re-exports [UpdateOutboundShipmentItemsSchema](warehouse-management/outbound-shipment-items.md#updateoutboundshipmentitemsschema)

***

### OutboundShipmentsSchema

Re-exports [OutboundShipmentsSchema](warehouse-management/outbound-shipments.md#outboundshipmentsschema)

***

### OutboundShipments

Re-exports [OutboundShipments](warehouse-management/outbound-shipments.md#outboundshipments)

***

### CreateOutboundShipmentsSchema

Re-exports [CreateOutboundShipmentsSchema](warehouse-management/outbound-shipments.md#createoutboundshipmentsschema)

***

### UpdateOutboundShipmentsSchema

Re-exports [UpdateOutboundShipmentsSchema](warehouse-management/outbound-shipments.md#updateoutboundshipmentsschema)

***

### PackageItemsSchema

Re-exports [PackageItemsSchema](warehouse-management/package-items.md#packageitemsschema)

***

### PackageItems

Re-exports [PackageItems](warehouse-management/package-items.md#packageitems)

***

### CreatePackageItemsSchema

Re-exports [CreatePackageItemsSchema](warehouse-management/package-items.md#createpackageitemsschema)

***

### UpdatePackageItemsSchema

Re-exports [UpdatePackageItemsSchema](warehouse-management/package-items.md#updatepackageitemsschema)

***

### PackagesSchema

Re-exports [PackagesSchema](warehouse-management/packages.md#packagesschema)

***

### Packages

Re-exports [Packages](warehouse-management/packages.md#packages)

***

### CreatePackagesSchema

Re-exports [CreatePackagesSchema](warehouse-management/packages.md#createpackagesschema)

***

### UpdatePackagesSchema

Re-exports [UpdatePackagesSchema](warehouse-management/packages.md#updatepackagesschema)

***

### ProductsSchema

Re-exports [ProductsSchema](warehouse-management/products.md#productsschema)

***

### Products

Re-exports [Products](warehouse-management/products.md#products)

***

### CreateProductsSchema

Re-exports [CreateProductsSchema](warehouse-management/products.md#createproductsschema)

***

### UpdateProductsSchema

Re-exports [UpdateProductsSchema](warehouse-management/products.md#updateproductsschema)

***

### ReturnItemsSchema

Re-exports [ReturnItemsSchema](warehouse-management/return-items.md#returnitemsschema)

***

### ReturnItems

Re-exports [ReturnItems](warehouse-management/return-items.md#returnitems)

***

### CreateReturnItemsSchema

Re-exports [CreateReturnItemsSchema](warehouse-management/return-items.md#createreturnitemsschema)

***

### UpdateReturnItemsSchema

Re-exports [UpdateReturnItemsSchema](warehouse-management/return-items.md#updatereturnitemsschema)

***

### ReturnsSchema

Re-exports [ReturnsSchema](warehouse-management/returns.md#returnsschema)

***

### Returns

Re-exports [Returns](warehouse-management/returns.md#returns)

***

### CreateReturnsSchema

Re-exports [CreateReturnsSchema](warehouse-management/returns.md#createreturnsschema)

***

### UpdateReturnsSchema

Re-exports [UpdateReturnsSchema](warehouse-management/returns.md#updatereturnsschema)

***

### SalesOrderItemsSchema

Re-exports [SalesOrderItemsSchema](warehouse-management/sales-order-items.md#salesorderitemsschema)

***

### SalesOrderItems

Re-exports [SalesOrderItems](warehouse-management/sales-order-items.md#salesorderitems)

***

### CreateSalesOrderItemsSchema

Re-exports [CreateSalesOrderItemsSchema](warehouse-management/sales-order-items.md#createsalesorderitemsschema)

***

### UpdateSalesOrderItemsSchema

Re-exports [UpdateSalesOrderItemsSchema](warehouse-management/sales-order-items.md#updatesalesorderitemsschema)

***

### SalesOrdersSchema

Re-exports [SalesOrdersSchema](warehouse-management/sales-orders.md#salesordersschema)

***

### SalesOrders

Re-exports [SalesOrders](warehouse-management/sales-orders.md#salesorders)

***

### CreateSalesOrdersSchema

Re-exports [CreateSalesOrdersSchema](warehouse-management/sales-orders.md#createsalesordersschema)

***

### UpdateSalesOrdersSchema

Re-exports [UpdateSalesOrdersSchema](warehouse-management/sales-orders.md#updatesalesordersschema)

***

### SuppliersSchema

Re-exports [SuppliersSchema](warehouse-management/suppliers.md#suppliersschema)

***

### Suppliers

Re-exports [Suppliers](warehouse-management/suppliers.md#suppliers)

***

### CreateSuppliersSchema

Re-exports [CreateSuppliersSchema](warehouse-management/suppliers.md#createsuppliersschema)

***

### UpdateSuppliersSchema

Re-exports [UpdateSuppliersSchema](warehouse-management/suppliers.md#updatesuppliersschema)

***

### WarehousesSchema

Re-exports [WarehousesSchema](warehouse-management/warehouses.md#warehousesschema)

***

### Warehouses

Re-exports [Warehouses](warehouse-management/warehouses.md#warehouses)

***

### CreateWarehousesSchema

Re-exports [CreateWarehousesSchema](warehouse-management/warehouses.md#createwarehousesschema)

***

### UpdateWarehousesSchema

Re-exports [UpdateWarehousesSchema](warehouse-management/warehouses.md#updatewarehousesschema)
# pocketbase/schemas/warehouse-management/inbound-shipments

## Type Aliases

### InboundShipments

```ts
type InboundShipments = z.infer<typeof InboundShipmentsSchema>;
```

## Variables

### InboundShipmentsSchema

```ts
const InboundShipmentsSchema: ZodObject<{
  id: ZodString;
  client: ZodString;
  status: ZodOptional<ZodEnum<{
     cancelled: "cancelled";
     pending: "pending";
     arrived: "arrived";
     processing: "processing";
     completed: "completed";
  }>>;
  expectedArrivalDate: ZodOptional<ZodDate>;
  actualArrivalDate: ZodOptional<ZodDate>;
  warehouse: ZodString;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
  items: ZodOptional<ZodArray<ZodString>>;
}, $strip>;
```

## Functions

### CreateInboundShipmentsSchema()

```ts
function CreateInboundShipmentsSchema(pocketbase: TypedPocketBase): ZodObject<{
  client: ZodString;
  status: ZodOptional<ZodEnum<{
     cancelled: "cancelled";
     pending: "pending";
     arrived: "arrived";
     processing: "processing";
     completed: "completed";
  }>>;
  expectedArrivalDate: ZodOptional<ZodDate>;
  actualArrivalDate: ZodOptional<ZodDate>;
  warehouse: ZodString;
  items: ZodArray<ZodObject<{
     inboundShipment: ZodOptional<ZodString>;
     product: ZodOptional<ZodString>;
     expectedQuantity: ZodNumber;
     receivedQuantity: ZodOptional<ZodNumber>;
     discrepancyNotes: ZodOptional<ZodUnknown>;
  }, $strip>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `client`: `ZodString`;
  `status`: `ZodOptional`\<`ZodEnum`\<\{
     `cancelled`: `"cancelled"`;
     `pending`: `"pending"`;
     `arrived`: `"arrived"`;
     `processing`: `"processing"`;
     `completed`: `"completed"`;
  \}\>\>;
  `expectedArrivalDate`: `ZodOptional`\<`ZodDate`\>;
  `actualArrivalDate`: `ZodOptional`\<`ZodDate`\>;
  `warehouse`: `ZodString`;
  `items`: `ZodArray`\<`ZodObject`\<\{
     `inboundShipment`: `ZodOptional`\<`ZodString`\>;
     `product`: `ZodOptional`\<`ZodString`\>;
     `expectedQuantity`: `ZodNumber`;
     `receivedQuantity`: `ZodOptional`\<`ZodNumber`\>;
     `discrepancyNotes`: `ZodOptional`\<`ZodUnknown`\>;
  \}, `$strip`\>\>;
\}, `$strip`\>

***

### UpdateInboundShipmentsSchema()

```ts
function UpdateInboundShipmentsSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementInboundShipmentsRecord): ZodObject<{
  client: ZodOptional<ZodString>;
  status: ZodOptional<ZodOptional<ZodEnum<{
     cancelled: "cancelled";
     pending: "pending";
     arrived: "arrived";
     processing: "processing";
     completed: "completed";
  }>>>;
  expectedArrivalDate: ZodOptional<ZodOptional<ZodDate>>;
  actualArrivalDate: ZodOptional<ZodOptional<ZodDate>>;
  warehouse: ZodOptional<ZodString>;
  items: ZodOptional<ZodArray<ZodObject<{
     inboundShipment: ZodOptional<ZodString>;
     product: ZodOptional<ZodString>;
     expectedQuantity: ZodNumber;
     receivedQuantity: ZodOptional<ZodNumber>;
     discrepancyNotes: ZodOptional<ZodUnknown>;
  }, $strip>>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementInboundShipmentsRecord`](../../../lib/pb.types.md#warehousemanagementinboundshipmentsrecord)

#### Returns

`ZodObject`\<\{
  `client`: `ZodOptional`\<`ZodString`\>;
  `status`: `ZodOptional`\<`ZodOptional`\<`ZodEnum`\<\{
     `cancelled`: `"cancelled"`;
     `pending`: `"pending"`;
     `arrived`: `"arrived"`;
     `processing`: `"processing"`;
     `completed`: `"completed"`;
  \}\>\>\>;
  `expectedArrivalDate`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
  `actualArrivalDate`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
  `warehouse`: `ZodOptional`\<`ZodString`\>;
  `items`: `ZodOptional`\<`ZodArray`\<`ZodObject`\<\{
     `inboundShipment`: `ZodOptional`\<`ZodString`\>;
     `product`: `ZodOptional`\<`ZodString`\>;
     `expectedQuantity`: `ZodNumber`;
     `receivedQuantity`: `ZodOptional`\<`ZodNumber`\>;
     `discrepancyNotes`: `ZodOptional`\<`ZodUnknown`\>;
  \}, `$strip`\>\>\>;
\}, `$strip`\>
# pocketbase/schemas/warehouse-management/suppliers

## Type Aliases

### Suppliers

```ts
type Suppliers = z.infer<typeof SuppliersSchema>;
```

## Variables

### SuppliersSchema

```ts
const SuppliersSchema: ZodObject<{
  id: ZodString;
  name: ZodString;
  contactPerson: ZodOptional<ZodString>;
  email: ZodOptional<ZodEmail>;
  phoneNumber: ZodOptional<ZodString>;
  client: ZodOptional<ZodString>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateSuppliersSchema()

```ts
function CreateSuppliersSchema(pocketbase: TypedPocketBase): ZodObject<{
  name: ZodString;
  contactPerson: ZodOptional<ZodString>;
  email: ZodOptional<ZodEmail>;
  phoneNumber: ZodOptional<ZodString>;
  client: ZodOptional<ZodString>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `name`: `ZodString`;
  `contactPerson`: `ZodOptional`\<`ZodString`\>;
  `email`: `ZodOptional`\<`ZodEmail`\>;
  `phoneNumber`: `ZodOptional`\<`ZodString`\>;
  `client`: `ZodOptional`\<`ZodString`\>;
\}, `$strip`\>

***

### UpdateSuppliersSchema()

```ts
function UpdateSuppliersSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementSuppliersRecord): ZodObject<{
  name: ZodOptional<ZodString>;
  contactPerson: ZodOptional<ZodOptional<ZodString>>;
  email: ZodOptional<ZodOptional<ZodEmail>>;
  phoneNumber: ZodOptional<ZodOptional<ZodString>>;
  client: ZodOptional<ZodOptional<ZodString>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementSuppliersRecord`](../../../lib/pb.types.md#warehousemanagementsuppliersrecord)

#### Returns

`ZodObject`\<\{
  `name`: `ZodOptional`\<`ZodString`\>;
  `contactPerson`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `email`: `ZodOptional`\<`ZodOptional`\<`ZodEmail`\>\>;
  `phoneNumber`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `client`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
\}, `$strip`\>
# pocketbase/schemas/warehouse-management/outbound-shipment-items

## Type Aliases

### OutboundShipmentItems

```ts
type OutboundShipmentItems = z.infer<typeof OutboundShipmentItemsSchema>;
```

## Variables

### OutboundShipmentItemsSchema

```ts
const OutboundShipmentItemsSchema: ZodObject<{
  id: ZodString;
  outboundShipment: ZodString;
  salesOrderItem: ZodString;
  product: ZodString;
  batch: ZodOptional<ZodString>;
  quantityShipped: ZodNumber;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateOutboundShipmentItemsSchema()

```ts
function CreateOutboundShipmentItemsSchema(pocketbase: TypedPocketBase): ZodObject<{
  outboundShipment: ZodString;
  salesOrderItem: ZodString;
  product: ZodString;
  batch: ZodOptional<ZodString>;
  quantityShipped: ZodNumber;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `outboundShipment`: `ZodString`;
  `salesOrderItem`: `ZodString`;
  `product`: `ZodString`;
  `batch`: `ZodOptional`\<`ZodString`\>;
  `quantityShipped`: `ZodNumber`;
\}, `$strip`\>

***

### UpdateOutboundShipmentItemsSchema()

```ts
function UpdateOutboundShipmentItemsSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementOutboundShipmentItemsRecord): ZodObject<{
  outboundShipment: ZodOptional<ZodString>;
  salesOrderItem: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  batch: ZodOptional<ZodOptional<ZodString>>;
  quantityShipped: ZodOptional<ZodNumber>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementOutboundShipmentItemsRecord`](../../../lib/pb.types.md#warehousemanagementoutboundshipmentitemsrecord)

#### Returns

`ZodObject`\<\{
  `outboundShipment`: `ZodOptional`\<`ZodString`\>;
  `salesOrderItem`: `ZodOptional`\<`ZodString`\>;
  `product`: `ZodOptional`\<`ZodString`\>;
  `batch`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `quantityShipped`: `ZodOptional`\<`ZodNumber`\>;
\}, `$strip`\>
# pocketbase/schemas/warehouse-management/inventory-adjustment

## Type Aliases

### InventoryAdjustment

```ts
type InventoryAdjustment = z.infer<typeof InventoryAdjustmentSchema>;
```

## Variables

### InventoryAdjustmentSchema

```ts
const InventoryAdjustmentSchema: ZodObject<{
  id: ZodString;
  product: ZodString;
  user: ZodString;
  quantityChange: ZodNumber;
  reason: ZodEnum<{
     cycle-count: "cycle-count";
     damaged-goods: "damaged-goods";
     theft: "theft";
     expired: "expired";
     return-to-vendor: "return-to-vendor";
     manual-correction: "manual-correction";
  }>;
  notes: ZodOptional<ZodUnknown>;
  warehouse: ZodString;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateInventoryAdjustmentSchema()

```ts
function CreateInventoryAdjustmentSchema(pocketbase: TypedPocketBase): ZodObject<{
  product: ZodString;
  user: ZodString;
  quantityChange: ZodNumber;
  reason: ZodEnum<{
     cycle-count: "cycle-count";
     damaged-goods: "damaged-goods";
     theft: "theft";
     expired: "expired";
     return-to-vendor: "return-to-vendor";
     manual-correction: "manual-correction";
  }>;
  notes: ZodOptional<ZodUnknown>;
  warehouse: ZodString;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `product`: `ZodString`;
  `user`: `ZodString`;
  `quantityChange`: `ZodNumber`;
  `reason`: `ZodEnum`\<\{
     `cycle-count`: `"cycle-count"`;
     `damaged-goods`: `"damaged-goods"`;
     `theft`: `"theft"`;
     `expired`: `"expired"`;
     `return-to-vendor`: `"return-to-vendor"`;
     `manual-correction`: `"manual-correction"`;
  \}\>;
  `notes`: `ZodOptional`\<`ZodUnknown`\>;
  `warehouse`: `ZodString`;
\}, `$strip`\>

***

### UpdateInventoryAdjustmentSchema()

```ts
function UpdateInventoryAdjustmentSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementInventoryAdjustmentRecord): ZodObject<{
  product: ZodOptional<ZodString>;
  user: ZodOptional<ZodString>;
  quantityChange: ZodOptional<ZodNumber>;
  reason: ZodOptional<ZodEnum<{
     cycle-count: "cycle-count";
     damaged-goods: "damaged-goods";
     theft: "theft";
     expired: "expired";
     return-to-vendor: "return-to-vendor";
     manual-correction: "manual-correction";
  }>>;
  notes: ZodOptional<ZodOptional<ZodUnknown>>;
  warehouse: ZodOptional<ZodString>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementInventoryAdjustmentRecord`](../../../lib/pb.types.md#warehousemanagementinventoryadjustmentrecord)

#### Returns

`ZodObject`\<\{
  `product`: `ZodOptional`\<`ZodString`\>;
  `user`: `ZodOptional`\<`ZodString`\>;
  `quantityChange`: `ZodOptional`\<`ZodNumber`\>;
  `reason`: `ZodOptional`\<`ZodEnum`\<\{
     `cycle-count`: `"cycle-count"`;
     `damaged-goods`: `"damaged-goods"`;
     `theft`: `"theft"`;
     `expired`: `"expired"`;
     `return-to-vendor`: `"return-to-vendor"`;
     `manual-correction`: `"manual-correction"`;
  \}\>\>;
  `notes`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
  `warehouse`: `ZodOptional`\<`ZodString`\>;
\}, `$strip`\>
# pocketbase/schemas/warehouse-management/products

## Type Aliases

### Products

```ts
type Products = z.infer<typeof ProductsSchema>;
```

## Variables

### ProductsSchema

```ts
const ProductsSchema: ZodObject<{
  id: ZodString;
  sku: ZodString;
  name: ZodString;
  barcode: ZodOptional<ZodString>;
  description: ZodOptional<ZodString>;
  category: ZodOptional<ZodString>;
  price: ZodOptional<ZodNumber>;
  unit: ZodOptional<ZodString>;
  weight: ZodOptional<ZodNumber>;
  length: ZodOptional<ZodNumber>;
  width: ZodOptional<ZodNumber>;
  height: ZodOptional<ZodNumber>;
  status: ZodOptional<ZodEnum<{
     active: "active";
     discontinued: "discontinued";
     obsolete: "obsolete";
  }>>;
  supplier: ZodOptional<ZodString>;
  client: ZodOptional<ZodString>;
  images: ZodOptional<ZodArray<ZodString>>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateProductsSchema()

```ts
function CreateProductsSchema(pocketbase: TypedPocketBase): ZodObject<{
  sku: ZodString;
  name: ZodString;
  barcode: ZodOptional<ZodString>;
  description: ZodOptional<ZodString>;
  category: ZodOptional<ZodString>;
  price: ZodOptional<ZodNumber>;
  unit: ZodOptional<ZodString>;
  weight: ZodOptional<ZodNumber>;
  length: ZodOptional<ZodNumber>;
  width: ZodOptional<ZodNumber>;
  height: ZodOptional<ZodNumber>;
  status: ZodOptional<ZodEnum<{
     active: "active";
     discontinued: "discontinued";
     obsolete: "obsolete";
  }>>;
  supplier: ZodOptional<ZodString>;
  client: ZodOptional<ZodString>;
  images: ZodOptional<ZodArray<ZodString>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `sku`: `ZodString`;
  `name`: `ZodString`;
  `barcode`: `ZodOptional`\<`ZodString`\>;
  `description`: `ZodOptional`\<`ZodString`\>;
  `category`: `ZodOptional`\<`ZodString`\>;
  `price`: `ZodOptional`\<`ZodNumber`\>;
  `unit`: `ZodOptional`\<`ZodString`\>;
  `weight`: `ZodOptional`\<`ZodNumber`\>;
  `length`: `ZodOptional`\<`ZodNumber`\>;
  `width`: `ZodOptional`\<`ZodNumber`\>;
  `height`: `ZodOptional`\<`ZodNumber`\>;
  `status`: `ZodOptional`\<`ZodEnum`\<\{
     `active`: `"active"`;
     `discontinued`: `"discontinued"`;
     `obsolete`: `"obsolete"`;
  \}\>\>;
  `supplier`: `ZodOptional`\<`ZodString`\>;
  `client`: `ZodOptional`\<`ZodString`\>;
  `images`: `ZodOptional`\<`ZodArray`\<`ZodString`\>\>;
\}, `$strip`\>

***

### UpdateProductsSchema()

```ts
function UpdateProductsSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementProductsRecord): ZodObject<{
  sku: ZodOptional<ZodString>;
  name: ZodOptional<ZodString>;
  barcode: ZodOptional<ZodOptional<ZodString>>;
  description: ZodOptional<ZodOptional<ZodString>>;
  category: ZodOptional<ZodOptional<ZodString>>;
  price: ZodOptional<ZodOptional<ZodNumber>>;
  unit: ZodOptional<ZodOptional<ZodString>>;
  weight: ZodOptional<ZodOptional<ZodNumber>>;
  length: ZodOptional<ZodOptional<ZodNumber>>;
  width: ZodOptional<ZodOptional<ZodNumber>>;
  height: ZodOptional<ZodOptional<ZodNumber>>;
  status: ZodOptional<ZodOptional<ZodEnum<{
     active: "active";
     discontinued: "discontinued";
     obsolete: "obsolete";
  }>>>;
  supplier: ZodOptional<ZodOptional<ZodString>>;
  client: ZodOptional<ZodOptional<ZodString>>;
  images: ZodOptional<ZodOptional<ZodArray<ZodString>>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementProductsRecord`](../../../lib/pb.types.md#warehousemanagementproductsrecord)

#### Returns

`ZodObject`\<\{
  `sku`: `ZodOptional`\<`ZodString`\>;
  `name`: `ZodOptional`\<`ZodString`\>;
  `barcode`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `description`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `category`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `price`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `unit`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `weight`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `length`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `width`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `height`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `status`: `ZodOptional`\<`ZodOptional`\<`ZodEnum`\<\{
     `active`: `"active"`;
     `discontinued`: `"discontinued"`;
     `obsolete`: `"obsolete"`;
  \}\>\>\>;
  `supplier`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `client`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `images`: `ZodOptional`\<`ZodOptional`\<`ZodArray`\<`ZodString`\>\>\>;
\}, `$strip`\>
# pocketbase/schemas/warehouse-management/outbound-shipments

## Type Aliases

### OutboundShipments

```ts
type OutboundShipments = z.infer<typeof OutboundShipmentsSchema>;
```

## Variables

### OutboundShipmentsSchema

```ts
const OutboundShipmentsSchema: ZodObject<{
  id: ZodString;
  salesOrder: ZodString;
  status: ZodOptional<ZodEnum<{
     cancelled: "cancelled";
     delivered: "delivered";
     shipped: "shipped";
     picking: "picking";
     packed: "packed";
  }>>;
  trackingNumber: ZodString;
  carrier: ZodOptional<ZodString>;
  warehouse: ZodString;
  items: ZodArray<ZodString>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateOutboundShipmentsSchema()

```ts
function CreateOutboundShipmentsSchema(pocketbase: TypedPocketBase): ZodObject<{
  salesOrder: ZodString;
  status: ZodOptional<ZodEnum<{
     cancelled: "cancelled";
     delivered: "delivered";
     shipped: "shipped";
     picking: "picking";
     packed: "packed";
  }>>;
  trackingNumber: ZodString;
  carrier: ZodOptional<ZodString>;
  warehouse: ZodString;
  items: ZodArray<ZodObject<{
     outboundShipment: ZodString;
     salesOrderItem: ZodString;
     product: ZodString;
     batch: ZodOptional<ZodString>;
     quantityShipped: ZodNumber;
  }, $strip>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `salesOrder`: `ZodString`;
  `status`: `ZodOptional`\<`ZodEnum`\<\{
     `cancelled`: `"cancelled"`;
     `delivered`: `"delivered"`;
     `shipped`: `"shipped"`;
     `picking`: `"picking"`;
     `packed`: `"packed"`;
  \}\>\>;
  `trackingNumber`: `ZodString`;
  `carrier`: `ZodOptional`\<`ZodString`\>;
  `warehouse`: `ZodString`;
  `items`: `ZodArray`\<`ZodObject`\<\{
     `outboundShipment`: `ZodString`;
     `salesOrderItem`: `ZodString`;
     `product`: `ZodString`;
     `batch`: `ZodOptional`\<`ZodString`\>;
     `quantityShipped`: `ZodNumber`;
  \}, `$strip`\>\>;
\}, `$strip`\>

***

### UpdateOutboundShipmentsSchema()

```ts
function UpdateOutboundShipmentsSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementOutboundShipmentsRecord): ZodObject<{
  salesOrder: ZodOptional<ZodString>;
  status: ZodOptional<ZodOptional<ZodEnum<{
     cancelled: "cancelled";
     delivered: "delivered";
     shipped: "shipped";
     picking: "picking";
     packed: "packed";
  }>>>;
  trackingNumber: ZodOptional<ZodString>;
  carrier: ZodOptional<ZodOptional<ZodString>>;
  warehouse: ZodOptional<ZodString>;
  items: ZodOptional<ZodArray<ZodString>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementOutboundShipmentsRecord`](../../../lib/pb.types.md#warehousemanagementoutboundshipmentsrecord)

#### Returns

`ZodObject`\<\{
  `salesOrder`: `ZodOptional`\<`ZodString`\>;
  `status`: `ZodOptional`\<`ZodOptional`\<`ZodEnum`\<\{
     `cancelled`: `"cancelled"`;
     `delivered`: `"delivered"`;
     `shipped`: `"shipped"`;
     `picking`: `"picking"`;
     `packed`: `"packed"`;
  \}\>\>\>;
  `trackingNumber`: `ZodOptional`\<`ZodString`\>;
  `carrier`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `warehouse`: `ZodOptional`\<`ZodString`\>;
  `items`: `ZodOptional`\<`ZodArray`\<`ZodString`\>\>;
\}, `$strip`\>
# pocketbase/schemas/warehouse-management/returns

## Type Aliases

### Returns

```ts
type Returns = z.infer<typeof ReturnsSchema>;
```

## Variables

### ReturnsSchema

```ts
const ReturnsSchema: ZodObject<{
  id: ZodString;
  returnNumber: ZodOptional<ZodString>;
  salesOrder: ZodOptional<ZodString>;
  client: ZodOptional<ZodString>;
  status: ZodEnum<{
     requested: "requested";
     approved: "approved";
     rejected: "rejected";
     received: "received";
     processed: "processed";
  }>;
  reason: ZodOptional<ZodUnknown>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
  items: ZodArray<ZodString>;
}, $strip>;
```

## Functions

### CreateReturnsSchema()

```ts
function CreateReturnsSchema(pocketbase: TypedPocketBase): ZodObject<{
  returnNumber: ZodOptional<ZodString>;
  salesOrder: ZodOptional<ZodString>;
  client: ZodOptional<ZodString>;
  status: ZodEnum<{
     requested: "requested";
     approved: "approved";
     rejected: "rejected";
     received: "received";
     processed: "processed";
  }>;
  reason: ZodOptional<ZodUnknown>;
  items: ZodArray<ZodObject<{
     return: ZodString;
     product: ZodString;
     quantityExpected: ZodOptional<ZodNumber>;
     quantityReceived: ZodOptional<ZodNumber>;
     condition: ZodOptional<ZodEnum<{
        expired: "expired";
        damaged: "damaged";
        sellable: "sellable";
        defective: "defective";
        unsellable: "unsellable";
     }>>;
  }, $strip>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `returnNumber`: `ZodOptional`\<`ZodString`\>;
  `salesOrder`: `ZodOptional`\<`ZodString`\>;
  `client`: `ZodOptional`\<`ZodString`\>;
  `status`: `ZodEnum`\<\{
     `requested`: `"requested"`;
     `approved`: `"approved"`;
     `rejected`: `"rejected"`;
     `received`: `"received"`;
     `processed`: `"processed"`;
  \}\>;
  `reason`: `ZodOptional`\<`ZodUnknown`\>;
  `items`: `ZodArray`\<`ZodObject`\<\{
     `return`: `ZodString`;
     `product`: `ZodString`;
     `quantityExpected`: `ZodOptional`\<`ZodNumber`\>;
     `quantityReceived`: `ZodOptional`\<`ZodNumber`\>;
     `condition`: `ZodOptional`\<`ZodEnum`\<\{
        `expired`: `"expired"`;
        `damaged`: `"damaged"`;
        `sellable`: `"sellable"`;
        `defective`: `"defective"`;
        `unsellable`: `"unsellable"`;
     \}\>\>;
  \}, `$strip`\>\>;
\}, `$strip`\>

***

### UpdateReturnsSchema()

```ts
function UpdateReturnsSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementReturnsRecord): ZodObject<{
  returnNumber: ZodOptional<ZodOptional<ZodString>>;
  salesOrder: ZodOptional<ZodOptional<ZodString>>;
  client: ZodOptional<ZodOptional<ZodString>>;
  status: ZodOptional<ZodEnum<{
     requested: "requested";
     approved: "approved";
     rejected: "rejected";
     received: "received";
     processed: "processed";
  }>>;
  reason: ZodOptional<ZodOptional<ZodUnknown>>;
  items: ZodOptional<ZodArray<ZodString>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementReturnsRecord`](../../../lib/pb.types.md#warehousemanagementreturnsrecord)

#### Returns

`ZodObject`\<\{
  `returnNumber`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `salesOrder`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `client`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `status`: `ZodOptional`\<`ZodEnum`\<\{
     `requested`: `"requested"`;
     `approved`: `"approved"`;
     `rejected`: `"rejected"`;
     `received`: `"received"`;
     `processed`: `"processed"`;
  \}\>\>;
  `reason`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
  `items`: `ZodOptional`\<`ZodArray`\<`ZodString`\>\>;
\}, `$strip`\>
# pocketbase/schemas/warehouse-management/locations

## Type Aliases

### Locations

```ts
type Locations = z.infer<typeof LocationsSchema>;
```

## Variables

### LocationsSchema

```ts
const LocationsSchema: ZodObject<{
  id: ZodString;
  warehouse: ZodOptional<ZodString>;
  name: ZodString;
  barcode: ZodOptional<ZodString>;
  type: ZodOptional<ZodEnum<{
     damaged-goods: "damaged-goods";
     receiving-dock: "receiving-dock";
     pick-bin: "pick-bin";
     packing-station: "packing-station";
     cross-dock-area: "cross-dock-area";
     bulk-storage: "bulk-storage";
     reserve-storage: "reserve-storage";
     staging-area: "staging-area";
     quality-control: "quality-control";
     returns-area: "returns-area";
  }>>;
  level: ZodOptional<ZodNumber>;
  maxWeight: ZodOptional<ZodNumber>;
  maxVolume: ZodOptional<ZodNumber>;
  maxPallets: ZodOptional<ZodNumber>;
  isPickable: ZodOptional<ZodUnknown>;
  isReceivable: ZodOptional<ZodUnknown>;
  temperatureControlled: ZodOptional<ZodUnknown>;
  hazmatApproved: ZodOptional<ZodUnknown>;
  isActive: ZodOptional<ZodUnknown>;
  parentLocation: ZodOptional<ZodString>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateLocationsSchema()

```ts
function CreateLocationsSchema(pocketbase: TypedPocketBase): ZodObject<{
  warehouse: ZodOptional<ZodString>;
  name: ZodString;
  barcode: ZodOptional<ZodString>;
  type: ZodOptional<ZodEnum<{
     damaged-goods: "damaged-goods";
     receiving-dock: "receiving-dock";
     pick-bin: "pick-bin";
     packing-station: "packing-station";
     cross-dock-area: "cross-dock-area";
     bulk-storage: "bulk-storage";
     reserve-storage: "reserve-storage";
     staging-area: "staging-area";
     quality-control: "quality-control";
     returns-area: "returns-area";
  }>>;
  level: ZodOptional<ZodNumber>;
  maxWeight: ZodOptional<ZodNumber>;
  maxVolume: ZodOptional<ZodNumber>;
  maxPallets: ZodOptional<ZodNumber>;
  isPickable: ZodOptional<ZodUnknown>;
  isReceivable: ZodOptional<ZodUnknown>;
  temperatureControlled: ZodOptional<ZodUnknown>;
  hazmatApproved: ZodOptional<ZodUnknown>;
  isActive: ZodOptional<ZodUnknown>;
  parentLocation: ZodOptional<ZodString>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `warehouse`: `ZodOptional`\<`ZodString`\>;
  `name`: `ZodString`;
  `barcode`: `ZodOptional`\<`ZodString`\>;
  `type`: `ZodOptional`\<`ZodEnum`\<\{
     `damaged-goods`: `"damaged-goods"`;
     `receiving-dock`: `"receiving-dock"`;
     `pick-bin`: `"pick-bin"`;
     `packing-station`: `"packing-station"`;
     `cross-dock-area`: `"cross-dock-area"`;
     `bulk-storage`: `"bulk-storage"`;
     `reserve-storage`: `"reserve-storage"`;
     `staging-area`: `"staging-area"`;
     `quality-control`: `"quality-control"`;
     `returns-area`: `"returns-area"`;
  \}\>\>;
  `level`: `ZodOptional`\<`ZodNumber`\>;
  `maxWeight`: `ZodOptional`\<`ZodNumber`\>;
  `maxVolume`: `ZodOptional`\<`ZodNumber`\>;
  `maxPallets`: `ZodOptional`\<`ZodNumber`\>;
  `isPickable`: `ZodOptional`\<`ZodUnknown`\>;
  `isReceivable`: `ZodOptional`\<`ZodUnknown`\>;
  `temperatureControlled`: `ZodOptional`\<`ZodUnknown`\>;
  `hazmatApproved`: `ZodOptional`\<`ZodUnknown`\>;
  `isActive`: `ZodOptional`\<`ZodUnknown`\>;
  `parentLocation`: `ZodOptional`\<`ZodString`\>;
\}, `$strip`\>

***

### UpdateLocationsSchema()

```ts
function UpdateLocationsSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementLocationsRecord): ZodObject<{
  warehouse: ZodOptional<ZodOptional<ZodString>>;
  name: ZodOptional<ZodString>;
  barcode: ZodOptional<ZodOptional<ZodString>>;
  type: ZodOptional<ZodOptional<ZodEnum<{
     damaged-goods: "damaged-goods";
     receiving-dock: "receiving-dock";
     pick-bin: "pick-bin";
     packing-station: "packing-station";
     cross-dock-area: "cross-dock-area";
     bulk-storage: "bulk-storage";
     reserve-storage: "reserve-storage";
     staging-area: "staging-area";
     quality-control: "quality-control";
     returns-area: "returns-area";
  }>>>;
  level: ZodOptional<ZodOptional<ZodNumber>>;
  maxWeight: ZodOptional<ZodOptional<ZodNumber>>;
  maxVolume: ZodOptional<ZodOptional<ZodNumber>>;
  maxPallets: ZodOptional<ZodOptional<ZodNumber>>;
  isPickable: ZodOptional<ZodOptional<ZodUnknown>>;
  isReceivable: ZodOptional<ZodOptional<ZodUnknown>>;
  temperatureControlled: ZodOptional<ZodOptional<ZodUnknown>>;
  hazmatApproved: ZodOptional<ZodOptional<ZodUnknown>>;
  isActive: ZodOptional<ZodOptional<ZodUnknown>>;
  parentLocation: ZodOptional<ZodOptional<ZodString>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementLocationsRecord`](../../../lib/pb.types.md#warehousemanagementlocationsrecord)

#### Returns

`ZodObject`\<\{
  `warehouse`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `name`: `ZodOptional`\<`ZodString`\>;
  `barcode`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `type`: `ZodOptional`\<`ZodOptional`\<`ZodEnum`\<\{
     `damaged-goods`: `"damaged-goods"`;
     `receiving-dock`: `"receiving-dock"`;
     `pick-bin`: `"pick-bin"`;
     `packing-station`: `"packing-station"`;
     `cross-dock-area`: `"cross-dock-area"`;
     `bulk-storage`: `"bulk-storage"`;
     `reserve-storage`: `"reserve-storage"`;
     `staging-area`: `"staging-area"`;
     `quality-control`: `"quality-control"`;
     `returns-area`: `"returns-area"`;
  \}\>\>\>;
  `level`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `maxWeight`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `maxVolume`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `maxPallets`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `isPickable`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
  `isReceivable`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
  `temperatureControlled`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
  `hazmatApproved`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
  `isActive`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
  `parentLocation`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
\}, `$strip`\>
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
# pocketbase/schemas/warehouse-management/return-items

## Type Aliases

### ReturnItems

```ts
type ReturnItems = z.infer<typeof ReturnItemsSchema>;
```

## Variables

### ReturnItemsSchema

```ts
const ReturnItemsSchema: ZodObject<{
  id: ZodString;
  return: ZodString;
  product: ZodString;
  quantityExpected: ZodOptional<ZodNumber>;
  quantityReceived: ZodOptional<ZodNumber>;
  condition: ZodOptional<ZodEnum<{
     expired: "expired";
     damaged: "damaged";
     sellable: "sellable";
     defective: "defective";
     unsellable: "unsellable";
  }>>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateReturnItemsSchema()

```ts
function CreateReturnItemsSchema(pocketbase: TypedPocketBase): ZodObject<{
  return: ZodString;
  product: ZodString;
  quantityExpected: ZodOptional<ZodNumber>;
  quantityReceived: ZodOptional<ZodNumber>;
  condition: ZodOptional<ZodEnum<{
     expired: "expired";
     damaged: "damaged";
     sellable: "sellable";
     defective: "defective";
     unsellable: "unsellable";
  }>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `return`: `ZodString`;
  `product`: `ZodString`;
  `quantityExpected`: `ZodOptional`\<`ZodNumber`\>;
  `quantityReceived`: `ZodOptional`\<`ZodNumber`\>;
  `condition`: `ZodOptional`\<`ZodEnum`\<\{
     `expired`: `"expired"`;
     `damaged`: `"damaged"`;
     `sellable`: `"sellable"`;
     `defective`: `"defective"`;
     `unsellable`: `"unsellable"`;
  \}\>\>;
\}, `$strip`\>

***

### UpdateReturnItemsSchema()

```ts
function UpdateReturnItemsSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementReturnItemsRecord): ZodObject<{
  return: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  quantityExpected: ZodOptional<ZodOptional<ZodNumber>>;
  quantityReceived: ZodOptional<ZodOptional<ZodNumber>>;
  condition: ZodOptional<ZodOptional<ZodEnum<{
     expired: "expired";
     damaged: "damaged";
     sellable: "sellable";
     defective: "defective";
     unsellable: "unsellable";
  }>>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementReturnItemsRecord`](../../../lib/pb.types.md#warehousemanagementreturnitemsrecord)

#### Returns

`ZodObject`\<\{
  `return`: `ZodOptional`\<`ZodString`\>;
  `product`: `ZodOptional`\<`ZodString`\>;
  `quantityExpected`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `quantityReceived`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `condition`: `ZodOptional`\<`ZodOptional`\<`ZodEnum`\<\{
     `expired`: `"expired"`;
     `damaged`: `"damaged"`;
     `sellable`: `"sellable"`;
     `defective`: `"defective"`;
     `unsellable`: `"unsellable"`;
  \}\>\>\>;
\}, `$strip`\>
# pocketbase/schemas/warehouse-management/packages

## Type Aliases

### Packages

```ts
type Packages = z.infer<typeof PackagesSchema>;
```

## Variables

### PackagesSchema

```ts
const PackagesSchema: ZodObject<{
  id: ZodString;
  salesOrder: ZodString;
  packageNumber: ZodString;
  warehouse: ZodString;
  type: ZodOptional<ZodString>;
  weight: ZodOptional<ZodNumber>;
  length: ZodOptional<ZodNumber>;
  width: ZodOptional<ZodNumber>;
  height: ZodOptional<ZodNumber>;
  packedByUser: ZodOptional<ZodString>;
  packedAt: ZodOptional<ZodDate>;
  shippedAt: ZodOptional<ZodDate>;
  isFragile: ZodOptional<ZodUnknown>;
  isHazmat: ZodOptional<ZodUnknown>;
  requireSignature: ZodOptional<ZodUnknown>;
  insuranceValue: ZodOptional<ZodNumber>;
  images: ZodOptional<ZodArray<ZodFile>>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
  items: ZodArray<ZodString>;
}, $strip>;
```

## Functions

### CreatePackagesSchema()

```ts
function CreatePackagesSchema(pocketbase: TypedPocketBase): ZodObject<{
  salesOrder: ZodString;
  packageNumber: ZodString;
  warehouse: ZodString;
  type: ZodOptional<ZodString>;
  weight: ZodOptional<ZodNumber>;
  length: ZodOptional<ZodNumber>;
  width: ZodOptional<ZodNumber>;
  height: ZodOptional<ZodNumber>;
  packedByUser: ZodOptional<ZodString>;
  packedAt: ZodOptional<ZodDate>;
  shippedAt: ZodOptional<ZodDate>;
  isFragile: ZodOptional<ZodUnknown>;
  isHazmat: ZodOptional<ZodUnknown>;
  requireSignature: ZodOptional<ZodUnknown>;
  insuranceValue: ZodOptional<ZodNumber>;
  images: ZodOptional<ZodArray<ZodFile>>;
  items: ZodArray<ZodObject<{
     package: ZodString;
     product: ZodString;
     batch: ZodOptional<ZodString>;
     quantity: ZodNumber;
     lotNumber: ZodOptional<ZodString>;
     expiryDate: ZodOptional<ZodDate>;
  }, $strip>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `salesOrder`: `ZodString`;
  `packageNumber`: `ZodString`;
  `warehouse`: `ZodString`;
  `type`: `ZodOptional`\<`ZodString`\>;
  `weight`: `ZodOptional`\<`ZodNumber`\>;
  `length`: `ZodOptional`\<`ZodNumber`\>;
  `width`: `ZodOptional`\<`ZodNumber`\>;
  `height`: `ZodOptional`\<`ZodNumber`\>;
  `packedByUser`: `ZodOptional`\<`ZodString`\>;
  `packedAt`: `ZodOptional`\<`ZodDate`\>;
  `shippedAt`: `ZodOptional`\<`ZodDate`\>;
  `isFragile`: `ZodOptional`\<`ZodUnknown`\>;
  `isHazmat`: `ZodOptional`\<`ZodUnknown`\>;
  `requireSignature`: `ZodOptional`\<`ZodUnknown`\>;
  `insuranceValue`: `ZodOptional`\<`ZodNumber`\>;
  `images`: `ZodOptional`\<`ZodArray`\<`ZodFile`\>\>;
  `items`: `ZodArray`\<`ZodObject`\<\{
     `package`: `ZodString`;
     `product`: `ZodString`;
     `batch`: `ZodOptional`\<`ZodString`\>;
     `quantity`: `ZodNumber`;
     `lotNumber`: `ZodOptional`\<`ZodString`\>;
     `expiryDate`: `ZodOptional`\<`ZodDate`\>;
  \}, `$strip`\>\>;
\}, `$strip`\>

***

### UpdatePackagesSchema()

```ts
function UpdatePackagesSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementPackagesRecord): ZodObject<{
  salesOrder: ZodOptional<ZodString>;
  packageNumber: ZodOptional<ZodString>;
  warehouse: ZodOptional<ZodString>;
  type: ZodOptional<ZodOptional<ZodString>>;
  weight: ZodOptional<ZodOptional<ZodNumber>>;
  length: ZodOptional<ZodOptional<ZodNumber>>;
  width: ZodOptional<ZodOptional<ZodNumber>>;
  height: ZodOptional<ZodOptional<ZodNumber>>;
  packedByUser: ZodOptional<ZodOptional<ZodString>>;
  packedAt: ZodOptional<ZodOptional<ZodDate>>;
  shippedAt: ZodOptional<ZodOptional<ZodDate>>;
  isFragile: ZodOptional<ZodOptional<ZodUnknown>>;
  isHazmat: ZodOptional<ZodOptional<ZodUnknown>>;
  requireSignature: ZodOptional<ZodOptional<ZodUnknown>>;
  insuranceValue: ZodOptional<ZodOptional<ZodNumber>>;
  images: ZodOptional<ZodOptional<ZodArray<ZodFile>>>;
  items: ZodOptional<ZodArray<ZodString>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementPackagesRecord`](../../../lib/pb.types.md#warehousemanagementpackagesrecord)

#### Returns

`ZodObject`\<\{
  `salesOrder`: `ZodOptional`\<`ZodString`\>;
  `packageNumber`: `ZodOptional`\<`ZodString`\>;
  `warehouse`: `ZodOptional`\<`ZodString`\>;
  `type`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `weight`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `length`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `width`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `height`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `packedByUser`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `packedAt`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
  `shippedAt`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
  `isFragile`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
  `isHazmat`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
  `requireSignature`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
  `insuranceValue`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `images`: `ZodOptional`\<`ZodOptional`\<`ZodArray`\<`ZodFile`\>\>\>;
  `items`: `ZodOptional`\<`ZodArray`\<`ZodString`\>\>;
\}, `$strip`\>
# pocketbase/schemas/warehouse-management/inventory-stock

## Type Aliases

### InventoryStock

```ts
type InventoryStock = z.infer<typeof InventoryStockSchema>;
```

## Variables

### InventoryStockSchema

```ts
const InventoryStockSchema: ZodObject<{
  id: ZodString;
  location: ZodString;
  product: ZodString;
  batch: ZodOptional<ZodString>;
  quantity: ZodOptional<ZodNumber>;
  reservedQuantity: ZodOptional<ZodNumber>;
  status: ZodEnum<{
     available: "available";
     expired: "expired";
     allocated: "allocated";
     damaged: "damaged";
     quarantine: "quarantine";
     hold: "hold";
     shipped: "shipped";
  }>;
  lastCountedAt: ZodOptional<ZodDate>;
  lastMovementAt: ZodOptional<ZodDate>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateInventoryStockSchema()

```ts
function CreateInventoryStockSchema(pocketbase: TypedPocketBase): ZodObject<{
  location: ZodString;
  product: ZodString;
  batch: ZodOptional<ZodString>;
  quantity: ZodOptional<ZodNumber>;
  reservedQuantity: ZodOptional<ZodNumber>;
  status: ZodEnum<{
     available: "available";
     expired: "expired";
     allocated: "allocated";
     damaged: "damaged";
     quarantine: "quarantine";
     hold: "hold";
     shipped: "shipped";
  }>;
  lastCountedAt: ZodOptional<ZodDate>;
  lastMovementAt: ZodOptional<ZodDate>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `location`: `ZodString`;
  `product`: `ZodString`;
  `batch`: `ZodOptional`\<`ZodString`\>;
  `quantity`: `ZodOptional`\<`ZodNumber`\>;
  `reservedQuantity`: `ZodOptional`\<`ZodNumber`\>;
  `status`: `ZodEnum`\<\{
     `available`: `"available"`;
     `expired`: `"expired"`;
     `allocated`: `"allocated"`;
     `damaged`: `"damaged"`;
     `quarantine`: `"quarantine"`;
     `hold`: `"hold"`;
     `shipped`: `"shipped"`;
  \}\>;
  `lastCountedAt`: `ZodOptional`\<`ZodDate`\>;
  `lastMovementAt`: `ZodOptional`\<`ZodDate`\>;
\}, `$strip`\>

***

### UpdateInventoryStockSchema()

```ts
function UpdateInventoryStockSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementInventoryStockRecord): ZodObject<{
  location: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  batch: ZodOptional<ZodOptional<ZodString>>;
  quantity: ZodOptional<ZodOptional<ZodNumber>>;
  reservedQuantity: ZodOptional<ZodOptional<ZodNumber>>;
  status: ZodOptional<ZodEnum<{
     available: "available";
     expired: "expired";
     allocated: "allocated";
     damaged: "damaged";
     quarantine: "quarantine";
     hold: "hold";
     shipped: "shipped";
  }>>;
  lastCountedAt: ZodOptional<ZodOptional<ZodDate>>;
  lastMovementAt: ZodOptional<ZodOptional<ZodDate>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementInventoryStockRecord`](../../../lib/pb.types.md#warehousemanagementinventorystockrecord)

#### Returns

`ZodObject`\<\{
  `location`: `ZodOptional`\<`ZodString`\>;
  `product`: `ZodOptional`\<`ZodString`\>;
  `batch`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `quantity`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `reservedQuantity`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `status`: `ZodOptional`\<`ZodEnum`\<\{
     `available`: `"available"`;
     `expired`: `"expired"`;
     `allocated`: `"allocated"`;
     `damaged`: `"damaged"`;
     `quarantine`: `"quarantine"`;
     `hold`: `"hold"`;
     `shipped`: `"shipped"`;
  \}\>\>;
  `lastCountedAt`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
  `lastMovementAt`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
\}, `$strip`\>
# pocketbase/schemas/warehouse-management/package-items

## Type Aliases

### PackageItems

```ts
type PackageItems = z.infer<typeof PackageItemsSchema>;
```

## Variables

### PackageItemsSchema

```ts
const PackageItemsSchema: ZodObject<{
  id: ZodString;
  package: ZodString;
  product: ZodString;
  batch: ZodOptional<ZodString>;
  quantity: ZodNumber;
  lotNumber: ZodOptional<ZodString>;
  expiryDate: ZodOptional<ZodDate>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreatePackageItemsSchema()

```ts
function CreatePackageItemsSchema(pocketbase: TypedPocketBase): ZodObject<{
  package: ZodString;
  product: ZodString;
  batch: ZodOptional<ZodString>;
  quantity: ZodNumber;
  lotNumber: ZodOptional<ZodString>;
  expiryDate: ZodOptional<ZodDate>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `package`: `ZodString`;
  `product`: `ZodString`;
  `batch`: `ZodOptional`\<`ZodString`\>;
  `quantity`: `ZodNumber`;
  `lotNumber`: `ZodOptional`\<`ZodString`\>;
  `expiryDate`: `ZodOptional`\<`ZodDate`\>;
\}, `$strip`\>

***

### UpdatePackageItemsSchema()

```ts
function UpdatePackageItemsSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementPackageItemsRecord): ZodObject<{
  package: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  batch: ZodOptional<ZodOptional<ZodString>>;
  quantity: ZodOptional<ZodNumber>;
  lotNumber: ZodOptional<ZodOptional<ZodString>>;
  expiryDate: ZodOptional<ZodOptional<ZodDate>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementPackageItemsRecord`](../../../lib/pb.types.md#warehousemanagementpackageitemsrecord)

#### Returns

`ZodObject`\<\{
  `package`: `ZodOptional`\<`ZodString`\>;
  `product`: `ZodOptional`\<`ZodString`\>;
  `batch`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `quantity`: `ZodOptional`\<`ZodNumber`\>;
  `lotNumber`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `expiryDate`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
\}, `$strip`\>
# pocketbase/schemas/warehouse-management/inventory-batches

## Type Aliases

### InventoryBatches

```ts
type InventoryBatches = z.infer<typeof InventoryBatchesSchema>;
```

## Variables

### InventoryBatchesSchema

```ts
const InventoryBatchesSchema: ZodObject<{
  id: ZodString;
  product: ZodString;
  batchNumber: ZodString;
  expirationDate: ZodOptional<ZodDate>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateInventoryBatchesSchema()

```ts
function CreateInventoryBatchesSchema(pocketbase: TypedPocketBase): ZodObject<{
  product: ZodString;
  batchNumber: ZodString;
  expirationDate: ZodOptional<ZodDate>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `product`: `ZodString`;
  `batchNumber`: `ZodString`;
  `expirationDate`: `ZodOptional`\<`ZodDate`\>;
\}, `$strip`\>

***

### UpdateInventoryBatchesSchema()

```ts
function UpdateInventoryBatchesSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementInventoryBatchesRecord): ZodObject<{
  product: ZodOptional<ZodString>;
  batchNumber: ZodOptional<ZodString>;
  expirationDate: ZodOptional<ZodOptional<ZodDate>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementInventoryBatchesRecord`](../../../lib/pb.types.md#warehousemanagementinventorybatchesrecord)

#### Returns

`ZodObject`\<\{
  `product`: `ZodOptional`\<`ZodString`\>;
  `batchNumber`: `ZodOptional`\<`ZodString`\>;
  `expirationDate`: `ZodOptional`\<`ZodOptional`\<`ZodDate`\>\>;
\}, `$strip`\>
# pocketbase/schemas/warehouse-management/inbound-shipment-items

## Type Aliases

### InboundShipmentItems

```ts
type InboundShipmentItems = z.infer<typeof InboundShipmentItemsSchema>;
```

## Variables

### InboundShipmentItemsSchema

```ts
const InboundShipmentItemsSchema: ZodObject<{
  id: ZodString;
  inboundShipment: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  expectedQuantity: ZodNumber;
  receivedQuantity: ZodOptional<ZodNumber>;
  discrepancyNotes: ZodOptional<ZodUnknown>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateInboundShipmentItemsSchema()

```ts
function CreateInboundShipmentItemsSchema(pocketbase: TypedPocketBase): ZodObject<{
  inboundShipment: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  expectedQuantity: ZodNumber;
  receivedQuantity: ZodOptional<ZodNumber>;
  discrepancyNotes: ZodOptional<ZodUnknown>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `inboundShipment`: `ZodOptional`\<`ZodString`\>;
  `product`: `ZodOptional`\<`ZodString`\>;
  `expectedQuantity`: `ZodNumber`;
  `receivedQuantity`: `ZodOptional`\<`ZodNumber`\>;
  `discrepancyNotes`: `ZodOptional`\<`ZodUnknown`\>;
\}, `$strip`\>

***

### UpdateInboundShipmentItemsSchema()

```ts
function UpdateInboundShipmentItemsSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementInboundShipmentItemsRecord): ZodObject<{
  inboundShipment: ZodOptional<ZodOptional<ZodString>>;
  product: ZodOptional<ZodOptional<ZodString>>;
  expectedQuantity: ZodOptional<ZodNumber>;
  receivedQuantity: ZodOptional<ZodOptional<ZodNumber>>;
  discrepancyNotes: ZodOptional<ZodOptional<ZodUnknown>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementInboundShipmentItemsRecord`](../../../lib/pb.types.md#warehousemanagementinboundshipmentitemsrecord)

#### Returns

`ZodObject`\<\{
  `inboundShipment`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `product`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `expectedQuantity`: `ZodOptional`\<`ZodNumber`\>;
  `receivedQuantity`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `discrepancyNotes`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
\}, `$strip`\>
# pocketbase/schemas/warehouse-management/sales-order-items

## Type Aliases

### SalesOrderItems

```ts
type SalesOrderItems = z.infer<typeof SalesOrderItemsSchema>;
```

## Variables

### SalesOrderItemsSchema

```ts
const SalesOrderItemsSchema: ZodObject<{
  id: ZodString;
  salesOrder: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  quantityOrdered: ZodNumber;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateSalesOrderItemsSchema()

```ts
function CreateSalesOrderItemsSchema(pocketbase: TypedPocketBase): ZodObject<{
  salesOrder: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  quantityOrdered: ZodNumber;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `salesOrder`: `ZodOptional`\<`ZodString`\>;
  `product`: `ZodOptional`\<`ZodString`\>;
  `quantityOrdered`: `ZodNumber`;
\}, `$strip`\>

***

### UpdateSalesOrderItemsSchema()

```ts
function UpdateSalesOrderItemsSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementSalesOrderItemsRecord): ZodObject<{
  salesOrder: ZodOptional<ZodOptional<ZodString>>;
  product: ZodOptional<ZodOptional<ZodString>>;
  quantityOrdered: ZodOptional<ZodNumber>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementSalesOrderItemsRecord`](../../../lib/pb.types.md#warehousemanagementsalesorderitemsrecord)

#### Returns

`ZodObject`\<\{
  `salesOrder`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `product`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `quantityOrdered`: `ZodOptional`\<`ZodNumber`\>;
\}, `$strip`\>
# pocketbase/schemas/warehouse-management/sales-orders

## Type Aliases

### SalesOrders

```ts
type SalesOrders = z.infer<typeof SalesOrdersSchema>;
```

## Variables

### SalesOrdersSchema

```ts
const SalesOrdersSchema: ZodObject<{
  id: ZodString;
  shippingAddress: ZodOptional<ZodString>;
  client: ZodString;
  opportunity: ZodOptional<ZodString>;
  status: ZodEnum<{
     cancelled: "cancelled";
     pending: "pending";
     processing: "processing";
     completed: "completed";
     shipped: "shipped";
  }>;
  orderNumber: ZodString;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
  items: ZodArray<ZodString>;
}, $strip>;
```

## Functions

### CreateSalesOrdersSchema()

```ts
function CreateSalesOrdersSchema(pocketbase: TypedPocketBase): ZodObject<{
  shippingAddress: ZodOptional<ZodString>;
  client: ZodString;
  opportunity: ZodOptional<ZodString>;
  status: ZodEnum<{
     cancelled: "cancelled";
     pending: "pending";
     processing: "processing";
     completed: "completed";
     shipped: "shipped";
  }>;
  orderNumber: ZodString;
  items: ZodArray<ZodObject<{
     salesOrder: ZodOptional<ZodString>;
     product: ZodOptional<ZodString>;
     quantityOrdered: ZodNumber;
  }, $strip>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `shippingAddress`: `ZodOptional`\<`ZodString`\>;
  `client`: `ZodString`;
  `opportunity`: `ZodOptional`\<`ZodString`\>;
  `status`: `ZodEnum`\<\{
     `cancelled`: `"cancelled"`;
     `pending`: `"pending"`;
     `processing`: `"processing"`;
     `completed`: `"completed"`;
     `shipped`: `"shipped"`;
  \}\>;
  `orderNumber`: `ZodString`;
  `items`: `ZodArray`\<`ZodObject`\<\{
     `salesOrder`: `ZodOptional`\<`ZodString`\>;
     `product`: `ZodOptional`\<`ZodString`\>;
     `quantityOrdered`: `ZodNumber`;
  \}, `$strip`\>\>;
\}, `$strip`\>

***

### UpdateSalesOrdersSchema()

```ts
function UpdateSalesOrdersSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementSalesOrdersRecord): ZodObject<{
  shippingAddress: ZodOptional<ZodOptional<ZodString>>;
  client: ZodOptional<ZodString>;
  opportunity: ZodOptional<ZodOptional<ZodString>>;
  status: ZodOptional<ZodEnum<{
     cancelled: "cancelled";
     pending: "pending";
     processing: "processing";
     completed: "completed";
     shipped: "shipped";
  }>>;
  orderNumber: ZodOptional<ZodString>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementSalesOrdersRecord`](../../../lib/pb.types.md#warehousemanagementsalesordersrecord)

#### Returns

`ZodObject`\<\{
  `shippingAddress`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `client`: `ZodOptional`\<`ZodString`\>;
  `opportunity`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `status`: `ZodOptional`\<`ZodEnum`\<\{
     `cancelled`: `"cancelled"`;
     `pending`: `"pending"`;
     `processing`: `"processing"`;
     `completed`: `"completed"`;
     `shipped`: `"shipped"`;
  \}\>\>;
  `orderNumber`: `ZodOptional`\<`ZodString`\>;
\}, `$strip`\>
# pocketbase/schemas/delivery-management

## References

### DriverLocationSchema

Re-exports [DriverLocationSchema](delivery-management/driver-location.md#driverlocationschema)

***

### DriverLocation

Re-exports [DriverLocation](delivery-management/driver-location.md#driverlocation)

***

### CreateDriverLocationSchema

Re-exports [CreateDriverLocationSchema](delivery-management/driver-location.md#createdriverlocationschema)

***

### UpdateDriverLocationSchema

Re-exports [UpdateDriverLocationSchema](delivery-management/driver-location.md#updatedriverlocationschema)

***

### ProofOfDeliveriesSchema

Re-exports [ProofOfDeliveriesSchema](delivery-management/proof-of-deliveries.md#proofofdeliveriesschema)

***

### ProofOfDeliveries

Re-exports [ProofOfDeliveries](delivery-management/proof-of-deliveries.md#proofofdeliveries)

***

### CreateProofOfDeliveriesSchema

Re-exports [CreateProofOfDeliveriesSchema](delivery-management/proof-of-deliveries.md#createproofofdeliveriesschema)

***

### UpdateProofOfDeliveriesSchema

Re-exports [UpdateProofOfDeliveriesSchema](delivery-management/proof-of-deliveries.md#updateproofofdeliveriesschema)

***

### TaskEventsSchema

Re-exports [TaskEventsSchema](delivery-management/task-events.md#taskeventsschema)

***

### TaskEvents

Re-exports [TaskEvents](delivery-management/task-events.md#taskevents)

***

### CreateTaskEventsSchema

Re-exports [CreateTaskEventsSchema](delivery-management/task-events.md#createtaskeventsschema)

***

### UpdateTaskEventsSchema

Re-exports [UpdateTaskEventsSchema](delivery-management/task-events.md#updatetaskeventsschema)

***

### TasksSchema

Re-exports [TasksSchema](delivery-management/tasks.md#tasksschema)

***

### Tasks

Re-exports [Tasks](delivery-management/tasks.md#tasks)

***

### CreateTasksSchema

Re-exports [CreateTasksSchema](delivery-management/tasks.md#createtasksschema)

***

### UpdateTasksSchema

Re-exports [UpdateTasksSchema](delivery-management/tasks.md#updatetasksschema)
# pocketbase/schemas/customer-relations

## References

### CampaignsSchema

Re-exports [CampaignsSchema](customer-relations/campaigns.md#campaignsschema)

***

### CreateCampaignsSchema

Re-exports [CreateCampaignsSchema](customer-relations/campaigns.md#createcampaignsschema)

***

### UpdateCampaignsSchema

Re-exports [UpdateCampaignsSchema](customer-relations/campaigns.md#updatecampaignsschema)

***

### Campaigns

Re-exports [Campaigns](customer-relations/campaigns.md#campaigns)

***

### CasesSchema

Re-exports [CasesSchema](customer-relations/cases.md#casesschema)

***

### Cases

Re-exports [Cases](customer-relations/cases.md#cases)

***

### CreateCasesSchema

Re-exports [CreateCasesSchema](customer-relations/cases.md#createcasesschema)

***

### UpdateCasesSchema

Re-exports [UpdateCasesSchema](customer-relations/cases.md#updatecasesschema)

***

### CompaniesSchema

Re-exports [CompaniesSchema](customer-relations/companies.md#companiesschema)

***

### Companies

Re-exports [Companies](customer-relations/companies.md#companies)

***

### CreateCompaniesSchema

Re-exports [CreateCompaniesSchema](customer-relations/companies.md#createcompaniesschema)

***

### UpdateCompaniesSchema

Re-exports [UpdateCompaniesSchema](customer-relations/companies.md#updatecompaniesschema)

***

### ContactsSchema

Re-exports [ContactsSchema](customer-relations/contacts.md#contactsschema)

***

### Contacts

Re-exports [Contacts](customer-relations/contacts.md#contacts)

***

### CreateContactsSchema

Re-exports [CreateContactsSchema](customer-relations/contacts.md#createcontactsschema)

***

### UpdateContactsSchema

Re-exports [UpdateContactsSchema](customer-relations/contacts.md#updatecontactsschema)

***

### InteractionsSchema

Re-exports [InteractionsSchema](customer-relations/interactions.md#interactionsschema)

***

### Interactions

Re-exports [Interactions](customer-relations/interactions.md#interactions)

***

### CreateInteractionsSchema

Re-exports [CreateInteractionsSchema](customer-relations/interactions.md#createinteractionsschema)

***

### UpdateInteractionsSchema

Re-exports [UpdateInteractionsSchema](customer-relations/interactions.md#updateinteractionsschema)

***

### InvoiceItemsSchema

Re-exports [InvoiceItemsSchema](customer-relations/invoice-items.md#invoiceitemsschema)

***

### InvoiceItems

Re-exports [InvoiceItems](customer-relations/invoice-items.md#invoiceitems)

***

### CreateInvoiceItemsSchema

Re-exports [CreateInvoiceItemsSchema](customer-relations/invoice-items.md#createinvoiceitemsschema)

***

### UpdateInvoiceItemsSchema

Re-exports [UpdateInvoiceItemsSchema](customer-relations/invoice-items.md#updateinvoiceitemsschema)

***

### InvoicesSchema

Re-exports [InvoicesSchema](customer-relations/invoices.md#invoicesschema)

***

### Invoices

Re-exports [Invoices](customer-relations/invoices.md#invoices)

***

### CreateInvoicesSchema

Re-exports [CreateInvoicesSchema](customer-relations/invoices.md#createinvoicesschema)

***

### UpdateInvoicesSchema

Re-exports [UpdateInvoicesSchema](customer-relations/invoices.md#updateinvoicesschema)

***

### LeadsSchema

Re-exports [LeadsSchema](customer-relations/leads.md#leadsschema)

***

### Leads

Re-exports [Leads](customer-relations/leads.md#leads)

***

### CreateLeadsSchema

Re-exports [CreateLeadsSchema](customer-relations/leads.md#createleadsschema)

***

### UpdateLeadsSchema

Re-exports [UpdateLeadsSchema](customer-relations/leads.md#updateleadsschema)

***

### OpportunitiesSchema

Re-exports [OpportunitiesSchema](customer-relations/opportunities.md#opportunitiesschema)

***

### Opportunities

Re-exports [Opportunities](customer-relations/opportunities.md#opportunities)

***

### CreateOpportunitiesSchema

Re-exports [CreateOpportunitiesSchema](customer-relations/opportunities.md#createopportunitiesschema)

***

### UpdateOpportunitiesSchema

Re-exports [UpdateOpportunitiesSchema](customer-relations/opportunities.md#updateopportunitiesschema)

***

### OpportunityProductsSchema

Re-exports [OpportunityProductsSchema](customer-relations/opportunity-products.md#opportunityproductsschema)

***

### OpportunityProducts

Re-exports [OpportunityProducts](customer-relations/opportunity-products.md#opportunityproducts)

***

### CreateOpportunityProductsSchema

Re-exports [CreateOpportunityProductsSchema](customer-relations/opportunity-products.md#createopportunityproductsschema)

***

### UpdateOpportunityProductsSchema

Re-exports [UpdateOpportunityProductsSchema](customer-relations/opportunity-products.md#updateopportunityproductsschema)

***

### ProductsSchema

Re-exports [ProductsSchema](customer-relations/products.md#productsschema)

***

### Products

Re-exports [Products](customer-relations/products.md#products)

***

### CreateProductsSchema

Re-exports [CreateProductsSchema](customer-relations/products.md#createproductsschema)

***

### UpdateProductsSchema

Re-exports [UpdateProductsSchema](customer-relations/products.md#updateproductsschema)
# pocketbase/scalar

## Variables

### Coordinates

```ts
const Coordinates: ZodObject<{
  lon: ZodNumber;
  lat: ZodNumber;
}, $strip>;
```
# pocketbase/context

## Interfaces

### PocketBaseContextType

#### Properties

##### pb

```ts
pb: TypedPocketBase;
```

##### isReady

```ts
isReady: boolean;
```

##### isAuthenticated

```ts
isAuthenticated: boolean;
```

##### user

```ts
user: AuthRecord;
```

##### authToken

```ts
authToken: string | null;
```

##### logout()

```ts
logout: () => void;
```

###### Returns

`void`

## Functions

### PocketBaseProvider()

```ts
function PocketBaseProvider(__namedParameters: {
  children: ReactNode;
}): Element;
```

#### Parameters

##### \_\_namedParameters

###### children

`ReactNode`

#### Returns

`Element`

***

### usePocketBase()

```ts
function usePocketBase(): PocketBaseContextType;
```

#### Returns

[`PocketBaseContextType`](#pocketbasecontexttype)

***

### useAuth()

```ts
function useAuth(): {
  isAuthenticated: boolean;
  user: AuthRecord;
  authToken: string | null;
  logout: () => void;
};
```

#### Returns

```ts
{
  isAuthenticated: boolean;
  user: AuthRecord;
  authToken: string | null;
  logout: () => void;
}
```

##### isAuthenticated

```ts
isAuthenticated: boolean;
```

##### user

```ts
user: AuthRecord;
```

##### authToken

```ts
authToken: string | null;
```

##### logout()

```ts
logout: () => void;
```

###### Returns

`void`

***

### usePocketBaseClient()

```ts
function usePocketBaseClient(): TypedPocketBase;
```

#### Returns

[`TypedPocketBase`](../lib/pb.types.md#typedpocketbase)
# lib/pb.types

## Enumerations

### Collections

#### Enumeration Members

##### Authorigins

```ts
Authorigins: "_authOrigins";
```

##### Externalauths

```ts
Externalauths: "_externalAuths";
```

##### Mfas

```ts
Mfas: "_mfas";
```

##### Otps

```ts
Otps: "_otps";
```

##### Superusers

```ts
Superusers: "_superusers";
```

##### BillingManagementAccountLogs

```ts
BillingManagementAccountLogs: "billing_management_account_logs";
```

##### BillingManagementAccountTransactions

```ts
BillingManagementAccountTransactions: "billing_management_account_transactions";
```

##### BillingManagementClientAccounts

```ts
BillingManagementClientAccounts: "billing_management_client_accounts";
```

##### BillingManagementCreditNotes

```ts
BillingManagementCreditNotes: "billing_management_credit_notes";
```

##### BillingManagementDisputes

```ts
BillingManagementDisputes: "billing_management_disputes";
```

##### BillingManagementInvoiceLineItems

```ts
BillingManagementInvoiceLineItems: "billing_management_invoice_line_items";
```

##### BillingManagementInvoices

```ts
BillingManagementInvoices: "billing_management_invoices";
```

##### BillingManagementPayments

```ts
BillingManagementPayments: "billing_management_payments";
```

##### BillingManagementQuotes

```ts
BillingManagementQuotes: "billing_management_quotes";
```

##### BillingManagementRateCards

```ts
BillingManagementRateCards: "billing_management_rate_cards";
```

##### BillingManagementRateRules

```ts
BillingManagementRateRules: "billing_management_rate_rules";
```

##### BillingManagementSurcharges

```ts
BillingManagementSurcharges: "billing_management_surcharges";
```

##### CustomerRelationsCampaigns

```ts
CustomerRelationsCampaigns: "customer_relations_campaigns";
```

##### CustomerRelationsCases

```ts
CustomerRelationsCases: "customer_relations_cases";
```

##### CustomerRelationsCompanies

```ts
CustomerRelationsCompanies: "customer_relations_companies";
```

##### CustomerRelationsContacts

```ts
CustomerRelationsContacts: "customer_relations_contacts";
```

##### CustomerRelationsInteractions

```ts
CustomerRelationsInteractions: "customer_relations_interactions";
```

##### CustomerRelationsInvoiceItems

```ts
CustomerRelationsInvoiceItems: "customer_relations_invoice_items";
```

##### CustomerRelationsInvoices

```ts
CustomerRelationsInvoices: "customer_relations_invoices";
```

##### CustomerRelationsLeads

```ts
CustomerRelationsLeads: "customer_relations_leads";
```

##### CustomerRelationsOpportunities

```ts
CustomerRelationsOpportunities: "customer_relations_opportunities";
```

##### CustomerRelationsOpportunityProducts

```ts
CustomerRelationsOpportunityProducts: "customer_relations_opportunity_products";
```

##### CustomerRelationsProducts

```ts
CustomerRelationsProducts: "customer_relations_products";
```

##### DeliveryManagementDriverLocation

```ts
DeliveryManagementDriverLocation: "delivery_management_driver_location";
```

##### DeliveryManagementProofOfDeliveries

```ts
DeliveryManagementProofOfDeliveries: "delivery_management_proof_of_deliveries";
```

##### DeliveryManagementRoutes

```ts
DeliveryManagementRoutes: "delivery_management_routes";
```

##### DeliveryManagementTaskEvents

```ts
DeliveryManagementTaskEvents: "delivery_management_task_events";
```

##### DeliveryManagementTasks

```ts
DeliveryManagementTasks: "delivery_management_tasks";
```

##### Notifications

```ts
Notifications: "notifications";
```

##### TransportManagementCarrierRates

```ts
TransportManagementCarrierRates: "transport_management_carrier_rates";
```

##### TransportManagementCarriers

```ts
TransportManagementCarriers: "transport_management_carriers";
```

##### TransportManagementDrivers

```ts
TransportManagementDrivers: "transport_management_drivers";
```

##### TransportManagementExpenses

```ts
TransportManagementExpenses: "transport_management_expenses";
```

##### TransportManagementGpsPings

```ts
TransportManagementGpsPings: "transport_management_gps_pings";
```

##### TransportManagementPartnerInvoice

```ts
TransportManagementPartnerInvoice: "transport_management_partner_invoice";
```

##### TransportManagementPartnerInvoiceItems

```ts
TransportManagementPartnerInvoiceItems: "transport_management_partner_invoice_items";
```

##### TransportManagementProofOfDeliveries

```ts
TransportManagementProofOfDeliveries: "transport_management_proof_of_deliveries";
```

##### TransportManagementRoutes

```ts
TransportManagementRoutes: "transport_management_routes";
```

##### TransportManagementShipmentLegEvents

```ts
TransportManagementShipmentLegEvents: "transport_management_shipment_leg_events";
```

##### TransportManagementShipmentLegs

```ts
TransportManagementShipmentLegs: "transport_management_shipment_legs";
```

##### TransportManagementTripStops

```ts
TransportManagementTripStops: "transport_management_trip_stops";
```

##### TransportManagementTrips

```ts
TransportManagementTrips: "transport_management_trips";
```

##### TransportManagementVehicleMaintenance

```ts
TransportManagementVehicleMaintenance: "transport_management_vehicle_maintenance";
```

##### TransportManagementVehicles

```ts
TransportManagementVehicles: "transport_management_vehicles";
```

##### Users

```ts
Users: "users";
```

##### WarehouseManagementBinThreshold

```ts
WarehouseManagementBinThreshold: "warehouse_management_bin_threshold";
```

##### WarehouseManagementInboundShipmentItems

```ts
WarehouseManagementInboundShipmentItems: "warehouse_management_inbound_shipment_items";
```

##### WarehouseManagementInboundShipments

```ts
WarehouseManagementInboundShipments: "warehouse_management_inbound_shipments";
```

##### WarehouseManagementInventoryAdjustment

```ts
WarehouseManagementInventoryAdjustment: "warehouse_management_inventory_adjustment";
```

##### WarehouseManagementInventoryBatches

```ts
WarehouseManagementInventoryBatches: "warehouse_management_inventory_batches";
```

##### WarehouseManagementInventoryStock

```ts
WarehouseManagementInventoryStock: "warehouse_management_inventory_stock";
```

##### WarehouseManagementLocations

```ts
WarehouseManagementLocations: "warehouse_management_locations";
```

##### WarehouseManagementOutboundShipmentItems

```ts
WarehouseManagementOutboundShipmentItems: "warehouse_management_outbound_shipment_items";
```

##### WarehouseManagementOutboundShipments

```ts
WarehouseManagementOutboundShipments: "warehouse_management_outbound_shipments";
```

##### WarehouseManagementPackageItems

```ts
WarehouseManagementPackageItems: "warehouse_management_package_items";
```

##### WarehouseManagementPackages

```ts
WarehouseManagementPackages: "warehouse_management_packages";
```

##### WarehouseManagementPickBatchItems

```ts
WarehouseManagementPickBatchItems: "warehouse_management_pick_batch_items";
```

##### WarehouseManagementPickBatches

```ts
WarehouseManagementPickBatches: "warehouse_management_pick_batches";
```

##### WarehouseManagementProducts

```ts
WarehouseManagementProducts: "warehouse_management_products";
```

##### WarehouseManagementPutawayRules

```ts
WarehouseManagementPutawayRules: "warehouse_management_putaway_rules";
```

##### WarehouseManagementReorderPoints

```ts
WarehouseManagementReorderPoints: "warehouse_management_reorder_points";
```

##### WarehouseManagementReturnItems

```ts
WarehouseManagementReturnItems: "warehouse_management_return_items";
```

##### WarehouseManagementReturns

```ts
WarehouseManagementReturns: "warehouse_management_returns";
```

##### WarehouseManagementSalesOrderItems

```ts
WarehouseManagementSalesOrderItems: "warehouse_management_sales_order_items";
```

##### WarehouseManagementSalesOrders

```ts
WarehouseManagementSalesOrders: "warehouse_management_sales_orders";
```

##### WarehouseManagementStockTransfer

```ts
WarehouseManagementStockTransfer: "warehouse_management_stock_transfer";
```

##### WarehouseManagementSuppliers

```ts
WarehouseManagementSuppliers: "warehouse_management_suppliers";
```

##### WarehouseManagementTaskItems

```ts
WarehouseManagementTaskItems: "warehouse_management_task_items";
```

##### WarehouseManagementTasks

```ts
WarehouseManagementTasks: "warehouse_management_tasks";
```

##### WarehouseManagementWarehouses

```ts
WarehouseManagementWarehouses: "warehouse_management_warehouses";
```

***

### BillingManagementAccountLogsStatusOptions

#### Enumeration Members

##### pending

```ts
pending: "pending";
```

##### in-progress

```ts
in-progress: "in-progress";
```

##### success

```ts
success: "success";
```

##### failed

```ts
failed: "failed";
```

##### retry

```ts
retry: "retry";
```

***

### BillingManagementAccountTransactionsTypeOptions

#### Enumeration Members

##### credit

```ts
credit: "credit";
```

##### debit

```ts
debit: "debit";
```

##### top-up

```ts
top-up: "top-up";
```

##### refund

```ts
refund: "refund";
```

##### adjustment

```ts
adjustment: "adjustment";
```

##### fee

```ts
fee: "fee";
```

***

### BillingManagementDisputesStatusOptions

#### Enumeration Members

##### open

```ts
open: "open";
```

##### under-review

```ts
under-review: "under-review";
```

##### approved

```ts
approved: "approved";
```

##### denied

```ts
denied: "denied";
```

##### escalated

```ts
escalated: "escalated";
```

##### closed

```ts
closed: "closed";
```

***

### BillingManagementInvoicesStatusOptions

#### Enumeration Members

##### draft

```ts
draft: "draft";
```

##### sent

```ts
sent: "sent";
```

##### viewed

```ts
viewed: "viewed";
```

##### paid

```ts
paid: "paid";
```

##### partial-paid

```ts
partial-paid: "partial-paid";
```

##### past-due

```ts
past-due: "past-due";
```

##### disputed

```ts
disputed: "disputed";
```

##### cancelled

```ts
cancelled: "cancelled";
```

##### void

```ts
void: "void";
```

***

### BillingManagementPaymentsPaymentMethodOptions

#### Enumeration Members

##### credit-card

```ts
credit-card: "credit-card";
```

##### debit-card

```ts
debit-card: "debit-card";
```

##### wallet

```ts
wallet: "wallet";
```

##### qr-ph

```ts
qr-ph: "qr-ph";
```

##### client-credit

```ts
client-credit: "client-credit";
```

##### bank-transfer

```ts
bank-transfer: "bank-transfer";
```

##### cash

```ts
cash: "cash";
```

##### check

```ts
check: "check";
```

***

### BillingManagementPaymentsStatusOptions

#### Enumeration Members

##### pending

```ts
pending: "pending";
```

##### processing

```ts
processing: "processing";
```

##### successful

```ts
successful: "successful";
```

##### failed

```ts
failed: "failed";
```

##### cancelled

```ts
cancelled: "cancelled";
```

##### refunded

```ts
refunded: "refunded";
```

***

### BillingManagementQuotesStatusOptions

#### Enumeration Members

##### pending

```ts
pending: "pending";
```

##### accepted

```ts
accepted: "accepted";
```

##### expired

```ts
expired: "expired";
```

##### cancelled

```ts
cancelled: "cancelled";
```

##### converted

```ts
converted: "converted";
```

***

### BillingManagementRateCardsTypeOptions

#### Enumeration Members

##### shipping

```ts
shipping: "shipping";
```

##### storage

```ts
storage: "storage";
```

##### fulfillment

```ts
fulfillment: "fulfillment";
```

##### handling

```ts
handling: "handling";
```

##### insurance

```ts
insurance: "insurance";
```

##### customs

```ts
customs: "customs";
```

##### packaging

```ts
packaging: "packaging";
```

##### returns

```ts
returns: "returns";
```

***

### BillingManagementRateRulesPricingModelOptions

#### Enumeration Members

##### per-kg

```ts
per-kg: "per-kg";
```

##### per-item

```ts
per-item: "per-item";
```

##### flat-rate

```ts
flat-rate: "flat-rate";
```

##### per-cubic-meter

```ts
per-cubic-meter: "per-cubic-meter";
```

##### per-zone

```ts
per-zone: "per-zone";
```

##### percentage

```ts
percentage: "percentage";
```

##### tiered

```ts
tiered: "tiered";
```

***

### BillingManagementSurchargesCalculationMethodOptions

#### Enumeration Members

##### percentage

```ts
percentage: "percentage";
```

##### fixed

```ts
fixed: "fixed";
```

##### per-unit

```ts
per-unit: "per-unit";
```

##### sliding-scale

```ts
sliding-scale: "sliding-scale";
```

***

### CustomerRelationsCasesStatusOptions

#### Enumeration Members

##### new

```ts
new: "new";
```

##### in-progress

```ts
in-progress: "in-progress";
```

##### waiting-for-customer

```ts
waiting-for-customer: "waiting-for-customer";
```

##### waiting-for-internal

```ts
waiting-for-internal: "waiting-for-internal";
```

##### escalated

```ts
escalated: "escalated";
```

##### resolved

```ts
resolved: "resolved";
```

##### closed

```ts
closed: "closed";
```

##### cancelled

```ts
cancelled: "cancelled";
```

***

### CustomerRelationsCasesPriorityOptions

#### Enumeration Members

##### critical

```ts
critical: "critical";
```

##### high

```ts
high: "high";
```

##### medium

```ts
medium: "medium";
```

##### low

```ts
low: "low";
```

***

### CustomerRelationsCasesTypeOptions

#### Enumeration Members

##### question

```ts
question: "question";
```

##### problem

```ts
problem: "problem";
```

##### complaint

```ts
complaint: "complaint";
```

##### feature-request

```ts
feature-request: "feature-request";
```

##### bug-report

```ts
bug-report: "bug-report";
```

##### technical-support

```ts
technical-support: "technical-support";
```

***

### CustomerRelationsInteractionsTypeOptions

#### Enumeration Members

##### call

```ts
call: "call";
```

##### meeting

```ts
meeting: "meeting";
```

##### text

```ts
text: "text";
```

##### email

```ts
email: "email";
```

***

### CustomerRelationsInvoicesStatusOptions

#### Enumeration Members

##### draft

```ts
draft: "draft";
```

##### sent

```ts
sent: "sent";
```

##### paid

```ts
paid: "paid";
```

##### overdue

```ts
overdue: "overdue";
```

##### cancelled

```ts
cancelled: "cancelled";
```

***

### CustomerRelationsInvoicesPaymentMethodOptions

#### Enumeration Members

##### credit-card

```ts
credit-card: "credit-card";
```

##### bank-transfer

```ts
bank-transfer: "bank-transfer";
```

##### cash

```ts
cash: "cash";
```

##### check

```ts
check: "check";
```

##### paypal

```ts
paypal: "paypal";
```

##### stripe

```ts
stripe: "stripe";
```

##### wire-transfer

```ts
wire-transfer: "wire-transfer";
```

##### other

```ts
other: "other";
```

##### maya

```ts
maya: "maya";
```

##### gcash

```ts
gcash: "gcash";
```

***

### CustomerRelationsLeadsSourceOptions

#### Enumeration Members

##### website

```ts
website: "website";
```

##### referral

```ts
referral: "referral";
```

##### social-media

```ts
social-media: "social-media";
```

##### email-campaign

```ts
email-campaign: "email-campaign";
```

##### cold-call

```ts
cold-call: "cold-call";
```

##### event

```ts
event: "event";
```

##### advertisment

```ts
advertisment: "advertisment";
```

##### partner

```ts
partner: "partner";
```

##### other

```ts
other: "other";
```

***

### CustomerRelationsLeadsStatusOptions

#### Enumeration Members

##### new

```ts
new: "new";
```

##### contacted

```ts
contacted: "contacted";
```

##### qualified

```ts
qualified: "qualified";
```

##### unqualified

```ts
unqualified: "unqualified";
```

##### converted

```ts
converted: "converted";
```

***

### CustomerRelationsOpportunitiesStageOptions

#### Enumeration Members

##### prospecting

```ts
prospecting: "prospecting";
```

##### qualification

```ts
qualification: "qualification";
```

##### need-analysis

```ts
need-analysis: "need-analysis";
```

##### demo

```ts
demo: "demo";
```

##### proposal

```ts
proposal: "proposal";
```

##### negotiation

```ts
negotiation: "negotiation";
```

##### closed-won

```ts
closed-won: "closed-won";
```

##### closed-lost

```ts
closed-lost: "closed-lost";
```

***

### CustomerRelationsOpportunitiesSourceOptions

#### Enumeration Members

##### website

```ts
website: "website";
```

##### referral

```ts
referral: "referral";
```

##### social-media

```ts
social-media: "social-media";
```

##### email-campaign

```ts
email-campaign: "email-campaign";
```

##### cold-call

```ts
cold-call: "cold-call";
```

##### event

```ts
event: "event";
```

##### advertisment

```ts
advertisment: "advertisment";
```

##### partner

```ts
partner: "partner";
```

##### existing-customer

```ts
existing-customer: "existing-customer";
```

##### other

```ts
other: "other";
```

***

### CustomerRelationsProductsTypeOptions

#### Enumeration Members

##### service

```ts
service: "service";
```

##### good

```ts
good: "good";
```

##### digital

```ts
digital: "digital";
```

##### subscription

```ts
subscription: "subscription";
```

***

### DeliveryManagementRoutesStatusOptions

#### Enumeration Members

##### planned

```ts
planned: "planned";
```

##### in-progress

```ts
in-progress: "in-progress";
```

##### completed

```ts
completed: "completed";
```

##### cancelled

```ts
cancelled: "cancelled";
```

##### paused

```ts
paused: "paused";
```

***

### DeliveryManagementTaskEventsStatusOptions

#### Enumeration Members

##### assigned

```ts
assigned: "assigned";
```

##### started

```ts
started: "started";
```

##### arrived

```ts
arrived: "arrived";
```

##### delivered

```ts
delivered: "delivered";
```

##### failed

```ts
failed: "failed";
```

##### exception

```ts
exception: "exception";
```

##### cancelled

```ts
cancelled: "cancelled";
```

##### rescheduled

```ts
rescheduled: "rescheduled";
```

***

### DeliveryManagementTasksStatusOptions

#### Enumeration Members

##### pending

```ts
pending: "pending";
```

##### assigned

```ts
assigned: "assigned";
```

##### out-for-delivery

```ts
out-for-delivery: "out-for-delivery";
```

##### delivered

```ts
delivered: "delivered";
```

##### failed

```ts
failed: "failed";
```

##### cancelled

```ts
cancelled: "cancelled";
```

##### rescheduled

```ts
rescheduled: "rescheduled";
```

***

### DeliveryManagementTasksFailureReasonOptions

#### Enumeration Members

##### reecipient-not-home

```ts
reecipient-not-home: "reecipient-not-home";
```

##### address-not-found

```ts
address-not-found: "address-not-found";
```

##### refused-delivery

```ts
refused-delivery: "refused-delivery";
```

##### damaged-package

```ts
damaged-package: "damaged-package";
```

##### access-denied

```ts
access-denied: "access-denied";
```

##### weather-conditions

```ts
weather-conditions: "weather-conditions";
```

##### vehicle-breakdown

```ts
vehicle-breakdown: "vehicle-breakdown";
```

##### other

```ts
other: "other";
```

***

### TransportManagementCarrierRatesUnitOptions

#### Enumeration Members

##### per-kg

```ts
per-kg: "per-kg";
```

##### per-container

```ts
per-container: "per-container";
```

##### per-mile

```ts
per-mile: "per-mile";
```

##### per-km

```ts
per-km: "per-km";
```

##### flat-rate

```ts
flat-rate: "flat-rate";
```

***

### TransportManagementDriversStatusOptions

#### Enumeration Members

##### active

```ts
active: "active";
```

##### inactive

```ts
inactive: "inactive";
```

##### on-leave

```ts
on-leave: "on-leave";
```

***

### TransportManagementExpensesTypeOptions

#### Enumeration Members

##### fuel

```ts
fuel: "fuel";
```

##### tolls

```ts
tolls: "tolls";
```

##### maintenance

```ts
maintenance: "maintenance";
```

##### parking

```ts
parking: "parking";
```

##### meals

```ts
meals: "meals";
```

##### accomodation

```ts
accomodation: "accomodation";
```

***

### TransportManagementExpensesCurrencyOptions

#### Enumeration Members

##### PHP

```ts
PHP: "PHP";
```

##### USD

```ts
USD: "USD";
```

##### EUR

```ts
EUR: "EUR";
```

***

### TransportManagementExpensesStatusOptions

#### Enumeration Members

##### pending

```ts
pending: "pending";
```

##### approved

```ts
approved: "approved";
```

##### rejected

```ts
rejected: "rejected";
```

##### reimbursed

```ts
reimbursed: "reimbursed";
```

***

### TransportManagementPartnerInvoiceStatusOptions

#### Enumeration Members

##### pending

```ts
pending: "pending";
```

##### paid

```ts
paid: "paid";
```

##### disputed

```ts
disputed: "disputed";
```

##### overdue

```ts
overdue: "overdue";
```

##### cancelled

```ts
cancelled: "cancelled";
```

***

### TransportManagementShipmentLegsStatusOptions

#### Enumeration Members

##### pending

```ts
pending: "pending";
```

##### in-transit

```ts
in-transit: "in-transit";
```

##### delivered

```ts
delivered: "delivered";
```

##### cancelled

```ts
cancelled: "cancelled";
```

##### failed

```ts
failed: "failed";
```

***

### TransportManagementTripStopsStatusOptions

#### Enumeration Members

##### pending

```ts
pending: "pending";
```

##### arrived

```ts
arrived: "arrived";
```

##### completed

```ts
completed: "completed";
```

##### skipped

```ts
skipped: "skipped";
```

***

### TransportManagementTripsStatusOptions

#### Enumeration Members

##### planned

```ts
planned: "planned";
```

##### in-progress

```ts
in-progress: "in-progress";
```

##### completed

```ts
completed: "completed";
```

##### cancelled

```ts
cancelled: "cancelled";
```

***

### TransportManagementVehiclesStatusOptions

#### Enumeration Members

##### available

```ts
available: "available";
```

##### in-maintenance

```ts
in-maintenance: "in-maintenance";
```

##### on-trip

```ts
on-trip: "on-trip";
```

##### out-of-service

```ts
out-of-service: "out-of-service";
```

***

### UsersRolesOptions

#### Enumeration Members

##### admin

```ts
admin: "admin";
```

##### developer

```ts
developer: "developer";
```

##### user

```ts
user: "user";
```

##### client

```ts
client: "client";
```

##### client-admin

```ts
client-admin: "client-admin";
```

##### end-customer

```ts
end-customer: "end-customer";
```

##### inventory-manager

```ts
inventory-manager: "inventory-manager";
```

##### warehouse-manager

```ts
warehouse-manager: "warehouse-manager";
```

##### receiving-manager

```ts
receiving-manager: "receiving-manager";
```

##### warehouse-operator

```ts
warehouse-operator: "warehouse-operator";
```

##### picker

```ts
picker: "picker";
```

##### packer

```ts
packer: "packer";
```

##### returns-processor

```ts
returns-processor: "returns-processor";
```

##### qc-manager

```ts
qc-manager: "qc-manager";
```

##### logistics-coordinator

```ts
logistics-coordinator: "logistics-coordinator";
```

##### logistics-manager

```ts
logistics-manager: "logistics-manager";
```

##### logistics-planner

```ts
logistics-planner: "logistics-planner";
```

##### dispatcher

```ts
dispatcher: "dispatcher";
```

##### driver

```ts
driver: "driver";
```

##### fleet-manager

```ts
fleet-manager: "fleet-manager";
```

##### transport-manager

```ts
transport-manager: "transport-manager";
```

##### account-manager

```ts
account-manager: "account-manager";
```

##### pricing-analyst

```ts
pricing-analyst: "pricing-analyst";
```

##### finance-manager

```ts
finance-manager: "finance-manager";
```

##### accountant

```ts
accountant: "accountant";
```

##### sdr

```ts
sdr: "sdr";
```

##### sales-rep

```ts
sales-rep: "sales-rep";
```

##### sales-manager

```ts
sales-manager: "sales-manager";
```

##### marketing-manager

```ts
marketing-manager: "marketing-manager";
```

##### customer-support-agent

```ts
customer-support-agent: "customer-support-agent";
```

##### product-manager

```ts
product-manager: "product-manager";
```

##### carrier

```ts
carrier: "carrier";
```

***

### WarehouseManagementInboundShipmentsStatusOptions

#### Enumeration Members

##### pending

```ts
pending: "pending";
```

##### arrived

```ts
arrived: "arrived";
```

##### processing

```ts
processing: "processing";
```

##### completed

```ts
completed: "completed";
```

##### cancelled

```ts
cancelled: "cancelled";
```

***

### WarehouseManagementInventoryAdjustmentReasonOptions

#### Enumeration Members

##### cycle-count

```ts
cycle-count: "cycle-count";
```

##### damaged-goods

```ts
damaged-goods: "damaged-goods";
```

##### theft

```ts
theft: "theft";
```

##### expired

```ts
expired: "expired";
```

##### return-to-vendor

```ts
return-to-vendor: "return-to-vendor";
```

##### manual-correction

```ts
manual-correction: "manual-correction";
```

***

### WarehouseManagementInventoryStockStatusOptions

#### Enumeration Members

##### available

```ts
available: "available";
```

##### allocated

```ts
allocated: "allocated";
```

##### damaged

```ts
damaged: "damaged";
```

##### quarantine

```ts
quarantine: "quarantine";
```

##### hold

```ts
hold: "hold";
```

##### shipped

```ts
shipped: "shipped";
```

##### expired

```ts
expired: "expired";
```

***

### WarehouseManagementLocationsTypeOptions

#### Enumeration Members

##### receiving-dock

```ts
receiving-dock: "receiving-dock";
```

##### pick-bin

```ts
pick-bin: "pick-bin";
```

##### packing-station

```ts
packing-station: "packing-station";
```

##### cross-dock-area

```ts
cross-dock-area: "cross-dock-area";
```

##### bulk-storage

```ts
bulk-storage: "bulk-storage";
```

##### reserve-storage

```ts
reserve-storage: "reserve-storage";
```

##### damaged-goods

```ts
damaged-goods: "damaged-goods";
```

##### staging-area

```ts
staging-area: "staging-area";
```

##### quality-control

```ts
quality-control: "quality-control";
```

##### returns-area

```ts
returns-area: "returns-area";
```

***

### WarehouseManagementOutboundShipmentsStatusOptions

#### Enumeration Members

##### picking

```ts
picking: "picking";
```

##### packed

```ts
packed: "packed";
```

##### shipped

```ts
shipped: "shipped";
```

##### delivered

```ts
delivered: "delivered";
```

##### cancelled

```ts
cancelled: "cancelled";
```

***

### WarehouseManagementPickBatchesStatusOptions

#### Enumeration Members

##### open

```ts
open: "open";
```

##### in-progress

```ts
in-progress: "in-progress";
```

##### completed

```ts
completed: "completed";
```

##### cancelled

```ts
cancelled: "cancelled";
```

***

### WarehouseManagementPickBatchesStrategyOptions

#### Enumeration Members

##### batch-picking

```ts
batch-picking: "batch-picking";
```

##### zone-picking

```ts
zone-picking: "zone-picking";
```

##### wave-picking

```ts
wave-picking: "wave-picking";
```

##### single-order-picking

```ts
single-order-picking: "single-order-picking";
```

##### cluster-picking

```ts
cluster-picking: "cluster-picking";
```

***

### WarehouseManagementProductsStatusOptions

#### Enumeration Members

##### active

```ts
active: "active";
```

##### discontinued

```ts
discontinued: "discontinued";
```

##### obsolete

```ts
obsolete: "obsolete";
```

##### inactive

```ts
inactive: "inactive";
```

***

### WarehouseManagementPutawayRulesLocationTypeOptions

#### Enumeration Members

##### receiving-dock

```ts
receiving-dock: "receiving-dock";
```

##### pick-bin

```ts
pick-bin: "pick-bin";
```

##### packing-station

```ts
packing-station: "packing-station";
```

##### cross-dock-area

```ts
cross-dock-area: "cross-dock-area";
```

##### bulk-storage

```ts
bulk-storage: "bulk-storage";
```

##### reserve-storage

```ts
reserve-storage: "reserve-storage";
```

##### damaged-goods

```ts
damaged-goods: "damaged-goods";
```

##### staging-area

```ts
staging-area: "staging-area";
```

##### quality-control

```ts
quality-control: "quality-control";
```

##### returns-area

```ts
returns-area: "returns-area";
```

***

### WarehouseManagementReturnItemsConditionOptions

#### Enumeration Members

##### sellable

```ts
sellable: "sellable";
```

##### damaged

```ts
damaged: "damaged";
```

##### defective

```ts
defective: "defective";
```

##### expired

```ts
expired: "expired";
```

##### unsellable

```ts
unsellable: "unsellable";
```

***

### WarehouseManagementReturnsStatusOptions

#### Enumeration Members

##### requested

```ts
requested: "requested";
```

##### approved

```ts
approved: "approved";
```

##### received

```ts
received: "received";
```

##### processed

```ts
processed: "processed";
```

##### rejected

```ts
rejected: "rejected";
```

***

### WarehouseManagementSalesOrdersStatusOptions

#### Enumeration Members

##### pending

```ts
pending: "pending";
```

##### processing

```ts
processing: "processing";
```

##### shipped

```ts
shipped: "shipped";
```

##### completed

```ts
completed: "completed";
```

##### cancelled

```ts
cancelled: "cancelled";
```

***

### WarehouseManagementStockTransferStatusOptions

#### Enumeration Members

##### pending

```ts
pending: "pending";
```

##### in-transit

```ts
in-transit: "in-transit";
```

##### received

```ts
received: "received";
```

##### cancelled

```ts
cancelled: "cancelled";
```

***

### WarehouseManagementTaskItemsStatusOptions

#### Enumeration Members

##### pending

```ts
pending: "pending";
```

##### in-progress

```ts
in-progress: "in-progress";
```

##### completed

```ts
completed: "completed";
```

##### short-picked

```ts
short-picked: "short-picked";
```

##### damaged

```ts
damaged: "damaged";
```

##### not-found

```ts
not-found: "not-found";
```

***

### WarehouseManagementTasksTypeOptions

#### Enumeration Members

##### putaway

```ts
putaway: "putaway";
```

##### pick

```ts
pick: "pick";
```

##### pack

```ts
pack: "pack";
```

##### replenishment

```ts
replenishment: "replenishment";
```

##### cycle-count

```ts
cycle-count: "cycle-count";
```

##### cross-dock

```ts
cross-dock: "cross-dock";
```

##### returns-processing

```ts
returns-processing: "returns-processing";
```

##### damage-inspection

```ts
damage-inspection: "damage-inspection";
```

##### quality-check

```ts
quality-check: "quality-check";
```

***

### WarehouseManagementTasksStatusOptions

#### Enumeration Members

##### pending

```ts
pending: "pending";
```

##### assigned

```ts
assigned: "assigned";
```

##### in-progress

```ts
in-progress: "in-progress";
```

##### completed

```ts
completed: "completed";
```

##### cancelled

```ts
cancelled: "cancelled";
```

##### error

```ts
error: "error";
```

## Type Aliases

### IsoDateString

```ts
type IsoDateString = string;
```

***

### IsoAutoDateString

```ts
type IsoAutoDateString = string & {
  autodate: unique symbol;
};
```

#### Type Declaration

##### autodate

```ts
readonly autodate: unique symbol;
```

***

### RecordIdString

```ts
type RecordIdString = string;
```

***

### FileNameString

```ts
type FileNameString = string & {
  filename: unique symbol;
};
```

#### Type Declaration

##### filename

```ts
readonly filename: unique symbol;
```

***

### HTMLString

```ts
type HTMLString = string;
```

***

### GeoPoint

```ts
type GeoPoint = {
  lon: number;
  lat: number;
};
```

#### Properties

##### lon

```ts
lon: number;
```

##### lat

```ts
lat: number;
```

***

### BaseSystemFields

```ts
type BaseSystemFields<T> = {
  id: RecordIdString;
  collectionId: string;
  collectionName: Collections;
} & ExpandType<T>;
```

#### Type Declaration

##### id

```ts
id: RecordIdString;
```

##### collectionId

```ts
collectionId: string;
```

##### collectionName

```ts
collectionName: Collections;
```

#### Type Parameters

##### T

`T` = `unknown`

***

### AuthSystemFields

```ts
type AuthSystemFields<T> = {
  email: string;
  emailVisibility: boolean;
  username: string;
  verified: boolean;
} & BaseSystemFields<T>;
```

#### Type Declaration

##### email

```ts
email: string;
```

##### emailVisibility

```ts
emailVisibility: boolean;
```

##### username

```ts
username: string;
```

##### verified

```ts
verified: boolean;
```

#### Type Parameters

##### T

`T` = `unknown`

***

### AuthoriginsRecord

```ts
type AuthoriginsRecord = {
  collectionRef: string;
  created: IsoAutoDateString;
  fingerprint: string;
  id: string;
  recordRef: string;
  updated: IsoAutoDateString;
};
```

#### Properties

##### collectionRef

```ts
collectionRef: string;
```

##### created

```ts
created: IsoAutoDateString;
```

##### fingerprint

```ts
fingerprint: string;
```

##### id

```ts
id: string;
```

##### recordRef

```ts
recordRef: string;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### ExternalauthsRecord

```ts
type ExternalauthsRecord = {
  collectionRef: string;
  created: IsoAutoDateString;
  id: string;
  provider: string;
  providerId: string;
  recordRef: string;
  updated: IsoAutoDateString;
};
```

#### Properties

##### collectionRef

```ts
collectionRef: string;
```

##### created

```ts
created: IsoAutoDateString;
```

##### id

```ts
id: string;
```

##### provider

```ts
provider: string;
```

##### providerId

```ts
providerId: string;
```

##### recordRef

```ts
recordRef: string;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### MfasRecord

```ts
type MfasRecord = {
  collectionRef: string;
  created: IsoAutoDateString;
  id: string;
  method: string;
  recordRef: string;
  updated: IsoAutoDateString;
};
```

#### Properties

##### collectionRef

```ts
collectionRef: string;
```

##### created

```ts
created: IsoAutoDateString;
```

##### id

```ts
id: string;
```

##### method

```ts
method: string;
```

##### recordRef

```ts
recordRef: string;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### OtpsRecord

```ts
type OtpsRecord = {
  collectionRef: string;
  created: IsoAutoDateString;
  id: string;
  password: string;
  recordRef: string;
  sentTo?: string;
  updated: IsoAutoDateString;
};
```

#### Properties

##### collectionRef

```ts
collectionRef: string;
```

##### created

```ts
created: IsoAutoDateString;
```

##### id

```ts
id: string;
```

##### password

```ts
password: string;
```

##### recordRef

```ts
recordRef: string;
```

##### sentTo?

```ts
optional sentTo: string;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### SuperusersRecord

```ts
type SuperusersRecord = {
  created: IsoAutoDateString;
  email: string;
  emailVisibility?: boolean;
  id: string;
  password: string;
  tokenKey: string;
  updated: IsoAutoDateString;
  verified?: boolean;
};
```

#### Properties

##### created

```ts
created: IsoAutoDateString;
```

##### email

```ts
email: string;
```

##### emailVisibility?

```ts
optional emailVisibility: boolean;
```

##### id

```ts
id: string;
```

##### password

```ts
password: string;
```

##### tokenKey

```ts
tokenKey: string;
```

##### updated

```ts
updated: IsoAutoDateString;
```

##### verified?

```ts
optional verified: boolean;
```

***

### BillingManagementAccountLogsRecord

```ts
type BillingManagementAccountLogsRecord<TrequestPayload, TresponsePayload> = {
  created: IsoAutoDateString;
  errorMessage?: string;
  externalId?: string;
  externalSystem: string;
  id: string;
  lastSyncAt?: IsoDateString;
  nextRetryAt?: IsoDateString;
  recordId: string;
  recordType: string;
  requestPayload?: null | TrequestPayload;
  responsePayload?: null | TresponsePayload;
  retryCount?: number;
  status?: BillingManagementAccountLogsStatusOptions;
  updated: IsoAutoDateString;
};
```

#### Type Parameters

##### TrequestPayload

`TrequestPayload` = `unknown`

##### TresponsePayload

`TresponsePayload` = `unknown`

#### Properties

##### created

```ts
created: IsoAutoDateString;
```

##### errorMessage?

```ts
optional errorMessage: string;
```

##### externalId?

```ts
optional externalId: string;
```

##### externalSystem

```ts
externalSystem: string;
```

##### id

```ts
id: string;
```

##### lastSyncAt?

```ts
optional lastSyncAt: IsoDateString;
```

##### nextRetryAt?

```ts
optional nextRetryAt: IsoDateString;
```

##### recordId

```ts
recordId: string;
```

##### recordType

```ts
recordType: string;
```

##### requestPayload?

```ts
optional requestPayload: null | TrequestPayload;
```

##### responsePayload?

```ts
optional responsePayload: null | TresponsePayload;
```

##### retryCount?

```ts
optional retryCount: number;
```

##### status?

```ts
optional status: BillingManagementAccountLogsStatusOptions;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### BillingManagementAccountTransactionsRecord

```ts
type BillingManagementAccountTransactionsRecord = {
  amount: number;
  clientAccount: RecordIdString;
  created: IsoAutoDateString;
  id: string;
  processedBy?: RecordIdString;
  referenceNumber?: string;
  runningBalance?: number;
  transactionDate?: IsoDateString;
  type: BillingManagementAccountTransactionsTypeOptions;
  updated: IsoAutoDateString;
};
```

#### Properties

##### amount

```ts
amount: number;
```

##### clientAccount

```ts
clientAccount: RecordIdString;
```

##### created

```ts
created: IsoAutoDateString;
```

##### id

```ts
id: string;
```

##### processedBy?

```ts
optional processedBy: RecordIdString;
```

##### referenceNumber?

```ts
optional referenceNumber: string;
```

##### runningBalance?

```ts
optional runningBalance: number;
```

##### transactionDate?

```ts
optional transactionDate: IsoDateString;
```

##### type

```ts
type: BillingManagementAccountTransactionsTypeOptions;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### BillingManagementClientAccountsRecord

```ts
type BillingManagementClientAccountsRecord = {
  availableCredit?: number;
  client?: RecordIdString;
  created: IsoAutoDateString;
  creditLimit?: number;
  currency?: string;
  id: string;
  isCreditApproved?: boolean;
  lastPaymentDate?: IsoDateString;
  paymentTermsDays?: number;
  updated: IsoAutoDateString;
  walletBalance?: number;
};
```

#### Properties

##### availableCredit?

```ts
optional availableCredit: number;
```

##### client?

```ts
optional client: RecordIdString;
```

##### created

```ts
created: IsoAutoDateString;
```

##### creditLimit?

```ts
optional creditLimit: number;
```

##### currency?

```ts
optional currency: string;
```

##### id

```ts
id: string;
```

##### isCreditApproved?

```ts
optional isCreditApproved: boolean;
```

##### lastPaymentDate?

```ts
optional lastPaymentDate: IsoDateString;
```

##### paymentTermsDays?

```ts
optional paymentTermsDays: number;
```

##### updated

```ts
updated: IsoAutoDateString;
```

##### walletBalance?

```ts
optional walletBalance: number;
```

***

### BillingManagementCreditNotesRecord

```ts
type BillingManagementCreditNotesRecord = {
  amount?: number;
  appliedAt?: IsoDateString;
  created: IsoAutoDateString;
  creditNoteNumber: string;
  currency: string;
  dispute: RecordIdString;
  id: string;
  invoice: RecordIdString;
  issueDate: IsoDateString;
  notes?: HTMLString;
  reason: HTMLString;
  updated: IsoAutoDateString;
};
```

#### Properties

##### amount?

```ts
optional amount: number;
```

##### appliedAt?

```ts
optional appliedAt: IsoDateString;
```

##### created

```ts
created: IsoAutoDateString;
```

##### creditNoteNumber

```ts
creditNoteNumber: string;
```

##### currency

```ts
currency: string;
```

##### dispute

```ts
dispute: RecordIdString;
```

##### id

```ts
id: string;
```

##### invoice

```ts
invoice: RecordIdString;
```

##### issueDate

```ts
issueDate: IsoDateString;
```

##### notes?

```ts
optional notes: HTMLString;
```

##### reason

```ts
reason: HTMLString;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### BillingManagementDisputesRecord

```ts
type BillingManagementDisputesRecord = {
  attachments?: FileNameString[];
  client: RecordIdString;
  created: IsoAutoDateString;
  disputeAmount?: number;
  id: string;
  lineItem: RecordIdString;
  reason: HTMLString;
  resolutionNotes?: HTMLString;
  resolvedAt?: IsoDateString;
  resolvedBy?: RecordIdString;
  status: BillingManagementDisputesStatusOptions;
  submittedAt?: IsoDateString;
  updated: IsoAutoDateString;
};
```

#### Properties

##### attachments?

```ts
optional attachments: FileNameString[];
```

##### client

```ts
client: RecordIdString;
```

##### created

```ts
created: IsoAutoDateString;
```

##### disputeAmount?

```ts
optional disputeAmount: number;
```

##### id

```ts
id: string;
```

##### lineItem

```ts
lineItem: RecordIdString;
```

##### reason

```ts
reason: HTMLString;
```

##### resolutionNotes?

```ts
optional resolutionNotes: HTMLString;
```

##### resolvedAt?

```ts
optional resolvedAt: IsoDateString;
```

##### resolvedBy?

```ts
optional resolvedBy: RecordIdString;
```

##### status

```ts
status: BillingManagementDisputesStatusOptions;
```

##### submittedAt?

```ts
optional submittedAt: IsoDateString;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### BillingManagementInvoiceLineItemsRecord

```ts
type BillingManagementInvoiceLineItemsRecord = {
  created: IsoAutoDateString;
  description?: HTMLString;
  discountAmount?: number;
  discountRate?: number;
  id: string;
  invoice?: RecordIdString;
  quantity?: number;
  taxAmount?: number;
  taxRate?: number;
  unitPrice?: number;
  updated: IsoAutoDateString;
};
```

#### Properties

##### created

```ts
created: IsoAutoDateString;
```

##### description?

```ts
optional description: HTMLString;
```

##### discountAmount?

```ts
optional discountAmount: number;
```

##### discountRate?

```ts
optional discountRate: number;
```

##### id

```ts
id: string;
```

##### invoice?

```ts
optional invoice: RecordIdString;
```

##### quantity?

```ts
optional quantity: number;
```

##### taxAmount?

```ts
optional taxAmount: number;
```

##### taxRate?

```ts
optional taxRate: number;
```

##### unitPrice?

```ts
optional unitPrice: number;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### BillingManagementInvoicesRecord

```ts
type BillingManagementInvoicesRecord = {
  amountPaid?: number;
  attachments?: FileNameString[];
  created: IsoAutoDateString;
  createdBy?: RecordIdString;
  currency?: string;
  discountAmount?: number;
  dueDate?: IsoDateString;
  id: string;
  invoiceNumber?: string;
  issueDate?: IsoDateString;
  notes?: HTMLString;
  paidAt?: IsoDateString;
  paymentTerms?: HTMLString;
  quote?: RecordIdString;
  sentAt?: IsoDateString;
  status?: BillingManagementInvoicesStatusOptions;
  subtotal?: number;
  totalAmount?: number;
  updated: IsoAutoDateString;
};
```

#### Properties

##### amountPaid?

```ts
optional amountPaid: number;
```

##### attachments?

```ts
optional attachments: FileNameString[];
```

##### created

```ts
created: IsoAutoDateString;
```

##### createdBy?

```ts
optional createdBy: RecordIdString;
```

##### currency?

```ts
optional currency: string;
```

##### discountAmount?

```ts
optional discountAmount: number;
```

##### dueDate?

```ts
optional dueDate: IsoDateString;
```

##### id

```ts
id: string;
```

##### invoiceNumber?

```ts
optional invoiceNumber: string;
```

##### issueDate?

```ts
optional issueDate: IsoDateString;
```

##### notes?

```ts
optional notes: HTMLString;
```

##### paidAt?

```ts
optional paidAt: IsoDateString;
```

##### paymentTerms?

```ts
optional paymentTerms: HTMLString;
```

##### quote?

```ts
optional quote: RecordIdString;
```

##### sentAt?

```ts
optional sentAt: IsoDateString;
```

##### status?

```ts
optional status: BillingManagementInvoicesStatusOptions;
```

##### subtotal?

```ts
optional subtotal: number;
```

##### totalAmount?

```ts
optional totalAmount: number;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### BillingManagementPaymentsRecord

```ts
type BillingManagementPaymentsRecord = {
  amount?: number;
  attachments?: FileNameString[];
  created: IsoAutoDateString;
  currency?: string;
  fees?: number;
  gatewayReferenceId?: string;
  id: string;
  invoice?: RecordIdString;
  netAmount?: number;
  notes?: HTMLString;
  paymentDate?: IsoDateString;
  paymentMethod?: BillingManagementPaymentsPaymentMethodOptions;
  processedAt?: IsoDateString;
  processedBy?: RecordIdString;
  status?: BillingManagementPaymentsStatusOptions;
  transactionId?: string;
  updated: IsoAutoDateString;
};
```

#### Properties

##### amount?

```ts
optional amount: number;
```

##### attachments?

```ts
optional attachments: FileNameString[];
```

##### created

```ts
created: IsoAutoDateString;
```

##### currency?

```ts
optional currency: string;
```

##### fees?

```ts
optional fees: number;
```

##### gatewayReferenceId?

```ts
optional gatewayReferenceId: string;
```

##### id

```ts
id: string;
```

##### invoice?

```ts
optional invoice: RecordIdString;
```

##### netAmount?

```ts
optional netAmount: number;
```

##### notes?

```ts
optional notes: HTMLString;
```

##### paymentDate?

```ts
optional paymentDate: IsoDateString;
```

##### paymentMethod?

```ts
optional paymentMethod: BillingManagementPaymentsPaymentMethodOptions;
```

##### processedAt?

```ts
optional processedAt: IsoDateString;
```

##### processedBy?

```ts
optional processedBy: RecordIdString;
```

##### status?

```ts
optional status: BillingManagementPaymentsStatusOptions;
```

##### transactionId?

```ts
optional transactionId: string;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### BillingManagementQuotesRecord

```ts
type BillingManagementQuotesRecord = {
  attachments?: FileNameString[];
  client?: RecordIdString;
  created: IsoAutoDateString;
  createdBy?: RecordIdString;
  destinationDetails?: HTMLString;
  expiredAt?: IsoDateString;
  height?: number;
  id: string;
  length?: number;
  notes?: HTMLString;
  originDetails?: HTMLString;
  quoteNumber?: string;
  quotePrice?: number;
  serviceLevel?: string;
  status?: BillingManagementQuotesStatusOptions;
  updated: IsoAutoDateString;
  weight?: number;
  width?: number;
};
```

#### Properties

##### attachments?

```ts
optional attachments: FileNameString[];
```

##### client?

```ts
optional client: RecordIdString;
```

##### created

```ts
created: IsoAutoDateString;
```

##### createdBy?

```ts
optional createdBy: RecordIdString;
```

##### destinationDetails?

```ts
optional destinationDetails: HTMLString;
```

##### expiredAt?

```ts
optional expiredAt: IsoDateString;
```

##### height?

```ts
optional height: number;
```

##### id

```ts
id: string;
```

##### length?

```ts
optional length: number;
```

##### notes?

```ts
optional notes: HTMLString;
```

##### originDetails?

```ts
optional originDetails: HTMLString;
```

##### quoteNumber?

```ts
optional quoteNumber: string;
```

##### quotePrice?

```ts
optional quotePrice: number;
```

##### serviceLevel?

```ts
optional serviceLevel: string;
```

##### status?

```ts
optional status: BillingManagementQuotesStatusOptions;
```

##### updated

```ts
updated: IsoAutoDateString;
```

##### weight?

```ts
optional weight: number;
```

##### width?

```ts
optional width: number;
```

***

### BillingManagementRateCardsRecord

```ts
type BillingManagementRateCardsRecord = {
  created: IsoAutoDateString;
  createdBy?: RecordIdString;
  description?: HTMLString;
  id: string;
  isActive?: boolean;
  name: string;
  type: BillingManagementRateCardsTypeOptions;
  updated: IsoAutoDateString;
  validFrom?: IsoDateString;
  validTo?: IsoDateString;
};
```

#### Properties

##### created

```ts
created: IsoAutoDateString;
```

##### createdBy?

```ts
optional createdBy: RecordIdString;
```

##### description?

```ts
optional description: HTMLString;
```

##### id

```ts
id: string;
```

##### isActive?

```ts
optional isActive: boolean;
```

##### name

```ts
name: string;
```

##### type

```ts
type: BillingManagementRateCardsTypeOptions;
```

##### updated

```ts
updated: IsoAutoDateString;
```

##### validFrom?

```ts
optional validFrom: IsoDateString;
```

##### validTo?

```ts
optional validTo: IsoDateString;
```

***

### BillingManagementRateRulesRecord

```ts
type BillingManagementRateRulesRecord = {
  condition: string;
  created: IsoAutoDateString;
  id: string;
  isActive?: boolean;
  maxValue?: number;
  minValue?: number;
  price: number;
  pricingModel: BillingManagementRateRulesPricingModelOptions;
  priority: number;
  rateCard?: RecordIdString;
  updated: IsoAutoDateString;
  value: string;
};
```

#### Properties

##### condition

```ts
condition: string;
```

##### created

```ts
created: IsoAutoDateString;
```

##### id

```ts
id: string;
```

##### isActive?

```ts
optional isActive: boolean;
```

##### maxValue?

```ts
optional maxValue: number;
```

##### minValue?

```ts
optional minValue: number;
```

##### price

```ts
price: number;
```

##### pricingModel

```ts
pricingModel: BillingManagementRateRulesPricingModelOptions;
```

##### priority

```ts
priority: number;
```

##### rateCard?

```ts
optional rateCard: RecordIdString;
```

##### updated

```ts
updated: IsoAutoDateString;
```

##### value

```ts
value: string;
```

***

### BillingManagementSurchargesRecord

```ts
type BillingManagementSurchargesRecord = {
  amount?: number;
  calculationMethod?: BillingManagementSurchargesCalculationMethodOptions;
  created: IsoAutoDateString;
  description?: HTMLString;
  id: string;
  isActive?: boolean;
  name?: string;
  type?: string;
  updated: IsoAutoDateString;
  validFrom?: IsoDateString;
  validTo?: IsoDateString;
};
```

#### Properties

##### amount?

```ts
optional amount: number;
```

##### calculationMethod?

```ts
optional calculationMethod: BillingManagementSurchargesCalculationMethodOptions;
```

##### created

```ts
created: IsoAutoDateString;
```

##### description?

```ts
optional description: HTMLString;
```

##### id

```ts
id: string;
```

##### isActive?

```ts
optional isActive: boolean;
```

##### name?

```ts
optional name: string;
```

##### type?

```ts
optional type: string;
```

##### updated

```ts
updated: IsoAutoDateString;
```

##### validFrom?

```ts
optional validFrom: IsoDateString;
```

##### validTo?

```ts
optional validTo: IsoDateString;
```

***

### CustomerRelationsCampaignsRecord

```ts
type CustomerRelationsCampaignsRecord = {
  attachments?: FileNameString[];
  budget: number;
  created: IsoAutoDateString;
  endDate?: IsoDateString;
  id: string;
  name: string;
  startDate?: IsoDateString;
  updated: IsoAutoDateString;
};
```

#### Properties

##### attachments?

```ts
optional attachments: FileNameString[];
```

##### budget

```ts
budget: number;
```

##### created

```ts
created: IsoAutoDateString;
```

##### endDate?

```ts
optional endDate: IsoDateString;
```

##### id

```ts
id: string;
```

##### name

```ts
name: string;
```

##### startDate?

```ts
optional startDate: IsoDateString;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### CustomerRelationsCasesRecord

```ts
type CustomerRelationsCasesRecord = {
  caseNumber: string;
  contact?: RecordIdString;
  created: IsoAutoDateString;
  description?: HTMLString;
  id: string;
  owner: RecordIdString;
  priority: CustomerRelationsCasesPriorityOptions;
  status: CustomerRelationsCasesStatusOptions;
  type: CustomerRelationsCasesTypeOptions;
  updated: IsoAutoDateString;
};
```

#### Properties

##### caseNumber

```ts
caseNumber: string;
```

##### contact?

```ts
optional contact: RecordIdString;
```

##### created

```ts
created: IsoAutoDateString;
```

##### description?

```ts
optional description: HTMLString;
```

##### id

```ts
id: string;
```

##### owner

```ts
owner: RecordIdString;
```

##### priority

```ts
priority: CustomerRelationsCasesPriorityOptions;
```

##### status

```ts
status: CustomerRelationsCasesStatusOptions;
```

##### type

```ts
type: CustomerRelationsCasesTypeOptions;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### CustomerRelationsCompaniesRecord

```ts
type CustomerRelationsCompaniesRecord = {
  annualRevenue?: number;
  attachments?: FileNameString[];
  city?: string;
  country?: string;
  created: IsoAutoDateString;
  id: string;
  industry?: string;
  name: string;
  owner?: RecordIdString;
  phoneNumber?: string;
  postalCode?: string;
  state?: string;
  street?: string;
  updated: IsoAutoDateString;
  website?: string;
};
```

#### Properties

##### annualRevenue?

```ts
optional annualRevenue: number;
```

##### attachments?

```ts
optional attachments: FileNameString[];
```

##### city?

```ts
optional city: string;
```

##### country?

```ts
optional country: string;
```

##### created

```ts
created: IsoAutoDateString;
```

##### id

```ts
id: string;
```

##### industry?

```ts
optional industry: string;
```

##### name

```ts
name: string;
```

##### owner?

```ts
optional owner: RecordIdString;
```

##### phoneNumber?

```ts
optional phoneNumber: string;
```

##### postalCode?

```ts
optional postalCode: string;
```

##### state?

```ts
optional state: string;
```

##### street?

```ts
optional street: string;
```

##### updated

```ts
updated: IsoAutoDateString;
```

##### website?

```ts
optional website: string;
```

***

### CustomerRelationsContactsRecord

```ts
type CustomerRelationsContactsRecord = {
  attachments?: FileNameString[];
  company?: RecordIdString;
  created: IsoAutoDateString;
  email: string;
  id: string;
  jobTitle?: string;
  name: string;
  owner: RecordIdString;
  phoneNumber?: string;
  updated: IsoAutoDateString;
};
```

#### Properties

##### attachments?

```ts
optional attachments: FileNameString[];
```

##### company?

```ts
optional company: RecordIdString;
```

##### created

```ts
created: IsoAutoDateString;
```

##### email

```ts
email: string;
```

##### id

```ts
id: string;
```

##### jobTitle?

```ts
optional jobTitle: string;
```

##### name

```ts
name: string;
```

##### owner

```ts
owner: RecordIdString;
```

##### phoneNumber?

```ts
optional phoneNumber: string;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### CustomerRelationsInteractionsRecord

```ts
type CustomerRelationsInteractionsRecord = {
  attachments?: FileNameString[];
  case?: RecordIdString;
  contact: RecordIdString;
  id: string;
  interactionDate: IsoAutoDateString;
  notes?: HTMLString;
  outcome?: string;
  type?: CustomerRelationsInteractionsTypeOptions;
  user: RecordIdString;
};
```

#### Properties

##### attachments?

```ts
optional attachments: FileNameString[];
```

##### case?

```ts
optional case: RecordIdString;
```

##### contact

```ts
contact: RecordIdString;
```

##### id

```ts
id: string;
```

##### interactionDate

```ts
interactionDate: IsoAutoDateString;
```

##### notes?

```ts
optional notes: HTMLString;
```

##### outcome?

```ts
optional outcome: string;
```

##### type?

```ts
optional type: CustomerRelationsInteractionsTypeOptions;
```

##### user

```ts
user: RecordIdString;
```

***

### CustomerRelationsInvoiceItemsRecord

```ts
type CustomerRelationsInvoiceItemsRecord = {
  created: IsoAutoDateString;
  id: string;
  invoice: RecordIdString;
  price: number;
  product: RecordIdString;
  quantity: number;
  updated: IsoAutoDateString;
};
```

#### Properties

##### created

```ts
created: IsoAutoDateString;
```

##### id

```ts
id: string;
```

##### invoice

```ts
invoice: RecordIdString;
```

##### price

```ts
price: number;
```

##### product

```ts
product: RecordIdString;
```

##### quantity

```ts
quantity: number;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### CustomerRelationsInvoicesRecord

```ts
type CustomerRelationsInvoicesRecord = {
  attachments?: FileNameString[];
  created: IsoAutoDateString;
  dueDate?: IsoDateString;
  id: string;
  invoiceNumber: string;
  issueDate?: IsoDateString;
  items?: RecordIdString[];
  opportunity?: RecordIdString;
  paidAt?: IsoDateString;
  paymentMethod?: CustomerRelationsInvoicesPaymentMethodOptions;
  sentAt?: IsoDateString;
  status?: CustomerRelationsInvoicesStatusOptions;
  total?: number;
  updated: IsoAutoDateString;
};
```

#### Properties

##### attachments?

```ts
optional attachments: FileNameString[];
```

##### created

```ts
created: IsoAutoDateString;
```

##### dueDate?

```ts
optional dueDate: IsoDateString;
```

##### id

```ts
id: string;
```

##### invoiceNumber

```ts
invoiceNumber: string;
```

##### issueDate?

```ts
optional issueDate: IsoDateString;
```

##### items?

```ts
optional items: RecordIdString[];
```

##### opportunity?

```ts
optional opportunity: RecordIdString;
```

##### paidAt?

```ts
optional paidAt: IsoDateString;
```

##### paymentMethod?

```ts
optional paymentMethod: CustomerRelationsInvoicesPaymentMethodOptions;
```

##### sentAt?

```ts
optional sentAt: IsoDateString;
```

##### status?

```ts
optional status: CustomerRelationsInvoicesStatusOptions;
```

##### total?

```ts
optional total: number;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### CustomerRelationsLeadsRecord

```ts
type CustomerRelationsLeadsRecord = {
  attachments?: FileNameString[];
  campaign?: RecordIdString;
  convertedAt?: IsoDateString;
  convertedCompany?: RecordIdString;
  convertedContact?: RecordIdString;
  convertedOpportunity?: RecordIdString;
  created: IsoAutoDateString;
  email?: string;
  id: string;
  name?: string;
  owner: RecordIdString;
  score: number;
  source?: CustomerRelationsLeadsSourceOptions;
  status?: CustomerRelationsLeadsStatusOptions;
  updated: IsoAutoDateString;
};
```

#### Properties

##### attachments?

```ts
optional attachments: FileNameString[];
```

##### campaign?

```ts
optional campaign: RecordIdString;
```

##### convertedAt?

```ts
optional convertedAt: IsoDateString;
```

##### convertedCompany?

```ts
optional convertedCompany: RecordIdString;
```

##### convertedContact?

```ts
optional convertedContact: RecordIdString;
```

##### convertedOpportunity?

```ts
optional convertedOpportunity: RecordIdString;
```

##### created

```ts
created: IsoAutoDateString;
```

##### email?

```ts
optional email: string;
```

##### id

```ts
id: string;
```

##### name?

```ts
optional name: string;
```

##### owner

```ts
owner: RecordIdString;
```

##### score

```ts
score: number;
```

##### source?

```ts
optional source: CustomerRelationsLeadsSourceOptions;
```

##### status?

```ts
optional status: CustomerRelationsLeadsStatusOptions;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### CustomerRelationsOpportunitiesRecord

```ts
type CustomerRelationsOpportunitiesRecord = {
  attachments?: FileNameString[];
  campaign?: RecordIdString;
  company?: RecordIdString;
  contact?: RecordIdString;
  created: IsoAutoDateString;
  dealValue?: number;
  expectedCloseDate?: IsoDateString;
  id: string;
  lostReason?: HTMLString;
  name: string;
  owner: RecordIdString;
  probability?: number;
  products?: RecordIdString[];
  source: CustomerRelationsOpportunitiesSourceOptions;
  stage?: CustomerRelationsOpportunitiesStageOptions;
  updated: IsoAutoDateString;
};
```

#### Properties

##### attachments?

```ts
optional attachments: FileNameString[];
```

##### campaign?

```ts
optional campaign: RecordIdString;
```

##### company?

```ts
optional company: RecordIdString;
```

##### contact?

```ts
optional contact: RecordIdString;
```

##### created

```ts
created: IsoAutoDateString;
```

##### dealValue?

```ts
optional dealValue: number;
```

##### expectedCloseDate?

```ts
optional expectedCloseDate: IsoDateString;
```

##### id

```ts
id: string;
```

##### lostReason?

```ts
optional lostReason: HTMLString;
```

##### name

```ts
name: string;
```

##### owner

```ts
owner: RecordIdString;
```

##### probability?

```ts
optional probability: number;
```

##### products?

```ts
optional products: RecordIdString[];
```

##### source

```ts
source: CustomerRelationsOpportunitiesSourceOptions;
```

##### stage?

```ts
optional stage: CustomerRelationsOpportunitiesStageOptions;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### CustomerRelationsOpportunityProductsRecord

```ts
type CustomerRelationsOpportunityProductsRecord = {
  created: IsoAutoDateString;
  id: string;
  opportunity?: RecordIdString;
  product?: RecordIdString;
  quantity: number;
  updated: IsoAutoDateString;
};
```

#### Properties

##### created

```ts
created: IsoAutoDateString;
```

##### id

```ts
id: string;
```

##### opportunity?

```ts
optional opportunity: RecordIdString;
```

##### product?

```ts
optional product: RecordIdString;
```

##### quantity

```ts
quantity: number;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### CustomerRelationsProductsRecord

```ts
type CustomerRelationsProductsRecord = {
  attachments?: FileNameString[];
  created: IsoAutoDateString;
  description?: HTMLString;
  id: string;
  name: string;
  price: number;
  sku: string;
  type: CustomerRelationsProductsTypeOptions;
  updated: IsoAutoDateString;
};
```

#### Properties

##### attachments?

```ts
optional attachments: FileNameString[];
```

##### created

```ts
created: IsoAutoDateString;
```

##### description?

```ts
optional description: HTMLString;
```

##### id

```ts
id: string;
```

##### name

```ts
name: string;
```

##### price

```ts
price: number;
```

##### sku

```ts
sku: string;
```

##### type

```ts
type: CustomerRelationsProductsTypeOptions;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### DeliveryManagementDriverLocationRecord

```ts
type DeliveryManagementDriverLocationRecord = {
  coordinates: GeoPoint;
  driver: RecordIdString;
  id: string;
  timestamp: IsoAutoDateString;
};
```

#### Properties

##### coordinates

```ts
coordinates: GeoPoint;
```

##### driver

```ts
driver: RecordIdString;
```

##### id

```ts
id: string;
```

##### timestamp

```ts
timestamp: IsoAutoDateString;
```

***

### DeliveryManagementProofOfDeliveriesRecord

```ts
type DeliveryManagementProofOfDeliveriesRecord = {
  coordinates?: GeoPoint;
  id: string;
  recipientName?: string;
  signatureData?: FileNameString;
  task?: RecordIdString;
  timestamp: IsoAutoDateString;
};
```

#### Properties

##### coordinates?

```ts
optional coordinates: GeoPoint;
```

##### id

```ts
id: string;
```

##### recipientName?

```ts
optional recipientName: string;
```

##### signatureData?

```ts
optional signatureData: FileNameString;
```

##### task?

```ts
optional task: RecordIdString;
```

##### timestamp

```ts
timestamp: IsoAutoDateString;
```

***

### DeliveryManagementRoutesRecord

```ts
type DeliveryManagementRoutesRecord = {
  completedAt?: IsoDateString;
  created: IsoAutoDateString;
  driver?: RecordIdString;
  estimatedDurationInMinutes?: number;
  id: string;
  name?: string;
  routeDate?: IsoDateString;
  startedAt?: IsoDateString;
  status?: DeliveryManagementRoutesStatusOptions;
  totalDistance?: number;
  updated: IsoAutoDateString;
};
```

#### Properties

##### completedAt?

```ts
optional completedAt: IsoDateString;
```

##### created

```ts
created: IsoAutoDateString;
```

##### driver?

```ts
optional driver: RecordIdString;
```

##### estimatedDurationInMinutes?

```ts
optional estimatedDurationInMinutes: number;
```

##### id

```ts
id: string;
```

##### name?

```ts
optional name: string;
```

##### routeDate?

```ts
optional routeDate: IsoDateString;
```

##### startedAt?

```ts
optional startedAt: IsoDateString;
```

##### status?

```ts
optional status: DeliveryManagementRoutesStatusOptions;
```

##### totalDistance?

```ts
optional totalDistance: number;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### DeliveryManagementTaskEventsRecord

```ts
type DeliveryManagementTaskEventsRecord = {
  coordinates?: GeoPoint;
  id: string;
  notes?: HTMLString;
  reason?: HTMLString;
  status: DeliveryManagementTaskEventsStatusOptions;
  task: RecordIdString;
  timestamp: IsoAutoDateString;
};
```

#### Properties

##### coordinates?

```ts
optional coordinates: GeoPoint;
```

##### id

```ts
id: string;
```

##### notes?

```ts
optional notes: HTMLString;
```

##### reason?

```ts
optional reason: HTMLString;
```

##### status

```ts
status: DeliveryManagementTaskEventsStatusOptions;
```

##### task

```ts
task: RecordIdString;
```

##### timestamp

```ts
timestamp: IsoAutoDateString;
```

***

### DeliveryManagementTasksRecord

```ts
type DeliveryManagementTasksRecord = {
  actualArrivalTime?: IsoDateString;
  attachments?: FileNameString[];
  attempCount?: number;
  created: IsoAutoDateString;
  deliveryAddress: string;
  deliveryInstructions?: HTMLString;
  deliveryTime?: IsoDateString;
  estimatedArrivalTime?: IsoDateString;
  failureReason?: DeliveryManagementTasksFailureReasonOptions;
  id: string;
  package: RecordIdString;
  recipientName?: string;
  recipientPhone?: string;
  route: RecordIdString;
  sequence: number;
  status: DeliveryManagementTasksStatusOptions;
  updated: IsoAutoDateString;
};
```

#### Properties

##### actualArrivalTime?

```ts
optional actualArrivalTime: IsoDateString;
```

##### attachments?

```ts
optional attachments: FileNameString[];
```

##### attempCount?

```ts
optional attempCount: number;
```

##### created

```ts
created: IsoAutoDateString;
```

##### deliveryAddress

```ts
deliveryAddress: string;
```

##### deliveryInstructions?

```ts
optional deliveryInstructions: HTMLString;
```

##### deliveryTime?

```ts
optional deliveryTime: IsoDateString;
```

##### estimatedArrivalTime?

```ts
optional estimatedArrivalTime: IsoDateString;
```

##### failureReason?

```ts
optional failureReason: DeliveryManagementTasksFailureReasonOptions;
```

##### id

```ts
id: string;
```

##### package

```ts
package: RecordIdString;
```

##### recipientName?

```ts
optional recipientName: string;
```

##### recipientPhone?

```ts
optional recipientPhone: string;
```

##### route

```ts
route: RecordIdString;
```

##### sequence

```ts
sequence: number;
```

##### status

```ts
status: DeliveryManagementTasksStatusOptions;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### NotificationsRecord

```ts
type NotificationsRecord = {
  created: IsoAutoDateString;
  id: string;
  isRead?: boolean;
  link?: string;
  message: HTMLString;
  updated: IsoAutoDateString;
  user: RecordIdString;
};
```

#### Properties

##### created

```ts
created: IsoAutoDateString;
```

##### id

```ts
id: string;
```

##### isRead?

```ts
optional isRead: boolean;
```

##### link?

```ts
optional link: string;
```

##### message

```ts
message: HTMLString;
```

##### updated

```ts
updated: IsoAutoDateString;
```

##### user

```ts
user: RecordIdString;
```

***

### TransportManagementCarrierRatesRecord

```ts
type TransportManagementCarrierRatesRecord = {
  carrier?: RecordIdString;
  created: IsoAutoDateString;
  destination: string;
  id: string;
  origin: string;
  rate: number;
  serviceType?: string;
  unit?: TransportManagementCarrierRatesUnitOptions;
  updated: IsoAutoDateString;
};
```

#### Properties

##### carrier?

```ts
optional carrier: RecordIdString;
```

##### created

```ts
created: IsoAutoDateString;
```

##### destination

```ts
destination: string;
```

##### id

```ts
id: string;
```

##### origin

```ts
origin: string;
```

##### rate

```ts
rate: number;
```

##### serviceType?

```ts
optional serviceType: string;
```

##### unit?

```ts
optional unit: TransportManagementCarrierRatesUnitOptions;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### TransportManagementCarriersRecord

```ts
type TransportManagementCarriersRecord = {
  contactDetails?: HTMLString;
  created: IsoAutoDateString;
  id: string;
  image?: FileNameString;
  name: string;
  serviceOffered?: HTMLString;
  updated: IsoAutoDateString;
};
```

#### Properties

##### contactDetails?

```ts
optional contactDetails: HTMLString;
```

##### created

```ts
created: IsoAutoDateString;
```

##### id

```ts
id: string;
```

##### image?

```ts
optional image: FileNameString;
```

##### name

```ts
name: string;
```

##### serviceOffered?

```ts
optional serviceOffered: HTMLString;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### TransportManagementDriversRecord

```ts
type TransportManagementDriversRecord = {
  created: IsoAutoDateString;
  id: string;
  licenseExpiryDate?: IsoDateString;
  licenseNumber: string;
  status: TransportManagementDriversStatusOptions;
  updated: IsoAutoDateString;
  user?: RecordIdString;
};
```

#### Properties

##### created

```ts
created: IsoAutoDateString;
```

##### id

```ts
id: string;
```

##### licenseExpiryDate?

```ts
optional licenseExpiryDate: IsoDateString;
```

##### licenseNumber

```ts
licenseNumber: string;
```

##### status

```ts
status: TransportManagementDriversStatusOptions;
```

##### updated

```ts
updated: IsoAutoDateString;
```

##### user?

```ts
optional user: RecordIdString;
```

***

### TransportManagementExpensesRecord

```ts
type TransportManagementExpensesRecord = {
  amount: number;
  created: IsoAutoDateString;
  currency: TransportManagementExpensesCurrencyOptions;
  driver?: RecordIdString;
  fuelQuantity?: number;
  id: string;
  odometerReading: number;
  receipts: FileNameString[];
  status: TransportManagementExpensesStatusOptions;
  trip?: RecordIdString;
  type: TransportManagementExpensesTypeOptions;
  updated: IsoAutoDateString;
};
```

#### Properties

##### amount

```ts
amount: number;
```

##### created

```ts
created: IsoAutoDateString;
```

##### currency

```ts
currency: TransportManagementExpensesCurrencyOptions;
```

##### driver?

```ts
optional driver: RecordIdString;
```

##### fuelQuantity?

```ts
optional fuelQuantity: number;
```

##### id

```ts
id: string;
```

##### odometerReading

```ts
odometerReading: number;
```

##### receipts

```ts
receipts: FileNameString[];
```

##### status

```ts
status: TransportManagementExpensesStatusOptions;
```

##### trip?

```ts
optional trip: RecordIdString;
```

##### type

```ts
type: TransportManagementExpensesTypeOptions;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### TransportManagementGpsPingsRecord

```ts
type TransportManagementGpsPingsRecord = {
  coordinates: GeoPoint;
  id: string;
  timestamp: IsoAutoDateString;
  vehicle: RecordIdString;
};
```

#### Properties

##### coordinates

```ts
coordinates: GeoPoint;
```

##### id

```ts
id: string;
```

##### timestamp

```ts
timestamp: IsoAutoDateString;
```

##### vehicle

```ts
vehicle: RecordIdString;
```

***

### TransportManagementPartnerInvoiceRecord

```ts
type TransportManagementPartnerInvoiceRecord = {
  carrier: RecordIdString;
  created: IsoAutoDateString;
  id: string;
  invoiceDate: IsoDateString;
  invoiceNumber: string;
  items?: RecordIdString;
  status?: TransportManagementPartnerInvoiceStatusOptions;
  totalAmount: number;
  updated: IsoAutoDateString;
};
```

#### Properties

##### carrier

```ts
carrier: RecordIdString;
```

##### created

```ts
created: IsoAutoDateString;
```

##### id

```ts
id: string;
```

##### invoiceDate

```ts
invoiceDate: IsoDateString;
```

##### invoiceNumber

```ts
invoiceNumber: string;
```

##### items?

```ts
optional items: RecordIdString;
```

##### status?

```ts
optional status: TransportManagementPartnerInvoiceStatusOptions;
```

##### totalAmount

```ts
totalAmount: number;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### TransportManagementPartnerInvoiceItemsRecord

```ts
type TransportManagementPartnerInvoiceItemsRecord = {
  amount: number;
  created: IsoAutoDateString;
  id: string;
  partnerInvoice: RecordIdString;
  shipmentLeg: RecordIdString;
  updated: IsoAutoDateString;
};
```

#### Properties

##### amount

```ts
amount: number;
```

##### created

```ts
created: IsoAutoDateString;
```

##### id

```ts
id: string;
```

##### partnerInvoice

```ts
partnerInvoice: RecordIdString;
```

##### shipmentLeg

```ts
shipmentLeg: RecordIdString;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### TransportManagementProofOfDeliveriesRecord

```ts
type TransportManagementProofOfDeliveriesRecord = {
  attachments?: FileNameString[];
  coordinate: GeoPoint;
  created: IsoAutoDateString;
  id: string;
  tripStop: RecordIdString;
  updated: IsoAutoDateString;
};
```

#### Properties

##### attachments?

```ts
optional attachments: FileNameString[];
```

##### coordinate

```ts
coordinate: GeoPoint;
```

##### created

```ts
created: IsoAutoDateString;
```

##### id

```ts
id: string;
```

##### tripStop

```ts
tripStop: RecordIdString;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### TransportManagementRoutesRecord

```ts
type TransportManagementRoutesRecord = {
  created: IsoAutoDateString;
  id: string;
  name: string;
  totalDistance: number;
  totalDuration: number;
  updated: IsoAutoDateString;
};
```

#### Properties

##### created

```ts
created: IsoAutoDateString;
```

##### id

```ts
id: string;
```

##### name

```ts
name: string;
```

##### totalDistance

```ts
totalDistance: number;
```

##### totalDuration

```ts
totalDuration: number;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### TransportManagementShipmentLegEventsRecord

```ts
type TransportManagementShipmentLegEventsRecord = {
  id: string;
  location: GeoPoint;
  message: string;
  shipmentLegId: RecordIdString;
  timestamp: IsoAutoDateString;
};
```

#### Properties

##### id

```ts
id: string;
```

##### location

```ts
location: GeoPoint;
```

##### message

```ts
message: string;
```

##### shipmentLegId

```ts
shipmentLegId: RecordIdString;
```

##### timestamp

```ts
timestamp: IsoAutoDateString;
```

***

### TransportManagementShipmentLegsRecord

```ts
type TransportManagementShipmentLegsRecord = {
  carrier?: RecordIdString;
  created: IsoAutoDateString;
  endLocation: GeoPoint;
  id: string;
  internalTrip?: RecordIdString;
  legSequence: number;
  shipment?: RecordIdString;
  startLocation: GeoPoint;
  status: TransportManagementShipmentLegsStatusOptions;
  updated: IsoAutoDateString;
};
```

#### Properties

##### carrier?

```ts
optional carrier: RecordIdString;
```

##### created

```ts
created: IsoAutoDateString;
```

##### endLocation

```ts
endLocation: GeoPoint;
```

##### id

```ts
id: string;
```

##### internalTrip?

```ts
optional internalTrip: RecordIdString;
```

##### legSequence

```ts
legSequence: number;
```

##### shipment?

```ts
optional shipment: RecordIdString;
```

##### startLocation

```ts
startLocation: GeoPoint;
```

##### status

```ts
status: TransportManagementShipmentLegsStatusOptions;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### TransportManagementTripStopsRecord

```ts
type TransportManagementTripStopsRecord = {
  actualArrivalTime?: IsoDateString;
  actualDepartureTime?: IsoDateString;
  address?: string;
  created: IsoAutoDateString;
  estimatedArrivalTime?: IsoDateString;
  estimatedDepartureTime?: IsoDateString;
  id: string;
  sequence: number;
  shipment?: RecordIdString;
  status: TransportManagementTripStopsStatusOptions;
  trip: RecordIdString;
  updated: IsoAutoDateString;
};
```

#### Properties

##### actualArrivalTime?

```ts
optional actualArrivalTime: IsoDateString;
```

##### actualDepartureTime?

```ts
optional actualDepartureTime: IsoDateString;
```

##### address?

```ts
optional address: string;
```

##### created

```ts
created: IsoAutoDateString;
```

##### estimatedArrivalTime?

```ts
optional estimatedArrivalTime: IsoDateString;
```

##### estimatedDepartureTime?

```ts
optional estimatedDepartureTime: IsoDateString;
```

##### id

```ts
id: string;
```

##### sequence

```ts
sequence: number;
```

##### shipment?

```ts
optional shipment: RecordIdString;
```

##### status

```ts
status: TransportManagementTripStopsStatusOptions;
```

##### trip

```ts
trip: RecordIdString;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### TransportManagementTripsRecord

```ts
type TransportManagementTripsRecord = {
  coordinates: GeoPoint;
  created: IsoAutoDateString;
  driver: RecordIdString;
  endAddress?: string;
  endTime?: IsoDateString;
  id: string;
  startAddress?: string;
  startTime?: IsoDateString;
  status: TransportManagementTripsStatusOptions;
  updated: IsoAutoDateString;
  vehicle: RecordIdString;
};
```

#### Properties

##### coordinates

```ts
coordinates: GeoPoint;
```

##### created

```ts
created: IsoAutoDateString;
```

##### driver

```ts
driver: RecordIdString;
```

##### endAddress?

```ts
optional endAddress: string;
```

##### endTime?

```ts
optional endTime: IsoDateString;
```

##### id

```ts
id: string;
```

##### startAddress?

```ts
optional startAddress: string;
```

##### startTime?

```ts
optional startTime: IsoDateString;
```

##### status

```ts
status: TransportManagementTripsStatusOptions;
```

##### updated

```ts
updated: IsoAutoDateString;
```

##### vehicle

```ts
vehicle: RecordIdString;
```

***

### TransportManagementVehicleMaintenanceRecord

```ts
type TransportManagementVehicleMaintenanceRecord = {
  cost?: number;
  created: IsoAutoDateString;
  id: string;
  notes?: HTMLString;
  serviceDate: IsoDateString;
  serviceType?: string;
  updated: IsoAutoDateString;
  vehicle: RecordIdString;
};
```

#### Properties

##### cost?

```ts
optional cost: number;
```

##### created

```ts
created: IsoAutoDateString;
```

##### id

```ts
id: string;
```

##### notes?

```ts
optional notes: HTMLString;
```

##### serviceDate

```ts
serviceDate: IsoDateString;
```

##### serviceType?

```ts
optional serviceType: string;
```

##### updated

```ts
updated: IsoAutoDateString;
```

##### vehicle

```ts
vehicle: RecordIdString;
```

***

### TransportManagementVehiclesRecord

```ts
type TransportManagementVehiclesRecord = {
  capacityVolume?: number;
  capacityWeight?: number;
  created: IsoAutoDateString;
  gps_pings?: RecordIdString[];
  id: string;
  maintenances?: RecordIdString[];
  model?: string;
  registrationNumber: string;
  status: TransportManagementVehiclesStatusOptions;
  updated: IsoAutoDateString;
};
```

#### Properties

##### capacityVolume?

```ts
optional capacityVolume: number;
```

##### capacityWeight?

```ts
optional capacityWeight: number;
```

##### created

```ts
created: IsoAutoDateString;
```

##### gps\_pings?

```ts
optional gps_pings: RecordIdString[];
```

##### id

```ts
id: string;
```

##### maintenances?

```ts
optional maintenances: RecordIdString[];
```

##### model?

```ts
optional model: string;
```

##### registrationNumber

```ts
registrationNumber: string;
```

##### status

```ts
status: TransportManagementVehiclesStatusOptions;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### UsersRecord

```ts
type UsersRecord = {
  avatar?: FileNameString;
  created: IsoAutoDateString;
  email: string;
  emailVisibility?: boolean;
  id: string;
  name?: string;
  password: string;
  roles?: UsersRolesOptions[];
  tokenKey: string;
  updated: IsoAutoDateString;
  verified?: boolean;
};
```

#### Properties

##### avatar?

```ts
optional avatar: FileNameString;
```

##### created

```ts
created: IsoAutoDateString;
```

##### email

```ts
email: string;
```

##### emailVisibility?

```ts
optional emailVisibility: boolean;
```

##### id

```ts
id: string;
```

##### name?

```ts
optional name: string;
```

##### password

```ts
password: string;
```

##### roles?

```ts
optional roles: UsersRolesOptions[];
```

##### tokenKey

```ts
tokenKey: string;
```

##### updated

```ts
updated: IsoAutoDateString;
```

##### verified?

```ts
optional verified: boolean;
```

***

### WarehouseManagementBinThresholdRecord

```ts
type WarehouseManagementBinThresholdRecord = {
  alertThreshold?: number;
  created: IsoAutoDateString;
  id: string;
  isActive?: boolean;
  location: RecordIdString;
  maxQuantity?: number;
  minQuantity?: number;
  product: RecordIdString;
  reorderQuantity?: number;
  updated: IsoAutoDateString;
};
```

#### Properties

##### alertThreshold?

```ts
optional alertThreshold: number;
```

##### created

```ts
created: IsoAutoDateString;
```

##### id

```ts
id: string;
```

##### isActive?

```ts
optional isActive: boolean;
```

##### location

```ts
location: RecordIdString;
```

##### maxQuantity?

```ts
optional maxQuantity: number;
```

##### minQuantity?

```ts
optional minQuantity: number;
```

##### product

```ts
product: RecordIdString;
```

##### reorderQuantity?

```ts
optional reorderQuantity: number;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### WarehouseManagementInboundShipmentItemsRecord

```ts
type WarehouseManagementInboundShipmentItemsRecord = {
  created: IsoAutoDateString;
  discrepancyNotes?: HTMLString;
  expectedQuantity: number;
  id: string;
  inboundShipment?: RecordIdString;
  product?: RecordIdString;
  receivedQuantity?: number;
  updated: IsoAutoDateString;
};
```

#### Properties

##### created

```ts
created: IsoAutoDateString;
```

##### discrepancyNotes?

```ts
optional discrepancyNotes: HTMLString;
```

##### expectedQuantity

```ts
expectedQuantity: number;
```

##### id

```ts
id: string;
```

##### inboundShipment?

```ts
optional inboundShipment: RecordIdString;
```

##### product?

```ts
optional product: RecordIdString;
```

##### receivedQuantity?

```ts
optional receivedQuantity: number;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### WarehouseManagementInboundShipmentsRecord

```ts
type WarehouseManagementInboundShipmentsRecord = {
  actualArrivalDate?: IsoDateString;
  client: RecordIdString;
  created: IsoAutoDateString;
  expectedArrivalDate?: IsoDateString;
  id: string;
  status?: WarehouseManagementInboundShipmentsStatusOptions;
  updated: IsoAutoDateString;
  warehouse: RecordIdString;
};
```

#### Properties

##### actualArrivalDate?

```ts
optional actualArrivalDate: IsoDateString;
```

##### client

```ts
client: RecordIdString;
```

##### created

```ts
created: IsoAutoDateString;
```

##### expectedArrivalDate?

```ts
optional expectedArrivalDate: IsoDateString;
```

##### id

```ts
id: string;
```

##### status?

```ts
optional status: WarehouseManagementInboundShipmentsStatusOptions;
```

##### updated

```ts
updated: IsoAutoDateString;
```

##### warehouse

```ts
warehouse: RecordIdString;
```

***

### WarehouseManagementInventoryAdjustmentRecord

```ts
type WarehouseManagementInventoryAdjustmentRecord = {
  created: IsoAutoDateString;
  id: string;
  notes?: HTMLString;
  product: RecordIdString;
  quantityChange: number;
  reason: WarehouseManagementInventoryAdjustmentReasonOptions;
  updated: IsoAutoDateString;
  user: RecordIdString;
  warehouse: RecordIdString;
};
```

#### Properties

##### created

```ts
created: IsoAutoDateString;
```

##### id

```ts
id: string;
```

##### notes?

```ts
optional notes: HTMLString;
```

##### product

```ts
product: RecordIdString;
```

##### quantityChange

```ts
quantityChange: number;
```

##### reason

```ts
reason: WarehouseManagementInventoryAdjustmentReasonOptions;
```

##### updated

```ts
updated: IsoAutoDateString;
```

##### user

```ts
user: RecordIdString;
```

##### warehouse

```ts
warehouse: RecordIdString;
```

***

### WarehouseManagementInventoryBatchesRecord

```ts
type WarehouseManagementInventoryBatchesRecord = {
  batchNumber: string;
  created: IsoAutoDateString;
  expirationDate?: IsoDateString;
  id: string;
  product: RecordIdString;
  updated: IsoAutoDateString;
};
```

#### Properties

##### batchNumber

```ts
batchNumber: string;
```

##### created

```ts
created: IsoAutoDateString;
```

##### expirationDate?

```ts
optional expirationDate: IsoDateString;
```

##### id

```ts
id: string;
```

##### product

```ts
product: RecordIdString;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### WarehouseManagementInventoryStockRecord

```ts
type WarehouseManagementInventoryStockRecord = {
  batch?: RecordIdString;
  created: IsoAutoDateString;
  id: string;
  lastCountedAt?: IsoDateString;
  lastMovementAt?: IsoDateString;
  location: RecordIdString;
  product: RecordIdString;
  quantity?: number;
  reservedQuantity?: number;
  status: WarehouseManagementInventoryStockStatusOptions;
  updated: IsoAutoDateString;
};
```

#### Properties

##### batch?

```ts
optional batch: RecordIdString;
```

##### created

```ts
created: IsoAutoDateString;
```

##### id

```ts
id: string;
```

##### lastCountedAt?

```ts
optional lastCountedAt: IsoDateString;
```

##### lastMovementAt?

```ts
optional lastMovementAt: IsoDateString;
```

##### location

```ts
location: RecordIdString;
```

##### product

```ts
product: RecordIdString;
```

##### quantity?

```ts
optional quantity: number;
```

##### reservedQuantity?

```ts
optional reservedQuantity: number;
```

##### status

```ts
status: WarehouseManagementInventoryStockStatusOptions;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### WarehouseManagementLocationsRecord

```ts
type WarehouseManagementLocationsRecord = {
  barcode?: string;
  created: IsoAutoDateString;
  hazmatApproved?: boolean;
  id: string;
  isActive?: boolean;
  isPickable?: boolean;
  isReceivable?: boolean;
  level?: number;
  maxPallets?: number;
  maxVolume?: number;
  maxWeight?: number;
  name: string;
  parentLocation?: RecordIdString;
  temperatureControlled?: boolean;
  type?: WarehouseManagementLocationsTypeOptions;
  updated: IsoAutoDateString;
  warehouse?: RecordIdString;
};
```

#### Properties

##### barcode?

```ts
optional barcode: string;
```

##### created

```ts
created: IsoAutoDateString;
```

##### hazmatApproved?

```ts
optional hazmatApproved: boolean;
```

##### id

```ts
id: string;
```

##### isActive?

```ts
optional isActive: boolean;
```

##### isPickable?

```ts
optional isPickable: boolean;
```

##### isReceivable?

```ts
optional isReceivable: boolean;
```

##### level?

```ts
optional level: number;
```

##### maxPallets?

```ts
optional maxPallets: number;
```

##### maxVolume?

```ts
optional maxVolume: number;
```

##### maxWeight?

```ts
optional maxWeight: number;
```

##### name

```ts
name: string;
```

##### parentLocation?

```ts
optional parentLocation: RecordIdString;
```

##### temperatureControlled?

```ts
optional temperatureControlled: boolean;
```

##### type?

```ts
optional type: WarehouseManagementLocationsTypeOptions;
```

##### updated

```ts
updated: IsoAutoDateString;
```

##### warehouse?

```ts
optional warehouse: RecordIdString;
```

***

### WarehouseManagementOutboundShipmentItemsRecord

```ts
type WarehouseManagementOutboundShipmentItemsRecord = {
  batch?: RecordIdString;
  created: IsoAutoDateString;
  id: string;
  outboundShipment: RecordIdString;
  product: RecordIdString;
  quantityShipped: number;
  salesOrderItem: RecordIdString;
  updated: IsoAutoDateString;
};
```

#### Properties

##### batch?

```ts
optional batch: RecordIdString;
```

##### created

```ts
created: IsoAutoDateString;
```

##### id

```ts
id: string;
```

##### outboundShipment

```ts
outboundShipment: RecordIdString;
```

##### product

```ts
product: RecordIdString;
```

##### quantityShipped

```ts
quantityShipped: number;
```

##### salesOrderItem

```ts
salesOrderItem: RecordIdString;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### WarehouseManagementOutboundShipmentsRecord

```ts
type WarehouseManagementOutboundShipmentsRecord = {
  carrier?: RecordIdString;
  created: IsoAutoDateString;
  id: string;
  items?: RecordIdString[];
  salesOrder: RecordIdString;
  status?: WarehouseManagementOutboundShipmentsStatusOptions;
  trackingNumber: string;
  updated: IsoAutoDateString;
  warehouse: RecordIdString;
};
```

#### Properties

##### carrier?

```ts
optional carrier: RecordIdString;
```

##### created

```ts
created: IsoAutoDateString;
```

##### id

```ts
id: string;
```

##### items?

```ts
optional items: RecordIdString[];
```

##### salesOrder

```ts
salesOrder: RecordIdString;
```

##### status?

```ts
optional status: WarehouseManagementOutboundShipmentsStatusOptions;
```

##### trackingNumber

```ts
trackingNumber: string;
```

##### updated

```ts
updated: IsoAutoDateString;
```

##### warehouse

```ts
warehouse: RecordIdString;
```

***

### WarehouseManagementPackageItemsRecord

```ts
type WarehouseManagementPackageItemsRecord = {
  batch?: RecordIdString;
  created: IsoAutoDateString;
  expiryDate?: IsoDateString;
  id: string;
  lotNumber?: string;
  package: RecordIdString;
  product: RecordIdString;
  quantity: number;
  updated: IsoAutoDateString;
};
```

#### Properties

##### batch?

```ts
optional batch: RecordIdString;
```

##### created

```ts
created: IsoAutoDateString;
```

##### expiryDate?

```ts
optional expiryDate: IsoDateString;
```

##### id

```ts
id: string;
```

##### lotNumber?

```ts
optional lotNumber: string;
```

##### package

```ts
package: RecordIdString;
```

##### product

```ts
product: RecordIdString;
```

##### quantity

```ts
quantity: number;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### WarehouseManagementPackagesRecord

```ts
type WarehouseManagementPackagesRecord = {
  created: IsoAutoDateString;
  height?: number;
  id: string;
  images?: FileNameString[];
  insuranceValue?: number;
  isFragile?: boolean;
  isHazmat?: boolean;
  length?: number;
  packageNumber: string;
  packedAt?: IsoDateString;
  packedByUser?: RecordIdString;
  requireSignature?: boolean;
  salesOrder: RecordIdString;
  shippedAt?: IsoDateString;
  type?: string;
  updated: IsoAutoDateString;
  warehouse: RecordIdString;
  weight?: number;
  width?: number;
};
```

#### Properties

##### created

```ts
created: IsoAutoDateString;
```

##### height?

```ts
optional height: number;
```

##### id

```ts
id: string;
```

##### images?

```ts
optional images: FileNameString[];
```

##### insuranceValue?

```ts
optional insuranceValue: number;
```

##### isFragile?

```ts
optional isFragile: boolean;
```

##### isHazmat?

```ts
optional isHazmat: boolean;
```

##### length?

```ts
optional length: number;
```

##### packageNumber

```ts
packageNumber: string;
```

##### packedAt?

```ts
optional packedAt: IsoDateString;
```

##### packedByUser?

```ts
optional packedByUser: RecordIdString;
```

##### requireSignature?

```ts
optional requireSignature: boolean;
```

##### salesOrder

```ts
salesOrder: RecordIdString;
```

##### shippedAt?

```ts
optional shippedAt: IsoDateString;
```

##### type?

```ts
optional type: string;
```

##### updated

```ts
updated: IsoAutoDateString;
```

##### warehouse

```ts
warehouse: RecordIdString;
```

##### weight?

```ts
optional weight: number;
```

##### width?

```ts
optional width: number;
```

***

### WarehouseManagementPickBatchItemsRecord

```ts
type WarehouseManagementPickBatchItemsRecord = {
  actualPickTime?: number;
  created: IsoAutoDateString;
  estimatedPickTime?: IsoDateString;
  id: string;
  orderPriority?: number;
  pickBatch: RecordIdString;
  salesOrder: RecordIdString;
  updated: IsoAutoDateString;
};
```

#### Properties

##### actualPickTime?

```ts
optional actualPickTime: number;
```

##### created

```ts
created: IsoAutoDateString;
```

##### estimatedPickTime?

```ts
optional estimatedPickTime: IsoDateString;
```

##### id

```ts
id: string;
```

##### orderPriority?

```ts
optional orderPriority: number;
```

##### pickBatch

```ts
pickBatch: RecordIdString;
```

##### salesOrder

```ts
salesOrder: RecordIdString;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### WarehouseManagementPickBatchesRecord

```ts
type WarehouseManagementPickBatchesRecord = {
  actualDuration?: number;
  assignedUser?: RecordIdString;
  batchNumber?: string;
  completedAt?: IsoDateString;
  completedItems?: number;
  created: IsoAutoDateString;
  estimatedDuration?: number;
  id: string;
  items?: RecordIdString[];
  priority: number;
  startedAt?: IsoDateString;
  status?: WarehouseManagementPickBatchesStatusOptions;
  strategy?: WarehouseManagementPickBatchesStrategyOptions;
  totalItems?: number;
  updated: IsoAutoDateString;
  warehouse?: RecordIdString;
};
```

#### Properties

##### actualDuration?

```ts
optional actualDuration: number;
```

##### assignedUser?

```ts
optional assignedUser: RecordIdString;
```

##### batchNumber?

```ts
optional batchNumber: string;
```

##### completedAt?

```ts
optional completedAt: IsoDateString;
```

##### completedItems?

```ts
optional completedItems: number;
```

##### created

```ts
created: IsoAutoDateString;
```

##### estimatedDuration?

```ts
optional estimatedDuration: number;
```

##### id

```ts
id: string;
```

##### items?

```ts
optional items: RecordIdString[];
```

##### priority

```ts
priority: number;
```

##### startedAt?

```ts
optional startedAt: IsoDateString;
```

##### status?

```ts
optional status: WarehouseManagementPickBatchesStatusOptions;
```

##### strategy?

```ts
optional strategy: WarehouseManagementPickBatchesStrategyOptions;
```

##### totalItems?

```ts
optional totalItems: number;
```

##### updated

```ts
updated: IsoAutoDateString;
```

##### warehouse?

```ts
optional warehouse: RecordIdString;
```

***

### WarehouseManagementProductsRecord

```ts
type WarehouseManagementProductsRecord = {
  barcode?: string;
  client?: RecordIdString;
  costPrice?: number;
  created: IsoAutoDateString;
  description?: HTMLString;
  height?: number;
  id: string;
  images?: FileNameString[];
  length?: number;
  name: string;
  sku: string;
  status?: WarehouseManagementProductsStatusOptions;
  supplier?: RecordIdString;
  updated: IsoAutoDateString;
  weight?: number;
  width?: number;
};
```

#### Properties

##### barcode?

```ts
optional barcode: string;
```

##### client?

```ts
optional client: RecordIdString;
```

##### costPrice?

```ts
optional costPrice: number;
```

##### created

```ts
created: IsoAutoDateString;
```

##### description?

```ts
optional description: HTMLString;
```

##### height?

```ts
optional height: number;
```

##### id

```ts
id: string;
```

##### images?

```ts
optional images: FileNameString[];
```

##### length?

```ts
optional length: number;
```

##### name

```ts
name: string;
```

##### sku

```ts
sku: string;
```

##### status?

```ts
optional status: WarehouseManagementProductsStatusOptions;
```

##### supplier?

```ts
optional supplier: RecordIdString;
```

##### updated

```ts
updated: IsoAutoDateString;
```

##### weight?

```ts
optional weight: number;
```

##### width?

```ts
optional width: number;
```

***

### WarehouseManagementPutawayRulesRecord

```ts
type WarehouseManagementPutawayRulesRecord = {
  client?: RecordIdString;
  created: IsoAutoDateString;
  id: string;
  isActive?: boolean;
  locationType: WarehouseManagementPutawayRulesLocationTypeOptions;
  maxQuantity?: number;
  minQuantity?: number;
  preferredLocation?: RecordIdString;
  priority: number;
  product: RecordIdString;
  requireHazmatApproval?: boolean;
  requireTemperatureControl?: boolean;
  updated: IsoAutoDateString;
  volumeThreshold?: number;
  warehouse: RecordIdString;
  weightThreshold?: number;
};
```

#### Properties

##### client?

```ts
optional client: RecordIdString;
```

##### created

```ts
created: IsoAutoDateString;
```

##### id

```ts
id: string;
```

##### isActive?

```ts
optional isActive: boolean;
```

##### locationType

```ts
locationType: WarehouseManagementPutawayRulesLocationTypeOptions;
```

##### maxQuantity?

```ts
optional maxQuantity: number;
```

##### minQuantity?

```ts
optional minQuantity: number;
```

##### preferredLocation?

```ts
optional preferredLocation: RecordIdString;
```

##### priority

```ts
priority: number;
```

##### product

```ts
product: RecordIdString;
```

##### requireHazmatApproval?

```ts
optional requireHazmatApproval: boolean;
```

##### requireTemperatureControl?

```ts
optional requireTemperatureControl: boolean;
```

##### updated

```ts
updated: IsoAutoDateString;
```

##### volumeThreshold?

```ts
optional volumeThreshold: number;
```

##### warehouse

```ts
warehouse: RecordIdString;
```

##### weightThreshold?

```ts
optional weightThreshold: number;
```

***

### WarehouseManagementReorderPointsRecord

```ts
type WarehouseManagementReorderPointsRecord = {
  created: IsoAutoDateString;
  id: string;
  product: RecordIdString;
  threshold?: number;
  updated: IsoAutoDateString;
  warehouse: RecordIdString;
};
```

#### Properties

##### created

```ts
created: IsoAutoDateString;
```

##### id

```ts
id: string;
```

##### product

```ts
product: RecordIdString;
```

##### threshold?

```ts
optional threshold: number;
```

##### updated

```ts
updated: IsoAutoDateString;
```

##### warehouse

```ts
warehouse: RecordIdString;
```

***

### WarehouseManagementReturnItemsRecord

```ts
type WarehouseManagementReturnItemsRecord = {
  condition?: WarehouseManagementReturnItemsConditionOptions;
  created: IsoAutoDateString;
  id: string;
  product: RecordIdString;
  quantityExpected?: number;
  quantityReceived?: number;
  return: RecordIdString;
  updated: IsoAutoDateString;
};
```

#### Properties

##### condition?

```ts
optional condition: WarehouseManagementReturnItemsConditionOptions;
```

##### created

```ts
created: IsoAutoDateString;
```

##### id

```ts
id: string;
```

##### product

```ts
product: RecordIdString;
```

##### quantityExpected?

```ts
optional quantityExpected: number;
```

##### quantityReceived?

```ts
optional quantityReceived: number;
```

##### return

```ts
return: RecordIdString;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### WarehouseManagementReturnsRecord

```ts
type WarehouseManagementReturnsRecord = {
  client?: RecordIdString;
  created: IsoAutoDateString;
  id: string;
  reason?: HTMLString;
  returnNumber: string;
  salesOrder?: RecordIdString;
  status: WarehouseManagementReturnsStatusOptions;
  updated: IsoAutoDateString;
};
```

#### Properties

##### client?

```ts
optional client: RecordIdString;
```

##### created

```ts
created: IsoAutoDateString;
```

##### id

```ts
id: string;
```

##### reason?

```ts
optional reason: HTMLString;
```

##### returnNumber

```ts
returnNumber: string;
```

##### salesOrder?

```ts
optional salesOrder: RecordIdString;
```

##### status

```ts
status: WarehouseManagementReturnsStatusOptions;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### WarehouseManagementSalesOrderItemsRecord

```ts
type WarehouseManagementSalesOrderItemsRecord = {
  created: IsoAutoDateString;
  id: string;
  product?: RecordIdString;
  quantityOrdered: number;
  salesOrder?: RecordIdString;
  updated: IsoAutoDateString;
};
```

#### Properties

##### created

```ts
created: IsoAutoDateString;
```

##### id

```ts
id: string;
```

##### product?

```ts
optional product: RecordIdString;
```

##### quantityOrdered

```ts
quantityOrdered: number;
```

##### salesOrder?

```ts
optional salesOrder: RecordIdString;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### WarehouseManagementSalesOrdersRecord

```ts
type WarehouseManagementSalesOrdersRecord = {
  client: RecordIdString;
  created: IsoAutoDateString;
  id: string;
  opportunity?: RecordIdString;
  orderNumber: string;
  shippingAddress?: HTMLString;
  status: WarehouseManagementSalesOrdersStatusOptions;
  updated: IsoAutoDateString;
};
```

#### Properties

##### client

```ts
client: RecordIdString;
```

##### created

```ts
created: IsoAutoDateString;
```

##### id

```ts
id: string;
```

##### opportunity?

```ts
optional opportunity: RecordIdString;
```

##### orderNumber

```ts
orderNumber: string;
```

##### shippingAddress?

```ts
optional shippingAddress: HTMLString;
```

##### status

```ts
status: WarehouseManagementSalesOrdersStatusOptions;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### WarehouseManagementStockTransferRecord

```ts
type WarehouseManagementStockTransferRecord = {
  created: IsoAutoDateString;
  destinationWarehouse: RecordIdString;
  id: string;
  product?: RecordIdString;
  quantity?: number;
  sourceWarehouse: RecordIdString;
  status?: WarehouseManagementStockTransferStatusOptions;
  updated: IsoAutoDateString;
};
```

#### Properties

##### created

```ts
created: IsoAutoDateString;
```

##### destinationWarehouse

```ts
destinationWarehouse: RecordIdString;
```

##### id

```ts
id: string;
```

##### product?

```ts
optional product: RecordIdString;
```

##### quantity?

```ts
optional quantity: number;
```

##### sourceWarehouse

```ts
sourceWarehouse: RecordIdString;
```

##### status?

```ts
optional status: WarehouseManagementStockTransferStatusOptions;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### WarehouseManagementSuppliersRecord

```ts
type WarehouseManagementSuppliersRecord = {
  client?: RecordIdString;
  contactPerson?: string;
  created: IsoAutoDateString;
  email?: string;
  id: string;
  name: string;
  phoneNumber?: string;
  updated: IsoAutoDateString;
};
```

#### Properties

##### client?

```ts
optional client: RecordIdString;
```

##### contactPerson?

```ts
optional contactPerson: string;
```

##### created

```ts
created: IsoAutoDateString;
```

##### email?

```ts
optional email: string;
```

##### id

```ts
id: string;
```

##### name

```ts
name: string;
```

##### phoneNumber?

```ts
optional phoneNumber: string;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### WarehouseManagementTaskItemsRecord

```ts
type WarehouseManagementTaskItemsRecord = {
  batch?: RecordIdString;
  completedAt?: IsoDateString;
  created: IsoAutoDateString;
  destinationLocation?: RecordIdString;
  expiryDate?: IsoDateString;
  id: string;
  lotNumber?: number;
  notes?: HTMLString;
  product?: RecordIdString;
  proofs?: FileNameString[];
  quantityCompleted?: number;
  quantityRequired?: number;
  sourceLocation?: RecordIdString;
  status?: WarehouseManagementTaskItemsStatusOptions;
  task?: RecordIdString;
  updated: IsoAutoDateString;
};
```

#### Properties

##### batch?

```ts
optional batch: RecordIdString;
```

##### completedAt?

```ts
optional completedAt: IsoDateString;
```

##### created

```ts
created: IsoAutoDateString;
```

##### destinationLocation?

```ts
optional destinationLocation: RecordIdString;
```

##### expiryDate?

```ts
optional expiryDate: IsoDateString;
```

##### id

```ts
id: string;
```

##### lotNumber?

```ts
optional lotNumber: number;
```

##### notes?

```ts
optional notes: HTMLString;
```

##### product?

```ts
optional product: RecordIdString;
```

##### proofs?

```ts
optional proofs: FileNameString[];
```

##### quantityCompleted?

```ts
optional quantityCompleted: number;
```

##### quantityRequired?

```ts
optional quantityRequired: number;
```

##### sourceLocation?

```ts
optional sourceLocation: RecordIdString;
```

##### status?

```ts
optional status: WarehouseManagementTaskItemsStatusOptions;
```

##### task?

```ts
optional task: RecordIdString;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### WarehouseManagementTasksRecord

```ts
type WarehouseManagementTasksRecord = {
  attachments?: FileNameString[];
  created: IsoAutoDateString;
  endTime?: IsoDateString;
  id: string;
  instructions?: HTMLString;
  notes?: HTMLString;
  pickBatchId?: RecordIdString;
  priority: number;
  startTime?: IsoDateString;
  status?: WarehouseManagementTasksStatusOptions;
  taskNumber: string;
  type?: WarehouseManagementTasksTypeOptions;
  updated: IsoAutoDateString;
  user?: RecordIdString;
  warehouse?: RecordIdString;
};
```

#### Properties

##### attachments?

```ts
optional attachments: FileNameString[];
```

##### created

```ts
created: IsoAutoDateString;
```

##### endTime?

```ts
optional endTime: IsoDateString;
```

##### id

```ts
id: string;
```

##### instructions?

```ts
optional instructions: HTMLString;
```

##### notes?

```ts
optional notes: HTMLString;
```

##### pickBatchId?

```ts
optional pickBatchId: RecordIdString;
```

##### priority

```ts
priority: number;
```

##### startTime?

```ts
optional startTime: IsoDateString;
```

##### status?

```ts
optional status: WarehouseManagementTasksStatusOptions;
```

##### taskNumber

```ts
taskNumber: string;
```

##### type?

```ts
optional type: WarehouseManagementTasksTypeOptions;
```

##### updated

```ts
updated: IsoAutoDateString;
```

##### user?

```ts
optional user: RecordIdString;
```

##### warehouse?

```ts
optional warehouse: RecordIdString;
```

***

### WarehouseManagementWarehousesRecord

```ts
type WarehouseManagementWarehousesRecord = {
  address?: string;
  city?: string;
  contactEmail?: string;
  contactPerson?: string;
  contactPhone?: string;
  country?: string;
  created: IsoAutoDateString;
  id: string;
  images?: FileNameString[];
  isActive?: boolean;
  location?: GeoPoint;
  name: string;
  postalCode?: string;
  state?: string;
  timezone?: string;
  updated: IsoAutoDateString;
};
```

#### Properties

##### address?

```ts
optional address: string;
```

##### city?

```ts
optional city: string;
```

##### contactEmail?

```ts
optional contactEmail: string;
```

##### contactPerson?

```ts
optional contactPerson: string;
```

##### contactPhone?

```ts
optional contactPhone: string;
```

##### country?

```ts
optional country: string;
```

##### created

```ts
created: IsoAutoDateString;
```

##### id

```ts
id: string;
```

##### images?

```ts
optional images: FileNameString[];
```

##### isActive?

```ts
optional isActive: boolean;
```

##### location?

```ts
optional location: GeoPoint;
```

##### name

```ts
name: string;
```

##### postalCode?

```ts
optional postalCode: string;
```

##### state?

```ts
optional state: string;
```

##### timezone?

```ts
optional timezone: string;
```

##### updated

```ts
updated: IsoAutoDateString;
```

***

### AuthoriginsResponse

```ts
type AuthoriginsResponse<Texpand> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### ExternalauthsResponse

```ts
type ExternalauthsResponse<Texpand> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### MfasResponse

```ts
type MfasResponse<Texpand> = Required<MfasRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### OtpsResponse

```ts
type OtpsResponse<Texpand> = Required<OtpsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### SuperusersResponse

```ts
type SuperusersResponse<Texpand> = Required<SuperusersRecord> & AuthSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### BillingManagementAccountLogsResponse

```ts
type BillingManagementAccountLogsResponse<TrequestPayload, TresponsePayload, Texpand> = Required<BillingManagementAccountLogsRecord<TrequestPayload, TresponsePayload>> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### TrequestPayload

`TrequestPayload` = `unknown`

##### TresponsePayload

`TresponsePayload` = `unknown`

##### Texpand

`Texpand` = `unknown`

***

### BillingManagementAccountTransactionsResponse

```ts
type BillingManagementAccountTransactionsResponse<Texpand> = Required<BillingManagementAccountTransactionsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### BillingManagementClientAccountsResponse

```ts
type BillingManagementClientAccountsResponse<Texpand> = Required<BillingManagementClientAccountsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### BillingManagementCreditNotesResponse

```ts
type BillingManagementCreditNotesResponse<Texpand> = Required<BillingManagementCreditNotesRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### BillingManagementDisputesResponse

```ts
type BillingManagementDisputesResponse<Texpand> = Required<BillingManagementDisputesRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### BillingManagementInvoiceLineItemsResponse

```ts
type BillingManagementInvoiceLineItemsResponse<Texpand> = Required<BillingManagementInvoiceLineItemsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### BillingManagementInvoicesResponse

```ts
type BillingManagementInvoicesResponse<Texpand> = Required<BillingManagementInvoicesRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### BillingManagementPaymentsResponse

```ts
type BillingManagementPaymentsResponse<Texpand> = Required<BillingManagementPaymentsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### BillingManagementQuotesResponse

```ts
type BillingManagementQuotesResponse<Texpand> = Required<BillingManagementQuotesRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### BillingManagementRateCardsResponse

```ts
type BillingManagementRateCardsResponse<Texpand> = Required<BillingManagementRateCardsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### BillingManagementRateRulesResponse

```ts
type BillingManagementRateRulesResponse<Texpand> = Required<BillingManagementRateRulesRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### BillingManagementSurchargesResponse

```ts
type BillingManagementSurchargesResponse<Texpand> = Required<BillingManagementSurchargesRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### CustomerRelationsCampaignsResponse

```ts
type CustomerRelationsCampaignsResponse<Texpand> = Required<CustomerRelationsCampaignsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### CustomerRelationsCasesResponse

```ts
type CustomerRelationsCasesResponse<Texpand> = Required<CustomerRelationsCasesRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### CustomerRelationsCompaniesResponse

```ts
type CustomerRelationsCompaniesResponse<Texpand> = Required<CustomerRelationsCompaniesRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### CustomerRelationsContactsResponse

```ts
type CustomerRelationsContactsResponse<Texpand> = Required<CustomerRelationsContactsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### CustomerRelationsInteractionsResponse

```ts
type CustomerRelationsInteractionsResponse<Texpand> = Required<CustomerRelationsInteractionsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### CustomerRelationsInvoiceItemsResponse

```ts
type CustomerRelationsInvoiceItemsResponse<Texpand> = Required<CustomerRelationsInvoiceItemsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### CustomerRelationsInvoicesResponse

```ts
type CustomerRelationsInvoicesResponse<Texpand> = Required<CustomerRelationsInvoicesRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### CustomerRelationsLeadsResponse

```ts
type CustomerRelationsLeadsResponse<Texpand> = Required<CustomerRelationsLeadsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### CustomerRelationsOpportunitiesResponse

```ts
type CustomerRelationsOpportunitiesResponse<Texpand> = Required<CustomerRelationsOpportunitiesRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### CustomerRelationsOpportunityProductsResponse

```ts
type CustomerRelationsOpportunityProductsResponse<Texpand> = Required<CustomerRelationsOpportunityProductsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### CustomerRelationsProductsResponse

```ts
type CustomerRelationsProductsResponse<Texpand> = Required<CustomerRelationsProductsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### DeliveryManagementDriverLocationResponse

```ts
type DeliveryManagementDriverLocationResponse<Texpand> = Required<DeliveryManagementDriverLocationRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### DeliveryManagementProofOfDeliveriesResponse

```ts
type DeliveryManagementProofOfDeliveriesResponse<Texpand> = Required<DeliveryManagementProofOfDeliveriesRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### DeliveryManagementRoutesResponse

```ts
type DeliveryManagementRoutesResponse<Texpand> = Required<DeliveryManagementRoutesRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### DeliveryManagementTaskEventsResponse

```ts
type DeliveryManagementTaskEventsResponse<Texpand> = Required<DeliveryManagementTaskEventsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### DeliveryManagementTasksResponse

```ts
type DeliveryManagementTasksResponse<Texpand> = Required<DeliveryManagementTasksRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### NotificationsResponse

```ts
type NotificationsResponse<Texpand> = Required<NotificationsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### TransportManagementCarrierRatesResponse

```ts
type TransportManagementCarrierRatesResponse<Texpand> = Required<TransportManagementCarrierRatesRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### TransportManagementCarriersResponse

```ts
type TransportManagementCarriersResponse<Texpand> = Required<TransportManagementCarriersRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### TransportManagementDriversResponse

```ts
type TransportManagementDriversResponse<Texpand> = Required<TransportManagementDriversRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### TransportManagementExpensesResponse

```ts
type TransportManagementExpensesResponse<Texpand> = Required<TransportManagementExpensesRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### TransportManagementGpsPingsResponse

```ts
type TransportManagementGpsPingsResponse<Texpand> = Required<TransportManagementGpsPingsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### TransportManagementPartnerInvoiceResponse

```ts
type TransportManagementPartnerInvoiceResponse<Texpand> = Required<TransportManagementPartnerInvoiceRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### TransportManagementPartnerInvoiceItemsResponse

```ts
type TransportManagementPartnerInvoiceItemsResponse<Texpand> = Required<TransportManagementPartnerInvoiceItemsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### TransportManagementProofOfDeliveriesResponse

```ts
type TransportManagementProofOfDeliveriesResponse<Texpand> = Required<TransportManagementProofOfDeliveriesRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### TransportManagementRoutesResponse

```ts
type TransportManagementRoutesResponse<Texpand> = Required<TransportManagementRoutesRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### TransportManagementShipmentLegEventsResponse

```ts
type TransportManagementShipmentLegEventsResponse<Texpand> = Required<TransportManagementShipmentLegEventsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### TransportManagementShipmentLegsResponse

```ts
type TransportManagementShipmentLegsResponse<Texpand> = Required<TransportManagementShipmentLegsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### TransportManagementTripStopsResponse

```ts
type TransportManagementTripStopsResponse<Texpand> = Required<TransportManagementTripStopsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### TransportManagementTripsResponse

```ts
type TransportManagementTripsResponse<Texpand> = Required<TransportManagementTripsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### TransportManagementVehicleMaintenanceResponse

```ts
type TransportManagementVehicleMaintenanceResponse<Texpand> = Required<TransportManagementVehicleMaintenanceRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### TransportManagementVehiclesResponse

```ts
type TransportManagementVehiclesResponse<Texpand> = Required<TransportManagementVehiclesRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### UsersResponse

```ts
type UsersResponse<Texpand> = Required<UsersRecord> & AuthSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### WarehouseManagementBinThresholdResponse

```ts
type WarehouseManagementBinThresholdResponse<Texpand> = Required<WarehouseManagementBinThresholdRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### WarehouseManagementInboundShipmentItemsResponse

```ts
type WarehouseManagementInboundShipmentItemsResponse<Texpand> = Required<WarehouseManagementInboundShipmentItemsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### WarehouseManagementInboundShipmentsResponse

```ts
type WarehouseManagementInboundShipmentsResponse<Texpand> = Required<WarehouseManagementInboundShipmentsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### WarehouseManagementInventoryAdjustmentResponse

```ts
type WarehouseManagementInventoryAdjustmentResponse<Texpand> = Required<WarehouseManagementInventoryAdjustmentRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### WarehouseManagementInventoryBatchesResponse

```ts
type WarehouseManagementInventoryBatchesResponse<Texpand> = Required<WarehouseManagementInventoryBatchesRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### WarehouseManagementInventoryStockResponse

```ts
type WarehouseManagementInventoryStockResponse<Texpand> = Required<WarehouseManagementInventoryStockRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### WarehouseManagementLocationsResponse

```ts
type WarehouseManagementLocationsResponse<Texpand> = Required<WarehouseManagementLocationsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### WarehouseManagementOutboundShipmentItemsResponse

```ts
type WarehouseManagementOutboundShipmentItemsResponse<Texpand> = Required<WarehouseManagementOutboundShipmentItemsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### WarehouseManagementOutboundShipmentsResponse

```ts
type WarehouseManagementOutboundShipmentsResponse<Texpand> = Required<WarehouseManagementOutboundShipmentsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### WarehouseManagementPackageItemsResponse

```ts
type WarehouseManagementPackageItemsResponse<Texpand> = Required<WarehouseManagementPackageItemsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### WarehouseManagementPackagesResponse

```ts
type WarehouseManagementPackagesResponse<Texpand> = Required<WarehouseManagementPackagesRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### WarehouseManagementPickBatchItemsResponse

```ts
type WarehouseManagementPickBatchItemsResponse<Texpand> = Required<WarehouseManagementPickBatchItemsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### WarehouseManagementPickBatchesResponse

```ts
type WarehouseManagementPickBatchesResponse<Texpand> = Required<WarehouseManagementPickBatchesRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### WarehouseManagementProductsResponse

```ts
type WarehouseManagementProductsResponse<Texpand> = Required<WarehouseManagementProductsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### WarehouseManagementPutawayRulesResponse

```ts
type WarehouseManagementPutawayRulesResponse<Texpand> = Required<WarehouseManagementPutawayRulesRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### WarehouseManagementReorderPointsResponse

```ts
type WarehouseManagementReorderPointsResponse<Texpand> = Required<WarehouseManagementReorderPointsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### WarehouseManagementReturnItemsResponse

```ts
type WarehouseManagementReturnItemsResponse<Texpand> = Required<WarehouseManagementReturnItemsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### WarehouseManagementReturnsResponse

```ts
type WarehouseManagementReturnsResponse<Texpand> = Required<WarehouseManagementReturnsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### WarehouseManagementSalesOrderItemsResponse

```ts
type WarehouseManagementSalesOrderItemsResponse<Texpand> = Required<WarehouseManagementSalesOrderItemsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### WarehouseManagementSalesOrdersResponse

```ts
type WarehouseManagementSalesOrdersResponse<Texpand> = Required<WarehouseManagementSalesOrdersRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### WarehouseManagementStockTransferResponse

```ts
type WarehouseManagementStockTransferResponse<Texpand> = Required<WarehouseManagementStockTransferRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### WarehouseManagementSuppliersResponse

```ts
type WarehouseManagementSuppliersResponse<Texpand> = Required<WarehouseManagementSuppliersRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### WarehouseManagementTaskItemsResponse

```ts
type WarehouseManagementTaskItemsResponse<Texpand> = Required<WarehouseManagementTaskItemsRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### WarehouseManagementTasksResponse

```ts
type WarehouseManagementTasksResponse<Texpand> = Required<WarehouseManagementTasksRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### WarehouseManagementWarehousesResponse

```ts
type WarehouseManagementWarehousesResponse<Texpand> = Required<WarehouseManagementWarehousesRecord> & BaseSystemFields<Texpand>;
```

#### Type Parameters

##### Texpand

`Texpand` = `unknown`

***

### CollectionRecords

```ts
type CollectionRecords = {
  _authOrigins: AuthoriginsRecord;
  _externalAuths: ExternalauthsRecord;
  _mfas: MfasRecord;
  _otps: OtpsRecord;
  _superusers: SuperusersRecord;
  billing_management_account_logs: BillingManagementAccountLogsRecord;
  billing_management_account_transactions: BillingManagementAccountTransactionsRecord;
  billing_management_client_accounts: BillingManagementClientAccountsRecord;
  billing_management_credit_notes: BillingManagementCreditNotesRecord;
  billing_management_disputes: BillingManagementDisputesRecord;
  billing_management_invoice_line_items: BillingManagementInvoiceLineItemsRecord;
  billing_management_invoices: BillingManagementInvoicesRecord;
  billing_management_payments: BillingManagementPaymentsRecord;
  billing_management_quotes: BillingManagementQuotesRecord;
  billing_management_rate_cards: BillingManagementRateCardsRecord;
  billing_management_rate_rules: BillingManagementRateRulesRecord;
  billing_management_surcharges: BillingManagementSurchargesRecord;
  customer_relations_campaigns: CustomerRelationsCampaignsRecord;
  customer_relations_cases: CustomerRelationsCasesRecord;
  customer_relations_companies: CustomerRelationsCompaniesRecord;
  customer_relations_contacts: CustomerRelationsContactsRecord;
  customer_relations_interactions: CustomerRelationsInteractionsRecord;
  customer_relations_invoice_items: CustomerRelationsInvoiceItemsRecord;
  customer_relations_invoices: CustomerRelationsInvoicesRecord;
  customer_relations_leads: CustomerRelationsLeadsRecord;
  customer_relations_opportunities: CustomerRelationsOpportunitiesRecord;
  customer_relations_opportunity_products: CustomerRelationsOpportunityProductsRecord;
  customer_relations_products: CustomerRelationsProductsRecord;
  delivery_management_driver_location: DeliveryManagementDriverLocationRecord;
  delivery_management_proof_of_deliveries: DeliveryManagementProofOfDeliveriesRecord;
  delivery_management_routes: DeliveryManagementRoutesRecord;
  delivery_management_task_events: DeliveryManagementTaskEventsRecord;
  delivery_management_tasks: DeliveryManagementTasksRecord;
  notifications: NotificationsRecord;
  transport_management_carrier_rates: TransportManagementCarrierRatesRecord;
  transport_management_carriers: TransportManagementCarriersRecord;
  transport_management_drivers: TransportManagementDriversRecord;
  transport_management_expenses: TransportManagementExpensesRecord;
  transport_management_gps_pings: TransportManagementGpsPingsRecord;
  transport_management_partner_invoice: TransportManagementPartnerInvoiceRecord;
  transport_management_partner_invoice_items: TransportManagementPartnerInvoiceItemsRecord;
  transport_management_proof_of_deliveries: TransportManagementProofOfDeliveriesRecord;
  transport_management_routes: TransportManagementRoutesRecord;
  transport_management_shipment_leg_events: TransportManagementShipmentLegEventsRecord;
  transport_management_shipment_legs: TransportManagementShipmentLegsRecord;
  transport_management_trip_stops: TransportManagementTripStopsRecord;
  transport_management_trips: TransportManagementTripsRecord;
  transport_management_vehicle_maintenance: TransportManagementVehicleMaintenanceRecord;
  transport_management_vehicles: TransportManagementVehiclesRecord;
  users: UsersRecord;
  warehouse_management_bin_threshold: WarehouseManagementBinThresholdRecord;
  warehouse_management_inbound_shipment_items: WarehouseManagementInboundShipmentItemsRecord;
  warehouse_management_inbound_shipments: WarehouseManagementInboundShipmentsRecord;
  warehouse_management_inventory_adjustment: WarehouseManagementInventoryAdjustmentRecord;
  warehouse_management_inventory_batches: WarehouseManagementInventoryBatchesRecord;
  warehouse_management_inventory_stock: WarehouseManagementInventoryStockRecord;
  warehouse_management_locations: WarehouseManagementLocationsRecord;
  warehouse_management_outbound_shipment_items: WarehouseManagementOutboundShipmentItemsRecord;
  warehouse_management_outbound_shipments: WarehouseManagementOutboundShipmentsRecord;
  warehouse_management_package_items: WarehouseManagementPackageItemsRecord;
  warehouse_management_packages: WarehouseManagementPackagesRecord;
  warehouse_management_pick_batch_items: WarehouseManagementPickBatchItemsRecord;
  warehouse_management_pick_batches: WarehouseManagementPickBatchesRecord;
  warehouse_management_products: WarehouseManagementProductsRecord;
  warehouse_management_putaway_rules: WarehouseManagementPutawayRulesRecord;
  warehouse_management_reorder_points: WarehouseManagementReorderPointsRecord;
  warehouse_management_return_items: WarehouseManagementReturnItemsRecord;
  warehouse_management_returns: WarehouseManagementReturnsRecord;
  warehouse_management_sales_order_items: WarehouseManagementSalesOrderItemsRecord;
  warehouse_management_sales_orders: WarehouseManagementSalesOrdersRecord;
  warehouse_management_stock_transfer: WarehouseManagementStockTransferRecord;
  warehouse_management_suppliers: WarehouseManagementSuppliersRecord;
  warehouse_management_task_items: WarehouseManagementTaskItemsRecord;
  warehouse_management_tasks: WarehouseManagementTasksRecord;
  warehouse_management_warehouses: WarehouseManagementWarehousesRecord;
};
```

#### Properties

##### \_authOrigins

```ts
_authOrigins: AuthoriginsRecord;
```

##### \_externalAuths

```ts
_externalAuths: ExternalauthsRecord;
```

##### \_mfas

```ts
_mfas: MfasRecord;
```

##### \_otps

```ts
_otps: OtpsRecord;
```

##### \_superusers

```ts
_superusers: SuperusersRecord;
```

##### billing\_management\_account\_logs

```ts
billing_management_account_logs: BillingManagementAccountLogsRecord;
```

##### billing\_management\_account\_transactions

```ts
billing_management_account_transactions: BillingManagementAccountTransactionsRecord;
```

##### billing\_management\_client\_accounts

```ts
billing_management_client_accounts: BillingManagementClientAccountsRecord;
```

##### billing\_management\_credit\_notes

```ts
billing_management_credit_notes: BillingManagementCreditNotesRecord;
```

##### billing\_management\_disputes

```ts
billing_management_disputes: BillingManagementDisputesRecord;
```

##### billing\_management\_invoice\_line\_items

```ts
billing_management_invoice_line_items: BillingManagementInvoiceLineItemsRecord;
```

##### billing\_management\_invoices

```ts
billing_management_invoices: BillingManagementInvoicesRecord;
```

##### billing\_management\_payments

```ts
billing_management_payments: BillingManagementPaymentsRecord;
```

##### billing\_management\_quotes

```ts
billing_management_quotes: BillingManagementQuotesRecord;
```

##### billing\_management\_rate\_cards

```ts
billing_management_rate_cards: BillingManagementRateCardsRecord;
```

##### billing\_management\_rate\_rules

```ts
billing_management_rate_rules: BillingManagementRateRulesRecord;
```

##### billing\_management\_surcharges

```ts
billing_management_surcharges: BillingManagementSurchargesRecord;
```

##### customer\_relations\_campaigns

```ts
customer_relations_campaigns: CustomerRelationsCampaignsRecord;
```

##### customer\_relations\_cases

```ts
customer_relations_cases: CustomerRelationsCasesRecord;
```

##### customer\_relations\_companies

```ts
customer_relations_companies: CustomerRelationsCompaniesRecord;
```

##### customer\_relations\_contacts

```ts
customer_relations_contacts: CustomerRelationsContactsRecord;
```

##### customer\_relations\_interactions

```ts
customer_relations_interactions: CustomerRelationsInteractionsRecord;
```

##### customer\_relations\_invoice\_items

```ts
customer_relations_invoice_items: CustomerRelationsInvoiceItemsRecord;
```

##### customer\_relations\_invoices

```ts
customer_relations_invoices: CustomerRelationsInvoicesRecord;
```

##### customer\_relations\_leads

```ts
customer_relations_leads: CustomerRelationsLeadsRecord;
```

##### customer\_relations\_opportunities

```ts
customer_relations_opportunities: CustomerRelationsOpportunitiesRecord;
```

##### customer\_relations\_opportunity\_products

```ts
customer_relations_opportunity_products: CustomerRelationsOpportunityProductsRecord;
```

##### customer\_relations\_products

```ts
customer_relations_products: CustomerRelationsProductsRecord;
```

##### delivery\_management\_driver\_location

```ts
delivery_management_driver_location: DeliveryManagementDriverLocationRecord;
```

##### delivery\_management\_proof\_of\_deliveries

```ts
delivery_management_proof_of_deliveries: DeliveryManagementProofOfDeliveriesRecord;
```

##### delivery\_management\_routes

```ts
delivery_management_routes: DeliveryManagementRoutesRecord;
```

##### delivery\_management\_task\_events

```ts
delivery_management_task_events: DeliveryManagementTaskEventsRecord;
```

##### delivery\_management\_tasks

```ts
delivery_management_tasks: DeliveryManagementTasksRecord;
```

##### notifications

```ts
notifications: NotificationsRecord;
```

##### transport\_management\_carrier\_rates

```ts
transport_management_carrier_rates: TransportManagementCarrierRatesRecord;
```

##### transport\_management\_carriers

```ts
transport_management_carriers: TransportManagementCarriersRecord;
```

##### transport\_management\_drivers

```ts
transport_management_drivers: TransportManagementDriversRecord;
```

##### transport\_management\_expenses

```ts
transport_management_expenses: TransportManagementExpensesRecord;
```

##### transport\_management\_gps\_pings

```ts
transport_management_gps_pings: TransportManagementGpsPingsRecord;
```

##### transport\_management\_partner\_invoice

```ts
transport_management_partner_invoice: TransportManagementPartnerInvoiceRecord;
```

##### transport\_management\_partner\_invoice\_items

```ts
transport_management_partner_invoice_items: TransportManagementPartnerInvoiceItemsRecord;
```

##### transport\_management\_proof\_of\_deliveries

```ts
transport_management_proof_of_deliveries: TransportManagementProofOfDeliveriesRecord;
```

##### transport\_management\_routes

```ts
transport_management_routes: TransportManagementRoutesRecord;
```

##### transport\_management\_shipment\_leg\_events

```ts
transport_management_shipment_leg_events: TransportManagementShipmentLegEventsRecord;
```

##### transport\_management\_shipment\_legs

```ts
transport_management_shipment_legs: TransportManagementShipmentLegsRecord;
```

##### transport\_management\_trip\_stops

```ts
transport_management_trip_stops: TransportManagementTripStopsRecord;
```

##### transport\_management\_trips

```ts
transport_management_trips: TransportManagementTripsRecord;
```

##### transport\_management\_vehicle\_maintenance

```ts
transport_management_vehicle_maintenance: TransportManagementVehicleMaintenanceRecord;
```

##### transport\_management\_vehicles

```ts
transport_management_vehicles: TransportManagementVehiclesRecord;
```

##### users

```ts
users: UsersRecord;
```

##### warehouse\_management\_bin\_threshold

```ts
warehouse_management_bin_threshold: WarehouseManagementBinThresholdRecord;
```

##### warehouse\_management\_inbound\_shipment\_items

```ts
warehouse_management_inbound_shipment_items: WarehouseManagementInboundShipmentItemsRecord;
```

##### warehouse\_management\_inbound\_shipments

```ts
warehouse_management_inbound_shipments: WarehouseManagementInboundShipmentsRecord;
```

##### warehouse\_management\_inventory\_adjustment

```ts
warehouse_management_inventory_adjustment: WarehouseManagementInventoryAdjustmentRecord;
```

##### warehouse\_management\_inventory\_batches

```ts
warehouse_management_inventory_batches: WarehouseManagementInventoryBatchesRecord;
```

##### warehouse\_management\_inventory\_stock

```ts
warehouse_management_inventory_stock: WarehouseManagementInventoryStockRecord;
```

##### warehouse\_management\_locations

```ts
warehouse_management_locations: WarehouseManagementLocationsRecord;
```

##### warehouse\_management\_outbound\_shipment\_items

```ts
warehouse_management_outbound_shipment_items: WarehouseManagementOutboundShipmentItemsRecord;
```

##### warehouse\_management\_outbound\_shipments

```ts
warehouse_management_outbound_shipments: WarehouseManagementOutboundShipmentsRecord;
```

##### warehouse\_management\_package\_items

```ts
warehouse_management_package_items: WarehouseManagementPackageItemsRecord;
```

##### warehouse\_management\_packages

```ts
warehouse_management_packages: WarehouseManagementPackagesRecord;
```

##### warehouse\_management\_pick\_batch\_items

```ts
warehouse_management_pick_batch_items: WarehouseManagementPickBatchItemsRecord;
```

##### warehouse\_management\_pick\_batches

```ts
warehouse_management_pick_batches: WarehouseManagementPickBatchesRecord;
```

##### warehouse\_management\_products

```ts
warehouse_management_products: WarehouseManagementProductsRecord;
```

##### warehouse\_management\_putaway\_rules

```ts
warehouse_management_putaway_rules: WarehouseManagementPutawayRulesRecord;
```

##### warehouse\_management\_reorder\_points

```ts
warehouse_management_reorder_points: WarehouseManagementReorderPointsRecord;
```

##### warehouse\_management\_return\_items

```ts
warehouse_management_return_items: WarehouseManagementReturnItemsRecord;
```

##### warehouse\_management\_returns

```ts
warehouse_management_returns: WarehouseManagementReturnsRecord;
```

##### warehouse\_management\_sales\_order\_items

```ts
warehouse_management_sales_order_items: WarehouseManagementSalesOrderItemsRecord;
```

##### warehouse\_management\_sales\_orders

```ts
warehouse_management_sales_orders: WarehouseManagementSalesOrdersRecord;
```

##### warehouse\_management\_stock\_transfer

```ts
warehouse_management_stock_transfer: WarehouseManagementStockTransferRecord;
```

##### warehouse\_management\_suppliers

```ts
warehouse_management_suppliers: WarehouseManagementSuppliersRecord;
```

##### warehouse\_management\_task\_items

```ts
warehouse_management_task_items: WarehouseManagementTaskItemsRecord;
```

##### warehouse\_management\_tasks

```ts
warehouse_management_tasks: WarehouseManagementTasksRecord;
```

##### warehouse\_management\_warehouses

```ts
warehouse_management_warehouses: WarehouseManagementWarehousesRecord;
```

***

### CollectionResponses

```ts
type CollectionResponses = {
  _authOrigins: AuthoriginsResponse;
  _externalAuths: ExternalauthsResponse;
  _mfas: MfasResponse;
  _otps: OtpsResponse;
  _superusers: SuperusersResponse;
  billing_management_account_logs: BillingManagementAccountLogsResponse;
  billing_management_account_transactions: BillingManagementAccountTransactionsResponse;
  billing_management_client_accounts: BillingManagementClientAccountsResponse;
  billing_management_credit_notes: BillingManagementCreditNotesResponse;
  billing_management_disputes: BillingManagementDisputesResponse;
  billing_management_invoice_line_items: BillingManagementInvoiceLineItemsResponse;
  billing_management_invoices: BillingManagementInvoicesResponse;
  billing_management_payments: BillingManagementPaymentsResponse;
  billing_management_quotes: BillingManagementQuotesResponse;
  billing_management_rate_cards: BillingManagementRateCardsResponse;
  billing_management_rate_rules: BillingManagementRateRulesResponse;
  billing_management_surcharges: BillingManagementSurchargesResponse;
  customer_relations_campaigns: CustomerRelationsCampaignsResponse;
  customer_relations_cases: CustomerRelationsCasesResponse;
  customer_relations_companies: CustomerRelationsCompaniesResponse;
  customer_relations_contacts: CustomerRelationsContactsResponse;
  customer_relations_interactions: CustomerRelationsInteractionsResponse;
  customer_relations_invoice_items: CustomerRelationsInvoiceItemsResponse;
  customer_relations_invoices: CustomerRelationsInvoicesResponse;
  customer_relations_leads: CustomerRelationsLeadsResponse;
  customer_relations_opportunities: CustomerRelationsOpportunitiesResponse;
  customer_relations_opportunity_products: CustomerRelationsOpportunityProductsResponse;
  customer_relations_products: CustomerRelationsProductsResponse;
  delivery_management_driver_location: DeliveryManagementDriverLocationResponse;
  delivery_management_proof_of_deliveries: DeliveryManagementProofOfDeliveriesResponse;
  delivery_management_routes: DeliveryManagementRoutesResponse;
  delivery_management_task_events: DeliveryManagementTaskEventsResponse;
  delivery_management_tasks: DeliveryManagementTasksResponse;
  notifications: NotificationsResponse;
  transport_management_carrier_rates: TransportManagementCarrierRatesResponse;
  transport_management_carriers: TransportManagementCarriersResponse;
  transport_management_drivers: TransportManagementDriversResponse;
  transport_management_expenses: TransportManagementExpensesResponse;
  transport_management_gps_pings: TransportManagementGpsPingsResponse;
  transport_management_partner_invoice: TransportManagementPartnerInvoiceResponse;
  transport_management_partner_invoice_items: TransportManagementPartnerInvoiceItemsResponse;
  transport_management_proof_of_deliveries: TransportManagementProofOfDeliveriesResponse;
  transport_management_routes: TransportManagementRoutesResponse;
  transport_management_shipment_leg_events: TransportManagementShipmentLegEventsResponse;
  transport_management_shipment_legs: TransportManagementShipmentLegsResponse;
  transport_management_trip_stops: TransportManagementTripStopsResponse;
  transport_management_trips: TransportManagementTripsResponse;
  transport_management_vehicle_maintenance: TransportManagementVehicleMaintenanceResponse;
  transport_management_vehicles: TransportManagementVehiclesResponse;
  users: UsersResponse;
  warehouse_management_bin_threshold: WarehouseManagementBinThresholdResponse;
  warehouse_management_inbound_shipment_items: WarehouseManagementInboundShipmentItemsResponse;
  warehouse_management_inbound_shipments: WarehouseManagementInboundShipmentsResponse;
  warehouse_management_inventory_adjustment: WarehouseManagementInventoryAdjustmentResponse;
  warehouse_management_inventory_batches: WarehouseManagementInventoryBatchesResponse;
  warehouse_management_inventory_stock: WarehouseManagementInventoryStockResponse;
  warehouse_management_locations: WarehouseManagementLocationsResponse;
  warehouse_management_outbound_shipment_items: WarehouseManagementOutboundShipmentItemsResponse;
  warehouse_management_outbound_shipments: WarehouseManagementOutboundShipmentsResponse;
  warehouse_management_package_items: WarehouseManagementPackageItemsResponse;
  warehouse_management_packages: WarehouseManagementPackagesResponse;
  warehouse_management_pick_batch_items: WarehouseManagementPickBatchItemsResponse;
  warehouse_management_pick_batches: WarehouseManagementPickBatchesResponse;
  warehouse_management_products: WarehouseManagementProductsResponse;
  warehouse_management_putaway_rules: WarehouseManagementPutawayRulesResponse;
  warehouse_management_reorder_points: WarehouseManagementReorderPointsResponse;
  warehouse_management_return_items: WarehouseManagementReturnItemsResponse;
  warehouse_management_returns: WarehouseManagementReturnsResponse;
  warehouse_management_sales_order_items: WarehouseManagementSalesOrderItemsResponse;
  warehouse_management_sales_orders: WarehouseManagementSalesOrdersResponse;
  warehouse_management_stock_transfer: WarehouseManagementStockTransferResponse;
  warehouse_management_suppliers: WarehouseManagementSuppliersResponse;
  warehouse_management_task_items: WarehouseManagementTaskItemsResponse;
  warehouse_management_tasks: WarehouseManagementTasksResponse;
  warehouse_management_warehouses: WarehouseManagementWarehousesResponse;
};
```

#### Properties

##### \_authOrigins

```ts
_authOrigins: AuthoriginsResponse;
```

##### \_externalAuths

```ts
_externalAuths: ExternalauthsResponse;
```

##### \_mfas

```ts
_mfas: MfasResponse;
```

##### \_otps

```ts
_otps: OtpsResponse;
```

##### \_superusers

```ts
_superusers: SuperusersResponse;
```

##### billing\_management\_account\_logs

```ts
billing_management_account_logs: BillingManagementAccountLogsResponse;
```

##### billing\_management\_account\_transactions

```ts
billing_management_account_transactions: BillingManagementAccountTransactionsResponse;
```

##### billing\_management\_client\_accounts

```ts
billing_management_client_accounts: BillingManagementClientAccountsResponse;
```

##### billing\_management\_credit\_notes

```ts
billing_management_credit_notes: BillingManagementCreditNotesResponse;
```

##### billing\_management\_disputes

```ts
billing_management_disputes: BillingManagementDisputesResponse;
```

##### billing\_management\_invoice\_line\_items

```ts
billing_management_invoice_line_items: BillingManagementInvoiceLineItemsResponse;
```

##### billing\_management\_invoices

```ts
billing_management_invoices: BillingManagementInvoicesResponse;
```

##### billing\_management\_payments

```ts
billing_management_payments: BillingManagementPaymentsResponse;
```

##### billing\_management\_quotes

```ts
billing_management_quotes: BillingManagementQuotesResponse;
```

##### billing\_management\_rate\_cards

```ts
billing_management_rate_cards: BillingManagementRateCardsResponse;
```

##### billing\_management\_rate\_rules

```ts
billing_management_rate_rules: BillingManagementRateRulesResponse;
```

##### billing\_management\_surcharges

```ts
billing_management_surcharges: BillingManagementSurchargesResponse;
```

##### customer\_relations\_campaigns

```ts
customer_relations_campaigns: CustomerRelationsCampaignsResponse;
```

##### customer\_relations\_cases

```ts
customer_relations_cases: CustomerRelationsCasesResponse;
```

##### customer\_relations\_companies

```ts
customer_relations_companies: CustomerRelationsCompaniesResponse;
```

##### customer\_relations\_contacts

```ts
customer_relations_contacts: CustomerRelationsContactsResponse;
```

##### customer\_relations\_interactions

```ts
customer_relations_interactions: CustomerRelationsInteractionsResponse;
```

##### customer\_relations\_invoice\_items

```ts
customer_relations_invoice_items: CustomerRelationsInvoiceItemsResponse;
```

##### customer\_relations\_invoices

```ts
customer_relations_invoices: CustomerRelationsInvoicesResponse;
```

##### customer\_relations\_leads

```ts
customer_relations_leads: CustomerRelationsLeadsResponse;
```

##### customer\_relations\_opportunities

```ts
customer_relations_opportunities: CustomerRelationsOpportunitiesResponse;
```

##### customer\_relations\_opportunity\_products

```ts
customer_relations_opportunity_products: CustomerRelationsOpportunityProductsResponse;
```

##### customer\_relations\_products

```ts
customer_relations_products: CustomerRelationsProductsResponse;
```

##### delivery\_management\_driver\_location

```ts
delivery_management_driver_location: DeliveryManagementDriverLocationResponse;
```

##### delivery\_management\_proof\_of\_deliveries

```ts
delivery_management_proof_of_deliveries: DeliveryManagementProofOfDeliveriesResponse;
```

##### delivery\_management\_routes

```ts
delivery_management_routes: DeliveryManagementRoutesResponse;
```

##### delivery\_management\_task\_events

```ts
delivery_management_task_events: DeliveryManagementTaskEventsResponse;
```

##### delivery\_management\_tasks

```ts
delivery_management_tasks: DeliveryManagementTasksResponse;
```

##### notifications

```ts
notifications: NotificationsResponse;
```

##### transport\_management\_carrier\_rates

```ts
transport_management_carrier_rates: TransportManagementCarrierRatesResponse;
```

##### transport\_management\_carriers

```ts
transport_management_carriers: TransportManagementCarriersResponse;
```

##### transport\_management\_drivers

```ts
transport_management_drivers: TransportManagementDriversResponse;
```

##### transport\_management\_expenses

```ts
transport_management_expenses: TransportManagementExpensesResponse;
```

##### transport\_management\_gps\_pings

```ts
transport_management_gps_pings: TransportManagementGpsPingsResponse;
```

##### transport\_management\_partner\_invoice

```ts
transport_management_partner_invoice: TransportManagementPartnerInvoiceResponse;
```

##### transport\_management\_partner\_invoice\_items

```ts
transport_management_partner_invoice_items: TransportManagementPartnerInvoiceItemsResponse;
```

##### transport\_management\_proof\_of\_deliveries

```ts
transport_management_proof_of_deliveries: TransportManagementProofOfDeliveriesResponse;
```

##### transport\_management\_routes

```ts
transport_management_routes: TransportManagementRoutesResponse;
```

##### transport\_management\_shipment\_leg\_events

```ts
transport_management_shipment_leg_events: TransportManagementShipmentLegEventsResponse;
```

##### transport\_management\_shipment\_legs

```ts
transport_management_shipment_legs: TransportManagementShipmentLegsResponse;
```

##### transport\_management\_trip\_stops

```ts
transport_management_trip_stops: TransportManagementTripStopsResponse;
```

##### transport\_management\_trips

```ts
transport_management_trips: TransportManagementTripsResponse;
```

##### transport\_management\_vehicle\_maintenance

```ts
transport_management_vehicle_maintenance: TransportManagementVehicleMaintenanceResponse;
```

##### transport\_management\_vehicles

```ts
transport_management_vehicles: TransportManagementVehiclesResponse;
```

##### users

```ts
users: UsersResponse;
```

##### warehouse\_management\_bin\_threshold

```ts
warehouse_management_bin_threshold: WarehouseManagementBinThresholdResponse;
```

##### warehouse\_management\_inbound\_shipment\_items

```ts
warehouse_management_inbound_shipment_items: WarehouseManagementInboundShipmentItemsResponse;
```

##### warehouse\_management\_inbound\_shipments

```ts
warehouse_management_inbound_shipments: WarehouseManagementInboundShipmentsResponse;
```

##### warehouse\_management\_inventory\_adjustment

```ts
warehouse_management_inventory_adjustment: WarehouseManagementInventoryAdjustmentResponse;
```

##### warehouse\_management\_inventory\_batches

```ts
warehouse_management_inventory_batches: WarehouseManagementInventoryBatchesResponse;
```

##### warehouse\_management\_inventory\_stock

```ts
warehouse_management_inventory_stock: WarehouseManagementInventoryStockResponse;
```

##### warehouse\_management\_locations

```ts
warehouse_management_locations: WarehouseManagementLocationsResponse;
```

##### warehouse\_management\_outbound\_shipment\_items

```ts
warehouse_management_outbound_shipment_items: WarehouseManagementOutboundShipmentItemsResponse;
```

##### warehouse\_management\_outbound\_shipments

```ts
warehouse_management_outbound_shipments: WarehouseManagementOutboundShipmentsResponse;
```

##### warehouse\_management\_package\_items

```ts
warehouse_management_package_items: WarehouseManagementPackageItemsResponse;
```

##### warehouse\_management\_packages

```ts
warehouse_management_packages: WarehouseManagementPackagesResponse;
```

##### warehouse\_management\_pick\_batch\_items

```ts
warehouse_management_pick_batch_items: WarehouseManagementPickBatchItemsResponse;
```

##### warehouse\_management\_pick\_batches

```ts
warehouse_management_pick_batches: WarehouseManagementPickBatchesResponse;
```

##### warehouse\_management\_products

```ts
warehouse_management_products: WarehouseManagementProductsResponse;
```

##### warehouse\_management\_putaway\_rules

```ts
warehouse_management_putaway_rules: WarehouseManagementPutawayRulesResponse;
```

##### warehouse\_management\_reorder\_points

```ts
warehouse_management_reorder_points: WarehouseManagementReorderPointsResponse;
```

##### warehouse\_management\_return\_items

```ts
warehouse_management_return_items: WarehouseManagementReturnItemsResponse;
```

##### warehouse\_management\_returns

```ts
warehouse_management_returns: WarehouseManagementReturnsResponse;
```

##### warehouse\_management\_sales\_order\_items

```ts
warehouse_management_sales_order_items: WarehouseManagementSalesOrderItemsResponse;
```

##### warehouse\_management\_sales\_orders

```ts
warehouse_management_sales_orders: WarehouseManagementSalesOrdersResponse;
```

##### warehouse\_management\_stock\_transfer

```ts
warehouse_management_stock_transfer: WarehouseManagementStockTransferResponse;
```

##### warehouse\_management\_suppliers

```ts
warehouse_management_suppliers: WarehouseManagementSuppliersResponse;
```

##### warehouse\_management\_task\_items

```ts
warehouse_management_task_items: WarehouseManagementTaskItemsResponse;
```

##### warehouse\_management\_tasks

```ts
warehouse_management_tasks: WarehouseManagementTasksResponse;
```

##### warehouse\_management\_warehouses

```ts
warehouse_management_warehouses: WarehouseManagementWarehousesResponse;
```

***

### CreateAuth

```ts
type CreateAuth<T> = {
  id?: RecordIdString;
  email: string;
  emailVisibility?: boolean;
  password: string;
  passwordConfirm: string;
  verified?: boolean;
} & ProcessCreateAndUpdateFields<T>;
```

#### Type Declaration

##### id?

```ts
optional id: RecordIdString;
```

##### email

```ts
email: string;
```

##### emailVisibility?

```ts
optional emailVisibility: boolean;
```

##### password

```ts
password: string;
```

##### passwordConfirm

```ts
passwordConfirm: string;
```

##### verified?

```ts
optional verified: boolean;
```

#### Type Parameters

##### T

`T`

***

### CreateBase

```ts
type CreateBase<T> = {
  id?: RecordIdString;
} & ProcessCreateAndUpdateFields<T>;
```

#### Type Declaration

##### id?

```ts
optional id: RecordIdString;
```

#### Type Parameters

##### T

`T`

***

### UpdateAuth

```ts
type UpdateAuth<T> = Partial<Omit<ProcessCreateAndUpdateFields<T>, keyof AuthSystemFields>> & {
  email?: string;
  emailVisibility?: boolean;
  oldPassword?: string;
  password?: string;
  passwordConfirm?: string;
  verified?: boolean;
};
```

#### Type Declaration

##### email?

```ts
optional email: string;
```

##### emailVisibility?

```ts
optional emailVisibility: boolean;
```

##### oldPassword?

```ts
optional oldPassword: string;
```

##### password?

```ts
optional password: string;
```

##### passwordConfirm?

```ts
optional passwordConfirm: string;
```

##### verified?

```ts
optional verified: boolean;
```

#### Type Parameters

##### T

`T`

***

### UpdateBase

```ts
type UpdateBase<T> = Partial<Omit<ProcessCreateAndUpdateFields<T>, keyof BaseSystemFields>>;
```

#### Type Parameters

##### T

`T`

***

### Create

```ts
type Create<T> = CollectionResponses[T] extends AuthSystemFields ? CreateAuth<CollectionRecords[T]> : CreateBase<CollectionRecords[T]>;
```

#### Type Parameters

##### T

`T` *extends* keyof [`CollectionResponses`](#collectionresponses)

***

### Update

```ts
type Update<T> = CollectionResponses[T] extends AuthSystemFields ? UpdateAuth<CollectionRecords[T]> : UpdateBase<CollectionRecords[T]>;
```

#### Type Parameters

##### T

`T` *extends* keyof [`CollectionResponses`](#collectionresponses)

***

### TypedPocketBase

```ts
type TypedPocketBase = {
  collection: RecordService<CollectionResponses[T]>;
} & PocketBase;
```

#### Type Declaration

##### collection()

```ts
collection<T>(idOrName: T): RecordService<CollectionResponses[T]>;
```

###### Type Parameters

###### T

`T` *extends* keyof [`CollectionResponses`](#collectionresponses)

###### Parameters

###### idOrName

`T`

###### Returns

`RecordService`\<[`CollectionResponses`](#collectionresponses)\[`T`\]\>
# lib/utils

## Type Aliases

### GlobalAction

```ts
type GlobalAction<TNavigation> = {
  label: string;
  onSelect?: (navigate: UseNavigateResult<TNavigation>) => Promise<void> | void;
  icon?:   | React.ReactNode
     | (searchQuery?: {
     page: number;
     perPage: number;
     filter?: string;
     sort?: string;
     action?: string;
     id?: string;
   }) => React.ReactNode;
  disabled?: boolean;
  variant?: "default" | "destructive";
  divider?: boolean;
  submenu?: GlobalAction<TNavigation>[];
};
```

#### Type Parameters

##### TNavigation

`TNavigation` *extends* `string`

#### Properties

##### label

```ts
label: string;
```

##### onSelect()?

```ts
optional onSelect: (navigate: UseNavigateResult<TNavigation>) => Promise<void> | void;
```

###### Parameters

###### navigate

`UseNavigateResult`\<`TNavigation`\>

###### Returns

`Promise`\<`void`\> \| `void`

##### icon?

```ts
optional icon: 
  | React.ReactNode
  | (searchQuery?: {
  page: number;
  perPage: number;
  filter?: string;
  sort?: string;
  action?: string;
  id?: string;
}) => React.ReactNode;
```

##### disabled?

```ts
optional disabled: boolean;
```

##### variant?

```ts
optional variant: "default" | "destructive";
```

##### divider?

```ts
optional divider: boolean;
```

##### submenu?

```ts
optional submenu: GlobalAction<TNavigation>[];
```

## Functions

### cn()

```ts
function cn(...inputs: ClassValue[]): string;
```

#### Parameters

##### inputs

...`ClassValue`[]

#### Returns

`string`
# lib/get-default-route

## Functions

### getDefaultRoute()

```ts
function getDefaultRoute(roles?: UsersRolesOptions[]): string;
```

Get the default landing page based on user roles
Redirects users to the most appropriate section based on their assigned roles

#### Parameters

##### roles?

[`UsersRolesOptions`](pb.types.md#usersrolesoptions)[]

#### Returns

`string`
# lib/generate-button-group

## Interfaces

### ButtonGroupGeneratorConfig

Programmatic Button Group Generator

This utility generates button group code similar to the companies.tsx pattern.
Use this to add button group functionality to any control without modifying existing code.

#### Properties

##### primaryButtonLabel

```ts
primaryButtonLabel: string;
```

Primary button label

##### includeDropdown

```ts
includeDropdown: boolean;
```

Whether to include dropdown menu for global actions

##### navigationRoute

```ts
navigationRoute: string;
```

Navigation route context (e.g., "/dashboard/$schema/$collection")

##### globalActionsType?

```ts
optional globalActionsType: string;
```

Global actions array type hint

## Functions

### generateButtonGroupImports()

```ts
function generateButtonGroupImports(): string;
```

Generate imports needed for button group functionality

#### Returns

`string`

***

### generateButtonGroupJSX()

```ts
function generateButtonGroupJSX(config: ButtonGroupGeneratorConfig): string;
```

Generate the button group JSX code

#### Parameters

##### config

[`ButtonGroupGeneratorConfig`](#buttongroupgeneratorconfig)

#### Returns

`string`

***

### generateRenderMenuItemsFunction()

```ts
function generateRenderMenuItemsFunction(navigationRoute: string): string;
```

Generate the renderMenuItems helper function

#### Parameters

##### navigationRoute

`string`

#### Returns

`string`

***

### generateGlobalActionHandler()

```ts
function generateGlobalActionHandler(navigationRoute: string): string;
```

Generate the global action handler function

#### Parameters

##### navigationRoute

`string`

#### Returns

`string`

***

### generateButtonGroupIntegration()

```ts
function generateButtonGroupIntegration(config: ButtonGroupGeneratorConfig): {
  imports: string;
  renderMenuItems: string;
  handleGlobalAction: string;
  buttonGroupJSX: string;
};
```

Generate complete button group integration code
Returns an object with individual pieces that can be integrated

#### Parameters

##### config

[`ButtonGroupGeneratorConfig`](#buttongroupgeneratorconfig)

#### Returns

```ts
{
  imports: string;
  renderMenuItems: string;
  handleGlobalAction: string;
  buttonGroupJSX: string;
}
```

##### imports

```ts
imports: string;
```

##### renderMenuItems

```ts
renderMenuItems: string;
```

##### handleGlobalAction

```ts
handleGlobalAction: string;
```

##### buttonGroupJSX

```ts
buttonGroupJSX: string;
```

***

### getButtonGroupCode()

```ts
function getButtonGroupCode(config: ButtonGroupGeneratorConfig): {
  imports: string;
  renderMenuItems: string;
  handleGlobalAction: string;
  buttonGroupJSX: string;
};
```

Full code generator - returns ready-to-use code snippets
Usage:
const code = getButtonGroupCode({
  primaryButtonLabel: "Create",
  includeDropdown: true,
  navigationRoute: "/dashboard/$schema/$collection"
});

console.log(code.imports);
console.log(code.buttonGroupJSX);

#### Parameters

##### config

[`ButtonGroupGeneratorConfig`](#buttongroupgeneratorconfig)

#### Returns

```ts
{
  imports: string;
  renderMenuItems: string;
  handleGlobalAction: string;
  buttonGroupJSX: string;
}
```

##### imports

```ts
imports: string;
```

##### renderMenuItems

```ts
renderMenuItems: string;
```

##### handleGlobalAction

```ts
handleGlobalAction: string;
```

##### buttonGroupJSX

```ts
buttonGroupJSX: string;
```
# pocketbase

## Variables

### pocketbase

```ts
const pocketbase: TypedPocketBase;
```

## References

### PocketBaseContextType

Re-exports [PocketBaseContextType](pocketbase/context.md#pocketbasecontexttype)

***

### PocketBaseProvider

Re-exports [PocketBaseProvider](pocketbase/context.md#pocketbaseprovider)

***

### useAuth

Re-exports [useAuth](pocketbase/context.md#useauth)

***

### usePocketBase

Re-exports [usePocketBase](pocketbase/context.md#usepocketbase)

***

### usePocketBaseClient

Re-exports [usePocketBaseClient](pocketbase/context.md#usepocketbaseclient)

***

### useCreateRecord

Re-exports [useCreateRecord](pocketbase/hooks.md#usecreaterecord)

***

### useDeleteRecord

Re-exports [useDeleteRecord](pocketbase/hooks.md#usedeleterecord)

***

### useFetchRecord

Re-exports [useFetchRecord](pocketbase/hooks.md#usefetchrecord)

***

### useFetchRecords

Re-exports [useFetchRecords](pocketbase/hooks.md#usefetchrecords)

***

### useSubscribeCollection

Re-exports [useSubscribeCollection](pocketbase/hooks.md#usesubscribecollection)

***

### useSubscribeRecord

Re-exports [useSubscribeRecord](pocketbase/hooks.md#usesubscriberecord)

***

### useUpdateRecord

Re-exports [useUpdateRecord](pocketbase/hooks.md#useupdaterecord)
# components/dialogs/qr

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/transport-management/drivers

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/transport-management/carriers

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/transport-management/vehicles

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/customer-relations/contacts

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/customer-relations/opportunities

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/customer-relations/cases

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/customer-relations/companies

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/customer-relations/products

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/customer-relations/opportunity-products

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/customer-relations/leads

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/customer-relations/invoice-items

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/customer-relations/interactions

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/customer-relations/campaigns

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/customer-relations/invoices

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/upload

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/delivery-management/task-events

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/delivery-management/proof-of-deliveries

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/delivery-management/tasks

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/delivery-management/driver-location

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/record

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/export

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/warehouse-management/inbound-shipments

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/warehouse-management/suppliers

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/warehouse-management/outbound-shipment-items

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/warehouse-management/inventory-adjustment

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/warehouse-management/products

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/warehouse-management/outbound-shipments

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/warehouse-management/returns

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/warehouse-management/locations

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/warehouse-management/warehouses

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/warehouse-management/return-items

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/warehouse-management/packages

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/warehouse-management/inventory-stock

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/warehouse-management/package-items

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/warehouse-management/inventory-batches

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/warehouse-management/inbound-shipment-items

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/warehouse-management/sales-order-items

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/dialogs/warehouse-management/sales-orders

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/controls/transport-management/drivers

## Functions

### default()

```ts
function default(__namedParameters: {
  globalAction?: GlobalAction<"/dashboard/$schema/$collection">[];
}): Element;
```

DriverControls
Searchable fields:
- licenseNumber

#### Parameters

##### \_\_namedParameters

###### globalAction?

[`GlobalAction`](../../../lib/utils.md#globalaction)\<`"/dashboard/$schema/$collection"`\>[] = `[]`

#### Returns

`Element`
# components/controls/transport-management/routes

## Functions

### default()

```ts
function default(): Element;
```

RouteControls
Searchable fields:
- name

#### Returns

`Element`
# components/controls/transport-management/carriers

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/controls/transport-management/vehicles

## Functions

### default()

```ts
function default(): Element;
```

VehicleControls
Searchable fields:
- registrationNumber
- model

#### Returns

`Element`
# components/controls/customer-relations/contacts

## Functions

### default()

```ts
function default(__namedParameters: {
  globalAction?: GlobalAction<"/dashboard/$schema/$collection">[];
}): Element;
```

ContactControls
Searchable fields:
- name
- email
- phoneNumber
- jobTitle

#### Parameters

##### \_\_namedParameters

###### globalAction?

[`GlobalAction`](../../../lib/utils.md#globalaction)\<`"/dashboard/$schema/$collection"`\>[] = `[]`

#### Returns

`Element`
# components/controls/customer-relations/opportunities

## Functions

### default()

```ts
function default(__namedParameters: {
  globalAction?: GlobalAction<"/dashboard/$schema/$collection">[];
}): Element;
```

OpportunityControls
Searchable fields:
- name

#### Parameters

##### \_\_namedParameters

###### globalAction?

[`GlobalAction`](../../../lib/utils.md#globalaction)\<`"/dashboard/$schema/$collection"`\>[] = `[]`

#### Returns

`Element`
# components/controls/customer-relations/cases

## Functions

### default()

```ts
function default(__namedParameters: {
  globalAction?: GlobalAction<"/dashboard/$schema/$collection">[];
}): Element;
```

CasControls
Searchable fields:
- caseNumber

#### Parameters

##### \_\_namedParameters

###### globalAction?

[`GlobalAction`](../../../lib/utils.md#globalaction)\<`"/dashboard/$schema/$collection"`\>[] = `[]`

#### Returns

`Element`
# components/controls/customer-relations/companies

## Functions

### default()

```ts
function default(__namedParameters: {
  globalAction: GlobalAction<"/dashboard/$schema/$collection">[];
}): Element;
```

CompanyControls
Searchable fields:
- name
- street
- city
- state
- postalCode
- country
- phoneNumber
- industry
- website

#### Parameters

##### \_\_namedParameters

###### globalAction

[`GlobalAction`](../../../lib/utils.md#globalaction)\<`"/dashboard/$schema/$collection"`\>[]

#### Returns

`Element`
# components/controls/customer-relations/products

## Functions

### default()

```ts
function default(__namedParameters: {
  globalAction?: GlobalAction<"/dashboard/$schema/$collection">[];
}): Element;
```

ProductControls
Searchable fields:
- name
- sku

#### Parameters

##### \_\_namedParameters

###### globalAction?

[`GlobalAction`](../../../lib/utils.md#globalaction)\<`"/dashboard/$schema/$collection"`\>[] = `[]`

#### Returns

`Element`
# components/controls/customer-relations/leads

## Functions

### default()

```ts
function default(__namedParameters: {
  globalAction?: GlobalAction<"/dashboard/$schema/$collection">[];
}): Element;
```

LeadControls
Searchable fields:
- name
- email

#### Parameters

##### \_\_namedParameters

###### globalAction?

[`GlobalAction`](../../../lib/utils.md#globalaction)\<`"/dashboard/$schema/$collection"`\>[] = `[]`

#### Returns

`Element`
# components/controls/customer-relations/interactions

## Functions

### default()

```ts
function default(__namedParameters: {
  globalAction?: GlobalAction<"/dashboard/$schema/$collection">[];
}): Element;
```

InteractionControls
Searchable fields:
- outcome

#### Parameters

##### \_\_namedParameters

###### globalAction?

[`GlobalAction`](../../../lib/utils.md#globalaction)\<`"/dashboard/$schema/$collection"`\>[] = `[]`

#### Returns

`Element`
# components/controls/customer-relations/campaigns

## Functions

### default()

```ts
function default(__namedParameters: {
  globalAction?: GlobalAction<"/dashboard/$schema/$collection">[];
}): Element;
```

CampaignControls
Searchable fields:
- name

#### Parameters

##### \_\_namedParameters

###### globalAction?

[`GlobalAction`](../../../lib/utils.md#globalaction)\<`"/dashboard/$schema/$collection"`\>[] = `[]`

#### Returns

`Element`
# components/controls/customer-relations/invoices

## Functions

### default()

```ts
function default(__namedParameters: {
  globalAction?: GlobalAction<"/dashboard/$schema/$collection">[];
}): Element;
```

InvoiceControls
Searchable fields:
- invoiceNumber

#### Parameters

##### \_\_namedParameters

###### globalAction?

[`GlobalAction`](../../../lib/utils.md#globalaction)\<`"/dashboard/$schema/$collection"`\>[] = `[]`

#### Returns

`Element`
# components/controls/delivery-management/proof-of-deliveries

## Functions

### default()

```ts
function default(__namedParameters: {
  globalAction?: GlobalAction<"/dashboard/$schema/$collection">[];
}): Element;
```

ProofOfDeliveryControls
Searchable fields:
- recipientName

#### Parameters

##### \_\_namedParameters

###### globalAction?

[`GlobalAction`](../../../lib/utils.md#globalaction)\<`"/dashboard/$schema/$collection"`\>[] = `[]`

#### Returns

`Element`
# components/controls/delivery-management/tasks

## Functions

### default()

```ts
function default(__namedParameters: {
  globalAction?: GlobalAction<"/dashboard/$schema/$collection">[];
}): Element;
```

TaskControls
Searchable fields:
- deliveryAddress
- recipientName
- recipientPhone

#### Parameters

##### \_\_namedParameters

###### globalAction?

[`GlobalAction`](../../../lib/utils.md#globalaction)\<`"/dashboard/$schema/$collection"`\>[] = `[]`

#### Returns

`Element`
# components/controls/delivery-management/driver-location

## Functions

### default()

```ts
function default(__namedParameters: {
  globalAction?: GlobalAction<"/dashboard/$schema/$collection">[];
}): Element;
```

#### Parameters

##### \_\_namedParameters

###### globalAction?

[`GlobalAction`](../../../lib/utils.md#globalaction)\<`"/dashboard/$schema/$collection"`\>[] = `[]`

#### Returns

`Element`
# components/controls/warehouse-management/inbound-shipments

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/controls/warehouse-management/suppliers

## Functions

### default()

```ts
function default(): Element;
```

SupplierControls
Searchable fields:
- name
- contactPerson
- email
- phoneNumber

#### Returns

`Element`
# components/controls/warehouse-management/outbound-shipment-items

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/controls/warehouse-management/inventory-adjustment

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/controls/warehouse-management/products

## Functions

### default()

```ts
function default(): Element;
```

ProductControls
Searchable fields:
- name
- sku
- barcode

#### Returns

`Element`
# components/controls/warehouse-management/outbound-shipments

## Functions

### default()

```ts
function default(): Element;
```

OutboundShipmentControls
Searchable fields:
- trackingNumber

#### Returns

`Element`
# components/controls/warehouse-management/returns

## Functions

### default()

```ts
function default(): Element;
```

ReturnControls
Searchable fields:
- returnNumber

#### Returns

`Element`
# components/controls/warehouse-management/locations

## Functions

### default()

```ts
function default(): Element;
```

LocationControls
Searchable fields:
- name
- barcode

#### Returns

`Element`
# components/controls/warehouse-management/warehouses

## Functions

### default()

```ts
function default(): Element;
```

WarehousControls
Searchable fields:
- name
- address
- city
- state
- postalCode
- country
- timezone
- contactPerson
- contactEmail
- contactPhone

#### Returns

`Element`
# components/controls/warehouse-management/return-items

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/controls/warehouse-management/packages

## Functions

### default()

```ts
function default(): Element;
```

PackageControls
Searchable fields:
- packageNumber
- type

#### Returns

`Element`
# components/controls/warehouse-management/inventory-stock

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/controls/warehouse-management/package-items

## Functions

### default()

```ts
function default(): Element;
```

PackageItemControls
Searchable fields:
- lotNumber

#### Returns

`Element`
# components/controls/warehouse-management/inventory-batches

## Functions

### default()

```ts
function default(): Element;
```

InventoryBatchControls
Searchable fields:
- batchNumber

#### Returns

`Element`
# components/controls/warehouse-management/inbound-shipment-items

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/controls/warehouse-management/sales-order-items

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/controls/warehouse-management/sales-orders

## Functions

### default()

```ts
function default(): Element;
```

SalesOrderControls
Searchable fields:
- orderNumber

#### Returns

`Element`
# components/utils

## Variables

### caseStatusColors

```ts
const caseStatusColors: Record<string, string>;
```

Case status badge color map

***

### casePriorityColors

```ts
const casePriorityColors: Record<string, string>;
```

Case priority badge color map

***

### leadStatusColors

```ts
const leadStatusColors: Record<string, string>;
```

Lead status badge color map

***

### opportunityStageColors

```ts
const opportunityStageColors: Record<string, string>;
```

Opportunity stage badge color map

***

### interactionTypeIcons

```ts
const interactionTypeIcons: Record<string, string>;
```

Interaction type icon map

***

### routeStatusColors

```ts
const routeStatusColors: Record<string, string>;
```

Route status badge color map

***

### taskStatusColors

```ts
const taskStatusColors: Record<string, string>;
```

Task status badge color map

***

### taskEventStatusColors

```ts
const taskEventStatusColors: Record<string, string>;
```

Task event status badge color map

***

### driverStatusColors

```ts
const driverStatusColors: Record<string, string>;
```

Driver status badge color map

***

### vehicleStatusColors

```ts
const vehicleStatusColors: Record<string, string>;
```

Vehicle status badge color map

***

### expenseStatusColors

```ts
const expenseStatusColors: Record<string, string>;
```

Expense status badge color map

***

### geofenceEventIcons

```ts
const geofenceEventIcons: Record<string, string>;
```

Geofence event icon map

***

### invoiceStatusColors

```ts
const invoiceStatusColors: Record<string, string>;
```

Invoice status badge color map

***

### shipmentLegStatusColors

```ts
const shipmentLegStatusColors: Record<string, string>;
```

Shipment leg status badge color map

***

### tripStopStatusColors

```ts
const tripStopStatusColors: Record<string, string>;
```

Trip stop status badge color map

***

### tripStatusColors

```ts
const tripStatusColors: Record<string, string>;
```

Trip status badge color map

***

### inboundShipmentStatusColors

```ts
const inboundShipmentStatusColors: Record<string, string>;
```

Inbound shipment status badge color map

***

### outboundShipmentStatusColors

```ts
const outboundShipmentStatusColors: Record<string, string>;
```

Outbound shipment status badge color map

***

### inventoryStockStatusColors

```ts
const inventoryStockStatusColors: Record<string, string>;
```

Inventory stock status badge color map

***

### pickBatchStatusColors

```ts
const pickBatchStatusColors: Record<string, string>;
```

Pick batch status badge color map

***

### salesOrderStatusColors

```ts
const salesOrderStatusColors: Record<string, string>;
```

Sales order status badge color map

***

### returnStatusColors

```ts
const returnStatusColors: Record<string, string>;
```

Return status badge color map

***

### stockTransferStatusColors

```ts
const stockTransferStatusColors: Record<string, string>;
```

Stock transfer status badge color map

***

### warehouseTaskStatusColors

```ts
const warehouseTaskStatusColors: Record<string, string>;
```

Warehouse task status badge color map

***

### accountTransactionStatusColors

```ts
const accountTransactionStatusColors: Record<string, string>;
```

Account transaction type status badge color map

***

### billingInvoiceStatusColors

```ts
const billingInvoiceStatusColors: Record<string, string>;
```

Billing invoice status badge color map (different from delivery invoice)

***

### disputeStatusColors

```ts
const disputeStatusColors: Record<string, string>;
```

Dispute status badge color map

***

### paymentStatusColors

```ts
const paymentStatusColors: Record<string, string>;
```

Payment status badge color map

***

### logSyncStatusColors

```ts
const logSyncStatusColors: Record<string, string>;
```

Log sync status badge color map

***

### quoteStatusColors

```ts
const quoteStatusColors: Record<string, string>;
```

Quote status badge color map

## Functions

### formatCurrency()

```ts
function formatCurrency(amount: number | undefined): string;
```

Format a number as USD currency

#### Parameters

##### amount

`number` | `undefined`

#### Returns

`string`

***

### formatDate()

```ts
function formatDate(date: string | undefined): string;
```

Format a date string to locale date

#### Parameters

##### date

`string` | `undefined`

#### Returns

`string`

***

### formatHyphens()

```ts
function formatHyphens(text: string | undefined): string;
```

Replace hyphens with spaces

#### Parameters

##### text

`string` | `undefined`

#### Returns

`string`

***

### truncateText()

```ts
function truncateText(text: string | undefined, length: number): string;
```

Truncate text to a specified length with ellipsis

#### Parameters

##### text

`string` | `undefined`

##### length

`number` = `50`

#### Returns

`string`

***

### capitalize()

```ts
function capitalize(text: string): string;
```

Capitalize first letter of text

#### Parameters

##### text

`string`

#### Returns

`string`

***

### currencyCell()

```ts
function currencyCell(amount: number | undefined): ReactNode;
```

Render a currency value as JSX

#### Parameters

##### amount

`number` | `undefined`

#### Returns

`ReactNode`

***

### dateCell()

```ts
function dateCell(date: string | undefined): ReactNode;
```

Render a date as JSX

#### Parameters

##### date

`string` | `undefined`

#### Returns

`ReactNode`

***

### emailCell()

```ts
function emailCell(email: string | undefined): ReactNode;
```

Render an email link as JSX

#### Parameters

##### email

`string` | `undefined`

#### Returns

`ReactNode`

***

### urlCell()

```ts
function urlCell(url: string | undefined): ReactNode;
```

Render a text link as JSX

#### Parameters

##### url

`string` | `undefined`

#### Returns

`ReactNode`

***

### statusBadgeCell()

```ts
function statusBadgeCell(status: string | undefined, colorMap: Record<string, string>): ReactNode;
```

Render a badge with status color mapping

#### Parameters

##### status

`string` | `undefined`

##### colorMap

`Record`\<`string`, `string`\>

#### Returns

`ReactNode`

***

### percentageCell()

```ts
function percentageCell(value: number | undefined): ReactNode;
```

Render a percentage value as JSX

#### Parameters

##### value

`number` | `undefined`

#### Returns

`ReactNode`

***

### interactionTypeCell()

```ts
function interactionTypeCell(type: string | undefined): ReactNode;
```

Render an interaction type with icon

#### Parameters

##### type

`string` | `undefined`

#### Returns

`ReactNode`

***

### formatDateTime()

```ts
function formatDateTime(date: string | undefined): string;
```

Format date-time to locale string

#### Parameters

##### date

`string` | `undefined`

#### Returns

`string`

***

### formatCoordinates()

```ts
function formatCoordinates(coords: 
  | {
  lon: number;
  lat: number;
}
  | undefined): string;
```

Format coordinates to fixed precision

#### Parameters

##### coords

\{
`lon`: `number`;
`lat`: `number`;
\} | `undefined`

#### Returns

`string`

***

### coordinatesCell()

```ts
function coordinatesCell(coords: 
  | {
  lon: number;
  lat: number;
}
  | undefined): ReactNode;
```

Render coordinates as JSX

#### Parameters

##### coords

\{
`lon`: `number`;
`lat`: `number`;
\} | `undefined`

#### Returns

`ReactNode`

***

### signatureCell()

```ts
function signatureCell(signatureData: any): ReactNode;
```

Render a signature badge

#### Parameters

##### signatureData

`any`

#### Returns

`ReactNode`

***

### expiryDateCell()

```ts
function expiryDateCell(date: string | undefined): ReactNode;
```

Render an expiry date with expired styling

#### Parameters

##### date

`string` | `undefined`

#### Returns

`ReactNode`

***

### registrationNumberCell()

```ts
function registrationNumberCell(text: string | undefined): ReactNode;
```

Render a registration number with special formatting

#### Parameters

##### text

`string` | `undefined`

#### Returns

`ReactNode`

***

### geofenceEventTypeCell()

```ts
function geofenceEventTypeCell(type: string | undefined): ReactNode;
```

Render a geofence event with icon

#### Parameters

##### type

`string` | `undefined`

#### Returns

`ReactNode`

***

### formatDynamicCurrency()

```ts
function formatDynamicCurrency(amount: number | undefined, currencyCode: string | undefined): string;
```

Format currency with dynamic currency code

#### Parameters

##### amount

`number` | `undefined`

##### currencyCode

`string` | `undefined`

#### Returns

`string`

***

### formatLocationType()

```ts
function formatLocationType(locationType: string): string;
```

Format location type by replacing hyphens with spaces

#### Parameters

##### locationType

`string`

#### Returns

`string`

***

### booleanBadgeCell()

```ts
function booleanBadgeCell(value: boolean | undefined): string;
```

Boolean badge cell renderer (for checkboxes as ✓ or -)

#### Parameters

##### value

`boolean` | `undefined`

#### Returns

`string`
# components/tables/transport-management/drivers

## Variables

### options

```ts
const options: RecordListOptions;
```

***

### actions

```ts
const actions: ContextMenuItem<DriverResponse>[];
```

***

### columns

```ts
const columns: ColumnDef<DriverResponse>[];
```
# components/tables/transport-management/carriers

## Variables

### options

```ts
const options: RecordListOptions = {};
```

***

### actions

```ts
const actions: ContextMenuItem<CarrierResponse>[];
```

***

### columns

```ts
const columns: ColumnDef<CarrierResponse>[];
```
# components/tables/transport-management/vehicles

## Variables

### options

```ts
const options: RecordListOptions = {};
```

***

### actions

```ts
const actions: ContextMenuItem<VehicleResponse>[];
```

***

### columns

```ts
const columns: ColumnDef<VehicleResponse>[];
```
# components/tables/customer-relations/contacts

## Variables

### options

```ts
const options: RecordListOptions;
```

***

### actions

```ts
const actions: ContextMenuItem<ContactResponse>[];
```

***

### columns

```ts
const columns: ColumnDef<ContactResponse>[];
```
# components/tables/customer-relations/opportunities

## Variables

### options

```ts
const options: RecordListOptions;
```

***

### actions

```ts
const actions: ContextMenuItem<OpportunityResponse>[];
```

***

### columns

```ts
const columns: ColumnDef<OpportunityResponse>[];
```
# components/tables/customer-relations/cases

## Variables

### options

```ts
const options: RecordListOptions;
```

***

### actions

```ts
const actions: ContextMenuItem<CaseResponse>[];
```

***

### columns

```ts
const columns: ColumnDef<CaseResponse>[];
```
# components/tables/customer-relations/companies

## Variables

### options

```ts
const options: RecordListOptions;
```

***

### actions

```ts
const actions: ContextMenuItem<CompanyResponse>[];
```

***

### columns

```ts
const columns: ColumnDef<CompanyResponse>[];
```
# components/tables/customer-relations/products

## Variables

### options

```ts
const options: RecordListOptions = {};
```

***

### actions

```ts
const actions: ContextMenuItem<ProductResponse>[];
```

***

### columns

```ts
const columns: ColumnDef<ProductResponse>[];
```
# components/tables/customer-relations/leads

## Variables

### options

```ts
const options: RecordListOptions;
```

***

### actions

```ts
const actions: ContextMenuItem<LeadResponse>[];
```

***

### columns

```ts
const columns: ColumnDef<LeadResponse>[];
```
# components/tables/customer-relations/interactions

## Variables

### options

```ts
const options: RecordListOptions;
```

***

### actions

```ts
const actions: ContextMenuItem<InteractionResponse>[];
```

***

### columns

```ts
const columns: ColumnDef<InteractionResponse>[];
```
# components/tables/customer-relations/campaigns

## Variables

### options

```ts
const options: RecordListOptions = {};
```

***

### actions

```ts
const actions: ContextMenuItem<CampaignResponse>[];
```

***

### columns

```ts
const columns: ColumnDef<CampaignResponse>[];
```
# components/tables/customer-relations/invoices

## Variables

### options

```ts
const options: RecordListOptions;
```

***

### actions

```ts
const actions: ContextMenuItem<InvoiceResponse>[];
```

***

### columns

```ts
const columns: ColumnDef<InvoiceResponse>[];
```
# components/tables/delivery-management/proof-of-deliveries

## Variables

### options

```ts
const options: RecordListOptions;
```

***

### actions

```ts
const actions: ContextMenuItem<ProofOfDeliveryResponse>[];
```

***

### columns

```ts
const columns: ColumnDef<ProofOfDeliveryResponse>[];
```
# components/tables/delivery-management/tasks

## Variables

### options

```ts
const options: RecordListOptions = {};
```

***

### actions

```ts
const actions: ContextMenuItem<TaskResponse>[];
```

***

### columns

```ts
const columns: ColumnDef<TaskResponse>[];
```
# components/tables/delivery-management/driver-location

## Variables

### options

```ts
const options: RecordListOptions;
```

***

### actions

```ts
const actions: ContextMenuItem<DriverLocationResponse>[];
```

***

### columns

```ts
const columns: ColumnDef<DriverLocationResponse>[];
```
# components/tables/warehouse-management/inbound-shipments

## Variables

### options

```ts
const options: RecordListOptions;
```

***

### actions

```ts
const actions: ContextMenuItem<InboundShipmentResponse>[];
```

***

### columns

```ts
const columns: ColumnDef<InboundShipmentResponse>[];
```
# components/tables/warehouse-management/suppliers

## Variables

### options

```ts
const options: RecordListOptions = {};
```

***

### actions

```ts
const actions: ContextMenuItem<SupplierResponse>[];
```

***

### columns

```ts
const columns: ColumnDef<SupplierResponse>[];
```
# components/tables/warehouse-management/inventory-adjustment

## Variables

### options

```ts
const options: RecordListOptions;
```

***

### actions

```ts
const actions: ContextMenuItem<InventoryAdjustmentResponse>[];
```

***

### columns

```ts
const columns: ColumnDef<InventoryAdjustmentResponse>[];
```
# components/tables/warehouse-management/products

## Variables

### options

```ts
const options: RecordListOptions = {};
```

***

### actions

```ts
const actions: ContextMenuItem<ProductResponse>[];
```

***

### columns

```ts
const columns: ColumnDef<ProductResponse>[];
```
# components/tables/warehouse-management/outbound-shipments

## Variables

### options

```ts
const options: RecordListOptions;
```

***

### actions

```ts
const actions: ContextMenuItem<OutboundShipmentResponse>[];
```

***

### columns

```ts
const columns: ColumnDef<OutboundShipmentResponse>[];
```
# components/tables/warehouse-management/returns

## Variables

### options

```ts
const options: RecordListOptions;
```

***

### actions

```ts
const actions: ContextMenuItem<ReturnResponse>[];
```

***

### columns

```ts
const columns: ColumnDef<ReturnResponse>[];
```
# components/tables/warehouse-management/locations

## Variables

### options

```ts
const options: RecordListOptions = {};
```

***

### actions

```ts
const actions: ContextMenuItem<LocationResponse>[];
```

***

### columns

```ts
const columns: ColumnDef<LocationResponse>[];
```
# components/tables/warehouse-management/warehouses

## Variables

### options

```ts
const options: RecordListOptions = {};
```

***

### actions

```ts
const actions: ContextMenuItem<WarehouseResponse>[];
```

***

### columns

```ts
const columns: ColumnDef<WarehouseResponse>[];
```
# components/tables/warehouse-management/packages

## Variables

### options

```ts
const options: RecordListOptions;
```

***

### actions

```ts
const actions: ContextMenuItem<PackageResponse>[];
```

***

### columns

```ts
const columns: ColumnDef<PackageResponse>[];
```
# components/tables/warehouse-management/inventory-stock

## Variables

### options

```ts
const options: RecordListOptions;
```

***

### actions

```ts
const actions: ContextMenuItem<InventoryStockResponse>[];
```

***

### columns

```ts
const columns: ColumnDef<InventoryStockResponse>[];
```
# components/tables/warehouse-management/inventory-batches

## Variables

### options

```ts
const options: RecordListOptions;
```

***

### actions

```ts
const actions: ContextMenuItem<InventoryBatchResponse>[];
```

***

### columns

```ts
const columns: ColumnDef<InventoryBatchResponse>[];
```
# components/tables/warehouse-management/sales-orders

## Variables

### options

```ts
const options: RecordListOptions;
```

***

### actions

```ts
const actions: ContextMenuItem<SalesOrderResponse>[];
```

***

### columns

```ts
const columns: ColumnDef<SalesOrderResponse>[];
```
# components/system-breadcrumbs

## Functions

### SystemBreadcrumbs()

```ts
function SystemBreadcrumbs(): Element | null;
```

#### Returns

`Element` \| `null`
# components/theme-provider

## Functions

### ThemeProvider()

```ts
function ThemeProvider(__namedParameters: ThemeProviderProps): Element;
```

#### Parameters

##### \_\_namedParameters

`ThemeProviderProps`

#### Returns

`Element`

***

### useTheme()

```ts
function useTheme(): ThemeProviderState;
```

#### Returns

`ThemeProviderState`
# components/subsystem-switcher

## Functions

### SubSystemSwitcher()

```ts
function SubSystemSwitcher(__namedParameters: {
  subSystems: {
  }[];
}): Element | null;
```

#### Parameters

##### \_\_namedParameters

###### subSystems

\{
\}[]

#### Returns

`Element` \| `null`
# components/actions/system

## Variables

### default

```ts
default: GlobalAction<"/dashboard/$schema/$collection">[];
```
# components/actions/transport-management/drivers

## Functions

### default()

```ts
function default(): Element | undefined;
```

#### Returns

`Element` \| `undefined`
# components/actions/transport-management/vehicles/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/transport-management/vehicles/update

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/transport-management/vehicles/create

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/transport-management/vehicles/form

## Type Aliases

### VehiclesFormProps

```ts
type VehiclesFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### VehiclesForm()

```ts
const VehiclesForm: (props: PropsWithChildren<NoInfer<VehiclesFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`VehiclesFormProps`](#vehiclesformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateVehiclesFormOption()

```ts
function CreateVehiclesFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     registrationNumber: string;
     model?: string;
     capacityVolume?: number;
     capacityWeight?: number;
     status: "available" | "in-maintenance" | "on-trip" | "out-of-service";
     maintenances?: string[];
     gps_pings?: string[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: Partial<{
     registrationNumber: string;
     model?: string;
     capacityVolume?: number;
     capacityWeight?: number;
     status: "available" | "in-maintenance" | "on-trip" | "out-of-service";
     maintenances?: string[];
     gps_pings?: string[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  registrationNumber: string;
  model?: string;
  capacityVolume?: number;
  capacityWeight?: number;
  status: "available" | "in-maintenance" | "on-trip" | "out-of-service";
  maintenances?: string[];
  gps_pings?: string[];
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>

***

### UpdateVehiclesFormOption()

```ts
function UpdateVehiclesFormOption(pocketbase: TypedPocketBase, record?: TransportManagementVehiclesRecord): {
  defaultValues: Partial<{
     registrationNumber?: string;
     model?: string;
     capacityVolume?: number;
     capacityWeight?: number;
     status?: "available" | "in-maintenance" | "on-trip" | "out-of-service";
     maintenances?: string[];
     gps_pings?: string[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`TransportManagementVehiclesRecord`](../../../../lib/pb.types.md#transportmanagementvehiclesrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     registrationNumber?: string;
     model?: string;
     capacityVolume?: number;
     capacityWeight?: number;
     status?: "available" | "in-maintenance" | "on-trip" | "out-of-service";
     maintenances?: string[];
     gps_pings?: string[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  registrationNumber?: string;
  model?: string;
  capacityVolume?: number;
  capacityWeight?: number;
  status?: "available" | "in-maintenance" | "on-trip" | "out-of-service";
  maintenances?: string[];
  gps_pings?: string[];
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>
# components/actions/transport-management/carriers

## Functions

### default()

```ts
function default(): Element | undefined;
```

#### Returns

`Element` \| `undefined`
# components/actions/transport-management/global

## Variables

### default

```ts
default: never[];
```
# components/actions/transport-management/vehicles

## Functions

### default()

```ts
function default(): Element | undefined;
```

#### Returns

`Element` \| `undefined`
# components/actions/transport-management/carriers/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/transport-management/carriers/update

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/transport-management/carriers/create

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/transport-management/carriers/form

## Type Aliases

### CarriersFormProps

```ts
type CarriersFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### CarriersForm()

```ts
const CarriersForm: (props: PropsWithChildren<NoInfer<CarriersFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`CarriersFormProps`](#carriersformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateCarriersFormOption()

```ts
function CreateCarriersFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     name: string;
     contactDetails?: unknown;
     serviceOffered?: unknown;
     image?: File;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: Partial<{
     name: string;
     contactDetails?: unknown;
     serviceOffered?: unknown;
     image?: File;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  name: string;
  contactDetails?: unknown;
  serviceOffered?: unknown;
  image?: File;
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>

***

### UpdateCarriersFormOption()

```ts
function UpdateCarriersFormOption(pocketbase: TypedPocketBase, record?: TransportManagementCarriersRecord): {
  defaultValues: Partial<{
     name?: string;
     contactDetails?: unknown;
     serviceOffered?: unknown;
     image?: File;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`TransportManagementCarriersRecord`](../../../../lib/pb.types.md#transportmanagementcarriersrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     name?: string;
     contactDetails?: unknown;
     serviceOffered?: unknown;
     image?: File;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  name?: string;
  contactDetails?: unknown;
  serviceOffered?: unknown;
  image?: File;
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>
# components/actions/transport-management/drivers/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/transport-management/drivers/update

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/transport-management/drivers/create

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/transport-management/drivers/form

## Type Aliases

### DriversFormProps

```ts
type DriversFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### DriversForm()

```ts
const DriversForm: (props: PropsWithChildren<NoInfer<DriversFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`DriversFormProps`](#driversformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateDriversFormOption()

```ts
function CreateDriversFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     user?: string;
     licenseNumber: string;
     licenseExpiryDate?: Date;
     status: "active" | "inactive" | "on-leave";
     schedules?: string[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: Partial<{
     user?: string;
     licenseNumber: string;
     licenseExpiryDate?: Date;
     status: "active" | "inactive" | "on-leave";
     schedules?: string[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  user?: string;
  licenseNumber: string;
  licenseExpiryDate?: Date;
  status: "active" | "inactive" | "on-leave";
  schedules?: string[];
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>

***

### UpdateDriversFormOption()

```ts
function UpdateDriversFormOption(pocketbase: TypedPocketBase, record?: TransportManagementDriversRecord): {
  defaultValues: Partial<{
     user?: string;
     licenseNumber?: string;
     licenseExpiryDate?: Date;
     status?: "active" | "inactive" | "on-leave";
     schedules?: string[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`TransportManagementDriversRecord`](../../../../lib/pb.types.md#transportmanagementdriversrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     user?: string;
     licenseNumber?: string;
     licenseExpiryDate?: Date;
     status?: "active" | "inactive" | "on-leave";
     schedules?: string[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  user?: string;
  licenseNumber?: string;
  licenseExpiryDate?: Date;
  status?: "active" | "inactive" | "on-leave";
  schedules?: string[];
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>
# components/actions/customer-relations/leads/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/leads/update

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/leads/create

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/leads/form

## Type Aliases

### LeadsFormProps

```ts
type LeadsFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### LeadsForm()

```ts
const LeadsForm: (props: PropsWithChildren<NoInfer<LeadsFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`LeadsFormProps`](#leadsformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateLeadsFormOption()

```ts
function CreateLeadsFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     name: string;
     email?: string;
     source:   | "website"
        | "other"
        | "referral"
        | "social-media"
        | "email-campaign"
        | "cold-call"
        | "event"
        | "advertisment"
        | "partner";
     status?: "new" | "contacted" | "qualified" | "unqualified" | "converted";
     score: number;
     owner: string;
     campaign?: string;
     convertedAt?: Date;
     convertedContact?: string;
     convertedCompany?: string;
     convertedOpportunity?: string;
     attachments?: File[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: Partial<{
     name: string;
     email?: string;
     source:   | "website"
        | "other"
        | "referral"
        | "social-media"
        | "email-campaign"
        | "cold-call"
        | "event"
        | "advertisment"
        | "partner";
     status?: "new" | "contacted" | "qualified" | "unqualified" | "converted";
     score: number;
     owner: string;
     campaign?: string;
     convertedAt?: Date;
     convertedContact?: string;
     convertedCompany?: string;
     convertedOpportunity?: string;
     attachments?: File[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  name: string;
  email?: string;
  source:   | "website"
     | "other"
     | "referral"
     | "social-media"
     | "email-campaign"
     | "cold-call"
     | "event"
     | "advertisment"
     | "partner";
  status?: "new" | "contacted" | "qualified" | "unqualified" | "converted";
  score: number;
  owner: string;
  campaign?: string;
  convertedAt?: Date;
  convertedContact?: string;
  convertedCompany?: string;
  convertedOpportunity?: string;
  attachments?: File[];
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>

***

### UpdateLeadsFormOption()

```ts
function UpdateLeadsFormOption(pocketbase: TypedPocketBase, record?: CustomerRelationsLeadsRecord): {
  defaultValues: Partial<{
     name?: string;
     email?: string;
     source?:   | "website"
        | "other"
        | "referral"
        | "social-media"
        | "email-campaign"
        | "cold-call"
        | "event"
        | "advertisment"
        | "partner";
     status?: "new" | "contacted" | "qualified" | "unqualified" | "converted";
     score?: number;
     owner?: string;
     campaign?: string;
     convertedAt?: Date;
     convertedContact?: string;
     convertedCompany?: string;
     convertedOpportunity?: string;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`CustomerRelationsLeadsRecord`](../../../../lib/pb.types.md#customerrelationsleadsrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     name?: string;
     email?: string;
     source?:   | "website"
        | "other"
        | "referral"
        | "social-media"
        | "email-campaign"
        | "cold-call"
        | "event"
        | "advertisment"
        | "partner";
     status?: "new" | "contacted" | "qualified" | "unqualified" | "converted";
     score?: number;
     owner?: string;
     campaign?: string;
     convertedAt?: Date;
     convertedContact?: string;
     convertedCompany?: string;
     convertedOpportunity?: string;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  name?: string;
  email?: string;
  source?:   | "website"
     | "other"
     | "referral"
     | "social-media"
     | "email-campaign"
     | "cold-call"
     | "event"
     | "advertisment"
     | "partner";
  status?: "new" | "contacted" | "qualified" | "unqualified" | "converted";
  score?: number;
  owner?: string;
  campaign?: string;
  convertedAt?: Date;
  convertedContact?: string;
  convertedCompany?: string;
  convertedOpportunity?: string;
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>
# components/actions/customer-relations/contacts

## Functions

### default()

```ts
function default(): Element | null;
```

#### Returns

`Element` \| `null`
# components/actions/customer-relations/invoice-items/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/invoice-items/update

## Variables

### UpdateSchema

```ts
const UpdateSchema: ZodObject<{
  invoice: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  quantity: ZodOptional<ZodNumber>;
  price: ZodOptional<ZodNumber>;
}, $strip>;
```

## Functions

### default()

```ts
function default(): Element | null;
```

#### Returns

`Element` \| `null`
# components/actions/customer-relations/invoice-items/create

## Variables

### CreateSchema

```ts
const CreateSchema: ZodObject<{
  product: ZodString;
  quantity: ZodNumber;
}, $strip>;
```

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/invoice-items/form

## Type Aliases

### InvoiceItemsProps

```ts
type InvoiceItemsProps = {
  action?: "create" | "edit";
  onRemove?: () => void;
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

##### onRemove()?

```ts
optional onRemove: () => void;
```

###### Returns

`void`

## Variables

### InvoiceItemsForm()

```ts
const InvoiceItemsForm: <TFormData, TFields, TOnMount, TOnChange, TOnChangeAsync, TOnBlur, TOnBlurAsync, TOnSubmit, TOnSubmitAsync, TOnDynamic, TOnDynamicAsync, TOnServer, TFormSubmitMeta>(params: PropsWithChildren<NoInfer<InvoiceItemsProps> & {
}>) => ReactNode;
```

#### Type Parameters

##### TFormData

`TFormData`

##### TFields

`TFields` *extends* 
  \| `string`
  \| \{
  `id`: `DeepKeysOfType`\<`TFormData`, `string`\>;
  `invoice`: `DeepKeysOfType`\<`TFormData`, `string`\>;
  `product`: `DeepKeysOfType`\<`TFormData`, `string`\>;
  `quantity`: `DeepKeysOfType`\<`TFormData`, `number`\>;
  `price`: `DeepKeysOfType`\<`TFormData`, `number`\>;
  `created?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `updated?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
\}

##### TOnMount

`TOnMount` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnChange

`TOnChange` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnChangeAsync

`TOnChangeAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnBlur

`TOnBlur` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnBlurAsync

`TOnBlurAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnSubmit

`TOnSubmit` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnSubmitAsync

`TOnSubmitAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnDynamic

`TOnDynamic` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnDynamicAsync

`TOnDynamicAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnServer

`TOnServer` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TFormSubmitMeta

`TFormSubmitMeta`

#### Parameters

##### params

`PropsWithChildren`\<`NoInfer`\<[`InvoiceItemsProps`](#invoiceitemsprops)\> & \{
\}\>

#### Returns

`ReactNode`
# components/actions/customer-relations/opportunities

## Functions

### default()

```ts
function default(): Element | null;
```

#### Returns

`Element` \| `null`
# components/actions/customer-relations/cases

## Functions

### default()

```ts
function default(): Element | null;
```

#### Returns

`Element` \| `null`
# components/actions/customer-relations/campaigns/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/campaigns/update

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/campaigns/create

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/campaigns/form

## Type Aliases

### CampaignFormProps

```ts
type CampaignFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### CampaignForm()

```ts
const CampaignForm: (props: PropsWithChildren<NoInfer<CampaignFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`CampaignFormProps`](#campaignformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateCampaignsFormOption()

```ts
function CreateCampaignsFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     name: string;
     budget: number;
     startDate?: Date;
     endDate?: Date;
     attachments?: File[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: Partial<{
     name: string;
     budget: number;
     startDate?: Date;
     endDate?: Date;
     attachments?: File[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  name: string;
  budget: number;
  startDate?: Date;
  endDate?: Date;
  attachments?: File[];
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>

***

### UpdateCampaignsFormOption()

```ts
function UpdateCampaignsFormOption(pocketbase: TypedPocketBase, record?: CustomerRelationsCampaignsRecord): {
  defaultValues: Partial<{
     name?: string;
     budget?: number;
     startDate?: Date;
     endDate?: Date;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`CustomerRelationsCampaignsRecord`](../../../../lib/pb.types.md#customerrelationscampaignsrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     name?: string;
     budget?: number;
     startDate?: Date;
     endDate?: Date;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  name?: string;
  budget?: number;
  startDate?: Date;
  endDate?: Date;
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>
# components/actions/customer-relations/interactions/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/interactions/create

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/interactions/form

## Type Aliases

### InteractionsFormProps

```ts
type InteractionsFormProps = {
  action?: "create" | "edit";
  pocketbase?: TypedPocketBase;
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

##### pocketbase?

```ts
optional pocketbase: TypedPocketBase;
```

## Variables

### InteractionsForm()

```ts
const InteractionsForm: (props: PropsWithChildren<NoInfer<InteractionsFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`InteractionsFormProps`](#interactionsformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateInteractionsFormOption()

```ts
function CreateInteractionsFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     contact: string;
     user: string;
     case?: string;
     type?: "text" | "email" | "call" | "meeting";
     outcome?: string;
     notes?: string;
     attachments?: File[];
     interactionDate?: Date;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: Partial<{
     contact: string;
     user: string;
     case?: string;
     type?: "text" | "email" | "call" | "meeting";
     outcome?: string;
     notes?: string;
     attachments?: File[];
     interactionDate?: Date;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  contact: string;
  user: string;
  case?: string;
  type?: "text" | "email" | "call" | "meeting";
  outcome?: string;
  notes?: string;
  attachments?: File[];
  interactionDate?: Date;
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>

***

### UpdateInteractionsFormOption()

```ts
function UpdateInteractionsFormOption(pocketbase: TypedPocketBase, record?: CustomerRelationsInteractionsRecord): {
  defaultValues: Partial<{
     contact?: string;
     user?: string;
     case?: string;
     type?: "text" | "email" | "call" | "meeting";
     outcome?: string;
     notes?: string;
     interactionDate?: Date;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`CustomerRelationsInteractionsRecord`](../../../../lib/pb.types.md#customerrelationsinteractionsrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     contact?: string;
     user?: string;
     case?: string;
     type?: "text" | "email" | "call" | "meeting";
     outcome?: string;
     notes?: string;
     interactionDate?: Date;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  contact?: string;
  user?: string;
  case?: string;
  type?: "text" | "email" | "call" | "meeting";
  outcome?: string;
  notes?: string;
  interactionDate?: Date;
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>
# components/actions/customer-relations/companies/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/companies/update

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/companies/create

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/companies/form

## Type Aliases

### CompaniesFormProps

```ts
type CompaniesFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### CompaniesForm()

```ts
const CompaniesForm: (props: PropsWithChildren<NoInfer<CompaniesFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`CompaniesFormProps`](#companiesformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateCompaniesFormOption()

```ts
function CreateCompaniesFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     name: string;
     street?: string;
     city?: string;
     state?: string;
     postalCode?: string;
     country?: string;
     phoneNumber?: string;
     industry?: string;
     website?: string;
     annualRevenue?: number;
     owner?: string;
     attachments?: (string | File)[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: Partial<{
     name: string;
     street?: string;
     city?: string;
     state?: string;
     postalCode?: string;
     country?: string;
     phoneNumber?: string;
     industry?: string;
     website?: string;
     annualRevenue?: number;
     owner?: string;
     attachments?: (string | File)[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  name: string;
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  phoneNumber?: string;
  industry?: string;
  website?: string;
  annualRevenue?: number;
  owner?: string;
  attachments?: (string | File)[];
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>

***

### UpdateCompaniesFormOption()

```ts
function UpdateCompaniesFormOption(pocketbase: TypedPocketBase, record?: CustomerRelationsCompaniesRecord): {
  defaultValues: Partial<{
     name?: string;
     street?: string;
     city?: string;
     state?: string;
     postalCode?: string;
     country?: string;
     phoneNumber?: string;
     industry?: string;
     website?: string;
     annualRevenue?: number;
     owner?: string;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`CustomerRelationsCompaniesRecord`](../../../../lib/pb.types.md#customerrelationscompaniesrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     name?: string;
     street?: string;
     city?: string;
     state?: string;
     postalCode?: string;
     country?: string;
     phoneNumber?: string;
     industry?: string;
     website?: string;
     annualRevenue?: number;
     owner?: string;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  name?: string;
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  phoneNumber?: string;
  industry?: string;
  website?: string;
  annualRevenue?: number;
  owner?: string;
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>
# components/actions/customer-relations/companies

## Functions

### default()

```ts
function default(): Element | null;
```

#### Returns

`Element` \| `null`
# components/actions/customer-relations/contacts/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/contacts/update

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/contacts/create

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/contacts/form

## Type Aliases

### ContactsFormProps

```ts
type ContactsFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### ContactsForm()

```ts
const ContactsForm: (props: PropsWithChildren<NoInfer<ContactsFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`ContactsFormProps`](#contactsformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateContactsFormOption()

```ts
function CreateContactsFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     name: string;
     email: string;
     phoneNumber?: string;
     jobTitle?: string;
     company?: string;
     owner: string;
     attachments?: File[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: Partial<{
     name: string;
     email: string;
     phoneNumber?: string;
     jobTitle?: string;
     company?: string;
     owner: string;
     attachments?: File[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  name: string;
  email: string;
  phoneNumber?: string;
  jobTitle?: string;
  company?: string;
  owner: string;
  attachments?: File[];
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>

***

### UpdateContactsFormOption()

```ts
function UpdateContactsFormOption(pocketbase: TypedPocketBase, record?: CustomerRelationsContactsRecord): {
  defaultValues: Partial<{
     name?: string;
     email?: string;
     phoneNumber?: string;
     jobTitle?: string;
     company?: string;
     owner?: string;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`CustomerRelationsContactsRecord`](../../../../lib/pb.types.md#customerrelationscontactsrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     name?: string;
     email?: string;
     phoneNumber?: string;
     jobTitle?: string;
     company?: string;
     owner?: string;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  name?: string;
  email?: string;
  phoneNumber?: string;
  jobTitle?: string;
  company?: string;
  owner?: string;
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>
# components/actions/customer-relations/products/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/products/update

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/products/create

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/products/form

## Type Aliases

### ProductsFormProps

```ts
type ProductsFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### ProductsForm()

```ts
const ProductsForm: (props: PropsWithChildren<NoInfer<ProductsFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`ProductsFormProps`](#productsformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateProductsFormOption()

```ts
function CreateProductsFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     name: string;
     sku: string;
     price: number;
     type: "service" | "good" | "digital" | "subscription";
     description?: unknown;
     attachments?: File[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: Partial<{
     name: string;
     sku: string;
     price: number;
     type: "service" | "good" | "digital" | "subscription";
     description?: unknown;
     attachments?: File[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  name: string;
  sku: string;
  price: number;
  type: "service" | "good" | "digital" | "subscription";
  description?: unknown;
  attachments?: File[];
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>

***

### UpdateProductsFormOption()

```ts
function UpdateProductsFormOption(pocketbase: TypedPocketBase, record?: CustomerRelationsProductsRecord): {
  defaultValues: Partial<{
     name?: string;
     sku?: string;
     price?: number;
     type?: "service" | "good" | "digital" | "subscription";
     description?: unknown;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`CustomerRelationsProductsRecord`](../../../../lib/pb.types.md#customerrelationsproductsrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     name?: string;
     sku?: string;
     price?: number;
     type?: "service" | "good" | "digital" | "subscription";
     description?: unknown;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  name?: string;
  sku?: string;
  price?: number;
  type?: "service" | "good" | "digital" | "subscription";
  description?: unknown;
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>
# components/actions/customer-relations/global

## Variables

### default

```ts
default: (
  | {
  label: string;
  submenu: {
     label: string;
     onSelect: (navigate: UseNavigateResult<"/dashboard/$schema/$collection">) => void;
     icon: (searchQuery: 
        | {
        page: number;
        perPage: number;
        filter?: string;
        sort?: string;
        action?: string;
        id?: string;
      }
       | undefined) => false | Element;
  }[];
  icon?: undefined;
}
  | {
  label: string;
  icon: Element;
  submenu: {
     label: string;
     onSelect: (navigate: UseNavigateResult<"/dashboard/$schema/$collection">) => void;
  }[];
})[];
```
# components/actions/customer-relations/invoices/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/invoices/update

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/invoices/create

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/invoices/form

## Type Aliases

### InvoicesFormProps

```ts
type InvoicesFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### InvoicesForm()

```ts
const InvoicesForm: (props: PropsWithChildren<NoInfer<InvoicesFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`InvoicesFormProps`](#invoicesformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateInvoicesFormOption()

```ts
function CreateInvoicesFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     invoiceNumber: string;
     opportunity: string;
     status?: "cancelled" | "draft" | "sent" | "paid" | "overdue";
     total?: number;
     issueDate: Date;
     dueDate?: Date;
     sentAt?: Date;
     paidAt?: Date;
     paymentMethod?:   | "check"
        | "other"
        | "credit-card"
        | "bank-transfer"
        | "cash"
        | "paypal"
        | "stripe"
        | "wire-transfer"
        | "maya"
        | "gcash";
     attachments?: File[];
     items: {
        product: string;
        quantity: number;
     }[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: Partial<{
     invoiceNumber: string;
     opportunity: string;
     status?: "cancelled" | "draft" | "sent" | "paid" | "overdue";
     total?: number;
     issueDate: Date;
     dueDate?: Date;
     sentAt?: Date;
     paidAt?: Date;
     paymentMethod?:   | "check"
        | "other"
        | "credit-card"
        | "bank-transfer"
        | "cash"
        | "paypal"
        | "stripe"
        | "wire-transfer"
        | "maya"
        | "gcash";
     attachments?: File[];
     items: {
        product: string;
        quantity: number;
     }[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  invoiceNumber: string;
  opportunity: string;
  status?: "cancelled" | "draft" | "sent" | "paid" | "overdue";
  total?: number;
  issueDate: Date;
  dueDate?: Date;
  sentAt?: Date;
  paidAt?: Date;
  paymentMethod?:   | "check"
     | "other"
     | "credit-card"
     | "bank-transfer"
     | "cash"
     | "paypal"
     | "stripe"
     | "wire-transfer"
     | "maya"
     | "gcash";
  attachments?: File[];
  items: {
     product: string;
     quantity: number;
  }[];
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>

***

### UpdateInvoicesFormOption()

```ts
function UpdateInvoicesFormOption(pocketbase: TypedPocketBase, record?: CustomerRelationsInvoicesRecord): {
  defaultValues: Partial<{
     invoiceNumber?: string;
     opportunity?: string;
     status?: "cancelled" | "draft" | "sent" | "paid" | "overdue";
     total?: number;
     issueDate?: Date;
     dueDate?: Date;
     sentAt?: Date;
     paidAt?: Date;
     paymentMethod?:   | "check"
        | "other"
        | "credit-card"
        | "bank-transfer"
        | "cash"
        | "paypal"
        | "stripe"
        | "wire-transfer"
        | "maya"
        | "gcash";
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`CustomerRelationsInvoicesRecord`](../../../../lib/pb.types.md#customerrelationsinvoicesrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     invoiceNumber?: string;
     opportunity?: string;
     status?: "cancelled" | "draft" | "sent" | "paid" | "overdue";
     total?: number;
     issueDate?: Date;
     dueDate?: Date;
     sentAt?: Date;
     paidAt?: Date;
     paymentMethod?:   | "check"
        | "other"
        | "credit-card"
        | "bank-transfer"
        | "cash"
        | "paypal"
        | "stripe"
        | "wire-transfer"
        | "maya"
        | "gcash";
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  invoiceNumber?: string;
  opportunity?: string;
  status?: "cancelled" | "draft" | "sent" | "paid" | "overdue";
  total?: number;
  issueDate?: Date;
  dueDate?: Date;
  sentAt?: Date;
  paidAt?: Date;
  paymentMethod?:   | "check"
     | "other"
     | "credit-card"
     | "bank-transfer"
     | "cash"
     | "paypal"
     | "stripe"
     | "wire-transfer"
     | "maya"
     | "gcash";
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>
# components/actions/customer-relations/cases/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/cases/update

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/cases/create

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/cases/form

## Type Aliases

### CasesFormProps

```ts
type CasesFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### CasesForm()

```ts
const CasesForm: (props: PropsWithChildren<NoInfer<CasesFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`CasesFormProps`](#casesformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateCasesFormOption()

```ts
function CreateCasesFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     caseNumber: string;
     status:   | "new"
        | "in-progress"
        | "waiting-for-customer"
        | "waiting-for-internal"
        | "escalated"
        | "resolved"
        | "closed"
        | "cancelled";
     priority: "critical" | "high" | "medium" | "low";
     type:   | "question"
        | "problem"
        | "complaint"
        | "feature-request"
        | "bug-report"
        | "technical-support";
     owner: string;
     contact?: string;
     description?: unknown;
     attachments?: File[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: Partial<{
     caseNumber: string;
     status:   | "new"
        | "in-progress"
        | "waiting-for-customer"
        | "waiting-for-internal"
        | "escalated"
        | "resolved"
        | "closed"
        | "cancelled";
     priority: "critical" | "high" | "medium" | "low";
     type:   | "question"
        | "problem"
        | "complaint"
        | "feature-request"
        | "bug-report"
        | "technical-support";
     owner: string;
     contact?: string;
     description?: unknown;
     attachments?: File[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  caseNumber: string;
  status:   | "new"
     | "in-progress"
     | "waiting-for-customer"
     | "waiting-for-internal"
     | "escalated"
     | "resolved"
     | "closed"
     | "cancelled";
  priority: "critical" | "high" | "medium" | "low";
  type:   | "question"
     | "problem"
     | "complaint"
     | "feature-request"
     | "bug-report"
     | "technical-support";
  owner: string;
  contact?: string;
  description?: unknown;
  attachments?: File[];
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>

***

### UpdateCasesFormOption()

```ts
function UpdateCasesFormOption(pocketbase: TypedPocketBase, record?: CustomerRelationsCasesRecord): {
  defaultValues: Partial<{
     caseNumber?: string;
     status?:   | "new"
        | "in-progress"
        | "waiting-for-customer"
        | "waiting-for-internal"
        | "escalated"
        | "resolved"
        | "closed"
        | "cancelled";
     priority?: "critical" | "high" | "medium" | "low";
     type?:   | "question"
        | "problem"
        | "complaint"
        | "feature-request"
        | "bug-report"
        | "technical-support";
     owner?: string;
     contact?: string;
     description?: unknown;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`CustomerRelationsCasesRecord`](../../../../lib/pb.types.md#customerrelationscasesrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     caseNumber?: string;
     status?:   | "new"
        | "in-progress"
        | "waiting-for-customer"
        | "waiting-for-internal"
        | "escalated"
        | "resolved"
        | "closed"
        | "cancelled";
     priority?: "critical" | "high" | "medium" | "low";
     type?:   | "question"
        | "problem"
        | "complaint"
        | "feature-request"
        | "bug-report"
        | "technical-support";
     owner?: string;
     contact?: string;
     description?: unknown;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  caseNumber?: string;
  status?:   | "new"
     | "in-progress"
     | "waiting-for-customer"
     | "waiting-for-internal"
     | "escalated"
     | "resolved"
     | "closed"
     | "cancelled";
  priority?: "critical" | "high" | "medium" | "low";
  type?:   | "question"
     | "problem"
     | "complaint"
     | "feature-request"
     | "bug-report"
     | "technical-support";
  owner?: string;
  contact?: string;
  description?: unknown;
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>
# components/actions/customer-relations/export

## Variables

### default

```ts
default: {
  label: string;
  onSelect: (navigate: UseNavigateResult<"/dashboard/$schema/$collection">) => void;
}[];
```

#### Type Declaration

##### label

```ts
label: string = "Export Table Data";
```

##### onSelect()

```ts
onSelect: (navigate: UseNavigateResult<"/dashboard/$schema/$collection">) => void;
```

###### Parameters

###### navigate

`UseNavigateResult`\<`"/dashboard/$schema/$collection"`\>

###### Returns

`void`
# components/actions/customer-relations/products

## Functions

### default()

```ts
function default(): Element | null;
```

#### Returns

`Element` \| `null`
# components/actions/customer-relations/opportunity-products

## Functions

### default()

```ts
function default(): Element | null;
```

#### Returns

`Element` \| `null`
# components/actions/customer-relations/leads

## Functions

### default()

```ts
function default(): Element | null;
```

#### Returns

`Element` \| `null`
# components/actions/customer-relations/sort

## Variables

### default

```ts
default: {
  label: string;
  onSelect: (navigate: UseNavigateResult<"/dashboard/$schema/$collection">) => void;
  icon: (searchQuery: 
     | {
     page: number;
     perPage: number;
     filter?: string;
     sort?: string;
     action?: string;
     id?: string;
   }
    | undefined) => false | Element;
}[];
```

#### Type Declaration

##### label

```ts
label: string = "Oldest to Newest";
```

##### onSelect()

```ts
onSelect: (navigate: UseNavigateResult<"/dashboard/$schema/$collection">) => void;
```

###### Parameters

###### navigate

`UseNavigateResult`\<`"/dashboard/$schema/$collection"`\>

###### Returns

`void`

##### icon()

```ts
icon: (searchQuery: 
  | {
  page: number;
  perPage: number;
  filter?: string;
  sort?: string;
  action?: string;
  id?: string;
}
  | undefined) => false | Element;
```

###### Parameters

###### searchQuery

\{
`page`: `number`;
`perPage`: `number`;
`filter?`: `string`;
`sort?`: `string`;
`action?`: `string`;
`id?`: `string`;
\} | `undefined`

###### Returns

`false` \| `Element`
# components/actions/customer-relations/invoice-items

## Functions

### default()

```ts
function default(): Element | null;
```

#### Returns

`Element` \| `null`
# components/actions/customer-relations/interactions

## Functions

### default()

```ts
function default(): Element | null;
```

#### Returns

`Element` \| `null`
# components/actions/customer-relations/opportunity-products/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/opportunity-products/update

## Variables

### UpdateSchema

```ts
const UpdateSchema: ZodObject<{
  opportunity: ZodOptional<ZodOptional<ZodString>>;
  product: ZodOptional<ZodOptional<ZodString>>;
  quantity: ZodOptional<ZodNumber>;
}, $strip>;
```

## Functions

### default()

```ts
function default(): Element | null;
```

#### Returns

`Element` \| `null`
# components/actions/customer-relations/opportunity-products/create

## Variables

### CreateSchema

```ts
const CreateSchema: ZodObject<{
  opportunity: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  quantity: ZodNumber;
}, $strip>;
```

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/opportunity-products/form

## Type Aliases

### OpportunityProductsProps

```ts
type OpportunityProductsProps = {
  action?: "create" | "edit";
  onRemove?: () => void;
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

##### onRemove()?

```ts
optional onRemove: () => void;
```

###### Returns

`void`

## Variables

### OpportunityProductsForm()

```ts
const OpportunityProductsForm: <TFormData, TFields, TOnMount, TOnChange, TOnChangeAsync, TOnBlur, TOnBlurAsync, TOnSubmit, TOnSubmitAsync, TOnDynamic, TOnDynamicAsync, TOnServer, TFormSubmitMeta>(params: PropsWithChildren<NoInfer<OpportunityProductsProps> & {
}>) => ReactNode;
```

#### Type Parameters

##### TFormData

`TFormData`

##### TFields

`TFields` *extends* 
  \| `string`
  \| \{
  `id`: `DeepKeysOfType`\<`TFormData`, `string`\>;
  `opportunity?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `product?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `quantity`: `DeepKeysOfType`\<`TFormData`, `number`\>;
  `created?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `updated?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
\}

##### TOnMount

`TOnMount` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnChange

`TOnChange` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnChangeAsync

`TOnChangeAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnBlur

`TOnBlur` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnBlurAsync

`TOnBlurAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnSubmit

`TOnSubmit` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnSubmitAsync

`TOnSubmitAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnDynamic

`TOnDynamic` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnDynamicAsync

`TOnDynamicAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnServer

`TOnServer` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TFormSubmitMeta

`TFormSubmitMeta`

#### Parameters

##### params

`PropsWithChildren`\<`NoInfer`\<[`OpportunityProductsProps`](#opportunityproductsprops)\> & \{
\}\>

#### Returns

`ReactNode`
# components/actions/customer-relations/opportunities/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/opportunities/update

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/opportunities/create

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/customer-relations/opportunities/form

## Type Aliases

### OpportunitiesFormProps

```ts
type OpportunitiesFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### OpportunitiesForm()

```ts
const OpportunitiesForm: (props: PropsWithChildren<NoInfer<OpportunitiesFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`OpportunitiesFormProps`](#opportunitiesformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateOpportunitiesFormOption()

```ts
function CreateOpportunitiesFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     name: string;
     stage?:   | "prospecting"
        | "qualification"
        | "need-analysis"
        | "demo"
        | "proposal"
        | "negotiation"
        | "closed-won"
        | "closed-lost";
     dealValue?: number;
     probability?: number;
     expectedCloseDate?: Date;
     lostReason?: string;
     source:   | "website"
        | "other"
        | "referral"
        | "social-media"
        | "email-campaign"
        | "cold-call"
        | "event"
        | "advertisment"
        | "partner"
        | "existing-customer";
     owner: string;
     contact?: string;
     company?: string;
     campaign?: string;
     attachments?: File[];
     products: {
        product?: string;
        quantity: number;
     }[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: Partial<{
     name: string;
     stage?:   | "prospecting"
        | "qualification"
        | "need-analysis"
        | "demo"
        | "proposal"
        | "negotiation"
        | "closed-won"
        | "closed-lost";
     dealValue?: number;
     probability?: number;
     expectedCloseDate?: Date;
     lostReason?: string;
     source:   | "website"
        | "other"
        | "referral"
        | "social-media"
        | "email-campaign"
        | "cold-call"
        | "event"
        | "advertisment"
        | "partner"
        | "existing-customer";
     owner: string;
     contact?: string;
     company?: string;
     campaign?: string;
     attachments?: File[];
     products: {
        product?: string;
        quantity: number;
     }[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  name: string;
  stage?:   | "prospecting"
     | "qualification"
     | "need-analysis"
     | "demo"
     | "proposal"
     | "negotiation"
     | "closed-won"
     | "closed-lost";
  dealValue?: number;
  probability?: number;
  expectedCloseDate?: Date;
  lostReason?: string;
  source:   | "website"
     | "other"
     | "referral"
     | "social-media"
     | "email-campaign"
     | "cold-call"
     | "event"
     | "advertisment"
     | "partner"
     | "existing-customer";
  owner: string;
  contact?: string;
  company?: string;
  campaign?: string;
  attachments?: File[];
  products: {
     product?: string;
     quantity: number;
  }[];
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>

***

### UpdateOpportunitiesFormOption()

```ts
function UpdateOpportunitiesFormOption(pocketbase: TypedPocketBase, record?: CustomerRelationsOpportunitiesRecord): {
  defaultValues: Partial<{
     name?: string;
     stage?:   | "prospecting"
        | "qualification"
        | "need-analysis"
        | "demo"
        | "proposal"
        | "negotiation"
        | "closed-won"
        | "closed-lost";
     dealValue?: number;
     probability?: number;
     expectedCloseDate?: Date;
     lostReason?: string;
     source?:   | "website"
        | "other"
        | "referral"
        | "social-media"
        | "email-campaign"
        | "cold-call"
        | "event"
        | "advertisment"
        | "partner"
        | "existing-customer";
     owner?: string;
     contact?: string;
     company?: string;
     campaign?: string;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`CustomerRelationsOpportunitiesRecord`](../../../../lib/pb.types.md#customerrelationsopportunitiesrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     name?: string;
     stage?:   | "prospecting"
        | "qualification"
        | "need-analysis"
        | "demo"
        | "proposal"
        | "negotiation"
        | "closed-won"
        | "closed-lost";
     dealValue?: number;
     probability?: number;
     expectedCloseDate?: Date;
     lostReason?: string;
     source?:   | "website"
        | "other"
        | "referral"
        | "social-media"
        | "email-campaign"
        | "cold-call"
        | "event"
        | "advertisment"
        | "partner"
        | "existing-customer";
     owner?: string;
     contact?: string;
     company?: string;
     campaign?: string;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  name?: string;
  stage?:   | "prospecting"
     | "qualification"
     | "need-analysis"
     | "demo"
     | "proposal"
     | "negotiation"
     | "closed-won"
     | "closed-lost";
  dealValue?: number;
  probability?: number;
  expectedCloseDate?: Date;
  lostReason?: string;
  source?:   | "website"
     | "other"
     | "referral"
     | "social-media"
     | "email-campaign"
     | "cold-call"
     | "event"
     | "advertisment"
     | "partner"
     | "existing-customer";
  owner?: string;
  contact?: string;
  company?: string;
  campaign?: string;
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>
# components/actions/customer-relations/campaigns

## Functions

### default()

```ts
function default(): Element | undefined;
```

#### Returns

`Element` \| `undefined`
# components/actions/customer-relations/invoices

## Functions

### default()

```ts
function default(): Element | undefined;
```

#### Returns

`Element` \| `undefined`
# components/actions/delivery-management/proof-of-deliveries

## Functions

### default()

```ts
function default(): Element | undefined;
```

#### Returns

`Element` \| `undefined`
# components/actions/delivery-management/proof-of-deliveries/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/delivery-management/proof-of-deliveries/create

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/delivery-management/proof-of-deliveries/form

## Type Aliases

### ProofOfDeliveriesFormProps

```ts
type ProofOfDeliveriesFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### ProofOfDeliveriesForm()

```ts
const ProofOfDeliveriesForm: (props: PropsWithChildren<NoInfer<ProofOfDeliveriesFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`ProofOfDeliveriesFormProps`](#proofofdeliveriesformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateProofOfDeliveriesFormOption()

```ts
function CreateProofOfDeliveriesFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     task: string;
     signatureData?: File;
     recipientName?: string;
     coordinates?: {
        lon: number;
        lat: number;
     };
     attachments?: File[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: Partial<{
     task: string;
     signatureData?: File;
     recipientName?: string;
     coordinates?: {
        lon: number;
        lat: number;
     };
     attachments?: File[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  task: string;
  signatureData?: File;
  recipientName?: string;
  coordinates?: {
     lon: number;
     lat: number;
  };
  attachments?: File[];
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>
# components/actions/delivery-management/tasks/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/delivery-management/tasks/update

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/delivery-management/tasks/create

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/delivery-management/tasks/form

## Type Aliases

### TasksFormProps

```ts
type TasksFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### TasksForm()

```ts
const TasksForm: (props: PropsWithChildren<NoInfer<TasksFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`TasksFormProps`](#tasksformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateTasksFormOption()

```ts
function CreateTasksFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     package: string;
     route: string;
     sequence: number;
     deliveryAddress: string;
     recipientName?: string;
     recipientPhone?: string;
     deliveryInstructions?: string;
     estimatedArrivalTime?: Date;
     actualArrivalTime?: Date;
     deliveryTime?: Date;
     status?:   | "cancelled"
        | "pending"
        | "assigned"
        | "out-for-delivery"
        | "delivered"
        | "failed"
        | "rescheduled";
     attempCount?: number;
     attachments?: File[];
     failureReason?:   | "other"
        | "recipient-not-home"
        | "address-not-found"
        | "refused-delivery"
        | "damaged-package"
        | "access-denied"
        | "weather-conditions"
        | "vehicle-breakdown";
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: Partial<{
     package: string;
     route: string;
     sequence: number;
     deliveryAddress: string;
     recipientName?: string;
     recipientPhone?: string;
     deliveryInstructions?: string;
     estimatedArrivalTime?: Date;
     actualArrivalTime?: Date;
     deliveryTime?: Date;
     status?:   | "cancelled"
        | "pending"
        | "assigned"
        | "out-for-delivery"
        | "delivered"
        | "failed"
        | "rescheduled";
     attempCount?: number;
     attachments?: File[];
     failureReason?:   | "other"
        | "recipient-not-home"
        | "address-not-found"
        | "refused-delivery"
        | "damaged-package"
        | "access-denied"
        | "weather-conditions"
        | "vehicle-breakdown";
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  package: string;
  route: string;
  sequence: number;
  deliveryAddress: string;
  recipientName?: string;
  recipientPhone?: string;
  deliveryInstructions?: string;
  estimatedArrivalTime?: Date;
  actualArrivalTime?: Date;
  deliveryTime?: Date;
  status?:   | "cancelled"
     | "pending"
     | "assigned"
     | "out-for-delivery"
     | "delivered"
     | "failed"
     | "rescheduled";
  attempCount?: number;
  attachments?: File[];
  failureReason?:   | "other"
     | "recipient-not-home"
     | "address-not-found"
     | "refused-delivery"
     | "damaged-package"
     | "access-denied"
     | "weather-conditions"
     | "vehicle-breakdown";
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>

***

### UpdateTasksFormOption()

```ts
function UpdateTasksFormOption(pocketbase: TypedPocketBase, record?: DeliveryManagementTasksRecord): {
  defaultValues: Partial<{
     package?: string;
     route?: string;
     sequence?: number;
     deliveryAddress?: string;
     recipientName?: string;
     recipientPhone?: string;
     deliveryInstructions?: string;
     estimatedArrivalTime?: Date;
     actualArrivalTime?: Date;
     deliveryTime?: Date;
     status?:   | "cancelled"
        | "pending"
        | "assigned"
        | "out-for-delivery"
        | "delivered"
        | "failed"
        | "rescheduled";
     attempCount?: number;
     attachments?: File[];
     failureReason?:   | "other"
        | "recipient-not-home"
        | "address-not-found"
        | "refused-delivery"
        | "damaged-package"
        | "access-denied"
        | "weather-conditions"
        | "vehicle-breakdown";
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`DeliveryManagementTasksRecord`](../../../../lib/pb.types.md#deliverymanagementtasksrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     package?: string;
     route?: string;
     sequence?: number;
     deliveryAddress?: string;
     recipientName?: string;
     recipientPhone?: string;
     deliveryInstructions?: string;
     estimatedArrivalTime?: Date;
     actualArrivalTime?: Date;
     deliveryTime?: Date;
     status?:   | "cancelled"
        | "pending"
        | "assigned"
        | "out-for-delivery"
        | "delivered"
        | "failed"
        | "rescheduled";
     attempCount?: number;
     attachments?: File[];
     failureReason?:   | "other"
        | "recipient-not-home"
        | "address-not-found"
        | "refused-delivery"
        | "damaged-package"
        | "access-denied"
        | "weather-conditions"
        | "vehicle-breakdown";
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  package?: string;
  route?: string;
  sequence?: number;
  deliveryAddress?: string;
  recipientName?: string;
  recipientPhone?: string;
  deliveryInstructions?: string;
  estimatedArrivalTime?: Date;
  actualArrivalTime?: Date;
  deliveryTime?: Date;
  status?:   | "cancelled"
     | "pending"
     | "assigned"
     | "out-for-delivery"
     | "delivered"
     | "failed"
     | "rescheduled";
  attempCount?: number;
  attachments?: File[];
  failureReason?:   | "other"
     | "recipient-not-home"
     | "address-not-found"
     | "refused-delivery"
     | "damaged-package"
     | "access-denied"
     | "weather-conditions"
     | "vehicle-breakdown";
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>
# components/actions/delivery-management/global

## Variables

### default

```ts
default: never[];
```
# components/actions/delivery-management/tasks

## Functions

### default()

```ts
function default(): Element | undefined;
```

#### Returns

`Element` \| `undefined`
# components/actions/delivery-management/driver-location/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/delivery-management/driver-location/update

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/delivery-management/driver-location/create

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/delivery-management/driver-location/form

## Type Aliases

### DriverLocationFormProps

```ts
type DriverLocationFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### DriverLocationForm()

```ts
const DriverLocationForm: (props: PropsWithChildren<NoInfer<DriverLocationFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`DriverLocationFormProps`](#driverlocationformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateDriverLocationFormOption()

```ts
function CreateDriverLocationFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     driver: string;
     coordinates: {
        lon: number;
        lat: number;
     };
     heading: {
        lon: number;
        lat: number;
     };
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: Partial<{
     driver: string;
     coordinates: {
        lon: number;
        lat: number;
     };
     heading: {
        lon: number;
        lat: number;
     };
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  driver: string;
  coordinates: {
     lon: number;
     lat: number;
  };
  heading: {
     lon: number;
     lat: number;
  };
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>

***

### UpdateDriverLocationFormOption()

```ts
function UpdateDriverLocationFormOption(pocketbase: TypedPocketBase, record?: DeliveryManagementDriverLocationRecord): {
  defaultValues: Partial<{
     driver?: string;
     coordinates?: {
        lon: number;
        lat: number;
     };
     heading?: {
        lon: number;
        lat: number;
     };
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`DeliveryManagementDriverLocationRecord`](../../../../lib/pb.types.md#deliverymanagementdriverlocationrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     driver?: string;
     coordinates?: {
        lon: number;
        lat: number;
     };
     heading?: {
        lon: number;
        lat: number;
     };
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  driver?: string;
  coordinates?: {
     lon: number;
     lat: number;
  };
  heading?: {
     lon: number;
     lat: number;
  };
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>
# components/actions/delivery-management/driver-location

## Functions

### default()

```ts
function default(): Element | undefined;
```

#### Returns

`Element` \| `undefined`
# components/actions/warehouse-management/inventory-adjustment/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/inventory-adjustment/update

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/inventory-adjustment/create

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/inventory-adjustment/form

## Type Aliases

### InventoryAdjustmentFormProps

```ts
type InventoryAdjustmentFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### InventoryAdjustmentForm()

```ts
const InventoryAdjustmentForm: (props: PropsWithChildren<NoInfer<InventoryAdjustmentFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`InventoryAdjustmentFormProps`](#inventoryadjustmentformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateInventoryAdjustmentFormOption()

```ts
function CreateInventoryAdjustmentFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     product: string;
     user: string;
     quantityChange: number;
     reason:   | "cycle-count"
        | "damaged-goods"
        | "theft"
        | "expired"
        | "return-to-vendor"
        | "manual-correction";
     notes?: unknown;
     warehouse: string;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: Partial<{
     product: string;
     user: string;
     quantityChange: number;
     reason:   | "cycle-count"
        | "damaged-goods"
        | "theft"
        | "expired"
        | "return-to-vendor"
        | "manual-correction";
     notes?: unknown;
     warehouse: string;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  product: string;
  user: string;
  quantityChange: number;
  reason:   | "cycle-count"
     | "damaged-goods"
     | "theft"
     | "expired"
     | "return-to-vendor"
     | "manual-correction";
  notes?: unknown;
  warehouse: string;
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>

***

### UpdateInventoryAdjustmentFormOption()

```ts
function UpdateInventoryAdjustmentFormOption(pocketbase: TypedPocketBase, record?: WarehouseManagementInventoryAdjustmentRecord): {
  defaultValues: Partial<{
     product?: string;
     user?: string;
     quantityChange?: number;
     reason?:   | "cycle-count"
        | "damaged-goods"
        | "theft"
        | "expired"
        | "return-to-vendor"
        | "manual-correction";
     notes?: unknown;
     warehouse?: string;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementInventoryAdjustmentRecord`](../../../../lib/pb.types.md#warehousemanagementinventoryadjustmentrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     product?: string;
     user?: string;
     quantityChange?: number;
     reason?:   | "cycle-count"
        | "damaged-goods"
        | "theft"
        | "expired"
        | "return-to-vendor"
        | "manual-correction";
     notes?: unknown;
     warehouse?: string;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  product?: string;
  user?: string;
  quantityChange?: number;
  reason?:   | "cycle-count"
     | "damaged-goods"
     | "theft"
     | "expired"
     | "return-to-vendor"
     | "manual-correction";
  notes?: unknown;
  warehouse?: string;
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>
# components/actions/warehouse-management/inbound-shipments/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/inbound-shipments/update

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/inbound-shipments/create

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/inbound-shipments/form

## Type Aliases

### InboundShipmentsFormProps

```ts
type InboundShipmentsFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### InboundShipmentsForm()

```ts
const InboundShipmentsForm: (props: PropsWithChildren<NoInfer<InboundShipmentsFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`InboundShipmentsFormProps`](#inboundshipmentsformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateInboundShipmentsFormOption()

```ts
function CreateInboundShipmentsFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     client: string;
     status?: "cancelled" | "pending" | "arrived" | "processing" | "completed";
     expectedArrivalDate?: Date;
     actualArrivalDate?: Date;
     warehouse: string;
     items: {
        inboundShipment?: string;
        product?: string;
        expectedQuantity: number;
        receivedQuantity?: number;
        discrepancyNotes?: unknown;
     }[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: Partial<{
     client: string;
     status?: "cancelled" | "pending" | "arrived" | "processing" | "completed";
     expectedArrivalDate?: Date;
     actualArrivalDate?: Date;
     warehouse: string;
     items: {
        inboundShipment?: string;
        product?: string;
        expectedQuantity: number;
        receivedQuantity?: number;
        discrepancyNotes?: unknown;
     }[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  client: string;
  status?: "cancelled" | "pending" | "arrived" | "processing" | "completed";
  expectedArrivalDate?: Date;
  actualArrivalDate?: Date;
  warehouse: string;
  items: {
     inboundShipment?: string;
     product?: string;
     expectedQuantity: number;
     receivedQuantity?: number;
     discrepancyNotes?: unknown;
  }[];
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>

***

### UpdateInboundShipmentsFormOption()

```ts
function UpdateInboundShipmentsFormOption(pocketbase: TypedPocketBase, record?: WarehouseManagementInboundShipmentsRecord): {
  defaultValues: Partial<{
     client?: string;
     status?: "cancelled" | "pending" | "arrived" | "processing" | "completed";
     expectedArrivalDate?: Date;
     actualArrivalDate?: Date;
     warehouse?: string;
     items?: {
        inboundShipment?: string;
        product?: string;
        expectedQuantity: number;
        receivedQuantity?: number;
        discrepancyNotes?: unknown;
     }[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementInboundShipmentsRecord`](../../../../lib/pb.types.md#warehousemanagementinboundshipmentsrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     client?: string;
     status?: "cancelled" | "pending" | "arrived" | "processing" | "completed";
     expectedArrivalDate?: Date;
     actualArrivalDate?: Date;
     warehouse?: string;
     items?: {
        inboundShipment?: string;
        product?: string;
        expectedQuantity: number;
        receivedQuantity?: number;
        discrepancyNotes?: unknown;
     }[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  client?: string;
  status?: "cancelled" | "pending" | "arrived" | "processing" | "completed";
  expectedArrivalDate?: Date;
  actualArrivalDate?: Date;
  warehouse?: string;
  items?: {
     inboundShipment?: string;
     product?: string;
     expectedQuantity: number;
     receivedQuantity?: number;
     discrepancyNotes?: unknown;
  }[];
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>
# components/actions/warehouse-management/inbound-shipments

## Functions

### default()

```ts
function default(): Element | undefined;
```

#### Returns

`Element` \| `undefined`
# components/actions/warehouse-management/suppliers

## Functions

### default()

```ts
function default(): Element | undefined;
```

#### Returns

`Element` \| `undefined`
# components/actions/warehouse-management/suppliers/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/suppliers/update

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/suppliers/create

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/suppliers/form

## Type Aliases

### SuppliersFormProps

```ts
type SuppliersFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### SuppliersForm()

```ts
const SuppliersForm: (props: PropsWithChildren<NoInfer<SuppliersFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`SuppliersFormProps`](#suppliersformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateSuppliersFormOption()

```ts
function CreateSuppliersFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     name: string;
     contactPerson?: string;
     email?: string;
     phoneNumber?: string;
     client?: string;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: Partial<{
     name: string;
     contactPerson?: string;
     email?: string;
     phoneNumber?: string;
     client?: string;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  name: string;
  contactPerson?: string;
  email?: string;
  phoneNumber?: string;
  client?: string;
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>

***

### UpdateSuppliersFormOption()

```ts
function UpdateSuppliersFormOption(pocketbase: TypedPocketBase, record?: WarehouseManagementSuppliersRecord): {
  defaultValues: Partial<{
     name?: string;
     contactPerson?: string;
     email?: string;
     phoneNumber?: string;
     client?: string;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementSuppliersRecord`](../../../../lib/pb.types.md#warehousemanagementsuppliersrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     name?: string;
     contactPerson?: string;
     email?: string;
     phoneNumber?: string;
     client?: string;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  name?: string;
  contactPerson?: string;
  email?: string;
  phoneNumber?: string;
  client?: string;
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>
# components/actions/warehouse-management/outbound-shipment-items

## Functions

### default()

```ts
function default(): Element | undefined;
```

#### Returns

`Element` \| `undefined`
# components/actions/warehouse-management/inventory-adjustment

## Functions

### default()

```ts
function default(): Element | undefined;
```

#### Returns

`Element` \| `undefined`
# components/actions/warehouse-management/returns/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/returns/update

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/returns/create

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/returns/form

## Type Aliases

### ReturnsFormProps

```ts
type ReturnsFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### ReturnsForm()

```ts
const ReturnsForm: (props: PropsWithChildren<NoInfer<ReturnsFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`ReturnsFormProps`](#returnsformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateReturnsFormOption()

```ts
function CreateReturnsFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     returnNumber?: string;
     salesOrder?: string;
     client?: string;
     status: "requested" | "approved" | "rejected" | "received" | "processed";
     reason?: unknown;
     items: {
        return: string;
        product: string;
        quantityExpected?: number;
        quantityReceived?: number;
        condition?: "expired" | "damaged" | "sellable" | "defective" | "unsellable";
     }[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: Partial<{
     returnNumber?: string;
     salesOrder?: string;
     client?: string;
     status: "requested" | "approved" | "rejected" | "received" | "processed";
     reason?: unknown;
     items: {
        return: string;
        product: string;
        quantityExpected?: number;
        quantityReceived?: number;
        condition?: "expired" | "damaged" | "sellable" | "defective" | "unsellable";
     }[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  returnNumber?: string;
  salesOrder?: string;
  client?: string;
  status: "requested" | "approved" | "rejected" | "received" | "processed";
  reason?: unknown;
  items: {
     return: string;
     product: string;
     quantityExpected?: number;
     quantityReceived?: number;
     condition?: "expired" | "damaged" | "sellable" | "defective" | "unsellable";
  }[];
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>

***

### UpdateReturnsFormOption()

```ts
function UpdateReturnsFormOption(pocketbase: TypedPocketBase, record?: WarehouseManagementReturnsRecord): {
  defaultValues: Partial<{
     returnNumber?: string;
     salesOrder?: string;
     client?: string;
     status?: "requested" | "approved" | "rejected" | "received" | "processed";
     reason?: unknown;
     items?: string[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementReturnsRecord`](../../../../lib/pb.types.md#warehousemanagementreturnsrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     returnNumber?: string;
     salesOrder?: string;
     client?: string;
     status?: "requested" | "approved" | "rejected" | "received" | "processed";
     reason?: unknown;
     items?: string[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  returnNumber?: string;
  salesOrder?: string;
  client?: string;
  status?: "requested" | "approved" | "rejected" | "received" | "processed";
  reason?: unknown;
  items?: string[];
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>
# components/actions/warehouse-management/products/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/products/update

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/products/create

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/products/form

## Type Aliases

### ProductsFormProps

```ts
type ProductsFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### ProductsForm()

```ts
const ProductsForm: (props: PropsWithChildren<NoInfer<ProductsFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`ProductsFormProps`](#productsformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateProductsFormOption()

```ts
function CreateProductsFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     sku: string;
     name: string;
     barcode?: string;
     description?: string;
     category?: string;
     price?: number;
     unit?: string;
     weight?: number;
     length?: number;
     width?: number;
     height?: number;
     status?: "active" | "discontinued" | "obsolete";
     supplier?: string;
     client?: string;
     images?: string[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: Partial<{
     sku: string;
     name: string;
     barcode?: string;
     description?: string;
     category?: string;
     price?: number;
     unit?: string;
     weight?: number;
     length?: number;
     width?: number;
     height?: number;
     status?: "active" | "discontinued" | "obsolete";
     supplier?: string;
     client?: string;
     images?: string[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  sku: string;
  name: string;
  barcode?: string;
  description?: string;
  category?: string;
  price?: number;
  unit?: string;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  status?: "active" | "discontinued" | "obsolete";
  supplier?: string;
  client?: string;
  images?: string[];
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>

***

### UpdateProductsFormOption()

```ts
function UpdateProductsFormOption(pocketbase: TypedPocketBase, record?: WarehouseManagementProductsRecord): {
  defaultValues: Partial<{
     sku?: string;
     name?: string;
     barcode?: string;
     description?: string;
     category?: string;
     price?: number;
     unit?: string;
     weight?: number;
     length?: number;
     width?: number;
     height?: number;
     status?: "active" | "discontinued" | "obsolete";
     supplier?: string;
     client?: string;
     images?: string[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementProductsRecord`](../../../../lib/pb.types.md#warehousemanagementproductsrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     sku?: string;
     name?: string;
     barcode?: string;
     description?: string;
     category?: string;
     price?: number;
     unit?: string;
     weight?: number;
     length?: number;
     width?: number;
     height?: number;
     status?: "active" | "discontinued" | "obsolete";
     supplier?: string;
     client?: string;
     images?: string[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  sku?: string;
  name?: string;
  barcode?: string;
  description?: string;
  category?: string;
  price?: number;
  unit?: string;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  status?: "active" | "discontinued" | "obsolete";
  supplier?: string;
  client?: string;
  images?: string[];
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>
# components/actions/warehouse-management/inventory-stock/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/inventory-stock/update

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/inventory-stock/create

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/inventory-stock/form

## Type Aliases

### InventoryStockFormProps

```ts
type InventoryStockFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### InventoryStockForm()

```ts
const InventoryStockForm: (props: PropsWithChildren<NoInfer<InventoryStockFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`InventoryStockFormProps`](#inventorystockformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateInventoryStockFormOption()

```ts
function CreateInventoryStockFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     location: string;
     product: string;
     batch?: string;
     quantity?: number;
     reservedQuantity?: number;
     status:   | "available"
        | "expired"
        | "allocated"
        | "damaged"
        | "quarantine"
        | "hold"
        | "shipped";
     lastCountedAt?: Date;
     lastMovementAt?: Date;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: Partial<{
     location: string;
     product: string;
     batch?: string;
     quantity?: number;
     reservedQuantity?: number;
     status:   | "available"
        | "expired"
        | "allocated"
        | "damaged"
        | "quarantine"
        | "hold"
        | "shipped";
     lastCountedAt?: Date;
     lastMovementAt?: Date;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  location: string;
  product: string;
  batch?: string;
  quantity?: number;
  reservedQuantity?: number;
  status:   | "available"
     | "expired"
     | "allocated"
     | "damaged"
     | "quarantine"
     | "hold"
     | "shipped";
  lastCountedAt?: Date;
  lastMovementAt?: Date;
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>

***

### UpdateInventoryStockFormOption()

```ts
function UpdateInventoryStockFormOption(pocketbase: TypedPocketBase, record?: WarehouseManagementInventoryStockRecord): {
  defaultValues: Partial<{
     location?: string;
     product?: string;
     batch?: string;
     quantity?: number;
     reservedQuantity?: number;
     status?:   | "available"
        | "expired"
        | "allocated"
        | "damaged"
        | "quarantine"
        | "hold"
        | "shipped";
     lastCountedAt?: Date;
     lastMovementAt?: Date;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementInventoryStockRecord`](../../../../lib/pb.types.md#warehousemanagementinventorystockrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     location?: string;
     product?: string;
     batch?: string;
     quantity?: number;
     reservedQuantity?: number;
     status?:   | "available"
        | "expired"
        | "allocated"
        | "damaged"
        | "quarantine"
        | "hold"
        | "shipped";
     lastCountedAt?: Date;
     lastMovementAt?: Date;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  location?: string;
  product?: string;
  batch?: string;
  quantity?: number;
  reservedQuantity?: number;
  status?:   | "available"
     | "expired"
     | "allocated"
     | "damaged"
     | "quarantine"
     | "hold"
     | "shipped";
  lastCountedAt?: Date;
  lastMovementAt?: Date;
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>
# components/actions/warehouse-management/global

## Variables

### default

```ts
default: never[];
```
# components/actions/warehouse-management/inventory-batches/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/inventory-batches/update

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/inventory-batches/create

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/inventory-batches/form

## Type Aliases

### InventoryBatchesFormProps

```ts
type InventoryBatchesFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### InventoryBatchesForm()

```ts
const InventoryBatchesForm: (props: PropsWithChildren<NoInfer<InventoryBatchesFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`InventoryBatchesFormProps`](#inventorybatchesformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateInventoryBatchesFormOption()

```ts
function CreateInventoryBatchesFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     product: string;
     batchNumber: string;
     expirationDate?: Date;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: Partial<{
     product: string;
     batchNumber: string;
     expirationDate?: Date;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  product: string;
  batchNumber: string;
  expirationDate?: Date;
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>

***

### UpdateInventoryBatchesFormOption()

```ts
function UpdateInventoryBatchesFormOption(pocketbase: TypedPocketBase, record?: WarehouseManagementInventoryBatchesRecord): {
  defaultValues: Partial<{
     product?: string;
     batchNumber?: string;
     expirationDate?: Date;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementInventoryBatchesRecord`](../../../../lib/pb.types.md#warehousemanagementinventorybatchesrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     product?: string;
     batchNumber?: string;
     expirationDate?: Date;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  product?: string;
  batchNumber?: string;
  expirationDate?: Date;
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>
# components/actions/warehouse-management/packages/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/packages/update

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/packages/create

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/packages/form

## Type Aliases

### PackagesFormProps

```ts
type PackagesFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### PackagesForm()

```ts
const PackagesForm: (props: PropsWithChildren<NoInfer<PackagesFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`PackagesFormProps`](#packagesformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreatePackagesFormOption()

```ts
function CreatePackagesFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     salesOrder: string;
     packageNumber: string;
     warehouse: string;
     type?: string;
     weight?: number;
     length?: number;
     width?: number;
     height?: number;
     packedByUser?: string;
     packedAt?: Date;
     shippedAt?: Date;
     isFragile?: unknown;
     isHazmat?: unknown;
     requireSignature?: unknown;
     insuranceValue?: number;
     images?: File[];
     items: {
        package: string;
        product: string;
        batch?: string;
        quantity: number;
        lotNumber?: string;
        expiryDate?: Date;
     }[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: Partial<{
     salesOrder: string;
     packageNumber: string;
     warehouse: string;
     type?: string;
     weight?: number;
     length?: number;
     width?: number;
     height?: number;
     packedByUser?: string;
     packedAt?: Date;
     shippedAt?: Date;
     isFragile?: unknown;
     isHazmat?: unknown;
     requireSignature?: unknown;
     insuranceValue?: number;
     images?: File[];
     items: {
        package: string;
        product: string;
        batch?: string;
        quantity: number;
        lotNumber?: string;
        expiryDate?: Date;
     }[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  salesOrder: string;
  packageNumber: string;
  warehouse: string;
  type?: string;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  packedByUser?: string;
  packedAt?: Date;
  shippedAt?: Date;
  isFragile?: unknown;
  isHazmat?: unknown;
  requireSignature?: unknown;
  insuranceValue?: number;
  images?: File[];
  items: {
     package: string;
     product: string;
     batch?: string;
     quantity: number;
     lotNumber?: string;
     expiryDate?: Date;
  }[];
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>

***

### UpdatePackagesFormOption()

```ts
function UpdatePackagesFormOption(pocketbase: TypedPocketBase, record?: WarehouseManagementPackagesRecord): {
  defaultValues: Partial<{
     salesOrder?: string;
     packageNumber?: string;
     warehouse?: string;
     type?: string;
     weight?: number;
     length?: number;
     width?: number;
     height?: number;
     packedByUser?: string;
     packedAt?: Date;
     shippedAt?: Date;
     isFragile?: unknown;
     isHazmat?: unknown;
     requireSignature?: unknown;
     insuranceValue?: number;
     images?: File[];
     items?: string[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementPackagesRecord`](../../../../lib/pb.types.md#warehousemanagementpackagesrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     salesOrder?: string;
     packageNumber?: string;
     warehouse?: string;
     type?: string;
     weight?: number;
     length?: number;
     width?: number;
     height?: number;
     packedByUser?: string;
     packedAt?: Date;
     shippedAt?: Date;
     isFragile?: unknown;
     isHazmat?: unknown;
     requireSignature?: unknown;
     insuranceValue?: number;
     images?: File[];
     items?: string[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  salesOrder?: string;
  packageNumber?: string;
  warehouse?: string;
  type?: string;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  packedByUser?: string;
  packedAt?: Date;
  shippedAt?: Date;
  isFragile?: unknown;
  isHazmat?: unknown;
  requireSignature?: unknown;
  insuranceValue?: number;
  images?: File[];
  items?: string[];
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>
# components/actions/warehouse-management/products

## Functions

### default()

```ts
function default(): Element | undefined;
```

#### Returns

`Element` \| `undefined`
# components/actions/warehouse-management/locations/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/locations/update

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/locations/create

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/locations/form

## Type Aliases

### LocationsFormProps

```ts
type LocationsFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### LocationsForm()

```ts
const LocationsForm: (props: PropsWithChildren<NoInfer<LocationsFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`LocationsFormProps`](#locationsformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateLocationsFormOption()

```ts
function CreateLocationsFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     warehouse?: string;
     name: string;
     barcode?: string;
     type?:   | "damaged-goods"
        | "receiving-dock"
        | "pick-bin"
        | "packing-station"
        | "cross-dock-area"
        | "bulk-storage"
        | "reserve-storage"
        | "staging-area"
        | "quality-control"
        | "returns-area";
     level?: number;
     maxWeight?: number;
     maxVolume?: number;
     maxPallets?: number;
     isPickable?: unknown;
     isReceivable?: unknown;
     temperatureControlled?: unknown;
     hazmatApproved?: unknown;
     isActive?: unknown;
     parentLocation?: string;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: Partial<{
     warehouse?: string;
     name: string;
     barcode?: string;
     type?:   | "damaged-goods"
        | "receiving-dock"
        | "pick-bin"
        | "packing-station"
        | "cross-dock-area"
        | "bulk-storage"
        | "reserve-storage"
        | "staging-area"
        | "quality-control"
        | "returns-area";
     level?: number;
     maxWeight?: number;
     maxVolume?: number;
     maxPallets?: number;
     isPickable?: unknown;
     isReceivable?: unknown;
     temperatureControlled?: unknown;
     hazmatApproved?: unknown;
     isActive?: unknown;
     parentLocation?: string;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  warehouse?: string;
  name: string;
  barcode?: string;
  type?:   | "damaged-goods"
     | "receiving-dock"
     | "pick-bin"
     | "packing-station"
     | "cross-dock-area"
     | "bulk-storage"
     | "reserve-storage"
     | "staging-area"
     | "quality-control"
     | "returns-area";
  level?: number;
  maxWeight?: number;
  maxVolume?: number;
  maxPallets?: number;
  isPickable?: unknown;
  isReceivable?: unknown;
  temperatureControlled?: unknown;
  hazmatApproved?: unknown;
  isActive?: unknown;
  parentLocation?: string;
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>

***

### UpdateLocationsFormOption()

```ts
function UpdateLocationsFormOption(pocketbase: TypedPocketBase, record?: WarehouseManagementLocationsRecord): {
  defaultValues: Partial<{
     warehouse?: string;
     name?: string;
     barcode?: string;
     type?:   | "damaged-goods"
        | "receiving-dock"
        | "pick-bin"
        | "packing-station"
        | "cross-dock-area"
        | "bulk-storage"
        | "reserve-storage"
        | "staging-area"
        | "quality-control"
        | "returns-area";
     level?: number;
     maxWeight?: number;
     maxVolume?: number;
     maxPallets?: number;
     isPickable?: unknown;
     isReceivable?: unknown;
     temperatureControlled?: unknown;
     hazmatApproved?: unknown;
     isActive?: unknown;
     parentLocation?: string;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementLocationsRecord`](../../../../lib/pb.types.md#warehousemanagementlocationsrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     warehouse?: string;
     name?: string;
     barcode?: string;
     type?:   | "damaged-goods"
        | "receiving-dock"
        | "pick-bin"
        | "packing-station"
        | "cross-dock-area"
        | "bulk-storage"
        | "reserve-storage"
        | "staging-area"
        | "quality-control"
        | "returns-area";
     level?: number;
     maxWeight?: number;
     maxVolume?: number;
     maxPallets?: number;
     isPickable?: unknown;
     isReceivable?: unknown;
     temperatureControlled?: unknown;
     hazmatApproved?: unknown;
     isActive?: unknown;
     parentLocation?: string;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  warehouse?: string;
  name?: string;
  barcode?: string;
  type?:   | "damaged-goods"
     | "receiving-dock"
     | "pick-bin"
     | "packing-station"
     | "cross-dock-area"
     | "bulk-storage"
     | "reserve-storage"
     | "staging-area"
     | "quality-control"
     | "returns-area";
  level?: number;
  maxWeight?: number;
  maxVolume?: number;
  maxPallets?: number;
  isPickable?: unknown;
  isReceivable?: unknown;
  temperatureControlled?: unknown;
  hazmatApproved?: unknown;
  isActive?: unknown;
  parentLocation?: string;
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>
# components/actions/warehouse-management/package-items/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/package-items/update

## Variables

### UpdateSchema

```ts
const UpdateSchema: ZodObject<{
  package: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  batch: ZodOptional<ZodOptional<ZodString>>;
  quantity: ZodOptional<ZodNumber>;
  lotNumber: ZodOptional<ZodOptional<ZodString>>;
  expiryDate: ZodOptional<ZodOptional<ZodDate>>;
}, $strip>;
```

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/package-items/create

## Variables

### CreateSchema

```ts
const CreateSchema: ZodObject<{
  package: ZodString;
  product: ZodString;
  batch: ZodOptional<ZodString>;
  quantity: ZodNumber;
  lotNumber: ZodOptional<ZodString>;
  expiryDate: ZodOptional<ZodDate>;
}, $strip>;
```

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/package-items/form

## Type Aliases

### PackageItemsFormProps

```ts
type PackageItemsFormProps = {
  action?: "create" | "edit";
  onRemove?: () => void;
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

##### onRemove()?

```ts
optional onRemove: () => void;
```

###### Returns

`void`

## Variables

### PackageItemsForm()

```ts
const PackageItemsForm: <TFormData, TFields, TOnMount, TOnChange, TOnChangeAsync, TOnBlur, TOnBlurAsync, TOnSubmit, TOnSubmitAsync, TOnDynamic, TOnDynamicAsync, TOnServer, TFormSubmitMeta>(params: PropsWithChildren<NoInfer<PackageItemsFormProps> & {
}>) => ReactNode;
```

#### Type Parameters

##### TFormData

`TFormData`

##### TFields

`TFields` *extends* 
  \| `string`
  \| \{
  `package?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `product?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `batch?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `quantity?`: `DeepKeysOfType`\<`TFormData`, `number` \| `undefined`\>;
  `lotNumber?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `expiryDate?`: `DeepKeysOfType`\<`TFormData`, `Date` \| `undefined`\>;
\}

##### TOnMount

`TOnMount` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnChange

`TOnChange` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnChangeAsync

`TOnChangeAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnBlur

`TOnBlur` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnBlurAsync

`TOnBlurAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnSubmit

`TOnSubmit` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnSubmitAsync

`TOnSubmitAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnDynamic

`TOnDynamic` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnDynamicAsync

`TOnDynamicAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnServer

`TOnServer` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TFormSubmitMeta

`TFormSubmitMeta`

#### Parameters

##### params

`PropsWithChildren`\<`NoInfer`\<[`PackageItemsFormProps`](#packageitemsformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreatePackageItemsFormOptions()

```ts
function CreatePackageItemsFormOptions(pocketbase: TypedPocketBase): {
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementPackageItemsResponse<unknown>>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementPackageItemsResponse<unknown>>;
}
```

##### defaultValues

```ts
defaultValues: unknown;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<WarehouseManagementPackageItemsResponse<unknown>>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<[`WarehouseManagementPackageItemsResponse`](../../../../lib/pb.types.md#warehousemanagementpackageitemsresponse)\<`unknown`\>\>

***

### UpdatePackageItemsFormOptions()

```ts
function UpdatePackageItemsFormOptions(pocketbase: TypedPocketBase, record?: WarehouseManagementPackageItemsRecord): {
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementPackageItemsResponse<unknown>>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementPackageItemsRecord`](../../../../lib/pb.types.md#warehousemanagementpackageitemsrecord)

#### Returns

```ts
{
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementPackageItemsResponse<unknown>>;
}
```

##### defaultValues

```ts
defaultValues: unknown;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<WarehouseManagementPackageItemsResponse<unknown>>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<[`WarehouseManagementPackageItemsResponse`](../../../../lib/pb.types.md#warehousemanagementpackageitemsresponse)\<`unknown`\>\>
# components/actions/warehouse-management/outbound-shipments/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/outbound-shipments/update

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/outbound-shipments/create

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/outbound-shipments/form

## Type Aliases

### OutboundShipmentsFormProps

```ts
type OutboundShipmentsFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### OutboundShipmentsForm()

```ts
const OutboundShipmentsForm: (props: PropsWithChildren<NoInfer<OutboundShipmentsFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`OutboundShipmentsFormProps`](#outboundshipmentsformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateOutboundShipmentsFormOption()

```ts
function CreateOutboundShipmentsFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     salesOrder: string;
     status?: "cancelled" | "delivered" | "shipped" | "picking" | "packed";
     trackingNumber: string;
     carrier?: string;
     warehouse: string;
     items: {
        outboundShipment: string;
        salesOrderItem: string;
        product: string;
        batch?: string;
        quantityShipped: number;
     }[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: Partial<{
     salesOrder: string;
     status?: "cancelled" | "delivered" | "shipped" | "picking" | "packed";
     trackingNumber: string;
     carrier?: string;
     warehouse: string;
     items: {
        outboundShipment: string;
        salesOrderItem: string;
        product: string;
        batch?: string;
        quantityShipped: number;
     }[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  salesOrder: string;
  status?: "cancelled" | "delivered" | "shipped" | "picking" | "packed";
  trackingNumber: string;
  carrier?: string;
  warehouse: string;
  items: {
     outboundShipment: string;
     salesOrderItem: string;
     product: string;
     batch?: string;
     quantityShipped: number;
  }[];
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>

***

### UpdateOutboundShipmentsFormOption()

```ts
function UpdateOutboundShipmentsFormOption(pocketbase: TypedPocketBase, record?: WarehouseManagementOutboundShipmentsRecord): {
  defaultValues: Partial<{
     salesOrder?: string;
     status?: "cancelled" | "delivered" | "shipped" | "picking" | "packed";
     trackingNumber?: string;
     carrier?: string;
     warehouse?: string;
     items?: string[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementOutboundShipmentsRecord`](../../../../lib/pb.types.md#warehousemanagementoutboundshipmentsrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     salesOrder?: string;
     status?: "cancelled" | "delivered" | "shipped" | "picking" | "packed";
     trackingNumber?: string;
     carrier?: string;
     warehouse?: string;
     items?: string[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  salesOrder?: string;
  status?: "cancelled" | "delivered" | "shipped" | "picking" | "packed";
  trackingNumber?: string;
  carrier?: string;
  warehouse?: string;
  items?: string[];
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>
# components/actions/warehouse-management/sales-orders/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/sales-orders/update

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/sales-orders/create

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/sales-orders/form

## Type Aliases

### SalesOrdersFormProps

```ts
type SalesOrdersFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### SalesOrdersForm()

```ts
const SalesOrdersForm: (props: PropsWithChildren<NoInfer<SalesOrdersFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`SalesOrdersFormProps`](#salesordersformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateSalesOrdersFormOption()

```ts
function CreateSalesOrdersFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     shippingAddress?: string;
     client: string;
     opportunity?: string;
     status: "cancelled" | "pending" | "processing" | "completed" | "shipped";
     orderNumber: string;
     items: {
        salesOrder?: string;
        product?: string;
        quantityOrdered: number;
     }[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: Partial<{
     shippingAddress?: string;
     client: string;
     opportunity?: string;
     status: "cancelled" | "pending" | "processing" | "completed" | "shipped";
     orderNumber: string;
     items: {
        salesOrder?: string;
        product?: string;
        quantityOrdered: number;
     }[];
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  shippingAddress?: string;
  client: string;
  opportunity?: string;
  status: "cancelled" | "pending" | "processing" | "completed" | "shipped";
  orderNumber: string;
  items: {
     salesOrder?: string;
     product?: string;
     quantityOrdered: number;
  }[];
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>

***

### UpdateSalesOrdersFormOption()

```ts
function UpdateSalesOrdersFormOption(pocketbase: TypedPocketBase, record?: WarehouseManagementSalesOrdersRecord): {
  defaultValues: Partial<{
     shippingAddress?: string;
     client?: string;
     opportunity?: string;
     status?: "cancelled" | "pending" | "processing" | "completed" | "shipped";
     orderNumber?: string;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementSalesOrdersRecord`](../../../../lib/pb.types.md#warehousemanagementsalesordersrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     shippingAddress?: string;
     client?: string;
     opportunity?: string;
     status?: "cancelled" | "pending" | "processing" | "completed" | "shipped";
     orderNumber?: string;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  shippingAddress?: string;
  client?: string;
  opportunity?: string;
  status?: "cancelled" | "pending" | "processing" | "completed" | "shipped";
  orderNumber?: string;
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>
# components/actions/warehouse-management/outbound-shipments

## Functions

### default()

```ts
function default(): Element | undefined;
```

#### Returns

`Element` \| `undefined`
# components/actions/warehouse-management/returns

## Functions

### default()

```ts
function default(): Element | undefined;
```

#### Returns

`Element` \| `undefined`
# components/actions/warehouse-management/locations

## Functions

### default()

```ts
function default(): Element | undefined;
```

#### Returns

`Element` \| `undefined`
# components/actions/warehouse-management/warehouses

## Functions

### default()

```ts
function default(): Element | undefined;
```

#### Returns

`Element` \| `undefined`
# components/actions/warehouse-management/inbound-shipment-items/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/inbound-shipment-items/update

## Variables

### UpdateSchema

```ts
const UpdateSchema: ZodObject<{
  inboundShipment: ZodOptional<ZodOptional<ZodString>>;
  product: ZodOptional<ZodOptional<ZodString>>;
  expectedQuantity: ZodOptional<ZodNumber>;
  receivedQuantity: ZodOptional<ZodOptional<ZodNumber>>;
  discrepancyNotes: ZodOptional<ZodOptional<ZodUnknown>>;
}, $strip>;
```

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/inbound-shipment-items/create

## Variables

### CreateSchema

```ts
const CreateSchema: ZodObject<{
  inboundShipment: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  expectedQuantity: ZodNumber;
  receivedQuantity: ZodOptional<ZodNumber>;
  discrepancyNotes: ZodOptional<ZodUnknown>;
}, $strip>;
```

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/inbound-shipment-items/form

## Type Aliases

### InboundShipmentItemsFormProps

```ts
type InboundShipmentItemsFormProps = {
  action?: "create" | "edit";
  onRemove?: () => void;
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

##### onRemove()?

```ts
optional onRemove: () => void;
```

###### Returns

`void`

## Variables

### InboundShipmentItemsForm()

```ts
const InboundShipmentItemsForm: <TFormData, TFields, TOnMount, TOnChange, TOnChangeAsync, TOnBlur, TOnBlurAsync, TOnSubmit, TOnSubmitAsync, TOnDynamic, TOnDynamicAsync, TOnServer, TFormSubmitMeta>(params: PropsWithChildren<NoInfer<InboundShipmentItemsFormProps> & {
}>) => ReactNode;
```

#### Type Parameters

##### TFormData

`TFormData`

##### TFields

`TFields` *extends* 
  \| `string`
  \| \{
  `inboundShipment?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `product?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `expectedQuantity?`: `DeepKeysOfType`\<`TFormData`, `number` \| `undefined`\>;
  `receivedQuantity?`: `DeepKeysOfType`\<`TFormData`, `number` \| `undefined`\>;
  `discrepancyNotes?`: `DeepKeysOfType`\<`TFormData`, `unknown`\>;
\}

##### TOnMount

`TOnMount` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnChange

`TOnChange` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnChangeAsync

`TOnChangeAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnBlur

`TOnBlur` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnBlurAsync

`TOnBlurAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnSubmit

`TOnSubmit` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnSubmitAsync

`TOnSubmitAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnDynamic

`TOnDynamic` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnDynamicAsync

`TOnDynamicAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnServer

`TOnServer` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TFormSubmitMeta

`TFormSubmitMeta`

#### Parameters

##### params

`PropsWithChildren`\<`NoInfer`\<[`InboundShipmentItemsFormProps`](#inboundshipmentitemsformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateInboundShipmentItemsFormOptions()

```ts
function CreateInboundShipmentItemsFormOptions(pocketbase: TypedPocketBase): {
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementInboundShipmentItemsResponse<unknown>>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementInboundShipmentItemsResponse<unknown>>;
}
```

##### defaultValues

```ts
defaultValues: unknown;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<WarehouseManagementInboundShipmentItemsResponse<unknown>>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<[`WarehouseManagementInboundShipmentItemsResponse`](../../../../lib/pb.types.md#warehousemanagementinboundshipmentitemsresponse)\<`unknown`\>\>

***

### UpdateInboundShipmentItemsFormOptions()

```ts
function UpdateInboundShipmentItemsFormOptions(pocketbase: TypedPocketBase, record?: WarehouseManagementInboundShipmentItemsRecord): {
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementInboundShipmentItemsResponse<unknown>>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementInboundShipmentItemsRecord`](../../../../lib/pb.types.md#warehousemanagementinboundshipmentitemsrecord)

#### Returns

```ts
{
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementInboundShipmentItemsResponse<unknown>>;
}
```

##### defaultValues

```ts
defaultValues: unknown;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<WarehouseManagementInboundShipmentItemsResponse<unknown>>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<[`WarehouseManagementInboundShipmentItemsResponse`](../../../../lib/pb.types.md#warehousemanagementinboundshipmentitemsresponse)\<`unknown`\>\>
# components/actions/warehouse-management/sales-order-items/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/sales-order-items/update

## Variables

### UpdateSchema

```ts
const UpdateSchema: ZodObject<{
  salesOrder: ZodOptional<ZodOptional<ZodString>>;
  product: ZodOptional<ZodOptional<ZodString>>;
  quantityOrdered: ZodOptional<ZodNumber>;
}, $strip>;
```

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/sales-order-items/create

## Variables

### CreateSchema

```ts
const CreateSchema: ZodObject<{
  salesOrder: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  quantityOrdered: ZodNumber;
}, $strip>;
```

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/sales-order-items/form

## Type Aliases

### SalesOrderItemsFormProps

```ts
type SalesOrderItemsFormProps = {
  action?: "create" | "edit";
  onRemove?: () => void;
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

##### onRemove()?

```ts
optional onRemove: () => void;
```

###### Returns

`void`

## Variables

### SalesOrderItemsForm()

```ts
const SalesOrderItemsForm: <TFormData, TFields, TOnMount, TOnChange, TOnChangeAsync, TOnBlur, TOnBlurAsync, TOnSubmit, TOnSubmitAsync, TOnDynamic, TOnDynamicAsync, TOnServer, TFormSubmitMeta>(params: PropsWithChildren<NoInfer<SalesOrderItemsFormProps> & {
}>) => ReactNode;
```

#### Type Parameters

##### TFormData

`TFormData`

##### TFields

`TFields` *extends* 
  \| `string`
  \| \{
  `salesOrder?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `product?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `quantityOrdered?`: `DeepKeysOfType`\<`TFormData`, `number` \| `undefined`\>;
\}

##### TOnMount

`TOnMount` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnChange

`TOnChange` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnChangeAsync

`TOnChangeAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnBlur

`TOnBlur` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnBlurAsync

`TOnBlurAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnSubmit

`TOnSubmit` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnSubmitAsync

`TOnSubmitAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnDynamic

`TOnDynamic` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnDynamicAsync

`TOnDynamicAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnServer

`TOnServer` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TFormSubmitMeta

`TFormSubmitMeta`

#### Parameters

##### params

`PropsWithChildren`\<`NoInfer`\<[`SalesOrderItemsFormProps`](#salesorderitemsformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateSalesOrderItemsFormOptions()

```ts
function CreateSalesOrderItemsFormOptions(pocketbase: TypedPocketBase): {
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementSalesOrderItemsResponse<unknown>>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementSalesOrderItemsResponse<unknown>>;
}
```

##### defaultValues

```ts
defaultValues: unknown;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<WarehouseManagementSalesOrderItemsResponse<unknown>>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<[`WarehouseManagementSalesOrderItemsResponse`](../../../../lib/pb.types.md#warehousemanagementsalesorderitemsresponse)\<`unknown`\>\>

***

### UpdateSalesOrderItemsFormOptions()

```ts
function UpdateSalesOrderItemsFormOptions(pocketbase: TypedPocketBase, record?: WarehouseManagementSalesOrderItemsRecord): {
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementSalesOrderItemsResponse<unknown>>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementSalesOrderItemsRecord`](../../../../lib/pb.types.md#warehousemanagementsalesorderitemsrecord)

#### Returns

```ts
{
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementSalesOrderItemsResponse<unknown>>;
}
```

##### defaultValues

```ts
defaultValues: unknown;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<WarehouseManagementSalesOrderItemsResponse<unknown>>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<[`WarehouseManagementSalesOrderItemsResponse`](../../../../lib/pb.types.md#warehousemanagementsalesorderitemsresponse)\<`unknown`\>\>
# components/actions/warehouse-management/outbound-shipment-items/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/outbound-shipment-items/update

## Variables

### UpdateSchema

```ts
const UpdateSchema: ZodObject<{
  outboundShipment: ZodOptional<ZodString>;
  salesOrderItem: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  batch: ZodOptional<ZodOptional<ZodString>>;
  quantityShipped: ZodOptional<ZodNumber>;
}, $strip>;
```

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/outbound-shipment-items/create

## Variables

### CreateSchema

```ts
const CreateSchema: ZodObject<{
  outboundShipment: ZodString;
  salesOrderItem: ZodString;
  product: ZodString;
  batch: ZodOptional<ZodString>;
  quantityShipped: ZodNumber;
}, $strip>;
```

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/outbound-shipment-items/form

## Type Aliases

### OutboundShipmentItemsFormProps

```ts
type OutboundShipmentItemsFormProps = {
  action?: "create" | "edit";
  onRemove?: () => void;
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

##### onRemove()?

```ts
optional onRemove: () => void;
```

###### Returns

`void`

## Variables

### OutboundShipmentItemsForm()

```ts
const OutboundShipmentItemsForm: <TFormData, TFields, TOnMount, TOnChange, TOnChangeAsync, TOnBlur, TOnBlurAsync, TOnSubmit, TOnSubmitAsync, TOnDynamic, TOnDynamicAsync, TOnServer, TFormSubmitMeta>(params: PropsWithChildren<NoInfer<OutboundShipmentItemsFormProps> & {
}>) => ReactNode;
```

#### Type Parameters

##### TFormData

`TFormData`

##### TFields

`TFields` *extends* 
  \| `string`
  \| \{
  `outboundShipment?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `salesOrderItem?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `product?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `batch?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `quantityShipped?`: `DeepKeysOfType`\<`TFormData`, `number` \| `undefined`\>;
\}

##### TOnMount

`TOnMount` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnChange

`TOnChange` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnChangeAsync

`TOnChangeAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnBlur

`TOnBlur` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnBlurAsync

`TOnBlurAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnSubmit

`TOnSubmit` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnSubmitAsync

`TOnSubmitAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnDynamic

`TOnDynamic` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnDynamicAsync

`TOnDynamicAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnServer

`TOnServer` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TFormSubmitMeta

`TFormSubmitMeta`

#### Parameters

##### params

`PropsWithChildren`\<`NoInfer`\<[`OutboundShipmentItemsFormProps`](#outboundshipmentitemsformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateOutboundShipmentItemsFormOptions()

```ts
function CreateOutboundShipmentItemsFormOptions(pocketbase: TypedPocketBase): {
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementOutboundShipmentItemsResponse<unknown>>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementOutboundShipmentItemsResponse<unknown>>;
}
```

##### defaultValues

```ts
defaultValues: unknown;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<WarehouseManagementOutboundShipmentItemsResponse<unknown>>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<[`WarehouseManagementOutboundShipmentItemsResponse`](../../../../lib/pb.types.md#warehousemanagementoutboundshipmentitemsresponse)\<`unknown`\>\>

***

### UpdateOutboundShipmentItemsFormOptions()

```ts
function UpdateOutboundShipmentItemsFormOptions(pocketbase: TypedPocketBase, record?: WarehouseManagementOutboundShipmentItemsRecord): {
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementOutboundShipmentItemsResponse<unknown>>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementOutboundShipmentItemsRecord`](../../../../lib/pb.types.md#warehousemanagementoutboundshipmentitemsrecord)

#### Returns

```ts
{
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementOutboundShipmentItemsResponse<unknown>>;
}
```

##### defaultValues

```ts
defaultValues: unknown;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<WarehouseManagementOutboundShipmentItemsResponse<unknown>>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<[`WarehouseManagementOutboundShipmentItemsResponse`](../../../../lib/pb.types.md#warehousemanagementoutboundshipmentitemsresponse)\<`unknown`\>\>
# components/actions/warehouse-management/return-items

## Functions

### default()

```ts
function default(): Element | undefined;
```

#### Returns

`Element` \| `undefined`
# components/actions/warehouse-management/warehouses/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/warehouses/update

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/warehouses/create

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/warehouses/form

## Type Aliases

### WarehousesFormProps

```ts
type WarehousesFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### WarehousesForm()

```ts
const WarehousesForm: (props: PropsWithChildren<NoInfer<WarehousesFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`WarehousesFormProps`](#warehousesformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateWarehousesFormOption()

```ts
function CreateWarehousesFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     name: string;
     address?: string;
     city?: string;
     state?: string;
     postalCode?: string;
     country?: string;
     timezone?: string;
     contactPerson?: string;
     contactEmail?: string;
     contactPhone?: string;
     isActive?: unknown;
     images?: File[];
     location?: unknown;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: Partial<{
     name: string;
     address?: string;
     city?: string;
     state?: string;
     postalCode?: string;
     country?: string;
     timezone?: string;
     contactPerson?: string;
     contactEmail?: string;
     contactPhone?: string;
     isActive?: unknown;
     images?: File[];
     location?: unknown;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  name: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  timezone?: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  isActive?: unknown;
  images?: File[];
  location?: unknown;
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>

***

### UpdateWarehousesFormOption()

```ts
function UpdateWarehousesFormOption(pocketbase: TypedPocketBase, record?: WarehouseManagementWarehousesRecord): {
  defaultValues: Partial<{
     name?: string;
     address?: string;
     city?: string;
     state?: string;
     postalCode?: string;
     country?: string;
     timezone?: string;
     contactPerson?: string;
     contactEmail?: string;
     contactPhone?: string;
     isActive?: unknown;
     images?: File[];
     location?: unknown;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementWarehousesRecord`](../../../../lib/pb.types.md#warehousemanagementwarehousesrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     name?: string;
     address?: string;
     city?: string;
     state?: string;
     postalCode?: string;
     country?: string;
     timezone?: string;
     contactPerson?: string;
     contactEmail?: string;
     contactPhone?: string;
     isActive?: unknown;
     images?: File[];
     location?: unknown;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  timezone?: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  isActive?: unknown;
  images?: File[];
  location?: unknown;
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>
# components/actions/warehouse-management/packages

## Functions

### default()

```ts
function default(): Element | undefined;
```

#### Returns

`Element` \| `undefined`
# components/actions/warehouse-management/inventory-stock

## Functions

### default()

```ts
function default(): Element | undefined;
```

#### Returns

`Element` \| `undefined`
# components/actions/warehouse-management/package-items

## Functions

### default()

```ts
function default(): Element | undefined;
```

#### Returns

`Element` \| `undefined`
# components/actions/warehouse-management/return-items/delete

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/return-items/update

## Variables

### UpdateSchema

```ts
const UpdateSchema: ZodObject<{
  return: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  quantityExpected: ZodOptional<ZodOptional<ZodNumber>>;
  quantityRecevied: any;
  condition: ZodOptional<ZodOptional<ZodEnum<{
     expired: "expired";
     damaged: "damaged";
     sellable: "sellable";
     defective: "defective";
     unsellable: "unsellable";
  }>>>;
}, $strip>;
```

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/return-items/create

## Variables

### CreateSchema

```ts
const CreateSchema: ZodObject<{
  return: ZodString;
  product: ZodString;
  quantityExpected: ZodOptional<ZodNumber>;
  quantityRecevied: any;
  condition: ZodOptional<ZodEnum<{
     expired: "expired";
     damaged: "damaged";
     sellable: "sellable";
     defective: "defective";
     unsellable: "unsellable";
  }>>;
}, $strip>;
```

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
# components/actions/warehouse-management/return-items/form

## Type Aliases

### ReturnItemsFormProps

```ts
type ReturnItemsFormProps = {
  action?: "create" | "edit";
  onRemove?: () => void;
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

##### onRemove()?

```ts
optional onRemove: () => void;
```

###### Returns

`void`

## Variables

### ReturnItemsForm()

```ts
const ReturnItemsForm: <TFormData, TFields, TOnMount, TOnChange, TOnChangeAsync, TOnBlur, TOnBlurAsync, TOnSubmit, TOnSubmitAsync, TOnDynamic, TOnDynamicAsync, TOnServer, TFormSubmitMeta>(params: PropsWithChildren<NoInfer<ReturnItemsFormProps> & {
}>) => ReactNode;
```

#### Type Parameters

##### TFormData

`TFormData`

##### TFields

`TFields` *extends* 
  \| `string`
  \| \{
  `return?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `product?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `quantityExpected?`: `DeepKeysOfType`\<`TFormData`, `number` \| `undefined`\>;
  `quantityReceived?`: `DeepKeysOfType`\<`TFormData`, `number` \| `undefined`\>;
  `condition?`: `DeepKeysOfType`\<`TFormData`, 
     \| `"expired"`
     \| `"damaged"`
     \| `"sellable"`
     \| `"defective"`
     \| `"unsellable"`
    \| `undefined`\>;
\}

##### TOnMount

`TOnMount` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnChange

`TOnChange` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnChangeAsync

`TOnChangeAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnBlur

`TOnBlur` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnBlurAsync

`TOnBlurAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnSubmit

`TOnSubmit` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnSubmitAsync

`TOnSubmitAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnDynamic

`TOnDynamic` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnDynamicAsync

`TOnDynamicAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnServer

`TOnServer` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TFormSubmitMeta

`TFormSubmitMeta`

#### Parameters

##### params

`PropsWithChildren`\<`NoInfer`\<[`ReturnItemsFormProps`](#returnitemsformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateReturnItemsFormOptions()

```ts
function CreateReturnItemsFormOptions(pocketbase: TypedPocketBase): {
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementReturnItemsResponse<unknown>>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementReturnItemsResponse<unknown>>;
}
```

##### defaultValues

```ts
defaultValues: unknown;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<WarehouseManagementReturnItemsResponse<unknown>>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<[`WarehouseManagementReturnItemsResponse`](../../../../lib/pb.types.md#warehousemanagementreturnitemsresponse)\<`unknown`\>\>

***

### UpdateReturnItemsFormOptions()

```ts
function UpdateReturnItemsFormOptions(pocketbase: TypedPocketBase, record?: WarehouseManagementReturnItemsRecord): {
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementReturnItemsResponse<unknown>>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementReturnItemsRecord`](../../../../lib/pb.types.md#warehousemanagementreturnitemsrecord)

#### Returns

```ts
{
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementReturnItemsResponse<unknown>>;
}
```

##### defaultValues

```ts
defaultValues: unknown;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<WarehouseManagementReturnItemsResponse<unknown>>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<[`WarehouseManagementReturnItemsResponse`](../../../../lib/pb.types.md#warehousemanagementreturnitemsresponse)\<`unknown`\>\>
# components/actions/warehouse-management/inventory-batches

## Functions

### default()

```ts
function default(): Element | undefined;
```

#### Returns

`Element` \| `undefined`
# components/actions/warehouse-management/inbound-shipment-items

## Functions

### default()

```ts
function default(): Element | undefined;
```

#### Returns

`Element` \| `undefined`
# components/actions/warehouse-management/sales-order-items

## Functions

### default()

```ts
function default(): Element | undefined;
```

#### Returns

`Element` \| `undefined`
# components/actions/warehouse-management/sales-orders

## Functions

### default()

```ts
function default(): Element | undefined;
```

#### Returns

`Element` \| `undefined`
