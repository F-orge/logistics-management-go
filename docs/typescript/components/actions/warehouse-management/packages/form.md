# components/actions/warehouse-management/packages/form

## Type Aliases

### PackagesFormProps

```ts
type PackagesFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### PackagesForm()

```ts
const PackagesForm: (props: PropsWithChildren<NoInfer<PackagesFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`PackagesFormProps`](#packagesformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreatePackagesFormOption()

```ts
function CreatePackagesFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     salesOrder: string;
     packageNumber: string;
     warehouse: string;
     type?: string;
     weight?: number;
     length?: number;
     width?: number;
     height?: number;
     packedByUser?: string;
     packedAt?: Date;
     shippedAt?: Date;
     isFragile?: unknown;
     isHazmat?: unknown;
     requireSignature?: unknown;
     insuranceValue?: number;
     images?: File[];
     items: {
        package: string;
        product: string;
        batch?: string;
        quantity: number;
        lotNumber?: string;
        expiryDate?: Date;
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
     salesOrder: string;
     packageNumber: string;
     warehouse: string;
     type?: string;
     weight?: number;
     length?: number;
     width?: number;
     height?: number;
     packedByUser?: string;
     packedAt?: Date;
     shippedAt?: Date;
     isFragile?: unknown;
     isHazmat?: unknown;
     requireSignature?: unknown;
     insuranceValue?: number;
     images?: File[];
     items: {
        package: string;
        product: string;
        batch?: string;
        quantity: number;
        lotNumber?: string;
        expiryDate?: Date;
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
  salesOrder: string;
  packageNumber: string;
  warehouse: string;
  type?: string;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  packedByUser?: string;
  packedAt?: Date;
  shippedAt?: Date;
  isFragile?: unknown;
  isHazmat?: unknown;
  requireSignature?: unknown;
  insuranceValue?: number;
  images?: File[];
  items: {
     package: string;
     product: string;
     batch?: string;
     quantity: number;
     lotNumber?: string;
     expiryDate?: Date;
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

### UpdatePackagesFormOption()

```ts
function UpdatePackagesFormOption(pocketbase: TypedPocketBase, record?: WarehouseManagementPackagesRecord): {
  defaultValues: Partial<{
     salesOrder?: string;
     packageNumber?: string;
     warehouse?: string;
     type?: string;
     weight?: number;
     length?: number;
     width?: number;
     height?: number;
     packedByUser?: string;
     packedAt?: Date;
     shippedAt?: Date;
     isFragile?: unknown;
     isHazmat?: unknown;
     requireSignature?: unknown;
     insuranceValue?: number;
     images?: File[];
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

[`WarehouseManagementPackagesRecord`](../../../../lib/pb.types.md#warehousemanagementpackagesrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     salesOrder?: string;
     packageNumber?: string;
     warehouse?: string;
     type?: string;
     weight?: number;
     length?: number;
     width?: number;
     height?: number;
     packedByUser?: string;
     packedAt?: Date;
     shippedAt?: Date;
     isFragile?: unknown;
     isHazmat?: unknown;
     requireSignature?: unknown;
     insuranceValue?: number;
     images?: File[];
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
  salesOrder?: string;
  packageNumber?: string;
  warehouse?: string;
  type?: string;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  packedByUser?: string;
  packedAt?: Date;
  shippedAt?: Date;
  isFragile?: unknown;
  isHazmat?: unknown;
  requireSignature?: unknown;
  insuranceValue?: number;
  images?: File[];
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
