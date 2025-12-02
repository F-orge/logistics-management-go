# components/actions/customer-relations/campaigns/form

## Type Aliases

### CampaignFormProps

```ts
type CampaignFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### CampaignForm()

```ts
const CampaignForm: (props: PropsWithChildren<NoInfer<CampaignFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`CampaignFormProps`](#campaignformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateCampaignsFormOption()

```ts
function CreateCampaignsFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     name: string;
     budget: number;
     startDate?: Date;
     endDate?: Date;
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
     name: string;
     budget: number;
     startDate?: Date;
     endDate?: Date;
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
  name: string;
  budget: number;
  startDate?: Date;
  endDate?: Date;
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

***

### UpdateCampaignsFormOption()

```ts
function UpdateCampaignsFormOption(pocketbase: TypedPocketBase, record?: CustomerRelationsCampaignsRecord): {
  defaultValues: Partial<{
     name?: string;
     budget?: number;
     startDate?: Date;
     endDate?: Date;
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

[`CustomerRelationsCampaignsRecord`](../../../../lib/pb.types.md#customerrelationscampaignsrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     name?: string;
     budget?: number;
     startDate?: Date;
     endDate?: Date;
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
  name?: string;
  budget?: number;
  startDate?: Date;
  endDate?: Date;
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
