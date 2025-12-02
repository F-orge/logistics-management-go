# components/actions/warehouse-management/return-items/update

## Variables

### UpdateSchema

```ts
const UpdateSchema: ZodObject<{
  return: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  quantityExpected: ZodOptional<ZodOptional<ZodNumber>>;
  quantityRecevied: any;
  condition: ZodOptional<ZodOptional<ZodEnum<{
     expired: "expired";
     damaged: "damaged";
     sellable: "sellable";
     defective: "defective";
     unsellable: "unsellable";
  }>>>;
}, $strip>;
```

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
