alter table tms.expenses
  add column if not exists description text,
  add column if not exists "expense_date" date;

