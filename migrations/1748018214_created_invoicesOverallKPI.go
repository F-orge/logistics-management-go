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
					"id": "number3570410276",
					"max": null,
					"min": null,
					"name": "total_invoices",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "json2615514227",
					"maxSize": 1,
					"name": "total_invoiced_amount",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				},
				{
					"hidden": false,
					"id": "number3793501206",
					"max": null,
					"min": null,
					"name": "paid_invoices_count",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "json2099451635",
					"maxSize": 1,
					"name": "total_amount_from_paid_invoices",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				},
				{
					"hidden": false,
					"id": "number1751627127",
					"max": null,
					"min": null,
					"name": "overdue_invoices_count",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "json305278369",
					"maxSize": 1,
					"name": "total_overdue_amount",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				}
			],
			"id": "pbc_122713032",
			"indexes": [],
			"listRule": null,
			"name": "invoicesOverallKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as total_invoices,\n  sum(total_amount) as total_invoiced_amount,\n  count(case when status = 'paid' then 1 end) as paid_invoices_count,\n  sum(case when status = 'paid' then total_amount else 0 end) as total_amount_from_paid_invoices,\n  count(case when status = 'overdue' then 1 end) as overdue_invoices_count,\n  sum(case when status = 'overdue' then total_amount else 0 end) as total_overdue_amount\nfrom invoices;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_122713032")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
