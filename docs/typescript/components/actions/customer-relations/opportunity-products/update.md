# components/actions/customer-relations/opportunity-products/update

## Variables

### UpdateSchema

```ts
const UpdateSchema: ZodObject<{
  opportunity: ZodOptional<ZodOptional<ZodString>>;
  product: ZodOptional<ZodOptional<ZodString>>;
  quantity: ZodOptional<ZodNumber>;
}, $strip>;
```

## Functions

### default()

```ts
function default(): Element | null;
```

#### Returns

`Element` \| `null`
