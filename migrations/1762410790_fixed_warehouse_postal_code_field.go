package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3815792949")
		if err != nil {
			return err
		}

		// Remove the old postalCode field with incorrect phone number pattern
		collection.Fields.RemoveById("text3320367065")

		// Re-add the postalCode field without the invalid pattern
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text3320367065",
			"max": 20,
			"min": 0,
			"name": "postalCode",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": false,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3815792949")
		if err != nil {
			return err
		}

		// Remove the corrected field
		collection.Fields.RemoveById("text3320367065")

		// Restore the original field with invalid phone pattern (for rollback)
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text3320367065",
			"max": 20,
			"min": 0,
			"name": "postalCode",
			"pattern": "\\+(9[976]\\d|8[987530]\\d|6[987]\\d|5[90]\\d|42\\d|3[875]\\d| 2[98654321]\\d|9[8543210]|8[6421]|6[6543210]|5[87654321]| 4[987654310]|3[9643210]|2[70]|7|1)\\d{1,14}$",
			"presentable": false,
			"primaryKey": false,
			"required": false,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
