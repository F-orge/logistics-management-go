-- Add up migration script here
alter table crm.opportunity_products
  drop constraint opportunity_products_pkey;

-- Add the new id column
alter table crm.opportunity_products
  add column id uuid not null default gen_random_uuid();

-- Add a new primary key on the id column
alter table crm.opportunity_products
  add constraint pk_opportunity_products primary key (id);

alter table crm.opportunity_products
  add constraint unique_opportunity_products unique (opportunity_id, product_id);

alter table crm.taggings
  drop constraint taggings_pkey;

alter table crm.taggings
  add column id uuid not null default gen_random_uuid();

alter table crm.taggings
  add constraint pk_taggings primary key (id);

alter table crm.taggings
  add constraint unique_taggings unique (tag_id, record_id, record_type);

