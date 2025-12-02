# components/actions/warehouse-management/outbound-shipment-items/form

## Type Aliases

### OutboundShipmentItemsFormProps

```ts
type OutboundShipmentItemsFormProps = {
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

### OutboundShipmentItemsForm()

```ts
const OutboundShipmentItemsForm: <TFormData, TFields, TOnMount, TOnChange, TOnChangeAsync, TOnBlur, TOnBlurAsync, TOnSubmit, TOnSubmitAsync, TOnDynamic, TOnDynamicAsync, TOnServer, TFormSubmitMeta>(params: PropsWithChildren<NoInfer<OutboundShipmentItemsFormProps> & {
}>) => ReactNode;
```

#### Type Parameters

##### TFormData

`TFormData`

##### TFields

`TFields` *extends* 
  \| `string`
  \| \{
  `outboundShipment?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `salesOrderItem?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `product?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `batch?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `quantityShipped?`: `DeepKeysOfType`\<`TFormData`, `number` \| `undefined`\>;
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

`PropsWithChildren`\<`NoInfer`\<[`OutboundShipmentItemsFormProps`](#outboundshipmentitemsformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateOutboundShipmentItemsFormOptions()

```ts
function CreateOutboundShipmentItemsFormOptions(pocketbase: TypedPocketBase): {
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementOutboundShipmentItemsResponse<unknown>>;
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
  }) => Promise<WarehouseManagementOutboundShipmentItemsResponse<unknown>>;
}
```

##### defaultValues

```ts
defaultValues: unknown;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<WarehouseManagementOutboundShipmentItemsResponse<unknown>>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<[`WarehouseManagementOutboundShipmentItemsResponse`](../../../../lib/pb.types.md#warehousemanagementoutboundshipmentitemsresponse)\<`unknown`\>\>

***

### UpdateOutboundShipmentItemsFormOptions()

```ts
function UpdateOutboundShipmentItemsFormOptions(pocketbase: TypedPocketBase, record?: WarehouseManagementOutboundShipmentItemsRecord): {
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementOutboundShipmentItemsResponse<unknown>>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementOutboundShipmentItemsRecord`](../../../../lib/pb.types.md#warehousemanagementoutboundshipmentitemsrecord)

#### Returns

```ts
{
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementOutboundShipmentItemsResponse<unknown>>;
}
```

##### defaultValues

```ts
defaultValues: unknown;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<WarehouseManagementOutboundShipmentItemsResponse<unknown>>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<[`WarehouseManagementOutboundShipmentItemsResponse`](../../../../lib/pb.types.md#warehousemanagementoutboundshipmentitemsresponse)\<`unknown`\>\>
