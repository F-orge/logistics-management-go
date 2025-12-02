# components/actions/customer-relations/cases/form

## Type Aliases

### CasesFormProps

```ts
type CasesFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### CasesForm()

```ts
const CasesForm: (props: PropsWithChildren<NoInfer<CasesFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`CasesFormProps`](#casesformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateCasesFormOption()

```ts
function CreateCasesFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     caseNumber: string;
     status:   | "new"
        | "in-progress"
        | "waiting-for-customer"
        | "waiting-for-internal"
        | "escalated"
        | "resolved"
        | "closed"
        | "cancelled";
     priority: "critical" | "high" | "medium" | "low";
     type:   | "question"
        | "problem"
        | "complaint"
        | "feature-request"
        | "bug-report"
        | "technical-support";
     owner: string;
     contact?: string;
     description?: unknown;
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
     caseNumber: string;
     status:   | "new"
        | "in-progress"
        | "waiting-for-customer"
        | "waiting-for-internal"
        | "escalated"
        | "resolved"
        | "closed"
        | "cancelled";
     priority: "critical" | "high" | "medium" | "low";
     type:   | "question"
        | "problem"
        | "complaint"
        | "feature-request"
        | "bug-report"
        | "technical-support";
     owner: string;
     contact?: string;
     description?: unknown;
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
  caseNumber: string;
  status:   | "new"
     | "in-progress"
     | "waiting-for-customer"
     | "waiting-for-internal"
     | "escalated"
     | "resolved"
     | "closed"
     | "cancelled";
  priority: "critical" | "high" | "medium" | "low";
  type:   | "question"
     | "problem"
     | "complaint"
     | "feature-request"
     | "bug-report"
     | "technical-support";
  owner: string;
  contact?: string;
  description?: unknown;
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

### UpdateCasesFormOption()

```ts
function UpdateCasesFormOption(pocketbase: TypedPocketBase, record?: CustomerRelationsCasesRecord): {
  defaultValues: Partial<{
     caseNumber?: string;
     status?:   | "new"
        | "in-progress"
        | "waiting-for-customer"
        | "waiting-for-internal"
        | "escalated"
        | "resolved"
        | "closed"
        | "cancelled";
     priority?: "critical" | "high" | "medium" | "low";
     type?:   | "question"
        | "problem"
        | "complaint"
        | "feature-request"
        | "bug-report"
        | "technical-support";
     owner?: string;
     contact?: string;
     description?: unknown;
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

[`CustomerRelationsCasesRecord`](../../../../lib/pb.types.md#customerrelationscasesrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     caseNumber?: string;
     status?:   | "new"
        | "in-progress"
        | "waiting-for-customer"
        | "waiting-for-internal"
        | "escalated"
        | "resolved"
        | "closed"
        | "cancelled";
     priority?: "critical" | "high" | "medium" | "low";
     type?:   | "question"
        | "problem"
        | "complaint"
        | "feature-request"
        | "bug-report"
        | "technical-support";
     owner?: string;
     contact?: string;
     description?: unknown;
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
  caseNumber?: string;
  status?:   | "new"
     | "in-progress"
     | "waiting-for-customer"
     | "waiting-for-internal"
     | "escalated"
     | "resolved"
     | "closed"
     | "cancelled";
  priority?: "critical" | "high" | "medium" | "low";
  type?:   | "question"
     | "problem"
     | "complaint"
     | "feature-request"
     | "bug-report"
     | "technical-support";
  owner?: string;
  contact?: string;
  description?: unknown;
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
