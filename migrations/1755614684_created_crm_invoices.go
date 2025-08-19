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
					"id": "text765886983",
					"max": 50,
					"min": 0,
					"name": "invoice_number",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_706374246",
					"hidden": false,
					"id": "relation1337919823",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "company",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_174005470",
					"hidden": false,
					"id": "relation1281549880",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "contact",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "date2824557855",
					"max": "",
					"min": "",
					"name": "invoice_date",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "date3866337329",
					"max": "",
					"min": "",
					"name": "due_date",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "number3097235076",
					"max": null,
					"min": null,
					"name": "subtotal",
					"onlyInt": false,
					"presentable": false,
					"required": true,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number3262847721",
					"max": null,
					"min": null,
					"name": "tax_amount",
					"onlyInt": false,
					"presentable": false,
					"required": true,
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
					"required": true,
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
						"paid",
						"draft",
						"sent",
						"overdue",
						"cancelled"
					]
				},
				{
					"convertURLs": false,
					"hidden": false,
					"id": "editor3756722627",
					"maxSize": 0,
					"name": "payment_terms",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "editor"
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
			"id": "pbc_1395664440",
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_TyZoaLOZFV` + "`" + ` ON ` + "`" + `crm_invoices` + "`" + ` (` + "`" + `invoice_number` + "`" + `)"
			],
			"listRule": null,
			"name": "crm_invoices",
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
		collection, err := app.FindCollectionByNameOrId("pbc_1395664440")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
