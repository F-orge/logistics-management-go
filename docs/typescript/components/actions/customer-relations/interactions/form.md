# components/actions/customer-relations/interactions/form

## Type Aliases

### InteractionsFormProps

```ts
type InteractionsFormProps = {
  action?: "create" | "edit";
  pocketbase?: TypedPocketBase;
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

##### pocketbase?

```ts
optional pocketbase: TypedPocketBase;
```

## Variables

### InteractionsForm()

```ts
const InteractionsForm: (props: PropsWithChildren<NoInfer<InteractionsFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`InteractionsFormProps`](#interactionsformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateInteractionsFormOption()

```ts
function CreateInteractionsFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     contact: string;
     user: string;
     case?: string;
     type?: "text" | "email" | "call" | "meeting";
     outcome?: string;
     notes?: string;
     attachments?: File[];
     interactionDate?: Date;
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
     contact: string;
     user: string;
     case?: string;
     type?: "text" | "email" | "call" | "meeting";
     outcome?: string;
     notes?: string;
     attachments?: File[];
     interactionDate?: Date;
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
  contact: string;
  user: string;
  case?: string;
  type?: "text" | "email" | "call" | "meeting";
  outcome?: string;
  notes?: string;
  attachments?: File[];
  interactionDate?: Date;
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

### UpdateInteractionsFormOption()

```ts
function UpdateInteractionsFormOption(pocketbase: TypedPocketBase, record?: CustomerRelationsInteractionsRecord): {
  defaultValues: Partial<{
     contact?: string;
     user?: string;
     case?: string;
     type?: "text" | "email" | "call" | "meeting";
     outcome?: string;
     notes?: string;
     interactionDate?: Date;
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

[`CustomerRelationsInteractionsRecord`](../../../../lib/pb.types.md#customerrelationsinteractionsrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     contact?: string;
     user?: string;
     case?: string;
     type?: "text" | "email" | "call" | "meeting";
     outcome?: string;
     notes?: string;
     interactionDate?: Date;
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
  contact?: string;
  user?: string;
  case?: string;
  type?: "text" | "email" | "call" | "meeting";
  outcome?: string;
  notes?: string;
  interactionDate?: Date;
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
