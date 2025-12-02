# components/actions/customer-relations/opportunity-products/create

## Variables

### CreateSchema

```ts
const CreateSchema: ZodObject<{
  opportunity: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  quantity: ZodNumber;
}, $strip>;
```

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
