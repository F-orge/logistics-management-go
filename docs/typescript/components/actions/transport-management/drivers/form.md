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
