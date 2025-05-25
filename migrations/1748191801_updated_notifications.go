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

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"cascadeDelete": false,
			"collectionId": "_pb_users_auth_",
			"hidden": false,
			"id": "relation2375276105",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "user",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"hidden": false,
			"id": "select2363381545",
			"maxSelect": 1,
			"name": "type",
			"presentable": false,
			"required": true,
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

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"hidden": false,
			"id": "select1655102503",
			"maxSelect": 1,
			"name": "priority",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"low",
				"medium",
				"high"
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

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"cascadeDelete": false,
			"collectionId": "_pb_users_auth_",
			"hidden": false,
			"id": "relation2375276105",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "user",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
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

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"hidden": false,
			"id": "select1655102503",
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
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
