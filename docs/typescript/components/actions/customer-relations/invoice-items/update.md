# components/actions/customer-relations/invoice-items/update

## Variables

### UpdateSchema

```ts
const UpdateSchema: ZodObject<{
  invoice: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  quantity: ZodOptional<ZodNumber>;
  price: ZodOptional<ZodNumber>;
}, $strip>;
```

## Functions

### default()

```ts
function default(): Element | null;
```

#### Returns

`Element` \| `null`
