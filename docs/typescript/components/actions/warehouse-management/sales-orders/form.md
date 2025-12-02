# components/actions/warehouse-management/sales-orders/form

## Type Aliases

### SalesOrdersFormProps

```ts
type SalesOrdersFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### SalesOrdersForm()

```ts
const SalesOrdersForm: (props: PropsWithChildren<NoInfer<SalesOrdersFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`SalesOrdersFormProps`](#salesordersformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateSalesOrdersFormOption()

```ts
function CreateSalesOrdersFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     shippingAddress?: string;
     client: string;
     opportunity?: string;
     status: "cancelled" | "pending" | "processing" | "completed" | "shipped";
     orderNumber: string;
     items: {
        salesOrder?: string;
        product?: string;
        quantityOrdered: number;
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
     shippingAddress?: string;
     client: string;
     opportunity?: string;
     status: "cancelled" | "pending" | "processing" | "completed" | "shipped";
     orderNumber: string;
     items: {
        salesOrder?: string;
        product?: string;
        quantityOrdered: number;
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
  shippingAddress?: string;
  client: string;
  opportunity?: string;
  status: "cancelled" | "pending" | "processing" | "completed" | "shipped";
  orderNumber: string;
  items: {
     salesOrder?: string;
     product?: string;
     quantityOrdered: number;
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

### UpdateSalesOrdersFormOption()

```ts
function UpdateSalesOrdersFormOption(pocketbase: TypedPocketBase, record?: WarehouseManagementSalesOrdersRecord): {
  defaultValues: Partial<{
     shippingAddress?: string;
     client?: string;
     opportunity?: string;
     status?: "cancelled" | "pending" | "processing" | "completed" | "shipped";
     orderNumber?: string;
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

[`WarehouseManagementSalesOrdersRecord`](../../../../lib/pb.types.md#warehousemanagementsalesordersrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     shippingAddress?: string;
     client?: string;
     opportunity?: string;
     status?: "cancelled" | "pending" | "processing" | "completed" | "shipped";
     orderNumber?: string;
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
  shippingAddress?: string;
  client?: string;
  opportunity?: string;
  status?: "cancelled" | "pending" | "processing" | "completed" | "shipped";
  orderNumber?: string;
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
