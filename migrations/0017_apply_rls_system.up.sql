-- Add up migration script here

-- Create helper functions for RBAC
create or replace function auth.current_user_id() returns uuid as $$
  select current_setting('app.current_user_id', true)::uuid;
$$ language sql stable security definer;

-- Function to check if current user is admin
create or replace function auth.is_admin() returns boolean as $$
  select exists(
    select 1 from auth.users 
    where id = auth.current_user_id() 
    and is_admin = true
  );
$$ language sql stable security definer;

-- Function to check if user has specific permission
create or replace function auth.has_permission(resource_name text, action_name text) returns boolean as $$
  select exists(
    select 1
    from user_roles ur
    join role_permissions rp on ur.role_id = rp.role_id
    join permissions p on rp.permission_id = p.id
    where ur.user_id = auth.current_user_id()
    and p.resource = resource_name
    and p.action = action_name
    and p.is_active = true
  ) or auth.is_admin();
$$ language sql stable security definer;

-- Enable RLS for all tables
alter table auth.users enable row level security;
alter table companies enable row level security;
alter table products enable row level security;
alter table warehouses enable row level security;
alter table orders enable row level security;
alter table order_line_items enable row level security;
alter table inventory_items enable row level security;
alter table departments enable row level security;
alter table department_members enable row level security;
alter table shipments enable row level security;
alter table vehicles enable row level security;
alter table routes enable row level security;
alter table route_segments enable row level security;
alter table shipments_on_route enable row level security;
alter table invoices enable row level security;
alter table payments enable row level security;
alter table roles enable row level security;
alter table permissions enable row level security;
alter table user_roles enable row level security;
alter table role_permissions enable row level security;

-- RLS Policies for auth.users
create policy users_select_policy on auth.users
  for select using (
    auth.is_admin() or 
    auth.has_permission('users', 'read') or 
    id = auth.current_user_id()
  );

create policy users_insert_policy on auth.users
  for insert with check (
    auth.is_admin() or 
    auth.has_permission('users', 'create')
  );

create policy users_update_policy on auth.users
  for update using (
    auth.is_admin() or 
    auth.has_permission('users', 'update') or 
    id = auth.current_user_id()
  );

create policy users_delete_policy on auth.users
  for delete using (
    auth.is_admin() or 
    auth.has_permission('users', 'delete')
  );

-- RLS Policies for companies
create policy companies_select_policy on companies
  for select using (
    auth.is_admin() or 
    auth.has_permission('companies', 'read')
  );

create policy companies_insert_policy on companies
  for insert with check (
    auth.is_admin() or 
    auth.has_permission('companies', 'create')
  );

create policy companies_update_policy on companies
  for update using (
    auth.is_admin() or 
    auth.has_permission('companies', 'update')
  );

create policy companies_delete_policy on companies
  for delete using (
    auth.is_admin() or 
    auth.has_permission('companies', 'delete')
  );

-- RLS Policies for products
create policy products_select_policy on products
  for select using (
    auth.is_admin() or 
    auth.has_permission('products', 'read')
  );

create policy products_insert_policy on products
  for insert with check (
    auth.is_admin() or 
    auth.has_permission('products', 'create')
  );

create policy products_update_policy on products
  for update using (
    auth.is_admin() or 
    auth.has_permission('products', 'update')
  );

create policy products_delete_policy on products
  for delete using (
    auth.is_admin() or 
    auth.has_permission('products', 'delete')
  );

-- RLS Policies for warehouses
create policy warehouses_select_policy on warehouses
  for select using (
    auth.is_admin() or 
    auth.has_permission('warehouses', 'read') or
    manager = auth.current_user_id()
  );

create policy warehouses_insert_policy on warehouses
  for insert with check (
    auth.is_admin() or 
    auth.has_permission('warehouses', 'create')
  );

create policy warehouses_update_policy on warehouses
  for update using (
    auth.is_admin() or 
    auth.has_permission('warehouses', 'update') or
    manager = auth.current_user_id()
  );

create policy warehouses_delete_policy on warehouses
  for delete using (
    auth.is_admin() or 
    auth.has_permission('warehouses', 'delete')
  );

-- RLS Policies for orders
create policy orders_select_policy on orders
  for select using (
    auth.is_admin() or 
    auth.has_permission('orders', 'read') or
    created_by = auth.current_user_id()
  );

create policy orders_insert_policy on orders
  for insert with check (
    auth.is_admin() or 
    auth.has_permission('orders', 'create')
  );

create policy orders_update_policy on orders
  for update using (
    auth.is_admin() or 
    auth.has_permission('orders', 'update') or
    created_by = auth.current_user_id()
  );

create policy orders_delete_policy on orders
  for delete using (
    auth.is_admin() or 
    auth.has_permission('orders', 'delete')
  );

-- RLS Policies for order_line_items
create policy order_line_items_select_policy on order_line_items
  for select using (
    auth.is_admin() or 
    auth.has_permission('orders', 'read') or
    exists(
      select 1 from orders o 
      where o.id = "order" and o.created_by = auth.current_user_id()
    )
  );

create policy order_line_items_insert_policy on order_line_items
  for insert with check (
    auth.is_admin() or 
    auth.has_permission('orders', 'create') or
    exists(
      select 1 from orders o 
      where o.id = "order" and o.created_by = auth.current_user_id()
    )
  );

create policy order_line_items_update_policy on order_line_items
  for update using (
    auth.is_admin() or 
    auth.has_permission('orders', 'update') or
    exists(
      select 1 from orders o 
      where o.id = "order" and o.created_by = auth.current_user_id()
    )
  );

create policy order_line_items_delete_policy on order_line_items
  for delete using (
    auth.is_admin() or 
    auth.has_permission('orders', 'delete') or
    exists(
      select 1 from orders o 
      where o.id = "order" and o.created_by = auth.current_user_id()
    )
  );

-- RLS Policies for inventory_items
create policy inventory_items_select_policy on inventory_items
  for select using (
    auth.is_admin() or 
    auth.has_permission('inventory', 'read') or
    exists(
      select 1 from warehouses w 
      where w.id = warehouse and w.manager = auth.current_user_id()
    )
  );

create policy inventory_items_insert_policy on inventory_items
  for insert with check (
    auth.is_admin() or 
    auth.has_permission('inventory', 'create') or
    exists(
      select 1 from warehouses w 
      where w.id = warehouse and w.manager = auth.current_user_id()
    )
  );

create policy inventory_items_update_policy on inventory_items
  for update using (
    auth.is_admin() or 
    auth.has_permission('inventory', 'update') or
    exists(
      select 1 from warehouses w 
      where w.id = warehouse and w.manager = auth.current_user_id()
    )
  );

create policy inventory_items_delete_policy on inventory_items
  for delete using (
    auth.is_admin() or 
    auth.has_permission('inventory', 'delete') or
    exists(
      select 1 from warehouses w 
      where w.id = warehouse and w.manager = auth.current_user_id()
    )
  );

-- RLS Policies for departments
create policy departments_select_policy on departments
  for select using (
    auth.is_admin() or 
    auth.has_permission('departments', 'read') or
    exists(
      select 1 from department_members dm 
      where dm.department_id = id and dm.user_id = auth.current_user_id()
    )
  );

create policy departments_insert_policy on departments
  for insert with check (
    auth.is_admin() or 
    auth.has_permission('departments', 'create')
  );

create policy departments_update_policy on departments
  for update using (
    auth.is_admin() or 
    auth.has_permission('departments', 'update') or
    exists(
      select 1 from department_members dm 
      where dm.department_id = id and dm.user_id = auth.current_user_id() and dm.role = 'manager'
    )
  );

create policy departments_delete_policy on departments
  for delete using (
    auth.is_admin() or 
    auth.has_permission('departments', 'delete')
  );

-- RLS Policies for department_members
create policy department_members_select_policy on department_members
  for select using (
    auth.is_admin() or 
    auth.has_permission('departments', 'read') or
    user_id = auth.current_user_id() or
    exists(
      select 1 from department_members dm 
      where dm.department_id = department_id and dm.user_id = auth.current_user_id() and dm.role = 'manager'
    )
  );

create policy department_members_insert_policy on department_members
  for insert with check (
    auth.is_admin() or 
    auth.has_permission('departments', 'create') or
    exists(
      select 1 from department_members dm 
      where dm.department_id = department_id and dm.user_id = auth.current_user_id() and dm.role = 'manager'
    )
  );

create policy department_members_update_policy on department_members
  for update using (
    auth.is_admin() or 
    auth.has_permission('departments', 'update') or
    exists(
      select 1 from department_members dm 
      where dm.department_id = department_id and dm.user_id = auth.current_user_id() and dm.role = 'manager'
    )
  );

create policy department_members_delete_policy on department_members
  for delete using (
    auth.is_admin() or 
    auth.has_permission('departments', 'delete') or
    exists(
      select 1 from department_members dm 
      where dm.department_id = department_id and dm.user_id = auth.current_user_id() and dm.role = 'manager'
    )
  );

-- RLS Policies for shipments
create policy shipments_select_policy on shipments
  for select using (
    auth.is_admin() or 
    auth.has_permission('shipments', 'read') or
    driver = auth.current_user_id() or
    exists(
      select 1 from orders o 
      where o.id = "order" and o.created_by = auth.current_user_id()
    ) or
    exists(
      select 1 from department_members dm 
      where dm.department_id = department_assigned and dm.user_id = auth.current_user_id()
    )
  );

create policy shipments_insert_policy on shipments
  for insert with check (
    auth.is_admin() or 
    auth.has_permission('shipments', 'create')
  );

create policy shipments_update_policy on shipments
  for update using (
    auth.is_admin() or 
    auth.has_permission('shipments', 'update') or
    driver = auth.current_user_id() or
    exists(
      select 1 from department_members dm 
      where dm.department_id = department_assigned and dm.user_id = auth.current_user_id() and dm.role = 'manager'
    )
  );

create policy shipments_delete_policy on shipments
  for delete using (
    auth.is_admin() or 
    auth.has_permission('shipments', 'delete')
  );

-- RLS Policies for vehicles
create policy vehicles_select_policy on vehicles
  for select using (
    auth.is_admin() or 
    auth.has_permission('vehicles', 'read') or
    current_driver = auth.current_user_id()
  );

create policy vehicles_insert_policy on vehicles
  for insert with check (
    auth.is_admin() or 
    auth.has_permission('vehicles', 'create')
  );

create policy vehicles_update_policy on vehicles
  for update using (
    auth.is_admin() or 
    auth.has_permission('vehicles', 'update')
  );

create policy vehicles_delete_policy on vehicles
  for delete using (
    auth.is_admin() or 
    auth.has_permission('vehicles', 'delete')
  );

-- RLS Policies for routes
create policy routes_select_policy on routes
  for select using (
    auth.is_admin() or 
    auth.has_permission('routes', 'read')
  );

create policy routes_insert_policy on routes
  for insert with check (
    auth.is_admin() or 
    auth.has_permission('routes', 'create')
  );

create policy routes_update_policy on routes
  for update using (
    auth.is_admin() or 
    auth.has_permission('routes', 'update')
  );

create policy routes_delete_policy on routes
  for delete using (
    auth.is_admin() or 
    auth.has_permission('routes', 'delete')
  );

-- RLS Policies for route_segments
create policy route_segments_select_policy on route_segments
  for select using (
    auth.is_admin() or 
    auth.has_permission('routes', 'read')
  );

create policy route_segments_insert_policy on route_segments
  for insert with check (
    auth.is_admin() or 
    auth.has_permission('routes', 'create')
  );

create policy route_segments_update_policy on route_segments
  for update using (
    auth.is_admin() or 
    auth.has_permission('routes', 'update')
  );

create policy route_segments_delete_policy on route_segments
  for delete using (
    auth.is_admin() or 
    auth.has_permission('routes', 'delete')
  );

-- RLS Policies for shipments_on_route
create policy shipments_on_route_select_policy on shipments_on_route
  for select using (
    auth.is_admin() or 
    auth.has_permission('routes', 'read') or
    auth.has_permission('shipments', 'read')
  );

create policy shipments_on_route_insert_policy on shipments_on_route
  for insert with check (
    auth.is_admin() or 
    auth.has_permission('routes', 'create')
  );

create policy shipments_on_route_update_policy on shipments_on_route
  for update using (
    auth.is_admin() or 
    auth.has_permission('routes', 'update')
  );

create policy shipments_on_route_delete_policy on shipments_on_route
  for delete using (
    auth.is_admin() or 
    auth.has_permission('routes', 'delete')
  );

-- RLS Policies for invoices
create policy invoices_select_policy on invoices
  for select using (
    auth.is_admin() or 
    auth.has_permission('invoices', 'read') or
    exists(
      select 1 from orders o 
      where o.id = "order" and o.created_by = auth.current_user_id()
    )
  );

create policy invoices_insert_policy on invoices
  for insert with check (
    auth.is_admin() or 
    auth.has_permission('invoices', 'create')
  );

create policy invoices_update_policy on invoices
  for update using (
    auth.is_admin() or 
    auth.has_permission('invoices', 'update')
  );

create policy invoices_delete_policy on invoices
  for delete using (
    auth.is_admin() or 
    auth.has_permission('invoices', 'delete')
  );

-- RLS Policies for payments
create policy payments_select_policy on payments
  for select using (
    auth.is_admin() or 
    auth.has_permission('payments', 'read') or
    exists(
      select 1 from invoices i
      join orders o on i."order" = o.id
      where i.id = invoice and o.created_by = auth.current_user_id()
    )
  );

create policy payments_insert_policy on payments
  for insert with check (
    auth.is_admin() or 
    auth.has_permission('payments', 'create')
  );

create policy payments_update_policy on payments
  for update using (
    auth.is_admin() or 
    auth.has_permission('payments', 'update')
  );

create policy payments_delete_policy on payments
  for delete using (
    auth.is_admin() or 
    auth.has_permission('payments', 'delete')
  );

-- RLS Policies for RBAC tables (roles, permissions, user_roles, role_permissions)
-- Only admins and users with explicit permissions can manage RBAC

create policy roles_select_policy on roles
  for select using (
    auth.is_admin() or 
    auth.has_permission('roles', 'read')
  );

create policy roles_insert_policy on roles
  for insert with check (
    auth.is_admin() or 
    auth.has_permission('roles', 'create')
  );

create policy roles_update_policy on roles
  for update using (
    auth.is_admin() or 
    auth.has_permission('roles', 'update')
  );

create policy roles_delete_policy on roles
  for delete using (
    auth.is_admin() or 
    auth.has_permission('roles', 'delete')
  );

create policy permissions_select_policy on permissions
  for select using (
    auth.is_admin() or 
    auth.has_permission('permissions', 'read')
  );

create policy permissions_insert_policy on permissions
  for insert with check (
    auth.is_admin() or 
    auth.has_permission('permissions', 'create')
  );

create policy permissions_update_policy on permissions
  for update using (
    auth.is_admin() or 
    auth.has_permission('permissions', 'update')
  );

create policy permissions_delete_policy on permissions
  for delete using (
    auth.is_admin() or 
    auth.has_permission('permissions', 'delete')
  );

create policy user_roles_select_policy on user_roles
  for select using (
    auth.is_admin() or 
    auth.has_permission('user_roles', 'read') or
    user_id = auth.current_user_id()
  );

create policy user_roles_insert_policy on user_roles
  for insert with check (
    auth.is_admin() or 
    auth.has_permission('user_roles', 'create')
  );

create policy user_roles_update_policy on user_roles
  for update using (
    auth.is_admin() or 
    auth.has_permission('user_roles', 'update')
  );

create policy user_roles_delete_policy on user_roles
  for delete using (
    auth.is_admin() or 
    auth.has_permission('user_roles', 'delete')
  );

create policy role_permissions_select_policy on role_permissions
  for select using (
    auth.is_admin() or 
    auth.has_permission('role_permissions', 'read')
  );

create policy role_permissions_insert_policy on role_permissions
  for insert with check (
    auth.is_admin() or 
    auth.has_permission('role_permissions', 'create')
  );

create policy role_permissions_update_policy on role_permissions
  for update using (
    auth.is_admin() or 
    auth.has_permission('role_permissions', 'update')
  );

create policy role_permissions_delete_policy on role_permissions
  for delete using (
    auth.is_admin() or 
    auth.has_permission('role_permissions', 'delete')
  );
