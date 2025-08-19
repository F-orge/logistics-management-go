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
					"cascadeDelete": false,
					"collectionId": "pbc_3232226346",
					"hidden": false,
					"id": "relation2462348188",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "provider",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_2571834109",
					"hidden": false,
					"id": "relation46866652",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "shipment",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "select61080894",
					"maxSelect": 1,
					"name": "metric_type",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "select",
					"values": [
						"on_time_delivery",
						"damage_rate",
						"cost_efficiency",
						"customer_satisfaction"
					]
				},
				{
					"hidden": false,
					"id": "number2653661089",
					"max": null,
					"min": null,
					"name": "metric_value",
					"onlyInt": false,
					"presentable": false,
					"required": true,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "date3641234219",
					"max": "",
					"min": "",
					"name": "measurement_date",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "date"
				},
				{
					"convertURLs": false,
					"hidden": false,
					"id": "editor18589324",
					"maxSize": 0,
					"name": "notes",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "editor"
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
			"id": "pbc_2018073632",
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_zIPJSpiVOM` + "`" + ` ON ` + "`" + `lms_provider_performance` + "`" + ` (\n  ` + "`" + `provider` + "`" + `,\n  ` + "`" + `shipment` + "`" + `\n)"
			],
			"listRule": null,
			"name": "lms_provider_performance",
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
		collection, err := app.FindCollectionByNameOrId("pbc_2018073632")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
