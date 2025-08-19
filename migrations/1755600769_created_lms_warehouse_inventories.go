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
					"collectionId": "pbc_3981867091",
					"hidden": false,
					"id": "relation3971189756",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "warehouse",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
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
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_3562526509",
					"hidden": false,
					"id": "relation3731384213",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "package",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text4145120728",
					"max": 0,
					"min": 0,
					"name": "location_code",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": false,
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
						"received",
						"stored",
						"picked",
						"shipped"
					]
				},
				{
					"hidden": false,
					"id": "date2267185995",
					"max": "",
					"min": "",
					"name": "arrived_at",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "date303720544",
					"max": "",
					"min": "",
					"name": "departed_at",
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
			"id": "pbc_2466801217",
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_2GX3AEoifv` + "`" + ` ON ` + "`" + `lms_warehouse_inventories` + "`" + ` (\n  ` + "`" + `warehouse` + "`" + `,\n  ` + "`" + `shipment` + "`" + `,\n  ` + "`" + `package` + "`" + `\n)"
			],
			"listRule": null,
			"name": "lms_warehouse_inventories",
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
		collection, err := app.FindCollectionByNameOrId("pbc_2466801217")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
