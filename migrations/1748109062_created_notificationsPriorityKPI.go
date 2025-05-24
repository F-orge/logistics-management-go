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
					"id": "_clone_WKFI",
					"maxSelect": 1,
					"name": "priority",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "select",
					"values": [
						"low",
						"medium",
						"high"
					]
				},
				{
					"hidden": false,
					"id": "number866865346",
					"max": null,
					"min": null,
					"name": "notificationCountPerPriority",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				}
			],
			"id": "pbc_2552739470",
			"indexes": [],
			"listRule": null,
			"name": "notificationsPriorityKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  priority as id,\n  priority,\n  count(*) as notificationCountPerPriority\nfrom notifications\nwhere priority is not null and priority != ''\ngroup by priority;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2552739470")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
