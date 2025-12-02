# components/actions/warehouse-management/sales-order-items/form

## Type Aliases

### SalesOrderItemsFormProps

```ts
type SalesOrderItemsFormProps = {
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

### SalesOrderItemsForm()

```ts
const SalesOrderItemsForm: <TFormData, TFields, TOnMount, TOnChange, TOnChangeAsync, TOnBlur, TOnBlurAsync, TOnSubmit, TOnSubmitAsync, TOnDynamic, TOnDynamicAsync, TOnServer, TFormSubmitMeta>(params: PropsWithChildren<NoInfer<SalesOrderItemsFormProps> & {
}>) => ReactNode;
```

#### Type Parameters

##### TFormData

`TFormData`

##### TFields

`TFields` *extends* 
  \| `string`
  \| \{
  `salesOrder?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `product?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `quantityOrdered?`: `DeepKeysOfType`\<`TFormData`, `number` \| `undefined`\>;
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

`PropsWithChildren`\<`NoInfer`\<[`SalesOrderItemsFormProps`](#salesorderitemsformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateSalesOrderItemsFormOptions()

```ts
function CreateSalesOrderItemsFormOptions(pocketbase: TypedPocketBase): {
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementSalesOrderItemsResponse<unknown>>;
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
  }) => Promise<WarehouseManagementSalesOrderItemsResponse<unknown>>;
}
```

##### defaultValues

```ts
defaultValues: unknown;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<WarehouseManagementSalesOrderItemsResponse<unknown>>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<[`WarehouseManagementSalesOrderItemsResponse`](../../../../lib/pb.types.md#warehousemanagementsalesorderitemsresponse)\<`unknown`\>\>

***

### UpdateSalesOrderItemsFormOptions()

```ts
function UpdateSalesOrderItemsFormOptions(pocketbase: TypedPocketBase, record?: WarehouseManagementSalesOrderItemsRecord): {
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementSalesOrderItemsResponse<unknown>>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementSalesOrderItemsRecord`](../../../../lib/pb.types.md#warehousemanagementsalesorderitemsrecord)

#### Returns

```ts
{
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementSalesOrderItemsResponse<unknown>>;
}
```

##### defaultValues

```ts
defaultValues: unknown;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<WarehouseManagementSalesOrderItemsResponse<unknown>>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<[`WarehouseManagementSalesOrderItemsResponse`](../../../../lib/pb.types.md#warehousemanagementsalesorderitemsresponse)\<`unknown`\>\>
