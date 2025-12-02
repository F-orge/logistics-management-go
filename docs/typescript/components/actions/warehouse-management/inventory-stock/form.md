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
