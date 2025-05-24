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
					"cascadeDelete": false,
					"collectionId": "pbc_3866053794",
					"hidden": false,
					"id": "_clone_ZOW5",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "supplier_id",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "number1580860864",
					"max": null,
					"min": null,
					"name": "product_count_per_supplier",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				}
			],
			"id": "pbc_573103496",
			"indexes": [],
			"listRule": null,
			"name": "productsSupplierKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  supplier as id,\n  supplier as supplier_id,\n  count(*) as product_count_per_supplier\nfrom products\nwhere supplier is not null and supplier != ''\ngroup by supplier;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_573103496")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
