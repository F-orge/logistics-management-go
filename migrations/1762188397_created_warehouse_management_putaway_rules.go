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
					"cascadeDelete": false,
					"collectionId": "pbc_267730890",
					"hidden": false,
					"id": "relation3544843437",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "product",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_609858025",
					"hidden": false,
					"id": "relation3343123541",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "client",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_3815792949",
					"hidden": false,
					"id": "relation3971189756",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "warehouse",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_3881146011",
					"hidden": false,
					"id": "relation2035490879",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "preferredLocation",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "select5597816",
					"maxSelect": 1,
					"name": "locationType",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "select",
					"values": [
						"receiving-dock",
						"pick-bin",
						"packing-station",
						"cross-dock-area",
						"bulk-storage",
						"reserve-storage",
						"damaged-goods",
						"staging-area",
						"quality-control",
						"returns-area"
					]
				},
				{
					"hidden": false,
					"id": "number1655102503",
					"max": 100,
					"min": null,
					"name": "priority",
					"onlyInt": true,
					"presentable": false,
					"required": true,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number1244902486",
					"max": null,
					"min": null,
					"name": "minQuantity",
					"onlyInt": true,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number2252263257",
					"max": null,
					"min": null,
					"name": "maxQuantity",
					"onlyInt": false,
					"presentable": true,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number225152032",
					"max": null,
					"min": null,
					"name": "weightThreshold",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number579865527",
					"max": null,
					"min": null,
					"name": "volumeThreshold",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "bool1181365634",
					"name": "requireTemperatureControl",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "bool"
				},
				{
					"hidden": false,
					"id": "bool3715594500",
					"name": "requireHazmatApproval",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "bool"
				},
				{
					"hidden": false,
					"id": "bool2323052248",
					"name": "isActive",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "bool"
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
			"id": "pbc_3572287095",
			"indexes": [],
			"listRule": null,
			"name": "warehouse_management_putaway_rules",
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
		collection, err := app.FindCollectionByNameOrId("pbc_3572287095")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
