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
					"collectionId": "pbc_670737719",
					"hidden": false,
					"id": "relation3731384213",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "package",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_1877544058",
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
					"id": "number1384568619",
					"max": null,
					"min": null,
					"name": "sequence",
					"onlyInt": true,
					"presentable": false,
					"required": true,
					"system": false,
					"type": "number"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text634472464",
					"max": 0,
					"min": 0,
					"name": "deliveryAddress",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text2258204368",
					"max": 0,
					"min": 0,
					"name": "recipientName",
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
					"id": "text723999284",
					"max": 0,
					"min": 0,
					"name": "recipientPhone",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": false,
					"system": false,
					"type": "text"
				},
				{
					"convertURLs": false,
					"hidden": false,
					"id": "editor3823913323",
					"maxSize": 0,
					"name": "deliveryInstructions",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "editor"
				},
				{
					"hidden": false,
					"id": "date175036336",
					"max": "",
					"min": "",
					"name": "estimatedArrivalTime",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "date995073212",
					"max": "",
					"min": "",
					"name": "actualArrivalTime",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "date2774680869",
					"max": "",
					"min": "",
					"name": "deliveryTime",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "select2063623452",
					"maxSelect": 1,
					"name": "status",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "select",
					"values": [
						"pending",
						"assigned",
						"out-for-delivery",
						"delivered",
						"failed",
						"cancelled",
						"rescheduled"
					]
				},
				{
					"hidden": false,
					"id": "number1396858223",
					"max": null,
					"min": null,
					"name": "attempCount",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "file1204091606",
					"maxSelect": 99,
					"maxSize": 0,
					"mimeTypes": [],
					"name": "attachments",
					"presentable": false,
					"protected": false,
					"required": false,
					"system": false,
					"thumbs": [],
					"type": "file"
				},
				{
					"hidden": false,
					"id": "select4073615497",
					"maxSelect": 1,
					"name": "failureReason",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "select",
					"values": [
						"reecipient-not-home",
						"address-not-found",
						"refused-delivery",
						"damaged-package",
						"access-denied",
						"weather-conditions",
						"vehicle-breakdown",
						"other"
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
			"id": "pbc_2766347546",
			"indexes": [],
			"listRule": null,
			"name": "delivery_management_tasks",
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
		collection, err := app.FindCollectionByNameOrId("pbc_2766347546")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
