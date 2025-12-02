# components/actions/warehouse-management/inbound-shipment-items/update

## Variables

### UpdateSchema

```ts
const UpdateSchema: ZodObject<{
  inboundShipment: ZodOptional<ZodOptional<ZodString>>;
  product: ZodOptional<ZodOptional<ZodString>>;
  expectedQuantity: ZodOptional<ZodNumber>;
  receivedQuantity: ZodOptional<ZodOptional<ZodNumber>>;
  discrepancyNotes: ZodOptional<ZodOptional<ZodUnknown>>;
}, $strip>;
```

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
