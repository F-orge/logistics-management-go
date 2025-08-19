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
					"hidden": false,
					"id": "select2363381545",
					"maxSelect": 1,
					"name": "type",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "select",
					"values": [
						"call",
						"email",
						"meeting",
						"chat",
						"note"
					]
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
					"required": false,
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
					"required": false,
					"system": false,
					"type": "editor"
				},
				{
					"hidden": false,
					"id": "date945480314",
					"max": "",
					"min": "",
					"name": "interaction_date",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "date"
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
					"cascadeDelete": false,
					"collectionId": "pbc_2888577258",
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
			"id": "pbc_1896089724",
			"indexes": [
				"CREATE INDEX ` + "`" + `idx_pTvAO0sMV2` + "`" + ` ON ` + "`" + `crm_interactions` + "`" + ` (` + "`" + `type` + "`" + `)",
				"CREATE INDEX ` + "`" + `idx_LL6iCfHak5` + "`" + ` ON ` + "`" + `crm_interactions` + "`" + ` (` + "`" + `interaction_date` + "`" + `)",
				"CREATE INDEX ` + "`" + `idx_i53CywUEya` + "`" + ` ON ` + "`" + `crm_interactions` + "`" + ` (` + "`" + `contact` + "`" + `)",
				"CREATE INDEX ` + "`" + `idx_hrzvnCzSRY` + "`" + ` ON ` + "`" + `crm_interactions` + "`" + ` (` + "`" + `opportunity` + "`" + `)"
			],
			"listRule": null,
			"name": "crm_interactions",
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
		collection, err := app.FindCollectionByNameOrId("pbc_1896089724")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
