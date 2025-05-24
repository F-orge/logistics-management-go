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
					"id": "json769146577",
					"maxSize": 1,
					"name": "year_month",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				},
				{
					"hidden": false,
					"id": "number2606520912",
					"max": null,
					"min": null,
					"name": "monthly_order_count",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "json3846493998",
					"maxSize": 1,
					"name": "monthly_revenue",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				}
			],
			"id": "pbc_3565107344",
			"indexes": [],
			"listRule": null,
			"name": "ordersMonthlyKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  strftime('%Y-%m', order_date) as id,\n  strftime('%Y-%m', order_date) as year_month,\n  count(*) as monthly_order_count,\n  sum(total_amount) as monthly_revenue\nfrom orders\ngroup by year_month\norder by year_month desc;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3565107344")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
