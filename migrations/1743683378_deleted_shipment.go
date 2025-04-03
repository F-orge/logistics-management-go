package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1116043461")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	}, func(app core.App) error {
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
					"convertURLs": false,
					"hidden": false,
					"id": "editor2333117486",
					"maxSize": 0,
					"name": "from_address",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "editor"
				},
				{
					"convertURLs": false,
					"hidden": false,
					"id": "editor2211861108",
					"maxSize": 0,
					"name": "to_address",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "editor"
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
			"id": "pbc_1116043461",
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_iQDOaMV3JS` + "`" + ` ON ` + "`" + `shipment` + "`" + ` (` + "`" + `name` + "`" + `)"
			],
			"listRule": null,
			"name": "shipment",
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
	})
}
