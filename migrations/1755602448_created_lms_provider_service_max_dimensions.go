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
					"collectionId": "pbc_3561239268",
					"hidden": false,
					"id": "relation2462348188",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "provider",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "number25009842",
					"max": null,
					"min": null,
					"name": "length",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number2350531887",
					"max": null,
					"min": null,
					"name": "width",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number4115522831",
					"max": null,
					"min": null,
					"name": "height",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
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
			"id": "pbc_3254423341",
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_FNpNJKarc9` + "`" + ` ON ` + "`" + `lms_provider_service_max_dimensions` + "`" + ` (\n  ` + "`" + `provider` + "`" + `,\n  ` + "`" + `length` + "`" + `,\n  ` + "`" + `width` + "`" + `,\n  ` + "`" + `height` + "`" + `\n)"
			],
			"listRule": null,
			"name": "lms_provider_service_max_dimensions",
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
		collection, err := app.FindCollectionByNameOrId("pbc_3254423341")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
