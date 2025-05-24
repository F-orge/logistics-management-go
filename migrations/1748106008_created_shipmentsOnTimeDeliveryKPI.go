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
					"id": "json1761485102",
					"maxSize": 1,
					"name": "on_time_shipments",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				},
				{
					"hidden": false,
					"id": "number3729500994",
					"max": null,
					"min": null,
					"name": "total_comparable_delivered_shipments",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "json3330963535",
					"maxSize": 1,
					"name": "on_time_delivery_percentage",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				}
			],
			"id": "pbc_848547135",
			"indexes": [],
			"listRule": null,
			"name": "shipmentsOnTimeDeliveryKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  (row_number() over()) as id,\n  sum(case when actual_delivered_date is not null and estimated_delivered_date is not null and actual_delivered_date <= estimated_delivered_date then 1 else 0 end) as on_time_shipments,\n  count(case when status = 'delivered' and actual_delivered_date is not null and estimated_delivered_date is not null then 1 end) as total_comparable_delivered_shipments,\n  (sum(case when actual_delivered_date is not null and estimated_delivered_date is not null and actual_delivered_date <= estimated_delivered_date then 1.0 else 0.0 end) * 100.0 / count(case when status = 'delivered' and actual_delivered_date is not null and estimated_delivered_date is not null then 1 end)) as on_time_delivery_percentage\nfrom shipments\nwhere status = 'delivered';",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_848547135")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
