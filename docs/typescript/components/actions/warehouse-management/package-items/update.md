# components/actions/warehouse-management/package-items/update

## Variables

### UpdateSchema

```ts
const UpdateSchema: ZodObject<{
  package: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  batch: ZodOptional<ZodOptional<ZodString>>;
  quantity: ZodOptional<ZodNumber>;
  lotNumber: ZodOptional<ZodOptional<ZodString>>;
  expiryDate: ZodOptional<ZodOptional<ZodDate>>;
}, $strip>;
```

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
