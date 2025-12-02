# components/actions/warehouse-management/products/form

## Type Aliases

### ProductsFormProps

```ts
type ProductsFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### ProductsForm()

```ts
const ProductsForm: (props: PropsWithChildren<NoInfer<ProductsFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`ProductsFormProps`](#productsformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateProductsFormOption()

```ts
function CreateProductsFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     sku: string;
     name: string;
     barcode?: string;
     description?: string;
     category?: string;
     price?: number;
     unit?: string;
     weight?: number;
     length?: number;
     width?: number;
     height?: number;
     status?: "active" | "discontinued" | "obsolete";
     supplier?: string;
     client?: string;
     images?: string[];
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
     sku: string;
     name: string;
     barcode?: string;
     description?: string;
     category?: string;
     price?: number;
     unit?: string;
     weight?: number;
     length?: number;
     width?: number;
     height?: number;
     status?: "active" | "discontinued" | "obsolete";
     supplier?: string;
     client?: string;
     images?: string[];
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
  sku: string;
  name: string;
  barcode?: string;
  description?: string;
  category?: string;
  price?: number;
  unit?: string;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  status?: "active" | "discontinued" | "obsolete";
  supplier?: string;
  client?: string;
  images?: string[];
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

### UpdateProductsFormOption()

```ts
function UpdateProductsFormOption(pocketbase: TypedPocketBase, record?: WarehouseManagementProductsRecord): {
  defaultValues: Partial<{
     sku?: string;
     name?: string;
     barcode?: string;
     description?: string;
     category?: string;
     price?: number;
     unit?: string;
     weight?: number;
     length?: number;
     width?: number;
     height?: number;
     status?: "active" | "discontinued" | "obsolete";
     supplier?: string;
     client?: string;
     images?: string[];
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

[`WarehouseManagementProductsRecord`](../../../../lib/pb.types.md#warehousemanagementproductsrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     sku?: string;
     name?: string;
     barcode?: string;
     description?: string;
     category?: string;
     price?: number;
     unit?: string;
     weight?: number;
     length?: number;
     width?: number;
     height?: number;
     status?: "active" | "discontinued" | "obsolete";
     supplier?: string;
     client?: string;
     images?: string[];
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
  sku?: string;
  name?: string;
  barcode?: string;
  description?: string;
  category?: string;
  price?: number;
  unit?: string;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  status?: "active" | "discontinued" | "obsolete";
  supplier?: string;
  client?: string;
  images?: string[];
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
