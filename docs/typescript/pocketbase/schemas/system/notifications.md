# pocketbase/schemas/system/notifications

## Type Aliases

### Notifications

```ts
type Notifications = z.infer<typeof NotificationsSchema>;
```

## Variables

### NotificationsSchema

```ts
const NotificationsSchema: ZodObject<{
  id: ZodString;
  user: ZodString;
  message: ZodUnknown;
  isRead: ZodOptional<ZodUnknown>;
  link: ZodOptional<ZodURL>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```
