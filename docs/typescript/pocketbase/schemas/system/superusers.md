# pocketbase/schemas/system/superusers

## Type Aliases

### Superusers

```ts
type Superusers = z.infer<typeof SuperusersSchema>;
```

## Variables

### SuperusersSchema

```ts
const SuperusersSchema: ZodObject<{
  created: ZodDate;
  email: ZodString;
  emailVisibility: ZodOptional<ZodBoolean>;
  id: ZodString;
  password: ZodString;
  tokenKey: ZodString;
  updated: ZodDate;
  verified: ZodOptional<ZodBoolean>;
}, $strip>;
```
