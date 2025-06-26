-- Add down migration script here
-- Drop all RLS policies
-- Drop policies for role_permissions
drop policy if exists role_permissions_delete_policy on role_permissions;

drop policy if exists role_permissions_update_policy on role_permissions;

drop policy if exists role_permissions_insert_policy on role_permissions;

drop policy if exists role_permissions_select_policy on role_permissions;

-- Drop policies for user_roles
drop policy if exists user_roles_delete_policy on user_roles;

drop policy if exists user_roles_update_policy on user_roles;

drop policy if exists user_roles_insert_policy on user_roles;

drop policy if exists user_roles_select_policy on user_roles;

-- Drop policies for permissions
drop policy if exists permissions_delete_policy on permissions;

drop policy if exists permissions_update_policy on permissions;

drop policy if exists permissions_insert_policy on permissions;

drop policy if exists permissions_select_policy on permissions;

-- Drop policies for roles
drop policy if exists roles_delete_policy on roles;

drop policy if exists roles_update_policy on roles;

drop policy if exists roles_insert_policy on roles;

drop policy if exists roles_select_policy on roles;

-- Drop policies for payments
drop policy if exists payments_delete_policy on payments;

drop policy if exists payments_update_policy on payments;

drop policy if exists payments_insert_policy on payments;

drop policy if exists payments_select_policy on payments;

-- Drop policies for invoices
drop policy if exists invoices_delete_policy on invoices;

drop policy if exists invoices_update_policy on invoices;

drop policy if exists invoices_insert_policy on invoices;

drop policy if exists invoices_select_policy on invoices;

-- Drop policies for shipments_on_route
drop policy if exists shipments_on_route_delete_policy on shipments_on_route;

drop policy if exists shipments_on_route_update_policy on shipments_on_route;

drop policy if exists shipments_on_route_insert_policy on shipments_on_route;

drop policy if exists shipments_on_route_select_policy on shipments_on_route;

-- Drop policies for route_segments
drop policy if exists route_segments_delete_policy on route_segments;

drop policy if exists route_segments_update_policy on route_segments;

drop policy if exists route_segments_insert_policy on route_segments;

drop policy if exists route_segments_select_policy on route_segments;

-- Drop policies for routes
drop policy if exists routes_delete_policy on routes;

drop policy if exists routes_update_policy on routes;

drop policy if exists routes_insert_policy on routes;

drop policy if exists routes_select_policy on routes;

-- Drop policies for vehicles
drop policy if exists vehicles_delete_policy on vehicles;

drop policy if exists vehicles_update_policy on vehicles;

drop policy if exists vehicles_insert_policy on vehicles;

drop policy if exists vehicles_select_policy on vehicles;

-- Drop policies for shipments
drop policy if exists shipments_delete_policy on shipments;

drop policy if exists shipments_update_policy on shipments;

drop policy if exists shipments_insert_policy on shipments;

drop policy if exists shipments_select_policy on shipments;

-- Drop policies for department_members
drop policy if exists department_members_delete_policy on department_members;

drop policy if exists department_members_update_policy on department_members;

drop policy if exists department_members_insert_policy on department_members;

drop policy if exists department_members_select_policy on department_members;

-- Drop policies for departments
drop policy if exists departments_delete_policy on departments;

drop policy if exists departments_update_policy on departments;

drop policy if exists departments_insert_policy on departments;

drop policy if exists departments_select_policy on departments;

-- Drop policies for inventory_items
drop policy if exists inventory_items_delete_policy on inventory_items;

drop policy if exists inventory_items_update_policy on inventory_items;

drop policy if exists inventory_items_insert_policy on inventory_items;

drop policy if exists inventory_items_select_policy on inventory_items;

-- Drop policies for order_line_items
drop policy if exists order_line_items_delete_policy on order_line_items;

drop policy if exists order_line_items_update_policy on order_line_items;

drop policy if exists order_line_items_insert_policy on order_line_items;

drop policy if exists order_line_items_select_policy on order_line_items;

-- Drop policies for orders
drop policy if exists orders_delete_policy on orders;

drop policy if exists orders_update_policy on orders;

drop policy if exists orders_insert_policy on orders;

drop policy if exists orders_select_policy on orders;

-- Drop policies for warehouses
drop policy if exists warehouses_delete_policy on warehouses;

drop policy if exists warehouses_update_policy on warehouses;

drop policy if exists warehouses_insert_policy on warehouses;

drop policy if exists warehouses_select_policy on warehouses;

-- Drop policies for products
drop policy if exists products_delete_policy on products;

drop policy if exists products_update_policy on products;

drop policy if exists products_insert_policy on products;

drop policy if exists products_select_policy on products;

-- Drop policies for companies
drop policy if exists companies_delete_policy on companies;

drop policy if exists companies_update_policy on companies;

drop policy if exists companies_insert_policy on companies;

drop policy if exists companies_select_policy on companies;

-- Drop policies for auth.users
drop policy if exists users_delete_policy on auth.users;

drop policy if exists users_update_policy on auth.users;

drop policy if exists users_insert_policy on auth.users;

drop policy if exists users_select_policy on auth.users;

-- Disable RLS for all tables
alter table role_permissions disable row level security;

alter table user_roles disable row level security;

alter table permissions disable row level security;

alter table roles disable row level security;

alter table payments disable row level security;

alter table invoices disable row level security;

alter table shipments_on_route disable row level security;

alter table route_segments disable row level security;

alter table routes disable row level security;

alter table vehicles disable row level security;

alter table shipments disable row level security;

alter table department_members disable row level security;

alter table departments disable row level security;

alter table inventory_items disable row level security;

alter table order_line_items disable row level security;

alter table orders disable row level security;

alter table warehouses disable row level security;

alter table products disable row level security;

alter table companies disable row level security;

alter table auth.users disable row level security;

-- Drop helper functions
drop function if exists auth.has_permission (text, text);

drop function if exists auth.is_admin ();

drop function if exists auth.current_user_id ();