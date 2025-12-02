# components/actions/warehouse-management/outbound-shipment-items/update

## Variables

### UpdateSchema

```ts
const UpdateSchema: ZodObject<{
  outboundShipment: ZodOptional<ZodString>;
  salesOrderItem: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  batch: ZodOptional<ZodOptional<ZodString>>;
  quantityShipped: ZodOptional<ZodNumber>;
}, $strip>;
```

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
