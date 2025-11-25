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
					"id": "text915832217",
					"max": 0,
					"min": 0,
					"name": "batchNumber",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": false,
					"system": false,
					"type": "text"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_3815792949",
					"hidden": false,
					"id": "relation3971189756",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "warehouse",
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
					"required": false,
					"system": false,
					"type": "select",
					"values": [
						"open",
						"in-progress",
						"completed",
						"cancelled"
					]
				},
				{
					"hidden": false,
					"id": "select340149741",
					"maxSelect": 1,
					"name": "strategy",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "select",
					"values": [
						"batch-picking",
						"zone-picking",
						"wave-picking",
						"single-order-picking",
						"cluster-picking"
					]
				},
				{
					"hidden": false,
					"id": "number1655102503",
					"max": 100,
					"min": null,
					"name": "priority",
					"onlyInt": false,
					"presentable": false,
					"required": true,
					"system": false,
					"type": "number"
				},
				{
					"cascadeDelete": false,
					"collectionId": "_pb_users_auth_",
					"hidden": false,
					"id": "relation2073406603",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "assignedUser",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "number2386041639",
					"max": null,
					"min": null,
					"name": "estimatedDuration",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number1158726963",
					"max": null,
					"min": null,
					"name": "actualDuration",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number65152431",
					"max": null,
					"min": null,
					"name": "totalItems",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number427311982",
					"max": null,
					"min": null,
					"name": "completedItems",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "date2640869100",
					"max": "",
					"min": "",
					"name": "startedAt",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "date1718663312",
					"max": "",
					"min": "",
					"name": "completedAt",
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
			"id": "pbc_932073577",
			"indexes": [],
			"listRule": null,
			"name": "warehouse_management_pick_batches",
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
		collection, err := app.FindCollectionByNameOrId("pbc_932073577")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
