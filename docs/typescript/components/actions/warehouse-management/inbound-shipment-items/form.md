# components/actions/warehouse-management/inbound-shipment-items/form

## Type Aliases

### InboundShipmentItemsFormProps

```ts
type InboundShipmentItemsFormProps = {
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

### InboundShipmentItemsForm()

```ts
const InboundShipmentItemsForm: <TFormData, TFields, TOnMount, TOnChange, TOnChangeAsync, TOnBlur, TOnBlurAsync, TOnSubmit, TOnSubmitAsync, TOnDynamic, TOnDynamicAsync, TOnServer, TFormSubmitMeta>(params: PropsWithChildren<NoInfer<InboundShipmentItemsFormProps> & {
}>) => ReactNode;
```

#### Type Parameters

##### TFormData

`TFormData`

##### TFields

`TFields` *extends* 
  \| `string`
  \| \{
  `inboundShipment?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `product?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `expectedQuantity?`: `DeepKeysOfType`\<`TFormData`, `number` \| `undefined`\>;
  `receivedQuantity?`: `DeepKeysOfType`\<`TFormData`, `number` \| `undefined`\>;
  `discrepancyNotes?`: `DeepKeysOfType`\<`TFormData`, `unknown`\>;
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

`PropsWithChildren`\<`NoInfer`\<[`InboundShipmentItemsFormProps`](#inboundshipmentitemsformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateInboundShipmentItemsFormOptions()

```ts
function CreateInboundShipmentItemsFormOptions(pocketbase: TypedPocketBase): {
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementInboundShipmentItemsResponse<unknown>>;
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
  }) => Promise<WarehouseManagementInboundShipmentItemsResponse<unknown>>;
}
```

##### defaultValues

```ts
defaultValues: unknown;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<WarehouseManagementInboundShipmentItemsResponse<unknown>>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<[`WarehouseManagementInboundShipmentItemsResponse`](../../../../lib/pb.types.md#warehousemanagementinboundshipmentitemsresponse)\<`unknown`\>\>

***

### UpdateInboundShipmentItemsFormOptions()

```ts
function UpdateInboundShipmentItemsFormOptions(pocketbase: TypedPocketBase, record?: WarehouseManagementInboundShipmentItemsRecord): {
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementInboundShipmentItemsResponse<unknown>>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementInboundShipmentItemsRecord`](../../../../lib/pb.types.md#warehousemanagementinboundshipmentitemsrecord)

#### Returns

```ts
{
  defaultValues: unknown;
  onSubmit: (__namedParameters: {
  }) => Promise<WarehouseManagementInboundShipmentItemsResponse<unknown>>;
}
```

##### defaultValues

```ts
defaultValues: unknown;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<WarehouseManagementInboundShipmentItemsResponse<unknown>>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<[`WarehouseManagementInboundShipmentItemsResponse`](../../../../lib/pb.types.md#warehousemanagementinboundshipmentitemsresponse)\<`unknown`\>\>
