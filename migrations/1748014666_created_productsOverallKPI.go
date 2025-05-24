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
					"id": "number222648043",
					"max": null,
					"min": null,
					"name": "total_products",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "json2509514797",
					"maxSize": 1,
					"name": "average_product_cost",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				},
				{
					"hidden": false,
					"id": "number1102058749",
					"max": null,
					"min": null,
					"name": "products_with_images",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number1917406527",
					"max": null,
					"min": null,
					"name": "products_without_images",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				}
			],
			"id": "pbc_1844141181",
			"indexes": [],
			"listRule": null,
			"name": "productsOverallKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as total_products,\n  avg(cost) as average_product_cost,\n  count(case when image is not null and image != '' then 1 end) as products_with_images,\n  count(case when image is null or image = '' then 1 end) as products_without_images\nfrom products;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1844141181")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
