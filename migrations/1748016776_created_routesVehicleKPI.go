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
					"cascadeDelete": false,
					"collectionId": "pbc_1602236899",
					"hidden": false,
					"id": "_clone_hQBu",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "vehicle_id",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "number3624810698",
					"max": null,
					"min": null,
					"name": "route_count_per_vehicle",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				}
			],
			"id": "pbc_2480673742",
			"indexes": [],
			"listRule": null,
			"name": "routesVehicleKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  vehicle_assigned as id,\n  vehicle_assigned as vehicle_id,\n  count(*) as route_count_per_vehicle\nfrom routes\nwhere vehicle_assigned is not null and vehicle_assigned != ''\ngroup by vehicle_assigned;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2480673742")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
