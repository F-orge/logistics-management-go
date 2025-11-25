package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1355030704")
		if err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("geoPoint45367233")

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1355030704")
		if err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"hidden": false,
			"id": "geoPoint45367233",
			"name": "heading",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "geoPoint"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
