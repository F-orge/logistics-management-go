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
