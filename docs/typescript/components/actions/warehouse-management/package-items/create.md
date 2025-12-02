# components/actions/warehouse-management/package-items/create

## Variables

### CreateSchema

```ts
const CreateSchema: ZodObject<{
  package: ZodString;
  product: ZodString;
  batch: ZodOptional<ZodString>;
  quantity: ZodNumber;
  lotNumber: ZodOptional<ZodString>;
  expiryDate: ZodOptional<ZodDate>;
}, $strip>;
```

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
