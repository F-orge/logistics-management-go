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
					"id": "text1579384326",
					"max": 255,
					"min": 0,
					"name": "name",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"hidden": false,
					"id": "select2363381545",
					"maxSelect": 1,
					"name": "type",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "select",
					"values": [
						"shipping",
						"storage",
						"fulfillment",
						"handling",
						"insurance",
						"customs",
						"packaging",
						"returns"
					]
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
					"id": "date1321367048",
					"max": "",
					"min": "",
					"name": "validFrom",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "date2274640688",
					"max": "",
					"min": "",
					"name": "validTo",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"convertURLs": false,
					"hidden": false,
					"id": "editor1843675174",
					"maxSize": 0,
					"name": "description",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "editor"
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
			"id": "pbc_15931691",
			"indexes": [],
			"listRule": null,
			"name": "billing_management_rate_cards",
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
		collection, err := app.FindCollectionByNameOrId("pbc_15931691")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
