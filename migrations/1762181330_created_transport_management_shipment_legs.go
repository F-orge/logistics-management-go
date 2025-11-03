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
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text1012853730",
					"max": 0,
					"min": 0,
					"name": "shipmentId",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": false,
					"system": false,
					"type": "text"
				},
				{
					"hidden": false,
					"id": "number4032298078",
					"max": null,
					"min": null,
					"name": "legSequence",
					"onlyInt": false,
					"presentable": false,
					"required": true,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "geoPoint593843763",
					"name": "startLocation",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "geoPoint"
				},
				{
					"hidden": false,
					"id": "geoPoint1181702921",
					"name": "endLocation",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "geoPoint"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_3084165411",
					"hidden": false,
					"id": "relation1194979612",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "carrier",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_488978894",
					"hidden": false,
					"id": "relation2848527164",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "interalTrip",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "select2063623452",
					"maxSelect": 1,
					"name": "status",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "select",
					"values": [
						"pending",
						"in-transit",
						"delivered",
						"cancelled",
						"failed"
					]
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
			"id": "pbc_2996053313",
			"indexes": [],
			"listRule": null,
			"name": "transport_management_shipment_legs",
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
		collection, err := app.FindCollectionByNameOrId("pbc_2996053313")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
