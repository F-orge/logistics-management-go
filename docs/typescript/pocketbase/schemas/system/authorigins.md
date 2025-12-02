# pocketbase/schemas/system/authorigins

## Type Aliases

### Authorigins

```ts
type Authorigins = z.infer<typeof AuthoriginsSchema>;
```

## Variables

### AuthoriginsSchema

```ts
const AuthoriginsSchema: ZodObject<{
  collectionRef: ZodString;
  created: ZodDate;
  fingerprint: ZodString;
  id: ZodString;
  recordRef: ZodString;
  updated: ZodDate;
}, $strip>;
```
