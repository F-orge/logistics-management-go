# components/actions/warehouse-management/locations/form

## Type Aliases

### LocationsFormProps

```ts
type LocationsFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### LocationsForm()

```ts
const LocationsForm: (props: PropsWithChildren<NoInfer<LocationsFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`LocationsFormProps`](#locationsformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateLocationsFormOption()

```ts
function CreateLocationsFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     warehouse?: string;
     name: string;
     barcode?: string;
     type?:   | "damaged-goods"
        | "receiving-dock"
        | "pick-bin"
        | "packing-station"
        | "cross-dock-area"
        | "bulk-storage"
        | "reserve-storage"
        | "staging-area"
        | "quality-control"
        | "returns-area";
     level?: number;
     maxWeight?: number;
     maxVolume?: number;
     maxPallets?: number;
     isPickable?: unknown;
     isReceivable?: unknown;
     temperatureControlled?: unknown;
     hazmatApproved?: unknown;
     isActive?: unknown;
     parentLocation?: string;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

#### Returns

```ts
{
  defaultValues: Partial<{
     warehouse?: string;
     name: string;
     barcode?: string;
     type?:   | "damaged-goods"
        | "receiving-dock"
        | "pick-bin"
        | "packing-station"
        | "cross-dock-area"
        | "bulk-storage"
        | "reserve-storage"
        | "staging-area"
        | "quality-control"
        | "returns-area";
     level?: number;
     maxWeight?: number;
     maxVolume?: number;
     maxPallets?: number;
     isPickable?: unknown;
     isReceivable?: unknown;
     temperatureControlled?: unknown;
     hazmatApproved?: unknown;
     isActive?: unknown;
     parentLocation?: string;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  warehouse?: string;
  name: string;
  barcode?: string;
  type?:   | "damaged-goods"
     | "receiving-dock"
     | "pick-bin"
     | "packing-station"
     | "cross-dock-area"
     | "bulk-storage"
     | "reserve-storage"
     | "staging-area"
     | "quality-control"
     | "returns-area";
  level?: number;
  maxWeight?: number;
  maxVolume?: number;
  maxPallets?: number;
  isPickable?: unknown;
  isReceivable?: unknown;
  temperatureControlled?: unknown;
  hazmatApproved?: unknown;
  isActive?: unknown;
  parentLocation?: string;
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>

***

### UpdateLocationsFormOption()

```ts
function UpdateLocationsFormOption(pocketbase: TypedPocketBase, record?: WarehouseManagementLocationsRecord): {
  defaultValues: Partial<{
     warehouse?: string;
     name?: string;
     barcode?: string;
     type?:   | "damaged-goods"
        | "receiving-dock"
        | "pick-bin"
        | "packing-station"
        | "cross-dock-area"
        | "bulk-storage"
        | "reserve-storage"
        | "staging-area"
        | "quality-control"
        | "returns-area";
     level?: number;
     maxWeight?: number;
     maxVolume?: number;
     maxPallets?: number;
     isPickable?: unknown;
     isReceivable?: unknown;
     temperatureControlled?: unknown;
     hazmatApproved?: unknown;
     isActive?: unknown;
     parentLocation?: string;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
};
```

#### Parameters

##### pocketbase

[`TypedPocketBase`](../../../../lib/pb.types.md#typedpocketbase)

##### record?

[`WarehouseManagementLocationsRecord`](../../../../lib/pb.types.md#warehousemanagementlocationsrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     warehouse?: string;
     name?: string;
     barcode?: string;
     type?:   | "damaged-goods"
        | "receiving-dock"
        | "pick-bin"
        | "packing-station"
        | "cross-dock-area"
        | "bulk-storage"
        | "reserve-storage"
        | "staging-area"
        | "quality-control"
        | "returns-area";
     level?: number;
     maxWeight?: number;
     maxVolume?: number;
     maxPallets?: number;
     isPickable?: unknown;
     isReceivable?: unknown;
     temperatureControlled?: unknown;
     hazmatApproved?: unknown;
     isActive?: unknown;
     parentLocation?: string;
  }>;
  onSubmitMeta: {
     navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  };
  onSubmit: (__namedParameters: {
  }) => Promise<void>;
}
```

##### defaultValues

```ts
defaultValues: Partial<{
  warehouse?: string;
  name?: string;
  barcode?: string;
  type?:   | "damaged-goods"
     | "receiving-dock"
     | "pick-bin"
     | "packing-station"
     | "cross-dock-area"
     | "bulk-storage"
     | "reserve-storage"
     | "staging-area"
     | "quality-control"
     | "returns-area";
  level?: number;
  maxWeight?: number;
  maxVolume?: number;
  maxPallets?: number;
  isPickable?: unknown;
  isReceivable?: unknown;
  temperatureControlled?: unknown;
  hazmatApproved?: unknown;
  isActive?: unknown;
  parentLocation?: string;
}>;
```

##### onSubmitMeta

```ts
onSubmitMeta: {
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
};
```

###### onSubmitMeta.navigate

```ts
navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
```

##### onSubmit()

```ts
onSubmit: (__namedParameters: {
}) => Promise<void>;
```

###### Parameters

###### \_\_namedParameters

###### Returns

`Promise`\<`void`\>
