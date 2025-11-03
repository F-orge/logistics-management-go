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
					"cascadeDelete": false,
					"collectionId": "pbc_318172927",
					"hidden": false,
					"id": "relation3544843437",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "product",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "number2683508278",
					"max": null,
					"min": null,
					"name": "quantity",
					"onlyInt": true,
					"presentable": false,
					"required": true,
					"system": false,
					"type": "number"
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
			"id": "pbc_3837855169",
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_nGEjuWPbTN` + "`" + ` ON ` + "`" + `customer_relations_opportunity_products` + "`" + ` (\n  ` + "`" + `opportunity` + "`" + `,\n  ` + "`" + `product` + "`" + `\n)"
			],
			"listRule": null,
			"name": "customer_relations_opportunity_products",
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
		collection, err := app.FindCollectionByNameOrId("pbc_3837855169")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
