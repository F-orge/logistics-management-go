package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2602490748")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text724990059",
			"max": 0,
			"min": 0,
			"name": "title",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"convertURLs": false,
			"hidden": false,
			"id": "editor1843675174",
			"maxSize": 0,
			"name": "description",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "editor"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"hidden": false,
			"id": "select2063623452",
			"maxSelect": 1,
			"name": "status",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"todo",
				"scheduled",
				"picking",
				"packing",
				"ready-for-dispatch",
				"in-progress",
				"blocked",
				"review",
				"done",
				"cancelled"
			]
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"cascadeDelete": false,
			"collectionId": "_pb_users_auth_",
			"hidden": false,
			"id": "relation314842844",
			"maxSelect": 999,
			"minSelect": 0,
			"name": "assignees",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"cascadeDelete": false,
			"collectionId": "_pb_users_auth_",
			"hidden": false,
			"id": "relation4283333067",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "assigner",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_867029274",
			"hidden": false,
			"id": "relation3441287562",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "department",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"hidden": false,
			"id": "select1655102503",
			"maxSelect": 1,
			"name": "priority",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"low",
				"medium",
				"high",
				"urgent"
			]
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(11, []byte(`{
			"hidden": false,
			"id": "number133141322",
			"max": null,
			"min": 0,
			"name": "kanban_order",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(12, []byte(`{
			"hidden": false,
			"id": "select1874629670",
			"maxSelect": 1,
			"name": "tags",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"dispatch",
				"warehouse",
				"customer-update",
				"inventory-check",
				"finance-review"
			]
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2602490748")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text724990059",
			"max": 0,
			"min": 0,
			"name": "title",
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
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"convertURLs": false,
			"hidden": false,
			"id": "editor1843675174",
			"maxSize": 0,
			"name": "description",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "editor"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"hidden": false,
			"id": "select2063623452",
			"maxSelect": 1,
			"name": "status",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"todo",
				"scheduled",
				"picking",
				"packing",
				"ready-for-dispatch",
				"in-progress",
				"blocked",
				"review",
				"done",
				"cancelled"
			]
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"cascadeDelete": false,
			"collectionId": "_pb_users_auth_",
			"hidden": false,
			"id": "relation314842844",
			"maxSelect": 999,
			"minSelect": 0,
			"name": "assignees",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"cascadeDelete": false,
			"collectionId": "_pb_users_auth_",
			"hidden": false,
			"id": "relation4283333067",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "assigner",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
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

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"hidden": false,
			"id": "select1655102503",
			"maxSelect": 1,
			"name": "priority",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"low",
				"medium",
				"high",
				"urgent"
			]
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(11, []byte(`{
			"hidden": false,
			"id": "number133141322",
			"max": null,
			"min": null,
			"name": "kanban_order",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(12, []byte(`{
			"hidden": false,
			"id": "select1874629670",
			"maxSelect": 1,
			"name": "tags",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"dispatch",
				"warehouse",
				"customer-update",
				"inventory-check",
				"finance-review"
			]
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
