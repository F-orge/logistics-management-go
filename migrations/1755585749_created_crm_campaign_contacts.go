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
					"collectionId": "pbc_1261286444",
					"hidden": false,
					"id": "relation521474781",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "campaign",
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
					"required": true,
					"system": false,
					"type": "relation"
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
						"sent",
						"opened",
						"clicked",
						"responded",
						"unsubscribe"
					]
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
			"id": "pbc_3111585758",
			"indexes": [
				"CREATE INDEX ` + "`" + `idx_UXw9Y2Whmb` + "`" + ` ON ` + "`" + `crm_campaign_contacts` + "`" + ` (` + "`" + `status` + "`" + `)",
				"CREATE UNIQUE INDEX ` + "`" + `idx_SgTdpu9hq5` + "`" + ` ON ` + "`" + `crm_campaign_contacts` + "`" + ` (\n  ` + "`" + `campaign` + "`" + `,\n  ` + "`" + `contact` + "`" + `\n)"
			],
			"listRule": null,
			"name": "crm_campaign_contacts",
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
		collection, err := app.FindCollectionByNameOrId("pbc_3111585758")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
