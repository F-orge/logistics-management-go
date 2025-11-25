package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2996053313")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
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

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
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

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"hidden": false,
			"id": "select2063623452",
			"maxSelect": 1,
			"name": "status",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"pending",
				"in-transit",
				"delivered",
				"cancelled",
				"failed"
			]
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2996053313")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"hidden": false,
			"id": "geoPoint593843763",
			"name": "startLocation",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "geoPoint"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "geoPoint1181702921",
			"name": "endLocation",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "geoPoint"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"hidden": false,
			"id": "select2063623452",
			"maxSelect": 1,
			"name": "status",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"pending",
				"in-transit",
				"delivered",
				"cancelled",
				"failed"
			]
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
