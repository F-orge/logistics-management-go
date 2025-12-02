# components/actions/warehouse-management/outbound-shipment-items/create

## Variables

### CreateSchema

```ts
const CreateSchema: ZodObject<{
  outboundShipment: ZodString;
  salesOrderItem: ZodString;
  product: ZodString;
  batch: ZodOptional<ZodString>;
  quantityShipped: ZodNumber;
}, $strip>;
```

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
