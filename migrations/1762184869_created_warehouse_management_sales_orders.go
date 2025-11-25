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
					"hidden": false,
					"id": "number278557905",
					"max": null,
					"min": null,
					"name": "shippingAddress",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_609858025",
					"hidden": false,
					"id": "relation3343123541",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "client",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_2753985943",
					"hidden": false,
					"id": "relation2206843863",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "opportunity",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "select2063623452",
					"maxSelect": 1,
					"name": "status",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "select",
					"values": [
						"pending",
						"processing",
						"shipped",
						"completed",
						"cancelled"
					]
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text2560262659",
					"max": 0,
					"min": 0,
					"name": "orderNumber",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
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
			"id": "pbc_2175921124",
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_O7OLo3FeqL` + "`" + ` ON ` + "`" + `warehouse_management_sales_orders` + "`" + ` (` + "`" + `orderNumber` + "`" + `)"
			],
			"listRule": null,
			"name": "warehouse_management_sales_orders",
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
		collection, err := app.FindCollectionByNameOrId("pbc_2175921124")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
