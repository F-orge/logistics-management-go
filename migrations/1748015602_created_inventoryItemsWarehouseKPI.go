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
					"id": "json1350626526",
					"maxSize": 1,
					"name": "warehouse_id",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				},
				{
					"hidden": false,
					"id": "json1170329869",
					"maxSize": 1,
					"name": "total_quantity_in_warehouse",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				}
			],
			"id": "pbc_1494105500",
			"indexes": [],
			"listRule": null,
			"name": "inventoryItemsWarehouseKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  warehouse as id,\n  warehouse as warehouse_id,\n  sum(quantity_on_hand) as total_quantity_in_warehouse\nfrom inventoryitems\ngroup by warehouse;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1494105500")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
