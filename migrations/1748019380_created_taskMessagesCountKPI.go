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
					"id": "json2377515398",
					"maxSize": 1,
					"name": "task_id",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				},
				{
					"hidden": false,
					"id": "number731760621",
					"max": null,
					"min": null,
					"name": "message_count_in_task",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				}
			],
			"id": "pbc_3248964235",
			"indexes": [],
			"listRule": null,
			"name": "taskMessagesCountKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  task as id,\n  task as task_id,\n  count(*) as message_count_in_task\nfrom taskmessages\ngroup by task\norder by message_count_in_task desc;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3248964235")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
