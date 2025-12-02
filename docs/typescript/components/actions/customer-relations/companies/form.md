# components/actions/customer-relations/companies/form

## Type Aliases

### CompaniesFormProps

```ts
type CompaniesFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### CompaniesForm()

```ts
const CompaniesForm: (props: PropsWithChildren<NoInfer<CompaniesFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`CompaniesFormProps`](#companiesformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateCompaniesFormOption()

```ts
function CreateCompaniesFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     name: string;
     street?: string;
     city?: string;
     state?: string;
     postalCode?: string;
     country?: string;
     phoneNumber?: string;
     industry?: string;
     website?: string;
     annualRevenue?: number;
     owner?: string;
     attachments?: (string | File)[];
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
     street?: string;
     city?: string;
     state?: string;
     postalCode?: string;
     country?: string;
     phoneNumber?: string;
     industry?: string;
     website?: string;
     annualRevenue?: number;
     owner?: string;
     attachments?: (string | File)[];
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
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  phoneNumber?: string;
  industry?: string;
  website?: string;
  annualRevenue?: number;
  owner?: string;
  attachments?: (string | File)[];
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

### UpdateCompaniesFormOption()

```ts
function UpdateCompaniesFormOption(pocketbase: TypedPocketBase, record?: CustomerRelationsCompaniesRecord): {
  defaultValues: Partial<{
     name?: string;
     street?: string;
     city?: string;
     state?: string;
     postalCode?: string;
     country?: string;
     phoneNumber?: string;
     industry?: string;
     website?: string;
     annualRevenue?: number;
     owner?: string;
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

[`CustomerRelationsCompaniesRecord`](../../../../lib/pb.types.md#customerrelationscompaniesrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     name?: string;
     street?: string;
     city?: string;
     state?: string;
     postalCode?: string;
     country?: string;
     phoneNumber?: string;
     industry?: string;
     website?: string;
     annualRevenue?: number;
     owner?: string;
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
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  phoneNumber?: string;
  industry?: string;
  website?: string;
  annualRevenue?: number;
  owner?: string;
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
