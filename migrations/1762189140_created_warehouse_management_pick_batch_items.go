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
					"collectionId": "pbc_932073577",
					"hidden": false,
					"id": "relation4270542791",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "pickBatch",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_2175921124",
					"hidden": false,
					"id": "relation2488934738",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "salesOrder",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "number434304583",
					"max": 100,
					"min": null,
					"name": "orderPriority",
					"onlyInt": true,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "date1364922343",
					"max": "",
					"min": "",
					"name": "estimatedPickTime",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "number2591281651",
					"max": null,
					"min": null,
					"name": "actualPickTime",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
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
			"id": "pbc_717551979",
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_C76RskmrS1` + "`" + ` ON ` + "`" + `warehouse_management_pick_batch_items` + "`" + ` (\n  ` + "`" + `pickBatch` + "`" + `,\n  ` + "`" + `salesOrder` + "`" + `\n)"
			],
			"listRule": null,
			"name": "warehouse_management_pick_batch_items",
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
		collection, err := app.FindCollectionByNameOrId("pbc_717551979")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
