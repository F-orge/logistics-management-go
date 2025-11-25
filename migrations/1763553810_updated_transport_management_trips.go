package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_488978894")
		if err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("geoPoint1181702921")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text4044301838",
			"max": 0,
			"min": 0,
			"name": "startAddress",
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
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text1272699478",
			"max": 0,
			"min": 0,
			"name": "endAddress",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": false,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "geoPoint593843763",
			"name": "coordinates",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "geoPoint"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_488978894")
		if err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"hidden": false,
			"id": "geoPoint1181702921",
			"name": "endLocation",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "geoPoint"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("text4044301838")

		// remove field
		collection.Fields.RemoveById("text1272699478")

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "geoPoint593843763",
			"name": "startLocation",
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
