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
					"id": "_clone_jpn8",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "customer_id",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "number1078327899",
					"max": null,
					"min": null,
					"name": "invoice_count_per_customer",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "json3373962486",
					"maxSize": 1,
					"name": "total_invoiced_to_customer",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				}
			],
			"id": "pbc_536973275",
			"indexes": [],
			"listRule": null,
			"name": "invoicesCustomerKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  customer as id,\n  customer as customer_id,\n  count(*) as invoice_count_per_customer,\n  sum(total_amount) as total_invoiced_to_customer\nfrom invoices\ngroup by customer;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_536973275")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
