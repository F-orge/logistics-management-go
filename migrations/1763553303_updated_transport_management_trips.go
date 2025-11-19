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

		// add field
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

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"hidden": false,
			"id": "date2393256231",
			"max": "",
			"min": "",
			"name": "startTime",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "date"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"hidden": false,
			"id": "date4098681852",
			"max": "",
			"min": "",
			"name": "endTime",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "date"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_488978894")
		if err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("geoPoint593843763")

		// remove field
		collection.Fields.RemoveById("geoPoint1181702921")

		// remove field
		collection.Fields.RemoveById("date2393256231")

		// remove field
		collection.Fields.RemoveById("date4098681852")

		return app.Save(collection)
	})
}
