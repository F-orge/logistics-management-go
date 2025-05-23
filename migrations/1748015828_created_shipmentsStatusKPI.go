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
					"id": "_clone_iWWz",
					"maxSelect": 1,
					"name": "status",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "select",
					"values": [
						"label_created",
						"pending_pickup",
						"in_transit",
						"out_for_delivery",
						"delivered",
						"exception",
						"returned"
					]
				},
				{
					"hidden": false,
					"id": "number3445317346",
					"max": null,
					"min": null,
					"name": "shipment_count_per_status",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				}
			],
			"id": "pbc_1872399044",
			"indexes": [],
			"listRule": null,
			"name": "shipmentsStatusKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  status as id,\n  status,\n  count(*) as shipment_count_per_status\nfrom shipments\ngroup by status;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1872399044")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
