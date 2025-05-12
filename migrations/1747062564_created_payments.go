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
					"collectionId": "pbc_711030668",
					"hidden": false,
					"id": "relation2422544196",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "invoice",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "date2333974542",
					"max": "",
					"min": "",
					"name": "payment_date",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "number2484990468",
					"max": null,
					"min": 0.01,
					"name": "amount_paid",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "select2069996022",
					"maxSelect": 1,
					"name": "payment_method",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "select",
					"values": [
						"credit_card",
						"bank_transfer",
						"ach",
						"check",
						"cash",
						"other"
					]
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text801164047",
					"max": 0,
					"min": 0,
					"name": "transaction_id",
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
					"required": true,
					"system": false,
					"type": "select",
					"values": [
						"pending",
						"completed",
						"failed",
						"refunded"
					]
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text18589324",
					"max": 0,
					"min": 0,
					"name": "notes",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": false,
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
			"id": "pbc_631030571",
			"indexes": [],
			"listRule": null,
			"name": "payments",
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
		collection, err := app.FindCollectionByNameOrId("pbc_631030571")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
