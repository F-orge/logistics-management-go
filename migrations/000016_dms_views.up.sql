create view "dms"."delivery_tasks_view" as
select
  dt.*,
  json_agg(te.*) as task_events,
  json_agg(pod.*) as proof_of_deliveries,
  json_agg(ctl.*) as customer_tracking_links
from
  "dms"."delivery_tasks" as dt
  left join "dms"."task_events" as te on te.delivery_task_id = dt.id
  left join "dms"."proof_of_deliveries" as pod on pod.delivery_task_id = dt.id
  left join "dms"."customer_tracking_links" as ctl on ctl.delivery_task_id = dt.id
group by
  dt.id;

create view "dms"."delivery_routes_view" as
select
  dr.*,
  json_agg(dtv.*) as delivery_tasks
from
  "dms"."delivery_routes" as dr
  left join "dms"."delivery_tasks_view" as dtv on dtv.delivery_route_id = dr.id
group by
  dr.id;