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
					"autogeneratePattern": "[a-z0-9]{15}",
					"hidden": false,
					"id": "text3208210256",
					"max": 15,
					"min": 15,
					"name": "id",
					"pattern": "^[a-z0-9]+$",
					"presentable": false,
					"primaryKey": true,
					"required": true,
					"system": true,
					"type": "text"
				},
				{
					"cascadeDelete": true,
					"collectionId": "pbc_96911357",
					"hidden": false,
					"id": "relation46407801",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "route",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "number4068490045",
					"max": null,
					"min": 0,
					"name": "sequence_number",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "select1400754292",
					"maxSelect": 1,
					"name": "segment_type",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "select",
					"values": [
						"start_point",
						"pickup",
						"delivery",
						"waypoint"
					]
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text1187477292",
					"max": 0,
					"min": 0,
					"name": "address_text",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": false,
					"system": false,
					"type": "text"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text2246143851",
					"max": 0,
					"min": 0,
					"name": "longitude",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": false,
					"system": false,
					"type": "text"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text1092145443",
					"max": 0,
					"min": 0,
					"name": "latitude",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": false,
					"system": false,
					"type": "text"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text2575139115",
					"max": 0,
					"min": 0,
					"name": "instructions",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": false,
					"system": false,
					"type": "text"
				},
				{
					"hidden": false,
					"id": "date1016751071",
					"max": "",
					"min": "",
					"name": "estimated_arrival_time",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "date1898022378",
					"max": "",
					"min": "",
					"name": "actual_arrival_time",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "date2242141742",
					"max": "",
					"min": "",
					"name": "estimated_departure_time",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "date1862047342",
					"max": "",
					"min": "",
					"name": "actual_departure_time",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_1116043461",
					"hidden": false,
					"id": "relation2756210289",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "related_shipment",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "autodate2990389176",
					"name": "created",
					"onCreate": true,
					"onUpdate": false,
					"presentable": false,
					"system": false,
					"type": "autodate"
				},
				{
					"hidden": false,
					"id": "autodate3332085495",
					"name": "updated",
					"onCreate": true,
					"onUpdate": true,
					"presentable": false,
					"system": false,
					"type": "autodate"
				}
			],
			"id": "pbc_3130472683",
			"indexes": [],
			"listRule": null,
			"name": "routeSegments",
			"system": false,
			"type": "base",
			"updateRule": null,
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3130472683")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
