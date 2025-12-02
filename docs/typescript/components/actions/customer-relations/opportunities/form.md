# components/actions/customer-relations/opportunities/form

## Type Aliases

### OpportunitiesFormProps

```ts
type OpportunitiesFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### OpportunitiesForm()

```ts
const OpportunitiesForm: (props: PropsWithChildren<NoInfer<OpportunitiesFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`OpportunitiesFormProps`](#opportunitiesformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateOpportunitiesFormOption()

```ts
function CreateOpportunitiesFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     name: string;
     stage?:   | "prospecting"
        | "qualification"
        | "need-analysis"
        | "demo"
        | "proposal"
        | "negotiation"
        | "closed-won"
        | "closed-lost";
     dealValue?: number;
     probability?: number;
     expectedCloseDate?: Date;
     lostReason?: string;
     source:   | "website"
        | "other"
        | "referral"
        | "social-media"
        | "email-campaign"
        | "cold-call"
        | "event"
        | "advertisment"
        | "partner"
        | "existing-customer";
     owner: string;
     contact?: string;
     company?: string;
     campaign?: string;
     attachments?: File[];
     products: {
        product?: string;
        quantity: number;
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
     name: string;
     stage?:   | "prospecting"
        | "qualification"
        | "need-analysis"
        | "demo"
        | "proposal"
        | "negotiation"
        | "closed-won"
        | "closed-lost";
     dealValue?: number;
     probability?: number;
     expectedCloseDate?: Date;
     lostReason?: string;
     source:   | "website"
        | "other"
        | "referral"
        | "social-media"
        | "email-campaign"
        | "cold-call"
        | "event"
        | "advertisment"
        | "partner"
        | "existing-customer";
     owner: string;
     contact?: string;
     company?: string;
     campaign?: string;
     attachments?: File[];
     products: {
        product?: string;
        quantity: number;
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
  name: string;
  stage?:   | "prospecting"
     | "qualification"
     | "need-analysis"
     | "demo"
     | "proposal"
     | "negotiation"
     | "closed-won"
     | "closed-lost";
  dealValue?: number;
  probability?: number;
  expectedCloseDate?: Date;
  lostReason?: string;
  source:   | "website"
     | "other"
     | "referral"
     | "social-media"
     | "email-campaign"
     | "cold-call"
     | "event"
     | "advertisment"
     | "partner"
     | "existing-customer";
  owner: string;
  contact?: string;
  company?: string;
  campaign?: string;
  attachments?: File[];
  products: {
     product?: string;
     quantity: number;
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

### UpdateOpportunitiesFormOption()

```ts
function UpdateOpportunitiesFormOption(pocketbase: TypedPocketBase, record?: CustomerRelationsOpportunitiesRecord): {
  defaultValues: Partial<{
     name?: string;
     stage?:   | "prospecting"
        | "qualification"
        | "need-analysis"
        | "demo"
        | "proposal"
        | "negotiation"
        | "closed-won"
        | "closed-lost";
     dealValue?: number;
     probability?: number;
     expectedCloseDate?: Date;
     lostReason?: string;
     source?:   | "website"
        | "other"
        | "referral"
        | "social-media"
        | "email-campaign"
        | "cold-call"
        | "event"
        | "advertisment"
        | "partner"
        | "existing-customer";
     owner?: string;
     contact?: string;
     company?: string;
     campaign?: string;
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

[`CustomerRelationsOpportunitiesRecord`](../../../../lib/pb.types.md#customerrelationsopportunitiesrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     name?: string;
     stage?:   | "prospecting"
        | "qualification"
        | "need-analysis"
        | "demo"
        | "proposal"
        | "negotiation"
        | "closed-won"
        | "closed-lost";
     dealValue?: number;
     probability?: number;
     expectedCloseDate?: Date;
     lostReason?: string;
     source?:   | "website"
        | "other"
        | "referral"
        | "social-media"
        | "email-campaign"
        | "cold-call"
        | "event"
        | "advertisment"
        | "partner"
        | "existing-customer";
     owner?: string;
     contact?: string;
     company?: string;
     campaign?: string;
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
  stage?:   | "prospecting"
     | "qualification"
     | "need-analysis"
     | "demo"
     | "proposal"
     | "negotiation"
     | "closed-won"
     | "closed-lost";
  dealValue?: number;
  probability?: number;
  expectedCloseDate?: Date;
  lostReason?: string;
  source?:   | "website"
     | "other"
     | "referral"
     | "social-media"
     | "email-campaign"
     | "cold-call"
     | "event"
     | "advertisment"
     | "partner"
     | "existing-customer";
  owner?: string;
  contact?: string;
  company?: string;
  campaign?: string;
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
