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
