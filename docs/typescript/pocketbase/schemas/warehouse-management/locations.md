# pocketbase/schemas/warehouse-management/locations

## Type Aliases

### Locations

```ts
type Locations = z.infer<typeof LocationsSchema>;
```

## Variables

### LocationsSchema

```ts
const LocationsSchema: ZodObject<{
  id: ZodString;
  warehouse: ZodOptional<ZodString>;
  name: ZodString;
  barcode: ZodOptional<ZodString>;
  type: ZodOptional<ZodEnum<{
     damaged-goods: "damaged-goods";
     receiving-dock: "receiving-dock";
     pick-bin: "pick-bin";
     packing-station: "packing-station";
     cross-dock-area: "cross-dock-area";
     bulk-storage: "bulk-storage";
     reserve-storage: "reserve-storage";
     staging-area: "staging-area";
     quality-control: "quality-control";
     returns-area: "returns-area";
  }>>;
  level: ZodOptional<ZodNumber>;
  maxWeight: ZodOptional<ZodNumber>;
  maxVolume: ZodOptional<ZodNumber>;
  maxPallets: ZodOptional<ZodNumber>;
  isPickable: ZodOptional<ZodUnknown>;
  isReceivable: ZodOptional<ZodUnknown>;
  temperatureControlled: ZodOptional<ZodUnknown>;
  hazmatApproved: ZodOptional<ZodUnknown>;
  isActive: ZodOptional<ZodUnknown>;
  parentLocation: ZodOptional<ZodString>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```

## Functions

### CreateLocationsSchema()

```ts
function CreateLocationsSchema(pocketbase: TypedPocketBase): ZodObject<{
  warehouse: ZodOptional<ZodString>;
  name: ZodString;
  barcode: ZodOptional<ZodString>;
  type: ZodOptional<ZodEnum<{
     damaged-goods: "damaged-goods";
     receiving-dock: "receiving-dock";
     pick-bin: "pick-bin";
     packing-station: "packing-station";
     cross-dock-area: "cross-dock-area";
     bulk-storage: "bulk-storage";
     reserve-storage: "reserve-storage";
     staging-area: "staging-area";
     quality-control: "quality-control";
     returns-area: "returns-area";
  }>>;
  level: ZodOptional<ZodNumber>;
  maxWeight: ZodOptional<ZodNumber>;
  maxVolume: ZodOptional<ZodNumber>;
  maxPallets: ZodOptional<ZodNumber>;
  isPickable: ZodOptional<ZodUnknown>;
  isReceivable: ZodOptional<ZodUnknown>;
  temperatureControlled: ZodOptional<ZodUnknown>;
  hazmatApproved: ZodOptional<ZodUnknown>;
  isActive: ZodOptional<ZodUnknown>;
  parentLocation: ZodOptional<ZodString>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

#### Returns

`ZodObject`\<\{
  `warehouse`: `ZodOptional`\<`ZodString`\>;
  `name`: `ZodString`;
  `barcode`: `ZodOptional`\<`ZodString`\>;
  `type`: `ZodOptional`\<`ZodEnum`\<\{
     `damaged-goods`: `"damaged-goods"`;
     `receiving-dock`: `"receiving-dock"`;
     `pick-bin`: `"pick-bin"`;
     `packing-station`: `"packing-station"`;
     `cross-dock-area`: `"cross-dock-area"`;
     `bulk-storage`: `"bulk-storage"`;
     `reserve-storage`: `"reserve-storage"`;
     `staging-area`: `"staging-area"`;
     `quality-control`: `"quality-control"`;
     `returns-area`: `"returns-area"`;
  \}\>\>;
  `level`: `ZodOptional`\<`ZodNumber`\>;
  `maxWeight`: `ZodOptional`\<`ZodNumber`\>;
  `maxVolume`: `ZodOptional`\<`ZodNumber`\>;
  `maxPallets`: `ZodOptional`\<`ZodNumber`\>;
  `isPickable`: `ZodOptional`\<`ZodUnknown`\>;
  `isReceivable`: `ZodOptional`\<`ZodUnknown`\>;
  `temperatureControlled`: `ZodOptional`\<`ZodUnknown`\>;
  `hazmatApproved`: `ZodOptional`\<`ZodUnknown`\>;
  `isActive`: `ZodOptional`\<`ZodUnknown`\>;
  `parentLocation`: `ZodOptional`\<`ZodString`\>;
\}, `$strip`\>

***

### UpdateLocationsSchema()

```ts
function UpdateLocationsSchema(pocketbase: TypedPocketBase, record?: WarehouseManagementLocationsRecord): ZodObject<{
  warehouse: ZodOptional<ZodOptional<ZodString>>;
  name: ZodOptional<ZodString>;
  barcode: ZodOptional<ZodOptional<ZodString>>;
  type: ZodOptional<ZodOptional<ZodEnum<{
     damaged-goods: "damaged-goods";
     receiving-dock: "receiving-dock";
     pick-bin: "pick-bin";
     packing-station: "packing-station";
     cross-dock-area: "cross-dock-area";
     bulk-storage: "bulk-storage";
     reserve-storage: "reserve-storage";
     staging-area: "staging-area";
     quality-control: "quality-control";
     returns-area: "returns-area";
  }>>>;
  level: ZodOptional<ZodOptional<ZodNumber>>;
  maxWeight: ZodOptional<ZodOptional<ZodNumber>>;
  maxVolume: ZodOptional<ZodOptional<ZodNumber>>;
  maxPallets: ZodOptional<ZodOptional<ZodNumber>>;
  isPickable: ZodOptional<ZodOptional<ZodUnknown>>;
  isReceivable: ZodOptional<ZodOptional<ZodUnknown>>;
  temperatureControlled: ZodOptional<ZodOptional<ZodUnknown>>;
  hazmatApproved: ZodOptional<ZodOptional<ZodUnknown>>;
  isActive: ZodOptional<ZodOptional<ZodUnknown>>;
  parentLocation: ZodOptional<ZodOptional<ZodString>>;
}, $strip>;
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementLocationsRecord`](../../../lib/pb.types.md#warehousemanagementlocationsrecord)

#### Returns

`ZodObject`\<\{
  `warehouse`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `name`: `ZodOptional`\<`ZodString`\>;
  `barcode`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
  `type`: `ZodOptional`\<`ZodOptional`\<`ZodEnum`\<\{
     `damaged-goods`: `"damaged-goods"`;
     `receiving-dock`: `"receiving-dock"`;
     `pick-bin`: `"pick-bin"`;
     `packing-station`: `"packing-station"`;
     `cross-dock-area`: `"cross-dock-area"`;
     `bulk-storage`: `"bulk-storage"`;
     `reserve-storage`: `"reserve-storage"`;
     `staging-area`: `"staging-area"`;
     `quality-control`: `"quality-control"`;
     `returns-area`: `"returns-area"`;
  \}\>\>\>;
  `level`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `maxWeight`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `maxVolume`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `maxPallets`: `ZodOptional`\<`ZodOptional`\<`ZodNumber`\>\>;
  `isPickable`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
  `isReceivable`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
  `temperatureControlled`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
  `hazmatApproved`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
  `isActive`: `ZodOptional`\<`ZodOptional`\<`ZodUnknown`\>\>;
  `parentLocation`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>;
\}, `$strip`\>
