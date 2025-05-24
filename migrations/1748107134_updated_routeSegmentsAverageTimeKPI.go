package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2571476646")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  segment_type as id,\n  segment_type as segmentType,\n  avg(case\n    when actual_arrival_time is not null and actual_departure_time is not null\n    then (julianday(actual_departure_time) - julianday(actual_arrival_time)) * 24 * 60\n    else null\n  end) as avgDurationMinutesAtSegment\nfrom routesegments\nwhere actual_arrival_time is not null and actual_departure_time is not null\ngroup by segment_type;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("json1400754292")

		// remove field
		collection.Fields.RemoveById("json2373431106")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "json2733604673",
			"maxSize": 1,
			"name": "segmentType",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "json3458403154",
			"maxSize": 1,
			"name": "avgDurationMinutesAtSegment",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2571476646")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  segment_type as id,\n  segment_type,\n  avg(case\n    when actual_arrival_time is not null and actual_departure_time is not null\n    then (julianday(actual_departure_time) - julianday(actual_arrival_time)) * 24 * 60\n    else null\n  end) as avg_duration_minutes_at_segment\nfrom routesegments\nwhere actual_arrival_time is not null and actual_departure_time is not null\ngroup by segment_type;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "json1400754292",
			"maxSize": 1,
			"name": "segment_type",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "json2373431106",
			"maxSize": 1,
			"name": "avg_duration_minutes_at_segment",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("json2733604673")

		// remove field
		collection.Fields.RemoveById("json3458403154")

		return app.Save(collection)
	})
}
