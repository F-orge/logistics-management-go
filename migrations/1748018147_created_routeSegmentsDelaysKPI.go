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
					"id": "number868225562",
					"max": null,
					"min": null,
					"name": "delayed_segments_count",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				}
			],
			"id": "pbc_3337900063",
			"indexes": [],
			"listRule": null,
			"name": "routeSegmentsDelaysKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  segment_type as id,\n  segment_type,\n  count(case when actual_arrival_time > estimated_arrival_time then 1 end) as delayed_segments_count\nfrom routesegments\nwhere actual_arrival_time is not null and estimated_arrival_time is not null\ngroup by segment_type;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3337900063")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
