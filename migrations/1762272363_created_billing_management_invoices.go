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
					"collectionId": "pbc_11546788",
					"hidden": false,
					"id": "relation1802619892",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "quote",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"autogeneratePattern": "INVOICE-[A-Z]{10}-[0-9]{10}",
					"hidden": false,
					"id": "text652125771",
					"max": 0,
					"min": 0,
					"name": "invoiceNumber",
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
						"draft",
						"sent",
						"viewed",
						"paid",
						"partial-paid",
						"past-due",
						"disputed",
						"cancelled",
						"void"
					]
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
					"id": "number3225882586",
					"max": null,
					"min": null,
					"name": "totalAmount",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number2236407663",
					"max": null,
					"min": null,
					"name": "amountPaid",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
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
					"id": "number673137023",
					"max": null,
					"min": null,
					"name": "discountAmount",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number3097235076",
					"max": null,
					"min": null,
					"name": "subtotal",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"convertURLs": false,
					"hidden": false,
					"id": "editor902166298",
					"maxSize": 0,
					"name": "paymentTerms",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "editor"
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
					"cascadeDelete": false,
					"collectionId": "_pb_users_auth_",
					"hidden": false,
					"id": "relation3545646658",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "createdBy",
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
			"id": "pbc_3547590600",
			"indexes": [],
			"listRule": null,
			"name": "billing_management_invoices",
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
		collection, err := app.FindCollectionByNameOrId("pbc_3547590600")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
