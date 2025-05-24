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
					"id": "json1166304858",
					"maxSize": 1,
					"name": "product_id",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				},
				{
					"hidden": false,
					"id": "json485527126",
					"maxSize": 1,
					"name": "revenue_per_product",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				}
			],
			"id": "pbc_1526079785",
			"indexes": [],
			"listRule": null,
			"name": "orderLineItemsRevenue",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  product as id,\n  product as product_id,\n  sum(subtotal) as revenue_per_product\nfrom orderlineitems\ngroup by product\norder by revenue_per_product desc;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1526079785")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
