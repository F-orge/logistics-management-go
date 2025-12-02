# components/actions/warehouse-management/inbound-shipment-items/create

## Variables

### CreateSchema

```ts
const CreateSchema: ZodObject<{
  inboundShipment: ZodOptional<ZodString>;
  product: ZodOptional<ZodString>;
  expectedQuantity: ZodNumber;
  receivedQuantity: ZodOptional<ZodNumber>;
  discrepancyNotes: ZodOptional<ZodUnknown>;
}, $strip>;
```

## Functions

### default()

```ts
function default(): Element;
```

#### Returns

`Element`
