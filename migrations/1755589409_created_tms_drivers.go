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
					"id": "text2349068636",
					"max": 20,
					"min": 0,
					"name": "employee_id",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text2849095986",
					"max": 50,
					"min": 0,
					"name": "first_name",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text3356015194",
					"max": 50,
					"min": 0,
					"name": "last_name",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text3967709522",
					"max": 30,
					"min": 0,
					"name": "license_number",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text1795275867",
					"max": 20,
					"min": 0,
					"name": "phone_number",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"exceptDomains": [],
					"hidden": false,
					"id": "email3885137012",
					"name": "email",
					"onlyDomains": [],
					"presentable": false,
					"required": true,
					"system": false,
					"type": "email"
				},
				{
					"hidden": false,
					"id": "date3695272725",
					"max": "",
					"min": "",
					"name": "hire_date",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "date"
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
						"active",
						"inactive",
						"on_leave",
						"terminated"
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
			"id": "pbc_3451928106",
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_cd3tAn4r2A` + "`" + ` ON ` + "`" + `tms_drivers` + "`" + ` (` + "`" + `employee_id` + "`" + `)",
				"CREATE UNIQUE INDEX ` + "`" + `idx_AXLGqT5pS4` + "`" + ` ON ` + "`" + `tms_drivers` + "`" + ` (` + "`" + `email` + "`" + `)"
			],
			"listRule": null,
			"name": "tms_drivers",
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
		collection, err := app.FindCollectionByNameOrId("pbc_3451928106")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
