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
					"id": "text4224597626",
					"max": 255,
					"min": 0,
					"name": "subject",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"convertURLs": false,
					"hidden": false,
					"id": "editor1843675174",
					"maxSize": 0,
					"name": "description",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "editor"
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
						"open",
						"in_progress",
						"pending_customer",
						"closed"
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
						"low",
						"medium",
						"high",
						"critical"
					]
				},
				{
					"cascadeDelete": true,
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
					"id": "date1561543039",
					"max": "",
					"min": "",
					"name": "closed_at",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
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
			"id": "pbc_3292117547",
			"indexes": [
				"CREATE INDEX ` + "`" + `idx_dHDsOEjC1O` + "`" + ` ON ` + "`" + `crm_cases` + "`" + ` (` + "`" + `contact` + "`" + `)",
				"CREATE INDEX ` + "`" + `idx_FsmAneVkfv` + "`" + ` ON ` + "`" + `crm_cases` + "`" + ` (` + "`" + `status` + "`" + `)",
				"CREATE INDEX ` + "`" + `idx_1yueXo42TX` + "`" + ` ON ` + "`" + `crm_cases` + "`" + ` (` + "`" + `priority` + "`" + `)",
				"CREATE INDEX ` + "`" + `idx_BkeEzwtHBc` + "`" + ` ON ` + "`" + `crm_cases` + "`" + ` (` + "`" + `closed_at` + "`" + `)"
			],
			"listRule": null,
			"name": "crm_cases",
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
		collection, err := app.FindCollectionByNameOrId("pbc_3292117547")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
