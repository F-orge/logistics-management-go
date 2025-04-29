package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1689484905")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "select3129069728",
			"maxSelect": 1,
			"name": "layout_style",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"centered",
				"grid"
			]
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1689484905")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "select3129069728",
			"maxSelect": 1,
			"name": "layout_style",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"carousel",
				"masonary",
				"grid"
			]
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
