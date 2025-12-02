# components/actions/transport-management/vehicles/form

## Type Aliases

### VehiclesFormProps

```ts
type VehiclesFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### VehiclesForm()

```ts
const VehiclesForm: (props: PropsWithChildren<NoInfer<VehiclesFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`VehiclesFormProps`](#vehiclesformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateVehiclesFormOption()

```ts
function CreateVehiclesFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     registrationNumber: string;
     model?: string;
     capacityVolume?: number;
     capacityWeight?: number;
     status: "available" | "in-maintenance" | "on-trip" | "out-of-service";
     maintenances?: string[];
     gps_pings?: string[];
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
     registrationNumber: string;
     model?: string;
     capacityVolume?: number;
     capacityWeight?: number;
     status: "available" | "in-maintenance" | "on-trip" | "out-of-service";
     maintenances?: string[];
     gps_pings?: string[];
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
  registrationNumber: string;
  model?: string;
  capacityVolume?: number;
  capacityWeight?: number;
  status: "available" | "in-maintenance" | "on-trip" | "out-of-service";
  maintenances?: string[];
  gps_pings?: string[];
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

### UpdateVehiclesFormOption()

```ts
function UpdateVehiclesFormOption(pocketbase: TypedPocketBase, record?: TransportManagementVehiclesRecord): {
  defaultValues: Partial<{
     registrationNumber?: string;
     model?: string;
     capacityVolume?: number;
     capacityWeight?: number;
     status?: "available" | "in-maintenance" | "on-trip" | "out-of-service";
     maintenances?: string[];
     gps_pings?: string[];
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

[`TransportManagementVehiclesRecord`](../../../../lib/pb.types.md#transportmanagementvehiclesrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     registrationNumber?: string;
     model?: string;
     capacityVolume?: number;
     capacityWeight?: number;
     status?: "available" | "in-maintenance" | "on-trip" | "out-of-service";
     maintenances?: string[];
     gps_pings?: string[];
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
  registrationNumber?: string;
  model?: string;
  capacityVolume?: number;
  capacityWeight?: number;
  status?: "available" | "in-maintenance" | "on-trip" | "out-of-service";
  maintenances?: string[];
  gps_pings?: string[];
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
