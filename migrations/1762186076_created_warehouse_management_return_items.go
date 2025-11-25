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
					"collectionId": "pbc_2733688340",
					"hidden": false,
					"id": "relation2812165903",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "return",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_267730890",
					"hidden": false,
					"id": "relation3544843437",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "product",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "number787149546",
					"max": null,
					"min": null,
					"name": "quantityExpected",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number2833698925",
					"max": null,
					"min": null,
					"name": "quantityRecevied",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "select3184953411",
					"maxSelect": 1,
					"name": "condition",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "select",
					"values": [
						"sellable",
						"damaged",
						"defective",
						"expired",
						"unsellable"
					]
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
			"id": "pbc_2126709027",
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_OfOcqGlJds` + "`" + ` ON ` + "`" + `warehouse_management_return_items` + "`" + ` (\n  ` + "`" + `return` + "`" + `,\n  ` + "`" + `product` + "`" + `\n)"
			],
			"listRule": null,
			"name": "warehouse_management_return_items",
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
		collection, err := app.FindCollectionByNameOrId("pbc_2126709027")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
