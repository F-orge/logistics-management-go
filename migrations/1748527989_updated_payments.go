package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_631030571")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "select2069996022",
			"maxSelect": 1,
			"name": "paymentMethod",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"credit-card",
				"bank-transfer",
				"ach",
				"check",
				"cash",
				"other"
			]
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_631030571")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "select2069996022",
			"maxSelect": 1,
			"name": "paymentMethod",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"credit-card",
				"bank-transfer",
				"ach",
				"check",
				"cash",
				"other"
			]
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
