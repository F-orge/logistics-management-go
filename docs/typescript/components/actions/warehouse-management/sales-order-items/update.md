# components/actions/warehouse-management/sales-order-items/update

## Variables

### UpdateSchema

```ts
const UpdateSchema: ZodObject<{
  salesOrder: ZodOptional<ZodOptional<ZodString>>;
  product: ZodOptional<ZodOptional<ZodString>>;
  quantityOrdered: ZodOptional<ZodNumber>;
}, $strip>;
```

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
