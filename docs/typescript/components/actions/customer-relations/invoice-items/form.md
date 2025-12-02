# components/actions/customer-relations/invoice-items/form

## Type Aliases

### InvoiceItemsProps

```ts
type InvoiceItemsProps = {
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

### InvoiceItemsForm()

```ts
const InvoiceItemsForm: <TFormData, TFields, TOnMount, TOnChange, TOnChangeAsync, TOnBlur, TOnBlurAsync, TOnSubmit, TOnSubmitAsync, TOnDynamic, TOnDynamicAsync, TOnServer, TFormSubmitMeta>(params: PropsWithChildren<NoInfer<InvoiceItemsProps> & {
}>) => ReactNode;
```

#### Type Parameters

##### TFormData

`TFormData`

##### TFields

`TFields` *extends* 
  \| `string`
  \| \{
  `id`: `DeepKeysOfType`\<`TFormData`, `string`\>;
  `invoice`: `DeepKeysOfType`\<`TFormData`, `string`\>;
  `product`: `DeepKeysOfType`\<`TFormData`, `string`\>;
  `quantity`: `DeepKeysOfType`\<`TFormData`, `number`\>;
  `price`: `DeepKeysOfType`\<`TFormData`, `number`\>;
  `created?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
  `updated?`: `DeepKeysOfType`\<`TFormData`, `string` \| `undefined`\>;
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

`PropsWithChildren`\<`NoInfer`\<[`InvoiceItemsProps`](#invoiceitemsprops)\> & \{
\}\>

#### Returns

`ReactNode`
