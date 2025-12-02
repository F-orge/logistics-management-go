# components/actions/warehouse-management/inbound-shipments/form

## Type Aliases

### InboundShipmentsFormProps

```ts
type InboundShipmentsFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### InboundShipmentsForm()

```ts
const InboundShipmentsForm: (props: PropsWithChildren<NoInfer<InboundShipmentsFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`InboundShipmentsFormProps`](#inboundshipmentsformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateInboundShipmentsFormOption()

```ts
function CreateInboundShipmentsFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     client: string;
     status?: "cancelled" | "pending" | "arrived" | "processing" | "completed";
     expectedArrivalDate?: Date;
     actualArrivalDate?: Date;
     warehouse: string;
     items: {
        inboundShipment?: string;
        product?: string;
        expectedQuantity: number;
        receivedQuantity?: number;
        discrepancyNotes?: unknown;
     }[];
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
     client: string;
     status?: "cancelled" | "pending" | "arrived" | "processing" | "completed";
     expectedArrivalDate?: Date;
     actualArrivalDate?: Date;
     warehouse: string;
     items: {
        inboundShipment?: string;
        product?: string;
        expectedQuantity: number;
        receivedQuantity?: number;
        discrepancyNotes?: unknown;
     }[];
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
  client: string;
  status?: "cancelled" | "pending" | "arrived" | "processing" | "completed";
  expectedArrivalDate?: Date;
  actualArrivalDate?: Date;
  warehouse: string;
  items: {
     inboundShipment?: string;
     product?: string;
     expectedQuantity: number;
     receivedQuantity?: number;
     discrepancyNotes?: unknown;
  }[];
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

### UpdateInboundShipmentsFormOption()

```ts
function UpdateInboundShipmentsFormOption(pocketbase: TypedPocketBase, record?: WarehouseManagementInboundShipmentsRecord): {
  defaultValues: Partial<{
     client?: string;
     status?: "cancelled" | "pending" | "arrived" | "processing" | "completed";
     expectedArrivalDate?: Date;
     actualArrivalDate?: Date;
     warehouse?: string;
     items?: {
        inboundShipment?: string;
        product?: string;
        expectedQuantity: number;
        receivedQuantity?: number;
        discrepancyNotes?: unknown;
     }[];
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

[`WarehouseManagementInboundShipmentsRecord`](../../../../lib/pb.types.md#warehousemanagementinboundshipmentsrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     client?: string;
     status?: "cancelled" | "pending" | "arrived" | "processing" | "completed";
     expectedArrivalDate?: Date;
     actualArrivalDate?: Date;
     warehouse?: string;
     items?: {
        inboundShipment?: string;
        product?: string;
        expectedQuantity: number;
        receivedQuantity?: number;
        discrepancyNotes?: unknown;
     }[];
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
  client?: string;
  status?: "cancelled" | "pending" | "arrived" | "processing" | "completed";
  expectedArrivalDate?: Date;
  actualArrivalDate?: Date;
  warehouse?: string;
  items?: {
     inboundShipment?: string;
     product?: string;
     expectedQuantity: number;
     receivedQuantity?: number;
     discrepancyNotes?: unknown;
  }[];
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
