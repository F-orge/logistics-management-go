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
					"id": "number3941770211",
					"max": null,
					"min": null,
					"name": "total_line_items",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "json2081462908",
					"maxSize": 1,
					"name": "total_quantity_sold",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				},
				{
					"hidden": false,
					"id": "json3335211420",
					"maxSize": 1,
					"name": "total_subtotal_revenue",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				},
				{
					"hidden": false,
					"id": "json2851745785",
					"maxSize": 1,
					"name": "average_quantity_per_line",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				},
				{
					"hidden": false,
					"id": "json1268053724",
					"maxSize": 1,
					"name": "average_price_per_unit",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				}
			],
			"id": "pbc_790022244",
			"indexes": [],
			"listRule": null,
			"name": "orderLineItemsOverallKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as total_line_items,\n  sum(quantity) as total_quantity_sold,\n  sum(subtotal) as total_subtotal_revenue,\n  avg(quantity) as average_quantity_per_line,\n  avg(price_per_unit) as average_price_per_unit\nfrom orderlineitems;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_790022244")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
