# pocketbase/schemas/system/mfas

## Type Aliases

### Mfas

```ts
type Mfas = z.infer<typeof MfasSchema>;
```

## Variables

### MfasSchema

```ts
const MfasSchema: ZodObject<{
  collectionRef: ZodString;
  created: ZodDate;
  id: ZodString;
  method: ZodString;
  recordRef: ZodString;
  updated: ZodDate;
}, $strip>;
```
