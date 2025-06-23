
-- name: CreateDepartment :one
insert into departments (name, description)
values (
  @name::text, 
  @description::text
)
returning *;

-- name: GetAllDepartments :many
select * from departments order by created desc; 

-- name: PaginateDepartment :many 
select * from departments order by created desc offset @page::integer limit @per_page::integer; 

-- name: GetDepartmentByID :one
select * from departments where id = @id::uuid;

-- name: UpdateDepartmentName :one
update departments set name = @name::text where id = @id::uuid returning *;

-- name: UpdateDepartmentDescription :one
update departments set description = @description::text where id = @id::uuid returning *;

-- name: DeleteDepartment :one
delete from departments where id = @id::uuid returning *;

-- name: SearchDepartments :many
select * from departments where name ilike '%' || @search_text::text || '%' or description ilike '%' || @search_text::text || '%'
order by created desc offset @page::integer limit @per_page::integer;

-- name: AssignUserToDepartment :one
insert into department_members (department_id, user_id, role)
values (@department_id::uuid, @user_id::uuid, @role::text)
returning *;

-- name: GetDepartmentMembers :many
select u.id, dm.role, u.email, u.name from department_members dm
join auth.users u on dm.user_id = u.id
where dm.department_id = @department_id::uuid
order by dm.created desc offset @page::integer limit @per_page::integer;

-- name: SearchDepartmentMembers :many
select u.id, dm.role, u.email, u.name from department_members dm
join auth.users u on dm.user_id = u.id
where dm.department_id = @department_id::uuid 
and (
  u.email ilike '%' || @search_text::text || '%' 
  or u.name ilike '%' || @search_text::text || '%'
  or dm.role ilike '%' || @search_text::text || '%'
)
order by dm.created desc offset @page::integer limit @per_page::integer;