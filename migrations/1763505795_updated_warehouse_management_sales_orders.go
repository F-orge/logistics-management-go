package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2175921124")
		if err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"convertURLs": false,
			"hidden": false,
			"id": "editor278557905",
			"maxSize": 0,
			"name": "shippingAddress",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "editor"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2175921124")
		if err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("editor278557905")

		return app.Save(collection)
	})
}
