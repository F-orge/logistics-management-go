-- Add up migration script here
alter table products
alter column width type decimal(10,2) using (width::decimal);

alter table products
alter column height type decimal(10,2) using (height::decimal);

alter table products
alter column length type decimal(10,2) using (length::decimal);

alter table products add column weight decimal(10,2);

alter table products add column dimension_units text not null default 'cm';
alter table products add column weight_units text not null default 'kg';

alter table products add constraint check_positive_dimensions 
  check (width > 0 and height > 0 and length > 0 and weight > 0);