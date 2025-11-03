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
					"max": 0,
					"min": 0,
					"name": "name",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": false,
					"system": false,
					"type": "text"
				},
				{
					"exceptDomains": null,
					"hidden": false,
					"id": "email3885137012",
					"name": "email",
					"onlyDomains": null,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "email"
				},
				{
					"hidden": false,
					"id": "select1602912115",
					"maxSelect": 1,
					"name": "source",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "select",
					"values": [
						"website",
						"referral",
						"social-media",
						"email-campaign",
						"cold-call",
						"event",
						"advertisment",
						"partner",
						"other"
					]
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
						"new",
						"contacted",
						"qualified",
						"unqualified",
						"converted"
					]
				},
				{
					"hidden": false,
					"id": "number848901969",
					"max": 100,
					"min": 1,
					"name": "score",
					"onlyInt": true,
					"presentable": false,
					"required": true,
					"system": false,
					"type": "number"
				},
				{
					"cascadeDelete": false,
					"collectionId": "_pb_users_auth_",
					"hidden": false,
					"id": "relation3479234172",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "owner",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_1164865443",
					"hidden": false,
					"id": "relation521474781",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "campaign",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "date316275234",
					"max": "",
					"min": "",
					"name": "convertedAt",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_2450301398",
					"hidden": false,
					"id": "relation36188694",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "convertedContact",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_609858025",
					"hidden": false,
					"id": "relation32890209",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "convertedCompany",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_2753985943",
					"hidden": false,
					"id": "relation3524676910",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "convertedOpportunity",
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
			"id": "pbc_3025835781",
			"indexes": [],
			"listRule": null,
			"name": "customer_relations_leads",
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
		collection, err := app.FindCollectionByNameOrId("pbc_3025835781")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
