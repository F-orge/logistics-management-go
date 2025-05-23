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
					"id": "json4129600413",
					"maxSize": 1,
					"name": "sender_id",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				},
				{
					"hidden": false,
					"id": "number1871165449",
					"max": null,
					"min": null,
					"name": "message_count_from_sender",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				}
			],
			"id": "pbc_1622019811",
			"indexes": [],
			"listRule": null,
			"name": "chatMessagesSenderKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  sender as id,\n  sender as sender_id,\n  count(*) as message_count_from_sender\nfrom chatmessages\ngroup by sender\norder by message_count_from_sender desc;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1622019811")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
