package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2905323536")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"convertURLs": false,
			"hidden": false,
			"id": "editor4274335913",
			"maxSize": 0,
			"name": "content",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "editor"
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
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_586301008",
			"hidden": false,
			"id": "relation1923043739",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "room",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2905323536")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"convertURLs": false,
			"hidden": false,
			"id": "editor4274335913",
			"maxSize": 0,
			"name": "content",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "editor"
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

		return app.Save(collection)
	})
}
