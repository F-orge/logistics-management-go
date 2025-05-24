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
					"id": "_clone_YpWP",
					"maxSelect": 1,
					"name": "paymentMethod",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "select",
					"values": [
						"credit_card",
						"bank_transfer",
						"ach",
						"check",
						"cash",
						"other"
					]
				},
				{
					"hidden": false,
					"id": "number2948870915",
					"max": null,
					"min": null,
					"name": "paymentCountPerMethod",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "json92330438",
					"maxSize": 1,
					"name": "totalAmountByMethod",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				}
			],
			"id": "pbc_729658183",
			"indexes": [],
			"listRule": null,
			"name": "paymentsMethodsKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  payment_method as id,\n  payment_method as paymentMethod,\n  count(*) as paymentCountPerMethod,\n  sum(amount_paid) as totalAmountByMethod\nfrom payments\nwhere payment_method is not null and payment_method != ''\ngroup by payment_method;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_729658183")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
