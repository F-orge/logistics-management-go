# components/actions/delivery-management/tasks/form

## Type Aliases

### TasksFormProps

```ts
type TasksFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### TasksForm()

```ts
const TasksForm: (props: PropsWithChildren<NoInfer<TasksFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`TasksFormProps`](#tasksformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateTasksFormOption()

```ts
function CreateTasksFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     package: string;
     route: string;
     sequence: number;
     deliveryAddress: string;
     recipientName?: string;
     recipientPhone?: string;
     deliveryInstructions?: string;
     estimatedArrivalTime?: Date;
     actualArrivalTime?: Date;
     deliveryTime?: Date;
     status?:   | "cancelled"
        | "pending"
        | "assigned"
        | "out-for-delivery"
        | "delivered"
        | "failed"
        | "rescheduled";
     attempCount?: number;
     attachments?: File[];
     failureReason?:   | "other"
        | "recipient-not-home"
        | "address-not-found"
        | "refused-delivery"
        | "damaged-package"
        | "access-denied"
        | "weather-conditions"
        | "vehicle-breakdown";
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
     package: string;
     route: string;
     sequence: number;
     deliveryAddress: string;
     recipientName?: string;
     recipientPhone?: string;
     deliveryInstructions?: string;
     estimatedArrivalTime?: Date;
     actualArrivalTime?: Date;
     deliveryTime?: Date;
     status?:   | "cancelled"
        | "pending"
        | "assigned"
        | "out-for-delivery"
        | "delivered"
        | "failed"
        | "rescheduled";
     attempCount?: number;
     attachments?: File[];
     failureReason?:   | "other"
        | "recipient-not-home"
        | "address-not-found"
        | "refused-delivery"
        | "damaged-package"
        | "access-denied"
        | "weather-conditions"
        | "vehicle-breakdown";
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
  package: string;
  route: string;
  sequence: number;
  deliveryAddress: string;
  recipientName?: string;
  recipientPhone?: string;
  deliveryInstructions?: string;
  estimatedArrivalTime?: Date;
  actualArrivalTime?: Date;
  deliveryTime?: Date;
  status?:   | "cancelled"
     | "pending"
     | "assigned"
     | "out-for-delivery"
     | "delivered"
     | "failed"
     | "rescheduled";
  attempCount?: number;
  attachments?: File[];
  failureReason?:   | "other"
     | "recipient-not-home"
     | "address-not-found"
     | "refused-delivery"
     | "damaged-package"
     | "access-denied"
     | "weather-conditions"
     | "vehicle-breakdown";
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

### UpdateTasksFormOption()

```ts
function UpdateTasksFormOption(pocketbase: TypedPocketBase, record?: DeliveryManagementTasksRecord): {
  defaultValues: Partial<{
     package?: string;
     route?: string;
     sequence?: number;
     deliveryAddress?: string;
     recipientName?: string;
     recipientPhone?: string;
     deliveryInstructions?: string;
     estimatedArrivalTime?: Date;
     actualArrivalTime?: Date;
     deliveryTime?: Date;
     status?:   | "cancelled"
        | "pending"
        | "assigned"
        | "out-for-delivery"
        | "delivered"
        | "failed"
        | "rescheduled";
     attempCount?: number;
     attachments?: File[];
     failureReason?:   | "other"
        | "recipient-not-home"
        | "address-not-found"
        | "refused-delivery"
        | "damaged-package"
        | "access-denied"
        | "weather-conditions"
        | "vehicle-breakdown";
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

[`DeliveryManagementTasksRecord`](../../../../lib/pb.types.md#deliverymanagementtasksrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     package?: string;
     route?: string;
     sequence?: number;
     deliveryAddress?: string;
     recipientName?: string;
     recipientPhone?: string;
     deliveryInstructions?: string;
     estimatedArrivalTime?: Date;
     actualArrivalTime?: Date;
     deliveryTime?: Date;
     status?:   | "cancelled"
        | "pending"
        | "assigned"
        | "out-for-delivery"
        | "delivered"
        | "failed"
        | "rescheduled";
     attempCount?: number;
     attachments?: File[];
     failureReason?:   | "other"
        | "recipient-not-home"
        | "address-not-found"
        | "refused-delivery"
        | "damaged-package"
        | "access-denied"
        | "weather-conditions"
        | "vehicle-breakdown";
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
  package?: string;
  route?: string;
  sequence?: number;
  deliveryAddress?: string;
  recipientName?: string;
  recipientPhone?: string;
  deliveryInstructions?: string;
  estimatedArrivalTime?: Date;
  actualArrivalTime?: Date;
  deliveryTime?: Date;
  status?:   | "cancelled"
     | "pending"
     | "assigned"
     | "out-for-delivery"
     | "delivered"
     | "failed"
     | "rescheduled";
  attempCount?: number;
  attachments?: File[];
  failureReason?:   | "other"
     | "recipient-not-home"
     | "address-not-found"
     | "refused-delivery"
     | "damaged-package"
     | "access-denied"
     | "weather-conditions"
     | "vehicle-breakdown";
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
