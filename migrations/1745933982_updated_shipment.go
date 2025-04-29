package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1116043461")
		if err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("relation4129600413")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(20, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text2714339541",
			"max": 0,
			"min": 0,
			"name": "sender_name",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1116043461")
		if err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"cascadeDelete": false,
			"collectionId": "_pb_users_auth_",
			"hidden": false,
			"id": "relation4129600413",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "sender_id",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("text2714339541")

		return app.Save(collection)
	})
}
