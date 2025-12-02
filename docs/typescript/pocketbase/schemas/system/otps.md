# pocketbase/schemas/system/otps

## Type Aliases

### Otps

```ts
type Otps = z.infer<typeof OtpsSchema>;
```

## Variables

### OtpsSchema

```ts
const OtpsSchema: ZodObject<{
  collectionRef: ZodString;
  created: ZodDate;
  id: ZodString;
  password: ZodString;
  recordRef: ZodString;
  sentTo: ZodOptional<ZodString>;
  updated: ZodDate;
}, $strip>;
```
