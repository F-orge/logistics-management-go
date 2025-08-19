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
					"collectionId": "pbc_2571834109",
					"hidden": false,
					"id": "relation46866652",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "shipment",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text2825612424",
					"max": 50,
					"min": 0,
					"name": "package_number",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"hidden": false,
					"id": "number130897217",
					"max": null,
					"min": null,
					"name": "weight",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
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
					"id": "select2363381545",
					"maxSelect": 1,
					"name": "type",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "select",
					"values": [
						"box",
						"envelope",
						"tube",
						"pallet",
						"crate",
						"bag"
					]
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
					"id": "number1931214208",
					"max": null,
					"min": null,
					"name": "declared_value",
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
			"id": "pbc_3562526509",
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_Fe5I5yQQxE` + "`" + ` ON ` + "`" + `lms_packages` + "`" + ` (\n  ` + "`" + `shipment` + "`" + `,\n  ` + "`" + `package_number` + "`" + `\n)"
			],
			"listRule": null,
			"name": "lms_packages",
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
		collection, err := app.FindCollectionByNameOrId("pbc_3562526509")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
