# components/actions/delivery-management/proof-of-deliveries/form

## Type Aliases

### ProofOfDeliveriesFormProps

```ts
type ProofOfDeliveriesFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### ProofOfDeliveriesForm()

```ts
const ProofOfDeliveriesForm: (props: PropsWithChildren<NoInfer<ProofOfDeliveriesFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`ProofOfDeliveriesFormProps`](#proofofdeliveriesformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateProofOfDeliveriesFormOption()

```ts
function CreateProofOfDeliveriesFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     task: string;
     signatureData?: File;
     recipientName?: string;
     coordinates?: {
        lon: number;
        lat: number;
     };
     attachments?: File[];
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
     task: string;
     signatureData?: File;
     recipientName?: string;
     coordinates?: {
        lon: number;
        lat: number;
     };
     attachments?: File[];
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
  task: string;
  signatureData?: File;
  recipientName?: string;
  coordinates?: {
     lon: number;
     lat: number;
  };
  attachments?: File[];
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
