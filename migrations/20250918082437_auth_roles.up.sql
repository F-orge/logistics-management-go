-- Create the roles enum for user.role
create type auth.user_role as ENUM(
  'admin',
  'developer',
  'user',
  'client',
  'client-admin',
  'end-customer',
  'inventory-manager',
  'warehouse-manager',
  'receiving-manager',
  'warehouse-operator',
  'picker',
  'packer',
  'returns-processor',
  'qc-manager',
  'logistics-coordinator',
  'logistics-manager',
  'logistics-planner',
  'dispatcher',
  'driver',
  'fleet-manager',
  'transport-manager',
  'account-manager',
  'pricing-analyst',
  'finance-manager',
  'accountant',
  'sdr',
  'sales-rep',
  'sales-manager',
  'marketing-manager',
  'customer-support-agent',
  'product-manager',
  'carrier'
);

-- Alter the role column in auth.user to use the new enum
alter table auth."user"
  alter column role type auth.user_role
  using role::auth.user_role;

