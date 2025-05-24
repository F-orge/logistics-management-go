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
					"id": "_clone_O1Wg",
					"maxSelect": 1,
					"name": "status",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "select",
					"values": [
						"pending_validation",
						"validated",
						"allocated",
						"picking",
						"packing",
						"ready_for_shipment",
						"shipped",
						"delivered",
						"cancelled",
						"on_hold"
					]
				},
				{
					"hidden": false,
					"id": "number3486970514",
					"max": null,
					"min": null,
					"name": "order_count_per_status",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "json1502458901",
					"maxSize": 1,
					"name": "total_amount_for_status",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				}
			],
			"id": "pbc_3420993311",
			"indexes": [],
			"listRule": null,
			"name": "orderStatusKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  status as id,\n  status,\n  count(*) as order_count_per_status,\n  sum(total_amount) as total_amount_for_status\nfrom orders\ngroup by status;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3420993311")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
