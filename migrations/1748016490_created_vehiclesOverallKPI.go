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
					"id": "number2704368971",
					"max": null,
					"min": null,
					"name": "total_vehicles",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "json3770556600",
					"maxSize": 1,
					"name": "average_volume_capacity",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				},
				{
					"hidden": false,
					"id": "json3477448495",
					"maxSize": 1,
					"name": "average_weight_capacity",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				},
				{
					"hidden": false,
					"id": "number71604906",
					"max": null,
					"min": null,
					"name": "available_vehicles",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number138211653",
					"max": null,
					"min": null,
					"name": "vehicles_in_use",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number1164108638",
					"max": null,
					"min": null,
					"name": "vehicles_in_maintenance",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				}
			],
			"id": "pbc_2065599691",
			"indexes": [],
			"listRule": null,
			"name": "vehiclesOverallKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as total_vehicles,\n  avg(capacity_volume) as average_volume_capacity,\n  avg(capacity_weight) as average_weight_capacity,\n  count(case when status = 'available' then 1 end) as available_vehicles,\n  count(case when status = 'in-use' then 1 end) as vehicles_in_use,\n  count(case when status = 'maintenance' then 1 end) as vehicles_in_maintenance\nfrom vehicles;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2065599691")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
