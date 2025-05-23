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
					"id": "number2577987156",
					"max": null,
					"min": null,
					"name": "total_payments_recorded",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "json3510027804",
					"maxSize": 1,
					"name": "total_amount_paid",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				},
				{
					"hidden": false,
					"id": "json2467376187",
					"maxSize": 1,
					"name": "average_payment_amount",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				},
				{
					"hidden": false,
					"id": "number793391768",
					"max": null,
					"min": null,
					"name": "completed_payments",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number1450137882",
					"max": null,
					"min": null,
					"name": "failed_payments",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number3215091380",
					"max": null,
					"min": null,
					"name": "refunded_payments",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				}
			],
			"id": "pbc_3413803651",
			"indexes": [],
			"listRule": null,
			"name": "paymentsOverallKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as total_payments_recorded,\n  sum(amount_paid) as total_amount_paid,\n  avg(amount_paid) as average_payment_amount,\n  count(case when status = 'completed' then 1 end) as completed_payments,\n  count(case when status = 'failed' then 1 end) as failed_payments,\n  count(case when status = 'refunded' then 1 end) as refunded_payments\nfrom payments;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3413803651")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
