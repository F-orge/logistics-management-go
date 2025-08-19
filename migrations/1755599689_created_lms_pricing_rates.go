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
					"collectionId": "pbc_15274658",
					"hidden": false,
					"id": "relation131439638",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "shipping_service",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_1109895672",
					"hidden": false,
					"id": "relation1740978423",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "origin_zone",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_1109895672",
					"hidden": false,
					"id": "relation55200054",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "destination_zone",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "number1174399881",
					"max": null,
					"min": 0,
					"name": "weight_min",
					"onlyInt": false,
					"presentable": false,
					"required": true,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number2045957328",
					"max": null,
					"min": 0,
					"name": "weight_max",
					"onlyInt": false,
					"presentable": false,
					"required": true,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number1234170313",
					"max": null,
					"min": 0,
					"name": "base_rate",
					"onlyInt": false,
					"presentable": false,
					"required": true,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number680770000",
					"max": null,
					"min": 0,
					"name": "per_kg_rate",
					"onlyInt": false,
					"presentable": false,
					"required": true,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number3355429605",
					"max": null,
					"min": null,
					"name": "fuel_surcharge_rate",
					"onlyInt": false,
					"presentable": false,
					"required": true,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "date790377260",
					"max": "",
					"min": "",
					"name": "effective_date",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "date4141751240",
					"max": "",
					"min": "",
					"name": "expiry_date",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
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
			"id": "pbc_2201596844",
			"indexes": [
				"CREATE INDEX ` + "`" + `idx_i1AQzzaBCt` + "`" + ` ON ` + "`" + `lms_pricing_rates` + "`" + ` (\n  ` + "`" + `shipping_service` + "`" + `,\n  ` + "`" + `origin_zone` + "`" + `,\n  ` + "`" + `destination_zone` + "`" + `\n)"
			],
			"listRule": null,
			"name": "lms_pricing_rates",
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
		collection, err := app.FindCollectionByNameOrId("pbc_2201596844")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
