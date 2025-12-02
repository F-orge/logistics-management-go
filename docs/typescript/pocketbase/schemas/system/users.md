# pocketbase/schemas/system/users

## Type Aliases

### Users

```ts
type Users = z.infer<typeof UsersSchema>;
```

## Variables

### UsersSchema

```ts
const UsersSchema: ZodObject<{
  id: ZodString;
  password: ZodUnknown;
  tokenKey: ZodString;
  email: ZodEmail;
  emailVisibility: ZodOptional<ZodUnknown>;
  verified: ZodOptional<ZodUnknown>;
  name: ZodOptional<ZodString>;
  avatar: ZodOptional<ZodFile>;
  roles: ZodOptional<ZodArray<ZodEnum<{
     user: "user";
     driver: "driver";
     client: "client";
     carrier: "carrier";
     admin: "admin";
     developer: "developer";
     client-admin: "client-admin";
     end-customer: "end-customer";
     inventory-manager: "inventory-manager";
     warehouse-manager: "warehouse-manager";
     receiving-manager: "receiving-manager";
     warehouse-operator: "warehouse-operator";
     picker: "picker";
     packer: "packer";
     returns-processor: "returns-processor";
     qc-manager: "qc-manager";
     logistics-coordinator: "logistics-coordinator";
     logistics-manager: "logistics-manager";
     logistics-planner: "logistics-planner";
     dispatcher: "dispatcher";
     fleet-manager: "fleet-manager";
     transport-manager: "transport-manager";
     account-manager: "account-manager";
     pricing-analyst: "pricing-analyst";
     finance-manager: "finance-manager";
     accountant: "accountant";
     sdr: "sdr";
     sales-rep: "sales-rep";
     sales-manager: "sales-manager";
     marketing-manager: "marketing-manager";
     customer-support-agent: "customer-support-agent";
     product-manager: "product-manager";
  }>>>;
  created: ZodOptional<ZodISODateTime>;
  updated: ZodOptional<ZodISODateTime>;
}, $strip>;
```
