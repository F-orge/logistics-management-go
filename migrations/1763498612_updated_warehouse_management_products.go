package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_267730890")
		if err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(13, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_609858025",
			"hidden": false,
			"id": "relation3343123541",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "client",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_267730890")
		if err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("relation3343123541")

		return app.Save(collection)
	})
}
