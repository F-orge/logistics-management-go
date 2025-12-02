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
