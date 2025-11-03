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
					"autogeneratePattern": "CASE-[A-Z]{10}-[A-Z]{5}-[0-9]{5}",
					"hidden": false,
					"id": "text1240271890",
					"max": 0,
					"min": 0,
					"name": "caseNumber",
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
					"required": true,
					"system": false,
					"type": "select",
					"values": [
						"new",
						"in-progress",
						"waiting-for-customer",
						"waiting-for-internal",
						"escalated",
						"resolved",
						"closed",
						"cancelled"
					]
				},
				{
					"hidden": false,
					"id": "select1655102503",
					"maxSelect": 1,
					"name": "priority",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "select",
					"values": [
						"critical",
						"high",
						"medium",
						"low"
					]
				},
				{
					"hidden": false,
					"id": "select2363381545",
					"maxSelect": 1,
					"name": "type",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "select",
					"values": [
						"question",
						"problem",
						"complaint",
						"feature-request",
						"bug-report",
						"technical-support"
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
			"id": "pbc_3218199004",
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_mFbmr4u3fO` + "`" + ` ON ` + "`" + `customer_relations_cases` + "`" + ` (` + "`" + `caseNumber` + "`" + `)"
			],
			"listRule": null,
			"name": "customer_relations_cases",
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
		collection, err := app.FindCollectionByNameOrId("pbc_3218199004")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
