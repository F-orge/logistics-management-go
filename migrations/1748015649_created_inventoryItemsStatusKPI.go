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
					"id": "json2063623452",
					"maxSize": 1,
					"name": "status",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				},
				{
					"hidden": false,
					"id": "number1519468109",
					"max": null,
					"min": null,
					"name": "item_count_by_status",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "json2803046195",
					"maxSize": 1,
					"name": "quantity_by_status",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				}
			],
			"id": "pbc_1329214695",
			"indexes": [],
			"listRule": null,
			"name": "inventoryItemsStatusKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  status as id,\n  status,\n  count(*) as item_count_by_status,\n  sum(quantity_on_hand) as quantity_by_status\nfrom inventoryitems\ngroup by status;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1329214695")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
