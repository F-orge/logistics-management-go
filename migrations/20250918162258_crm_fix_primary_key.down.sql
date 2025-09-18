-- Drop the unique constraint on (opportunity_id, product_id)
alter table crm.opportunity_products
  drop constraint unique_opportunity_products;

-- Drop the new primary key on id
alter table crm.opportunity_products
  drop constraint pk_opportunity_products;

-- Drop the id column
alter table crm.opportunity_products
  drop column id;

-- Restore the original composite primary key
alter table crm.opportunity_products
  add primary key (opportunity_id, product_id);

-- Drop the unique constraint on (tag_id, record_id, record_type)
alter table crm.taggings
  drop constraint unique_taggings;

-- Drop the id column from taggings
alter table crm.taggings
  drop column id;

-- Restore the original composite primary key
alter table crm.taggings
  add primary key (tag_id, record_id, record_type);

