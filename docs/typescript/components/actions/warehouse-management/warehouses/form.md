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
