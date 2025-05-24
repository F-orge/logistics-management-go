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
					"cascadeDelete": false,
					"collectionId": "pbc_867029274",
					"hidden": false,
					"id": "_clone_8BGg",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "department_id",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "number3417555239",
					"max": null,
					"min": null,
					"name": "task_count_per_department",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				}
			],
			"id": "pbc_1452701499",
			"indexes": [],
			"listRule": null,
			"name": "tasksDepartmentKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  department as id,\n  department as department_id,\n  count(*) as task_count_per_department\nfrom tasks\nwhere department is not null and department != ''\ngroup by department;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1452701499")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
