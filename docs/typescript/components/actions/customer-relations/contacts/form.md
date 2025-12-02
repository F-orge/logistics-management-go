# components/actions/customer-relations/contacts/form

## Type Aliases

### ContactsFormProps

```ts
type ContactsFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### ContactsForm()

```ts
const ContactsForm: (props: PropsWithChildren<NoInfer<ContactsFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`ContactsFormProps`](#contactsformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateContactsFormOption()

```ts
function CreateContactsFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     name: string;
     email: string;
     phoneNumber?: string;
     jobTitle?: string;
     company?: string;
     owner: string;
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
     email: string;
     phoneNumber?: string;
     jobTitle?: string;
     company?: string;
     owner: string;
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
  email: string;
  phoneNumber?: string;
  jobTitle?: string;
  company?: string;
  owner: string;
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

### UpdateContactsFormOption()

```ts
function UpdateContactsFormOption(pocketbase: TypedPocketBase, record?: CustomerRelationsContactsRecord): {
  defaultValues: Partial<{
     name?: string;
     email?: string;
     phoneNumber?: string;
     jobTitle?: string;
     company?: string;
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

[`CustomerRelationsContactsRecord`](../../../../lib/pb.types.md#customerrelationscontactsrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     name?: string;
     email?: string;
     phoneNumber?: string;
     jobTitle?: string;
     company?: string;
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
  email?: string;
  phoneNumber?: string;
  jobTitle?: string;
  company?: string;
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
