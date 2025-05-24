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
					"id": "number758898424",
					"max": null,
					"min": null,
					"name": "total_orders",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "json3304750266",
					"maxSize": 1,
					"name": "total_revenue_from_orders",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				},
				{
					"hidden": false,
					"id": "json3296156873",
					"maxSize": 1,
					"name": "average_order_value",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				},
				{
					"hidden": false,
					"id": "number2219924477",
					"max": null,
					"min": null,
					"name": "delivered_orders",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number290051250",
					"max": null,
					"min": null,
					"name": "cancelled_orders",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number2052496343",
					"max": null,
					"min": null,
					"name": "pending_validation_orders",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number1844496417",
					"max": null,
					"min": null,
					"name": "shipped_orders",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				}
			],
			"id": "pbc_2929443726",
			"indexes": [],
			"listRule": null,
			"name": "ordersOverallKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as total_orders,\n  sum(total_amount) as total_revenue_from_orders,\n  avg(total_amount) as average_order_value,\n  count(case when status = 'delivered' then 1 end) as delivered_orders,\n  count(case when status = 'cancelled' then 1 end) as cancelled_orders,\n  count(case when status = 'pending-validation' then 1 end) as pending_validation_orders,\n  count(case when status = 'shipped' then 1 end) as shipped_orders\nfrom orders;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2929443726")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
