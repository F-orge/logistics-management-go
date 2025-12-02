# components/actions/warehouse-management/sales-order-items/create

## Variables

### CreateSchema

```ts
const CreateSchema: ZodObject<{
  salesOrder: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  quantityOrdered: ZodNumber;
}, $strip>;
```

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
