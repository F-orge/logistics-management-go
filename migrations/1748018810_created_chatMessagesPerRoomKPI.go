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
					"id": "json1410822291",
					"maxSize": 1,
					"name": "room_id",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				},
				{
					"hidden": false,
					"id": "number192695635",
					"max": null,
					"min": null,
					"name": "message_count_in_room",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				}
			],
			"id": "pbc_3627049284",
			"indexes": [],
			"listRule": null,
			"name": "chatMessagesPerRoomKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  room as id,\n  room as room_id,\n  count(*) as message_count_in_room\nfrom chatmessages\ngroup by room\norder by message_count_in_room desc;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3627049284")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
