
-- name: CreateProduct :one
insert into products (
  sku, 
  name, 
  description, 
  width, 
  height, 
  length, 
  cost, 
  supplier, 
  image_url
)
values (
  @sku::text, 
  @name::text, 
  @description::text, 
  @width::numeric, 
  @height::numeric, 
  @length::numeric, 
  @cost::numeric, 
  @supplier::uuid, 
  @image_url::text
)
returning *;

-- name: GetAllProducts :many
select * from products order by created desc;

-- name: PaginateProducts :many
select * from products order by created desc offset @page::integer limit @per_page::integer;

-- name: GetProductByID :one
select * from products where id = @id::uuid;

-- name: UpdateProductName :one
update products set name = @name::text where id = @id::uuid returning *;

-- name: UpdateProductDescription :one
update products set description = @description::text where id = @id::uuid returning *;

-- name: UpdateProductWidth :one
update products set width = @width::numeric where id = @id::uuid returning *;

-- name: UpdateProductHeight :one
update products set height = @height::numeric where id = @id::uuid returning *;

-- name: UpdateProductLength :one
update products set length = @length::numeric where id = @id::uuid returning *;

-- name: UpdateProductCost :one
update products set cost = @cost::numeric where id = @id::uuid returning *;

-- name: UpdateProductSupplier :one
update products set supplier = @supplier::uuid where id = @id::uuid returning *;

-- name: UpdateProductImageURL :one
update products set image_url = @image_url::text where id = @id::uuid returning *;

-- name: DeleteProduct :one
delete from products where id = @id::uuid returning *;

-- name: SearchProducts :many
select * from products where name ilike '%' || @search_text::text || '%' or description ilike '%' || @search_text::text || '%' or sku ilike '%' || @search_text::text || '%' order by created desc offset @page::integer limit @per_page::integer;

-- name: GetProductsBySupplier :many
select * from products where supplier = @supplier::uuid order by created desc offset @page::integer limit @per_page::integer;
