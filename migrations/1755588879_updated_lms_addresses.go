package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1659436351")
		if err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("geoPoint1092145443")

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"hidden": false,
			"id": "geoPoint2246143851",
			"name": "coordinates",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "geoPoint"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1659436351")
		if err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(9, []byte(`{
			"hidden": false,
			"id": "geoPoint1092145443",
			"name": "latitude",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "geoPoint"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"hidden": false,
			"id": "geoPoint2246143851",
			"name": "longitude",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "geoPoint"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
