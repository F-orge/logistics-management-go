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

