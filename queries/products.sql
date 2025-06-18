
-- name: CreateProduct :one
insert into products (sku, name, description, width, height, length, cost, supplier, image_url)
values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
returning *;

-- name: GetProducts :many
select * from products order by created desc offset $1 limit $2;

-- name: GetProductByID :one
select * from products where id = $1;

-- name: UpdateProductName :one
update products set name = $1 where id = $2 returning *;

-- name: UpdateProductDescription :one
update products set description = $1 where id = $2 returning *;

-- name: UpdateProductWidth :one
update products set width = $1 where id = $2 returning *;

-- name: UpdateProductHeight :one
update products set height = $1 where id = $2 returning *;

-- name: UpdateProductLength :one
update products set length = $1 where id = $2 returning *;

-- name: UpdateProductCost :one
update products set cost = $1 where id = $2 returning *;

-- name: UpdateProductSupplier :one
update products set supplier = $1 where id = $2 returning *;

-- name: UpdateProductImageURL :one
update products set image_url = $1 where id = $2 returning *;

-- name: DeleteProduct :one
delete from products where id = $1 returning *;

-- name: SearchProducts :many
select * from products where name ilike '%' || @search_text::text || '%' or description ilike '%' || @search_text::text || '%' or sku ilike '%' || @search_text::text || '%' order by created desc offset @page::integer limit @per_page::integer;

-- name: GetProductsBySupplier :many
select * from products where supplier = $1 order by created desc offset $2 limit $3;
