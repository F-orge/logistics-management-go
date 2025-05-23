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
					"id": "number682747586",
					"max": null,
					"min": null,
					"name": "total_shipments",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number3320430792",
					"max": null,
					"min": null,
					"name": "delivered_shipments",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number320288760",
					"max": null,
					"min": null,
					"name": "shipments_in_transit",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number2039875676",
					"max": null,
					"min": null,
					"name": "shipment_exceptions",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number3405723663",
					"max": null,
					"min": null,
					"name": "shipments_with_pod",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				}
			],
			"id": "pbc_2046544490",
			"indexes": [],
			"listRule": null,
			"name": "shipmentsOverallKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as total_shipments,\n  count(case when status = 'delivered' then 1 end) as delivered_shipments,\n  count(case when status = 'in-transit' then 1 end) as shipments_in_transit,\n  count(case when status = 'exception' then 1 end) as shipment_exceptions,\n  count(case when proof_of_delivery is not null and proof_of_delivery != '' then 1 end) as shipments_with_pod\nfrom shipments;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2046544490")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
