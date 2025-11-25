package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1282758371")
		if err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_3815792949",
			"hidden": false,
			"id": "relation60979949",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "sourceWarehouse",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_3815792949",
			"hidden": false,
			"id": "relation506629134",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "destinationWarehouse",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1282758371")
		if err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("relation60979949")

		// remove field
		collection.Fields.RemoveById("relation506629134")

		return app.Save(collection)
	})
}
