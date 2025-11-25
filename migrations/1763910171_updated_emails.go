package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2073203996")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"exceptDomains": [],
			"hidden": false,
			"id": "email3105530224",
			"name": "to",
			"onlyDomains": [],
			"presentable": false,
			"required": true,
			"system": false,
			"type": "email"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2073203996")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"exceptDomains": [],
			"hidden": false,
			"id": "email3105530224",
			"name": "from",
			"onlyDomains": [],
			"presentable": false,
			"required": true,
			"system": false,
			"type": "email"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
