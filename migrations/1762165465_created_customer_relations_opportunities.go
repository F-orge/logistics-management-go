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
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"hidden": false,
					"id": "select3262944105",
					"maxSelect": 1,
					"name": "stage",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "select",
					"values": [
						"prospecting",
						"qualification",
						"need-analysis",
						"demo",
						"proposal",
						"negotiation",
						"closed-won",
						"closed-lost"
					]
				},
				{
					"hidden": false,
					"id": "number938369668",
					"max": null,
					"min": null,
					"name": "dealValue",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number3735973451",
					"max": null,
					"min": null,
					"name": "probability",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "date1797306842",
					"max": "",
					"min": "",
					"name": "expectedCloseDate",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"convertURLs": false,
					"hidden": false,
					"id": "editor480611375",
					"maxSize": 0,
					"name": "lostReason",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "editor"
				},
				{
					"hidden": false,
					"id": "select1602912115",
					"maxSelect": 1,
					"name": "source",
					"presentable": false,
					"required": true,
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
						"existing-customer",
						"other"
					]
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
					"collectionId": "pbc_2450301398",
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
					"cascadeDelete": false,
					"collectionId": "pbc_609858025",
					"hidden": false,
					"id": "relation1337919823",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "company",
					"presentable": false,
					"required": false,
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
			"id": "pbc_2753985943",
			"indexes": [],
			"listRule": null,
			"name": "customer_relations_opportunities",
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
		collection, err := app.FindCollectionByNameOrId("pbc_2753985943")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
