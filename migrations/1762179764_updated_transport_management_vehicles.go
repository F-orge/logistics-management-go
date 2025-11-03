package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2807194220")
		if err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_1095711047",
			"hidden": false,
			"id": "relation3270971695",
			"maxSelect": 999,
			"minSelect": 0,
			"name": "maintenances",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2807194220")
		if err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("relation3270971695")

		return app.Save(collection)
	})
}
