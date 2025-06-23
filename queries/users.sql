-- name: CreateUser :one
insert into auth.users (name,email,password) values (@name::text,@email::text,@password::text) returning *;

-- name: GetAllUsers :many
select * from auth.users order by created desc;

-- name: PaginateUsers :many
select * from auth.users order by created desc offset @page::integer limit @per_page::integer;

-- name: GetUserByID :one
select * from auth.users where id = @id::uuid;

-- name: AuthenticateUser :one
select * from auth.users where email = @email::text and password = @password::text;

-- name: UpdateUserEmail :one
update auth.users set email = @new_email::text where email = @old_email::text and id = @id::uuid returning *;

-- name: UpdateUserPassword :one
update auth.users set password = @new_password::text where password = @old_password::text and id = @id::uuid returning *;

-- name: DeleteUser :exec
delete from auth.users where id = @id::uuid;

-- name: SearchUsers :many
select * from auth.users where email ilike '%' || @search_text::text || '%' or name ilike '%' || @search_text::text || '%' order by created desc offset @page::integer limit @per_page::integer;