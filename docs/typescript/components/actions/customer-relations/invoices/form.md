# components/actions/customer-relations/invoices/form

## Type Aliases

### InvoicesFormProps

```ts
type InvoicesFormProps = {
  action?: "create" | "edit";
};
```

#### Properties

##### action?

```ts
optional action: "create" | "edit";
```

## Variables

### InvoicesForm()

```ts
const InvoicesForm: (props: PropsWithChildren<NoInfer<InvoicesFormProps> & {
}>) => ReactNode;
```

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<[`InvoicesFormProps`](#invoicesformprops)\> & \{
\}\>

#### Returns

`ReactNode`

## Functions

### CreateInvoicesFormOption()

```ts
function CreateInvoicesFormOption(pocketbase: TypedPocketBase): {
  defaultValues: Partial<{
     invoiceNumber: string;
     opportunity: string;
     status?: "cancelled" | "draft" | "sent" | "paid" | "overdue";
     total?: number;
     issueDate: Date;
     dueDate?: Date;
     sentAt?: Date;
     paidAt?: Date;
     paymentMethod?:   | "check"
        | "other"
        | "credit-card"
        | "bank-transfer"
        | "cash"
        | "paypal"
        | "stripe"
        | "wire-transfer"
        | "maya"
        | "gcash";
     attachments?: File[];
     items: {
        product: string;
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
     invoiceNumber: string;
     opportunity: string;
     status?: "cancelled" | "draft" | "sent" | "paid" | "overdue";
     total?: number;
     issueDate: Date;
     dueDate?: Date;
     sentAt?: Date;
     paidAt?: Date;
     paymentMethod?:   | "check"
        | "other"
        | "credit-card"
        | "bank-transfer"
        | "cash"
        | "paypal"
        | "stripe"
        | "wire-transfer"
        | "maya"
        | "gcash";
     attachments?: File[];
     items: {
        product: string;
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
  invoiceNumber: string;
  opportunity: string;
  status?: "cancelled" | "draft" | "sent" | "paid" | "overdue";
  total?: number;
  issueDate: Date;
  dueDate?: Date;
  sentAt?: Date;
  paidAt?: Date;
  paymentMethod?:   | "check"
     | "other"
     | "credit-card"
     | "bank-transfer"
     | "cash"
     | "paypal"
     | "stripe"
     | "wire-transfer"
     | "maya"
     | "gcash";
  attachments?: File[];
  items: {
     product: string;
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

### UpdateInvoicesFormOption()

```ts
function UpdateInvoicesFormOption(pocketbase: TypedPocketBase, record?: CustomerRelationsInvoicesRecord): {
  defaultValues: Partial<{
     invoiceNumber?: string;
     opportunity?: string;
     status?: "cancelled" | "draft" | "sent" | "paid" | "overdue";
     total?: number;
     issueDate?: Date;
     dueDate?: Date;
     sentAt?: Date;
     paidAt?: Date;
     paymentMethod?:   | "check"
        | "other"
        | "credit-card"
        | "bank-transfer"
        | "cash"
        | "paypal"
        | "stripe"
        | "wire-transfer"
        | "maya"
        | "gcash";
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

[`CustomerRelationsInvoicesRecord`](../../../../lib/pb.types.md#customerrelationsinvoicesrecord)

#### Returns

```ts
{
  defaultValues: Partial<{
     invoiceNumber?: string;
     opportunity?: string;
     status?: "cancelled" | "draft" | "sent" | "paid" | "overdue";
     total?: number;
     issueDate?: Date;
     dueDate?: Date;
     sentAt?: Date;
     paidAt?: Date;
     paymentMethod?:   | "check"
        | "other"
        | "credit-card"
        | "bank-transfer"
        | "cash"
        | "paypal"
        | "stripe"
        | "wire-transfer"
        | "maya"
        | "gcash";
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
  invoiceNumber?: string;
  opportunity?: string;
  status?: "cancelled" | "draft" | "sent" | "paid" | "overdue";
  total?: number;
  issueDate?: Date;
  dueDate?: Date;
  sentAt?: Date;
  paidAt?: Date;
  paymentMethod?:   | "check"
     | "other"
     | "credit-card"
     | "bank-transfer"
     | "cash"
     | "paypal"
     | "stripe"
     | "wire-transfer"
     | "maya"
     | "gcash";
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
