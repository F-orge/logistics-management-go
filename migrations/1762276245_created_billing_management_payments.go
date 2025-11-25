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
					"collectionId": "pbc_3547590600",
					"hidden": false,
					"id": "relation2422544196",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "invoice",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "number2392944706",
					"max": null,
					"min": null,
					"name": "amount",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "select2223302008",
					"maxSelect": 1,
					"name": "paymentMethod",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "select",
					"values": [
						"credit-card",
						"debit-card",
						"wallet",
						"qr-ph",
						"client-credit",
						"bank-transfer",
						"cash",
						"check"
					]
				},
				{
					"autogeneratePattern": "TRANSACTION-[A-Z]{10}-[0-9]{10}",
					"hidden": false,
					"id": "text3270783252",
					"max": 0,
					"min": 0,
					"name": "transactionId",
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
					"id": "text2738773813",
					"max": 0,
					"min": 0,
					"name": "gatewayReferenceId",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": false,
					"system": false,
					"type": "text"
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
						"processing",
						"successful",
						"failed",
						"cancelled",
						"refunded"
					]
				},
				{
					"hidden": false,
					"id": "date1889812618",
					"max": "",
					"min": "",
					"name": "paymentDate",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "date2915137033",
					"max": "",
					"min": "",
					"name": "processedAt",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text1767278655",
					"max": 3,
					"min": 0,
					"name": "currency",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": false,
					"system": false,
					"type": "text"
				},
				{
					"hidden": false,
					"id": "number2694037868",
					"max": null,
					"min": null,
					"name": "fees",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number3393962152",
					"max": null,
					"min": null,
					"name": "netAmount",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"convertURLs": false,
					"hidden": false,
					"id": "editor18589324",
					"maxSize": 0,
					"name": "notes",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "editor"
				},
				{
					"cascadeDelete": false,
					"collectionId": "_pb_users_auth_",
					"hidden": false,
					"id": "relation4166867319",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "processedBy",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
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
			"id": "pbc_3700317039",
			"indexes": [],
			"listRule": null,
			"name": "billing_management_payments",
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
		collection, err := app.FindCollectionByNameOrId("pbc_3700317039")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
