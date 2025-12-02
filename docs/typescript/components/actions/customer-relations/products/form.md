# components/actions/customer-relations/products/form

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
     name: string;
     sku: string;
     price: number;
     type: "service" | "good" | "digital" | "subscription";
     description?: unknown;
     attachments?: File[];
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
     sku: string;
     price: number;
     type: "service" | "good" | "digital" | "subscription";
     description?: unknown;
     attachments?: File[];
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
  sku: string;
  price: number;
  type: "service" | "good" | "digital" | "subscription";
  description?: unknown;
  attachments?: File[];
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
function UpdateProductsFormOption(pocketbase: TypedPocketBase, record?: CustomerRelationsProductsRecord): {
  defaultValues: Partial<{
     name?: string;
     sku?: string;
     price?: number;
     type?: "service" | "good" | "digital" | "subscription";
     description?: unknown;
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

[`CustomerRelationsProductsRecord`](../../../../lib/pb.types.md#customerrelationsproductsrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     name?: string;
     sku?: string;
     price?: number;
     type?: "service" | "good" | "digital" | "subscription";
     description?: unknown;
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
  sku?: string;
  price?: number;
  type?: "service" | "good" | "digital" | "subscription";
  description?: unknown;
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
