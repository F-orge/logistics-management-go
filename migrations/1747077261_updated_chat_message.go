package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2905323536")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.id != \"\" && @request.auth.id = sender.id &&\n@request.auth.id ~ room.participants.id",
			"deleteRule": "@request.auth.id = sender.id",
			"listRule": "@request.auth.id != \"\" && @request.auth.id ~\nroom.participants.id",
			"name": "chatMessages",
			"updateRule": "@request.auth.id = sender.id",
			"viewRule": "@request.auth.id != \"\" && @request.auth.id ~\nroom.participants.id"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("relation3444829622")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_586301008",
			"hidden": false,
			"id": "relation1923043739",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "room",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"cascadeDelete": false,
			"collectionId": "_pb_users_auth_",
			"hidden": false,
			"id": "relation3074823948",
			"maxSelect": 999,
			"minSelect": 0,
			"name": "read_by",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"cascadeDelete": false,
			"collectionId": "_pb_users_auth_",
			"hidden": false,
			"id": "relation4129600413",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "sender",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"hidden": false,
			"id": "file1204091606",
			"maxSelect": 99,
			"maxSize": 0,
			"mimeTypes": [
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
				"image/jpeg",
				"image/png",
				"application/pdf",
				"text/plain",
				"application/msword",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
				"application/vnd.ms-excel"
			],
			"name": "attachments",
			"presentable": false,
			"protected": false,
			"required": false,
			"system": false,
			"thumbs": [],
			"type": "file"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2905323536")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.id = @collection.users.id && @request.auth.verified = true",
			"deleteRule": "(@request.auth.id = @collection.users.id && @request.auth.verified = true) && (@request.auth.id = sender_id || @request.auth.id = receiver_id)",
			"listRule": "@request.auth.id = sender_id || @request.auth.id = receiver_id",
			"name": "chat_message",
			"updateRule": "(@request.auth.id = @collection.users.id && @request.auth.verified = true) && (@request.auth.id = sender_id || @request.auth.id = receiver_id)",
			"viewRule": "@request.auth.id = sender_id || @request.auth.id = receiver_id"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"cascadeDelete": false,
			"collectionId": "_pb_users_auth_",
			"hidden": false,
			"id": "relation3444829622",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "receiver_id",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("relation1923043739")

		// remove field
		collection.Fields.RemoveById("relation3074823948")

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"cascadeDelete": false,
			"collectionId": "_pb_users_auth_",
			"hidden": false,
			"id": "relation4129600413",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "sender_id",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "file1204091606",
			"maxSelect": 99,
			"maxSize": 0,
			"mimeTypes": [],
			"name": "attachments",
			"presentable": false,
			"protected": false,
			"required": false,
			"system": false,
			"thumbs": [],
			"type": "file"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
