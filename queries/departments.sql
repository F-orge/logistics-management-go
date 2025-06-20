
-- name: CreateDepartment :one
insert into departments (name, description)
values ($1, $2)
returning *;

-- name: GetDepartments :many
select * from departments order by created desc; 

-- name: PaginateDepartment :many 
select * from departments order by created desc offset $1 limit $2; 

-- name: GetDepartmentByID :one
select * from departments where id = $1;

-- name: UpdateDepartmentName :one
update departments set name = $1 where id = $2 returning *;

-- name: UpdateDepartmentDescription :one
update departments set description = $1 where id = $2 returning *;

-- name: DeleteDepartment :one
delete from departments where id = $1 returning *;

-- name: SearchDepartments :many
select * from departments where name ilike '%' || @search_text::text || '%' or description ilike '%' || @search_text::text || '%'
order by created desc offset @page::integer limit @per_page::integer;

-- name: AssignUserToDepartment :one
insert into department_members (department_id, user_id, role)
values ($1, $2, $3)
returning *;

-- name: GetDepartmentMembers :many
select dm.*, u.email, u.name from department_members dm
join auth.users u on dm.user_id = u.id
where dm.department_id = $1
order by dm.created desc offset $2 limit $3;