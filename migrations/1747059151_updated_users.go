package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(10, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_3866053794",
			"hidden": false,
			"id": "relation1337919823",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "company",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(11, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text1146066909",
			"max": 0,
			"min": 0,
			"name": "phone",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": false,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(12, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_867029274",
			"hidden": false,
			"id": "relation3441287562",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "department",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("relation1337919823")

		// remove field
		collection.Fields.RemoveById("text1146066909")

		// remove field
		collection.Fields.RemoveById("relation3441287562")

		return app.Save(collection)
	})
}
