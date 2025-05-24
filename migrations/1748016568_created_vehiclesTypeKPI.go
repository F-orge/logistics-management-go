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
					"autogeneratePattern": "",
					"hidden": false,
					"id": "_clone_Nj6W",
					"max": 0,
					"min": 0,
					"name": "vehicle_type",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": false,
					"system": false,
					"type": "text"
				},
				{
					"hidden": false,
					"id": "number3146598405",
					"max": null,
					"min": null,
					"name": "vehicle_count_per_type",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				}
			],
			"id": "pbc_3120170468",
			"indexes": [],
			"listRule": null,
			"name": "vehiclesTypeKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  type as id,\n  type as vehicle_type,\n  count(*) as vehicle_count_per_type\nfrom vehicles\nwhere type is not null and type != ''\ngroup by type;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3120170468")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
