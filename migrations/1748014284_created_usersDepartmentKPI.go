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
					"id": "_clone_7ydc",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "department_id",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "number592191148",
					"max": null,
					"min": null,
					"name": "user_count_per_department",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				}
			],
			"id": "pbc_4245624634",
			"indexes": [],
			"listRule": null,
			"name": "usersDepartmentKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  department as id,\n  department as department_id,\n  count(*) as user_count_per_department\nfrom users\nwhere department is not null and department != ''\ngroup by department;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_4245624634")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
