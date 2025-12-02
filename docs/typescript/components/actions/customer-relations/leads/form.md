# components/actions/customer-relations/leads/form

## Type Aliases

### LeadsFormProps

```ts
type LeadsFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### LeadsForm()

```ts
const LeadsForm: (props: PropsWithChildren<NoInfer<LeadsFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`LeadsFormProps`](#leadsformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateLeadsFormOption()

```ts
function CreateLeadsFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     name: string;
     email?: string;
     source:   | "website"
        | "other"
        | "referral"
        | "social-media"
        | "email-campaign"
        | "cold-call"
        | "event"
        | "advertisment"
        | "partner";
     status?: "new" | "contacted" | "qualified" | "unqualified" | "converted";
     score: number;
     owner: string;
     campaign?: string;
     convertedAt?: Date;
     convertedContact?: string;
     convertedCompany?: string;
     convertedOpportunity?: string;
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
     email?: string;
     source:   | "website"
        | "other"
        | "referral"
        | "social-media"
        | "email-campaign"
        | "cold-call"
        | "event"
        | "advertisment"
        | "partner";
     status?: "new" | "contacted" | "qualified" | "unqualified" | "converted";
     score: number;
     owner: string;
     campaign?: string;
     convertedAt?: Date;
     convertedContact?: string;
     convertedCompany?: string;
     convertedOpportunity?: string;
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
  email?: string;
  source:   | "website"
     | "other"
     | "referral"
     | "social-media"
     | "email-campaign"
     | "cold-call"
     | "event"
     | "advertisment"
     | "partner";
  status?: "new" | "contacted" | "qualified" | "unqualified" | "converted";
  score: number;
  owner: string;
  campaign?: string;
  convertedAt?: Date;
  convertedContact?: string;
  convertedCompany?: string;
  convertedOpportunity?: string;
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

### UpdateLeadsFormOption()

```ts
function UpdateLeadsFormOption(pocketbase: TypedPocketBase, record?: CustomerRelationsLeadsRecord): {
  defaultValues: Partial<{
     name?: string;
     email?: string;
     source?:   | "website"
        | "other"
        | "referral"
        | "social-media"
        | "email-campaign"
        | "cold-call"
        | "event"
        | "advertisment"
        | "partner";
     status?: "new" | "contacted" | "qualified" | "unqualified" | "converted";
     score?: number;
     owner?: string;
     campaign?: string;
     convertedAt?: Date;
     convertedContact?: string;
     convertedCompany?: string;
     convertedOpportunity?: string;
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

[`CustomerRelationsLeadsRecord`](../../../../lib/pb.types.md#customerrelationsleadsrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     name?: string;
     email?: string;
     source?:   | "website"
        | "other"
        | "referral"
        | "social-media"
        | "email-campaign"
        | "cold-call"
        | "event"
        | "advertisment"
        | "partner";
     status?: "new" | "contacted" | "qualified" | "unqualified" | "converted";
     score?: number;
     owner?: string;
     campaign?: string;
     convertedAt?: Date;
     convertedContact?: string;
     convertedCompany?: string;
     convertedOpportunity?: string;
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
  email?: string;
  source?:   | "website"
     | "other"
     | "referral"
     | "social-media"
     | "email-campaign"
     | "cold-call"
     | "event"
     | "advertisment"
     | "partner";
  status?: "new" | "contacted" | "qualified" | "unqualified" | "converted";
  score?: number;
  owner?: string;
  campaign?: string;
  convertedAt?: Date;
  convertedContact?: string;
  convertedCompany?: string;
  convertedOpportunity?: string;
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
