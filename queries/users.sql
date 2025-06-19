-- name: CreateUser :one
insert into auth.users (name,email,password) values ($1,$2,$3) returning *;

-- name: GetUsers :many
select * from auth.users;

-- name: GetUserByID :one
select * from auth.users where id = $1;

-- name: AuthenticateUser :one
select * from auth.users where email = @email::text and password = @password::text;

-- name: GetUserByEmail :one
select * from auth.users where email = $1;

-- name: UpdateUserEmail :one
update auth.users set email = @new_email::text where email = @old_email::text and id = @id::uuid returning *;

-- name: UpdateUserPassword :one
update auth.users set password = @new_password::text where password = @old_password::text and id = @id::uuid returning *;

-- name: DeleteUser :exec
delete from auth.users where id = $1;