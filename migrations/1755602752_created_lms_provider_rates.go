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
					"collectionId": "pbc_3561239268",
					"hidden": false,
					"id": "relation2462348188",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "provider",
					"presentable": false,
					"required": false,
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
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_1109895672",
					"hidden": false,
					"id": "relation3568767195",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "destination_zones",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "number1174399881",
					"max": null,
					"min": null,
					"name": "weight_min",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number2045957328",
					"max": null,
					"min": null,
					"name": "weight_max",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number1234170313",
					"max": null,
					"min": null,
					"name": "base_rate",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number680770000",
					"max": null,
					"min": null,
					"name": "per_kg_rate",
					"onlyInt": false,
					"presentable": false,
					"required": false,
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
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text1767278655",
					"max": 3,
					"min": 0,
					"name": "currency",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
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
			"id": "pbc_2010718506",
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_BVugYQD2c6` + "`" + ` ON ` + "`" + `lms_provider_rates` + "`" + ` (\n  ` + "`" + `provider` + "`" + `,\n  ` + "`" + `origin_zone` + "`" + `,\n  ` + "`" + `destination_zones` + "`" + `\n)"
			],
			"listRule": null,
			"name": "lms_provider_rates",
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
		collection, err := app.FindCollectionByNameOrId("pbc_2010718506")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
