# pocketbase/schemas/system/externalauths

## Type Aliases

### Externalauths

```ts
type Externalauths = z.infer<typeof ExternalauthsSchema>;
```

## Variables

### ExternalauthsSchema

```ts
const ExternalauthsSchema: ZodObject<{
  collectionRef: ZodString;
  created: ZodDate;
  id: ZodString;
  provider: ZodString;
  providerId: ZodString;
  recordRef: ZodString;
  updated: ZodDate;
}, $strip>;
```
