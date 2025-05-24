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
					"id": "number4160504139",
					"max": null,
					"min": null,
					"name": "segment_count_per_type",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				}
			],
			"id": "pbc_3222334635",
			"indexes": [],
			"listRule": null,
			"name": "routeSegmentsTypeKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  segment_type as id,\n  segment_type,\n  count(*) as segment_count_per_type\nfrom routesegments\ngroup by segment_type;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3222334635")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
