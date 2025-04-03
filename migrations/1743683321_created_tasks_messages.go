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
					"collectionId": "pbc_2602490748",
					"hidden": false,
					"id": "relation2377515398",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "task_id",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"convertURLs": false,
					"hidden": false,
					"id": "editor4274335913",
					"maxSize": 0,
					"name": "content",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "editor"
				},
				{
					"cascadeDelete": false,
					"collectionId": "_pb_users_auth_",
					"hidden": false,
					"id": "relation4129600413",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "sender_id",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "file1204091606",
					"maxSelect": 99,
					"maxSize": 0,
					"mimeTypes": [],
					"name": "attachments",
					"presentable": false,
					"protected": false,
					"required": false,
					"system": false,
					"thumbs": [],
					"type": "file"
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
			"id": "pbc_4167172206",
			"indexes": [],
			"listRule": null,
			"name": "tasks_messages",
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
		collection, err := app.FindCollectionByNameOrId("pbc_4167172206")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
