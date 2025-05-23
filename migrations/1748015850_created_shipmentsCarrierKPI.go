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
					"id": "_clone_6R1O",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "carrier_id",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "number495613244",
					"max": null,
					"min": null,
					"name": "shipment_count_per_carrier",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				}
			],
			"id": "pbc_2359164382",
			"indexes": [],
			"listRule": null,
			"name": "shipmentsCarrierKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  carrier as id,\n  carrier as carrier_id,\n  count(*) as shipment_count_per_carrier\nfrom shipments\nwhere carrier is not null and carrier != ''\ngroup by carrier;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2359164382")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
