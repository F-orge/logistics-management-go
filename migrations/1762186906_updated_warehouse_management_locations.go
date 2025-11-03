package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3881146011")
		if err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(14, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_3881146011",
			"hidden": false,
			"id": "relation2716368550",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "parentLocation",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3881146011")
		if err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("relation2716368550")

		return app.Save(collection)
	})
}
