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
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text3208210256",
					"max": 0,
					"min": 0,
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
					"id": "_clone_1pqC",
					"maxSelect": 1,
					"name": "role",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "select",
					"values": [
						"executive",
						"warehouse_manager",
						"dispatch_coordinator",
						"delivery_driver",
						"customer_service_rep",
						"finance_dept",
						"customer_rep",
						"department_manager",
						"department_employee"
					]
				},
				{
					"hidden": false,
					"id": "number1884926188",
					"max": null,
					"min": null,
					"name": "user_count_per_role",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				}
			],
			"id": "pbc_1597126291",
			"indexes": [],
			"listRule": null,
			"name": "usersRoleKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  role as id,\n  role,\n  count(*) as user_count_per_role\nfrom users\ngroup by role;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1597126291")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
