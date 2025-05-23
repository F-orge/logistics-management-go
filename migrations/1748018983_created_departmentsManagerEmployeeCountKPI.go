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
					"autogeneratePattern": "",
					"hidden": false,
					"id": "_clone_HT22",
					"max": 0,
					"min": 0,
					"name": "department_name",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"hidden": false,
					"id": "number2886108248",
					"max": null,
					"min": null,
					"name": "manager_count",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number1842628891",
					"max": null,
					"min": null,
					"name": "employee_count",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				}
			],
			"id": "pbc_2080748545",
			"indexes": [],
			"listRule": null,
			"name": "departmentsManagerEmployeeCountKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n    d.id as id,\n    d.name as department_name,\n    count(distinct case when u.role = 'department_manager' then u.id end) as manager_count,\n    count(distinct case when u.role = 'department_employee' then u.id end) as employee_count\nfrom departments d\nleft join users u on u.department = d.id\ngroup by d.id, d.name;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2080748545")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
