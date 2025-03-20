package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1116771610")
		if err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text3065852031",
			"max": 0,
			"min": 0,
			"name": "message",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": false,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"cascadeDelete": false,
			"collectionId": "_pb_users_auth_",
			"hidden": false,
			"id": "relation1593854671",
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

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_728114816",
			"hidden": false,
			"id": "relation2324571881",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "conversation",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
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
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1116771610")
		if err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("text3065852031")

		// remove field
		collection.Fields.RemoveById("relation1593854671")

		// remove field
		collection.Fields.RemoveById("relation2324571881")

		// remove field
		collection.Fields.RemoveById("file1204091606")

		return app.Save(collection)
	})
}
