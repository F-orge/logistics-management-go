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
					"autogeneratePattern": "INVOICE-[A-Z]{10}-[A-Z]{5}-[0-9]{5}",
					"hidden": false,
					"id": "text652125771",
					"max": 0,
					"min": 0,
					"name": "invoiceNumber",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_2753985943",
					"hidden": false,
					"id": "relation2206843863",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "opportunity",
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
						"draft",
						"sent",
						"paid",
						"overdue",
						"cancelled"
					]
				},
				{
					"hidden": false,
					"id": "number3257917790",
					"max": null,
					"min": null,
					"name": "total",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "date3359857795",
					"max": "",
					"min": "",
					"name": "issueDate",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "date3275789471",
					"max": "",
					"min": "",
					"name": "dueDate",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "date1538108716",
					"max": "",
					"min": "",
					"name": "sentAt",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "date2840126091",
					"max": "",
					"min": "",
					"name": "paidAt",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
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
						"bank-transfer",
						"cash",
						"check",
						"paypal",
						"stripe",
						"wire-transfer",
						"other",
						"maya",
						"gcash"
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
			"id": "pbc_3412302640",
			"indexes": [],
			"listRule": null,
			"name": "customer_relations_invoices",
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
		collection, err := app.FindCollectionByNameOrId("pbc_3412302640")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
