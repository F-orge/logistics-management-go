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
					"collectionId": "pbc_3527180448",
					"hidden": false,
					"id": "relation1463054787",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "order_ref",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text1042062360",
					"max": 0,
					"min": 0,
					"name": "tracking_number",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": false,
					"system": false,
					"type": "text"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_3866053794",
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
					"hidden": false,
					"id": "select2063623452",
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
					"id": "date584007325",
					"max": "",
					"min": "",
					"name": "estimated_delivered_date",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "date3382179549",
					"max": "",
					"min": "",
					"name": "actual_delivered_date",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "file956727292",
					"maxSelect": 1,
					"maxSize": 0,
					"mimeTypes": [
						"image/jpeg",
						"image/png",
						"image/vnd.mozilla.apng",
						"application/pdf"
					],
					"name": "proof_of_delivery",
					"presentable": false,
					"protected": false,
					"required": false,
					"system": false,
					"thumbs": [],
					"type": "file"
				},
				{
					"cascadeDelete": false,
					"collectionId": "_pb_users_auth_",
					"hidden": false,
					"id": "relation291929305",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "driver",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text961715783",
					"max": 0,
					"min": 0,
					"name": "current_location_notes",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": false,
					"system": false,
					"type": "text"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_867029274",
					"hidden": false,
					"id": "relation841275056",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "department_assigned",
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
			"id": "pbc_4030889036",
			"indexes": [],
			"listRule": null,
			"name": "shipments",
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
		collection, err := app.FindCollectionByNameOrId("pbc_4030889036")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
