package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1116043461")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "select1243222062",
			"maxSelect": 1,
			"name": "transport_mode",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"land",
				"air",
				"sea"
			]
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "select1655102503",
			"maxSelect": 1,
			"name": "priority",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"highest",
				"high",
				"medium",
				"low"
			]
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"hidden": false,
			"id": "file2729472648",
			"maxSelect": 99,
			"maxSize": 0,
			"mimeTypes": [],
			"name": "documents",
			"presentable": false,
			"protected": false,
			"required": false,
			"system": false,
			"thumbs": [],
			"type": "file"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1116043461")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "select1243222062",
			"maxSelect": 1,
			"name": "transport_mode",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"land",
				"air",
				"sea"
			]
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "select1655102503",
			"maxSelect": 1,
			"name": "priority",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"highest",
				"high",
				"medium",
				"low"
			]
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"hidden": false,
			"id": "file2729472648",
			"maxSelect": 99,
			"maxSize": 0,
			"mimeTypes": [],
			"name": "documents",
			"presentable": false,
			"protected": false,
			"required": true,
			"system": false,
			"thumbs": [],
			"type": "file"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
