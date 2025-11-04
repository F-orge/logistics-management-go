package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1007290533")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_2752470042",
			"hidden": false,
			"id": "relation17408128",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "lineItem",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_609858025",
			"hidden": false,
			"id": "relation3343123541",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "client",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"convertURLs": false,
			"hidden": false,
			"id": "editor1001949196",
			"maxSize": 0,
			"name": "reason",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "editor"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "select2063623452",
			"maxSelect": 1,
			"name": "status",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"open",
				"under-review",
				"approved",
				"denied",
				"escalated",
				"closed"
			]
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1007290533")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_2752470042",
			"hidden": false,
			"id": "relation17408128",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "lineItem",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_609858025",
			"hidden": false,
			"id": "relation3343123541",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "client",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"convertURLs": false,
			"hidden": false,
			"id": "editor1001949196",
			"maxSize": 0,
			"name": "reason",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "editor"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "select2063623452",
			"maxSelect": 1,
			"name": "status",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"open",
				"under-review",
				"approved",
				"denied",
				"escalated",
				"closed"
			]
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
