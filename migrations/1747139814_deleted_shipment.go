package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1116043461")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	}, func(app core.App) error {
		jsonData := `{
			"createRule": "@request.auth.role = \"admin\" || @request.auth.role = \"manager\"",
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
					"hidden": false,
					"id": "select1243222062",
					"maxSelect": 1,
					"name": "transport_mode",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "select",
					"values": [
						"land",
						"air",
						"sea"
					]
				},
				{
					"hidden": false,
					"id": "select1655102503",
					"maxSelect": 1,
					"name": "priority",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "select",
					"values": [
						"highest",
						"high",
						"medium",
						"low"
					]
				},
				{
					"hidden": false,
					"id": "file2729472648",
					"maxSelect": 99,
					"maxSize": 0,
					"mimeTypes": [],
					"name": "documents",
					"presentable": false,
					"protected": false,
					"required": false,
					"system": false,
					"thumbs": [],
					"type": "file"
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
					"convertURLs": false,
					"hidden": false,
					"id": "editor223244161",
					"maxSize": 0,
					"name": "address",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "editor"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text1533686328",
					"max": 0,
					"min": 0,
					"name": "receiver_name",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"hidden": false,
					"id": "number130897217",
					"max": null,
					"min": null,
					"name": "weight",
					"onlyInt": false,
					"presentable": false,
					"required": true,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "select2660055695",
					"maxSelect": 1,
					"name": "weight_type",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "select",
					"values": [
						"kgs",
						"gs",
						"lbs",
						"tons"
					]
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text373677737",
					"max": 0,
					"min": 0,
					"name": "transport_reference_id",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"hidden": false,
					"id": "number3735422472",
					"max": null,
					"min": null,
					"name": "delivery_attempts",
					"onlyInt": false,
					"presentable": false,
					"required": true,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number2847735859",
					"max": null,
					"min": null,
					"name": "return_attempts",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "file956727292",
					"maxSelect": 99,
					"maxSize": 0,
					"mimeTypes": [],
					"name": "proof_of_delivery",
					"presentable": false,
					"protected": false,
					"required": false,
					"system": false,
					"thumbs": [],
					"type": "file"
				},
				{
					"hidden": false,
					"id": "select2449473911",
					"maxSelect": 1,
					"name": "shipment_type",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "select",
					"values": [
						"perishable",
						"non-perishable"
					]
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
						"in-process",
						"in-transit",
						"delivered",
						"returned",
						"destroyed"
					]
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_2905323536",
					"hidden": false,
					"id": "relation4011903398",
					"maxSelect": 999,
					"minSelect": 0,
					"name": "chat_messages",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "number3402113753",
					"max": null,
					"min": null,
					"name": "price",
					"onlyInt": false,
					"presentable": false,
					"required": true,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "select199275304",
					"maxSelect": 1,
					"name": "price_currency",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "select",
					"values": [
						"php",
						"usd",
						"euro"
					]
				},
				{
					"hidden": false,
					"id": "select3058290911",
					"maxSelect": 1,
					"name": "payment_mode",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "select",
					"values": [
						"cash",
						"credit",
						"e-wallet"
					]
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text1890937267",
					"max": 0,
					"min": 0,
					"name": "payment_reference_id",
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
					"id": "text2714339541",
					"max": 0,
					"min": 0,
					"name": "sender_name",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
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
			"id": "pbc_1116043461",
			"indexes": [],
			"listRule": "@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"employee\"",
			"name": "shipment",
			"system": false,
			"type": "base",
			"updateRule": "@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"employee\"",
			"viewRule": "@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"employee\""
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
