-- tms.trip_stops_view
create view "tms"."trip_stops_view" as
select
  ts.*,
  json_agg(pod.*) as proof_of_deliveries
from
  "tms"."trip_stops" as ts
  left join "tms"."proof_of_deliveries" as pod on pod.trip_stop_id = ts.id
group by
  ts.id;

-- tms.vehicles_view
create view "tms"."vehicles_view" as
select
  v.*,
  json_agg(vm.*) as vehicle_maintenance,
  json_agg(gp.*) as gps_pings,
  json_agg(ge.*) as geofence_events
from
  "tms"."vehicles" as v
  left join "tms"."vehicle_maintenance" as vm on vm.vehicle_id = v.id
  left join "tms"."gps_pings" as gp on gp.vehicle_id = v.id
  left join "tms"."geofence_events" as ge on ge.vehicle_id = v.id
group by
  v.id;

-- tms.geofences_view
create view "tms"."geofences_view" as
select
  g.*,
  json_agg(ge.*) as geofence_events
from
  "tms"."geofences" as g
  left join "tms"."geofence_events" as ge on ge.geofence_id = g.id
group by
  g.id;

-- tms.shipment_legs_view
create view "tms"."shipment_legs_view" as
select
  sl.*,
  json_agg(sle.*) as shipment_leg_events
from
  "tms"."shipment_legs" as sl
  left join "tms"."shipment_leg_events" as sle on sle.shipment_leg_id = sl.id
group by
  sl.id;

-- tms.partner_invoices_view
create view "tms"."partner_invoices_view" as
select
  pi.*,
  json_agg(pii.*) as partner_invoice_items
from
  "tms"."partner_invoices" as pi
  left join "tms"."partner_invoice_items" as pii on pii.partner_invoice_id = pi.id
group by
  pi.id;

-- tms.trips_view
create view "tms"."trips_view" as
select
  t.*,
  json_agg(tsv.*) as trip_stops,
  json_agg(r.*) as routes,
  json_agg(e.*) as expenses
from
  "tms"."trips" as t
  left join "tms"."trip_stops_view" as tsv on tsv.trip_id = t.id
  left join "tms"."routes" as r on r.trip_id = t.id
  left join "tms"."expenses" as e on e.trip_id = t.id
group by
  t.id;

-- tms.drivers_view
create view "tms"."drivers_view" as
select
  d.*,
  json_agg(ds.*) as driver_schedules,
  json_agg(e.*) as expenses,
  json_agg(tv.*) as trips
from
  "tms"."drivers" as d
  left join "tms"."driver_schedules" as ds on ds.driver_id = d.id
  left join "tms"."expenses" as e on e.driver_id = d.id
  left join "tms"."trips_view" as tv on tv.driver_id = d.id
group by
  d.id;

-- tms.carriers_view
create view "tms"."carriers_view" as
select
  c.*,
  json_agg(cr.*) as carrier_rates,
  json_agg(slv.*) as shipment_legs,
  json_agg(piv.*) as partner_invoices
from
  "tms"."carriers" as c
  left join "tms"."carrier_rates" as cr on cr.carrier_id = c.id
  left join "tms"."shipment_legs_view" as slv on slv.carrier_id = c.id
  left join "tms"."partner_invoices_view" as piv on piv.carrier_id = c.id
group by
  c.id;
