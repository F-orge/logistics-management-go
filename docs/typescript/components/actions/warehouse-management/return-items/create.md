# components/actions/warehouse-management/return-items/create

## Variables

### CreateSchema

```ts
const CreateSchema: ZodObject<{
  return: ZodString;
  product: ZodString;
  quantityExpected: ZodOptional<ZodNumber>;
  quantityRecevied: any;
  condition: ZodOptional<ZodEnum<{
     expired: "expired";
     damaged: "damaged";
     sellable: "sellable";
     defective: "defective";
     unsellable: "unsellable";
  }>>;
}, $strip>;
```

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
