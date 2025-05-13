package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3905696460")
		if err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"hidden": false,
			"id": "select2363381545",
			"maxSelect": 1,
			"name": "type",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"new_task_assigned",
				"task_updated",
				"order_status_updated",
				"shipment_alert",
				"new_chat_message",
				"system_announcement",
				"mention",
				"task_comment"
			]
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3905696460")
		if err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("select2363381545")

		return app.Save(collection)
	})
}
