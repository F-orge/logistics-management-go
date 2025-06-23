
-- name: CreateCompany :one
insert into companies (
  name,
  type,
  address,
  contact_email,
  contact_phone,
  primary_contact_person
) values (
  @name::text,
  @type::text,
  @address::text,
  @contact_email::text,
  @contact_phone::text,
  @primary_contact_person::uuid
) returning *;

-- name: GetAllCompanies :many
select * from companies order by created desc;

-- name: PaginateCompanies :many 
select * from companies order by created desc offset @page::integer limit @per_page::integer;

-- name: GetCompanyByType :many
select * from companies where type = @type::text offset @page::integer limit @per_page::integer;

-- name: GetCompanyByID :one
select * from companies where id = @id::uuid;

-- name: UpdateCompanyName :one
update companies set name = @name::text where id = @id::uuid returning *;

-- name: UpdateCompanyType :one
update companies set type = @type::text where id = @id::uuid returning *;

-- name: UpdateCompanyAddress :one
update companies set address = @address::text where id = @id::uuid returning *;

-- name: UpdateCompanyEmail :one
update companies set contact_email = @contact_email::text where id = @id::uuid returning *;

-- name: UpdateCompanyPhone :one
update companies set contact_phone = @contact_phone::text where id = @id::uuid returning *;

-- name: UpdateCompanyPrimaryContact :one
update companies set primary_contact_person = @primary_contact_person::uuid where id = @id::uuid returning *;

-- name: DeleteCompany :one
delete from companies where id = @id::uuid returning *;

-- name: SearchCompanies :many
select * from companies where name ilike '%' || @search_text::text || '%' or address ilike '%' || @search_text::text || '%' or contact_email ilike '%' || @search_text::text || '%' or contact_phone ilike '%' || @search_text::text || '%' order by created desc offset @page::integer limit @per_page::integer;