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
					"id": "number1174306186",
					"max": null,
					"min": null,
					"name": "items_expiring_soon_count",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "json1807749642",
					"maxSize": 1,
					"name": "quantity_expiring_soon",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				}
			],
			"id": "pbc_1681104920",
			"indexes": [],
			"listRule": null,
			"name": "inventoryItemsExpiryKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as items_expiring_soon_count,\n  sum(quantity_on_hand) as quantity_expiring_soon\nfrom inventoryitems\nwhere expiry_date is not null\n  and expiry_date between date('now') and date('now', '+30 days');",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1681104920")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
