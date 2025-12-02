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
