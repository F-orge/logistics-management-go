# components/actions/warehouse-management/return-items/form

## Type Aliases

### ReturnItemsFormProps

```ts
type ReturnItemsFormProps = {
  action?: "create" | "edit";
  onRemove?: () => void;
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

##### onRemove()?

```ts
optional onRemove: () => void;
```

###### Returns

`void`

## Variables

### ReturnItemsForm()

```ts
const ReturnItemsForm: <TFormData, TFields, TOnMount, TOnChange, TOnChangeAsync, TOnBlur, TOnBlurAsync, TOnSubmit, TOnSubmitAsync, TOnDynamic, TOnDynamicAsync, TOnServer, TFormSubmitMeta>(params: PropsWithChildren<NoInfer<ReturnItemsFormProps> & {
}>) => ReactNode;
```

#### Type Parameters

##### TFormData

`TFormData`

##### TFields

`TFields` *extends* 
  \| `string`
  \| \{
  `return?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `product?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `quantityExpected?`: `DeepKeysOfType`\<`TFormData`, `number` \| `undefined`\>;
  `quantityReceived?`: `DeepKeysOfType`\<`TFormData`, `number` \| `undefined`\>;
  `condition?`: `DeepKeysOfType`\<`TFormData`, 
     \| `"expired"`
     \| `"damaged"`
     \| `"sellable"`
     \| `"defective"`
     \| `"unsellable"`
    \| `undefined`\>;
\}

##### TOnMount

`TOnMount` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnChange

`TOnChange` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnChangeAsync

`TOnChangeAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnBlur

`TOnBlur` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnBlurAsync

`TOnBlurAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnSubmit

`TOnSubmit` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnSubmitAsync

`TOnSubmitAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnDynamic

`TOnDynamic` *extends* `FormValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnDynamicAsync

`TOnDynamicAsync` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TOnServer

`TOnServer` *extends* `FormAsyncValidateOrFn`\<`TFormData`\> \| `undefined`

##### TFormSubmitMeta

`TFormSubmitMeta`

#### Parameters

##### params

`PropsWithChildren`\<`NoInfer`\<[`ReturnItemsFormProps`](#returnitemsformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateReturnItemsFormOptions()

```ts
function CreateReturnItemsFormOptions(pocketbase: TypedPocketBase): {
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementReturnItemsResponse<unknown>>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementReturnItemsResponse<unknown>>;
}
```

##### defaultValues

```ts
defaultValues: unknown;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<WarehouseManagementReturnItemsResponse<unknown>>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<[`WarehouseManagementReturnItemsResponse`](../../../../lib/pb.types.md#warehousemanagementreturnitemsresponse)\<`unknown`\>\>

***

### UpdateReturnItemsFormOptions()

```ts
function UpdateReturnItemsFormOptions(pocketbase: TypedPocketBase, record?: WarehouseManagementReturnItemsRecord): {
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementReturnItemsResponse<unknown>>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementReturnItemsRecord`](../../../../lib/pb.types.md#warehousemanagementreturnitemsrecord)

#### Returns

```ts
{
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementReturnItemsResponse<unknown>>;
}
```

##### defaultValues

```ts
defaultValues: unknown;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<WarehouseManagementReturnItemsResponse<unknown>>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<[`WarehouseManagementReturnItemsResponse`](../../../../lib/pb.types.md#warehousemanagementreturnitemsresponse)\<`unknown`\>\>
