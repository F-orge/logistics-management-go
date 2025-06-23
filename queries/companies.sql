
-- name: CreateCompany :one
insert into companies (
  name,
  type,
  address,
  contact_email,
  contact_phone,
  primary_contact_person
) values (
  $1,$2,$3,$4,$5,$6
) returning *;

-- name: GetCompanies :many
select * from companies order by created desc;

-- name: PaginateCompanies :many 
select * from companies order by created desc offset $1 limit $2;

-- name: GetCompanyByType :many
select * from companies where type = $1;

-- name: GetCompanyByID :one
select * from companies where id = $1;

-- name: UpdateCompanyName :one
update companies set name = $1 where id = $2 returning *;

-- name: UpdateCompanyType :one
update companies set type = $1 where id = $2 returning *;

-- name: UpdateCompanyAddress :one
update companies set address = $1 where id = $2 returning *;

-- name: UpdateCompanyEmail :one
update companies set contact_email = $1 where id = $2 returning *;

-- name: UpdateCompanyPhone :one
update companies set contact_phone = $1 where id = $2 returning *;

-- name: UpdateCompanyPrimaryContact :one
update companies set primary_contact_person = $1 where id = $2 returning *;

-- name: DeleteCompany :one
delete from companies where id = $1 returning *;

-- name: SearchCompanies :many
select * from companies where name ilike '%' || @search_text::text || '%' or address ilike '%' || @search_text::text || '%' or contact_email ilike '%' || @search_text::text || '%' or contact_phone ilike '%' || @search_text::text || '%' order by created desc offset @page::integer limit @per_page::integer;