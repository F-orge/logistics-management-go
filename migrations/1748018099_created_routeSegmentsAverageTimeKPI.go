package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		jsonData := `{
			"createRule": null,
			"deleteRule": null,
			"fields": [
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text3208210256",
					"max": 0,
					"min": 0,
					"name": "id",
					"pattern": "^[a-z0-9]+$",
					"presentable": false,
					"primaryKey": true,
					"required": true,
					"system": true,
					"type": "text"
				},
				{
					"hidden": false,
					"id": "json1400754292",
					"maxSize": 1,
					"name": "segment_type",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				},
				{
					"hidden": false,
					"id": "json2373431106",
					"maxSize": 1,
					"name": "avg_duration_minutes_at_segment",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				}
			],
			"id": "pbc_2571476646",
			"indexes": [],
			"listRule": null,
			"name": "routeSegmentsAverageTimeKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  segment_type as id,\n  segment_type,\n  avg(case\n    when actual_arrival_time is not null and actual_departure_time is not null\n    then (julianday(actual_departure_time) - julianday(actual_arrival_time)) * 24 * 60\n    else null\n  end) as avg_duration_minutes_at_segment\nfrom routesegments\nwhere actual_arrival_time is not null and actual_departure_time is not null\ngroup by segment_type;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2571476646")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
