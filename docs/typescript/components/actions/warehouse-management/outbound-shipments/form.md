# components/actions/warehouse-management/outbound-shipments/form

## Type Aliases

### OutboundShipmentsFormProps

```ts
type OutboundShipmentsFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### OutboundShipmentsForm()

```ts
const OutboundShipmentsForm: (props: PropsWithChildren<NoInfer<OutboundShipmentsFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`OutboundShipmentsFormProps`](#outboundshipmentsformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateOutboundShipmentsFormOption()

```ts
function CreateOutboundShipmentsFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     salesOrder: string;
     status?: "cancelled" | "delivered" | "shipped" | "picking" | "packed";
     trackingNumber: string;
     carrier?: string;
     warehouse: string;
     items: {
        outboundShipment: string;
        salesOrderItem: string;
        product: string;
        batch?: string;
        quantityShipped: number;
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
     salesOrder: string;
     status?: "cancelled" | "delivered" | "shipped" | "picking" | "packed";
     trackingNumber: string;
     carrier?: string;
     warehouse: string;
     items: {
        outboundShipment: string;
        salesOrderItem: string;
        product: string;
        batch?: string;
        quantityShipped: number;
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
  salesOrder: string;
  status?: "cancelled" | "delivered" | "shipped" | "picking" | "packed";
  trackingNumber: string;
  carrier?: string;
  warehouse: string;
  items: {
     outboundShipment: string;
     salesOrderItem: string;
     product: string;
     batch?: string;
     quantityShipped: number;
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

### UpdateOutboundShipmentsFormOption()

```ts
function UpdateOutboundShipmentsFormOption(pocketbase: TypedPocketBase, record?: WarehouseManagementOutboundShipmentsRecord): {
  defaultValues: Partial<{
     salesOrder?: string;
     status?: "cancelled" | "delivered" | "shipped" | "picking" | "packed";
     trackingNumber?: string;
     carrier?: string;
     warehouse?: string;
     items?: string[];
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

[`WarehouseManagementOutboundShipmentsRecord`](../../../../lib/pb.types.md#warehousemanagementoutboundshipmentsrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     salesOrder?: string;
     status?: "cancelled" | "delivered" | "shipped" | "picking" | "packed";
     trackingNumber?: string;
     carrier?: string;
     warehouse?: string;
     items?: string[];
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
  salesOrder?: string;
  status?: "cancelled" | "delivered" | "shipped" | "picking" | "packed";
  trackingNumber?: string;
  carrier?: string;
  warehouse?: string;
  items?: string[];
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
