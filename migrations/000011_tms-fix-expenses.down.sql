alter table tms.expenses
  drop column if exists description,
  drop column if exists "expense_date";

