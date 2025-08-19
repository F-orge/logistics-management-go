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
					"collectionId": "pbc_743979837",
					"hidden": false,
					"id": "relation1466534506",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "role",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "select1204587666",
					"maxSelect": 1,
					"name": "action",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "select",
					"values": [
						"create",
						"read",
						"update",
						"delete"
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
			"id": "pbc_3995017606",
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_HPvhIraCNV` + "`" + ` ON ` + "`" + `org_role_actions` + "`" + ` (\n  ` + "`" + `role` + "`" + `,\n  ` + "`" + `action` + "`" + `\n)"
			],
			"listRule": null,
			"name": "org_role_actions",
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
		collection, err := app.FindCollectionByNameOrId("pbc_3995017606")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
