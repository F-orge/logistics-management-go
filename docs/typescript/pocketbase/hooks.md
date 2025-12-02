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
