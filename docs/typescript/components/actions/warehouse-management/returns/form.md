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
