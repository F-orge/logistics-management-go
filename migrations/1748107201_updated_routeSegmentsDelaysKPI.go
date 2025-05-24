package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3337900063")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  segment_type as id,\n  segment_type as segmentType,\n  count(case when actual_arrival_time > estimated_arrival_time then 1 end) as delayedSegmentsCount\nfrom routesegments\nwhere actual_arrival_time is not null and estimated_arrival_time is not null\ngroup by segment_type;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("json1400754292")

		// remove field
		collection.Fields.RemoveById("number868225562")

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
			"id": "number1340592471",
			"max": null,
			"min": null,
			"name": "delayedSegmentsCount",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3337900063")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  segment_type as id,\n  segment_type,\n  count(case when actual_arrival_time > estimated_arrival_time then 1 end) as delayed_segments_count\nfrom routesegments\nwhere actual_arrival_time is not null and estimated_arrival_time is not null\ngroup by segment_type;"
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
			"id": "number868225562",
			"max": null,
			"min": null,
			"name": "delayed_segments_count",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("json2733604673")

		// remove field
		collection.Fields.RemoveById("number1340592471")

		return app.Save(collection)
	})
}
