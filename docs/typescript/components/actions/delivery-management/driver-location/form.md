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
