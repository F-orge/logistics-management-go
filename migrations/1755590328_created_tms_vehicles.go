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
					"autogeneratePattern": "[a-z0-9]{15}",
					"hidden": false,
					"id": "text3208210256",
					"max": 15,
					"min": 15,
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
					"id": "text1062084231",
					"max": 20,
					"min": 0,
					"name": "vehicle_number",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text4121590224",
					"max": 2015,
					"min": 0,
					"name": "license_plate",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"hidden": false,
					"id": "select4265829493",
					"maxSelect": 1,
					"name": "vehicle_type",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "select",
					"values": [
						"van",
						"truck",
						"trailer",
						"motorcycle",
						"car"
					]
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text449607278",
					"max": 30,
					"min": 0,
					"name": "make",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text3616895705",
					"max": 30,
					"min": 0,
					"name": "model",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"hidden": false,
					"id": "date3145888567",
					"max": "",
					"min": "",
					"name": "year",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "number88585372",
					"max": null,
					"min": null,
					"name": "capacity_weight",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number3138399235",
					"max": null,
					"min": null,
					"name": "capacity_volume",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "select2063623452",
					"maxSelect": 1,
					"name": "status",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "select",
					"values": [
						"active",
						"maintenance",
						"retired",
						"out-of-service"
					]
				},
				{
					"hidden": false,
					"id": "autodate2990389176",
					"name": "created",
					"onCreate": true,
					"onUpdate": false,
					"presentable": false,
					"system": false,
					"type": "autodate"
				},
				{
					"hidden": false,
					"id": "autodate3332085495",
					"name": "updated",
					"onCreate": true,
					"onUpdate": true,
					"presentable": false,
					"system": false,
					"type": "autodate"
				}
			],
			"id": "pbc_1513678194",
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_U0x7ulg1UZ` + "`" + ` ON ` + "`" + `tms_vehicles` + "`" + ` (` + "`" + `vehicle_number` + "`" + `)",
				"CREATE UNIQUE INDEX ` + "`" + `idx_j5drSRFQtQ` + "`" + ` ON ` + "`" + `tms_vehicles` + "`" + ` (` + "`" + `license_plate` + "`" + `)"
			],
			"listRule": null,
			"name": "tms_vehicles",
			"system": false,
			"type": "base",
			"updateRule": null,
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1513678194")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
