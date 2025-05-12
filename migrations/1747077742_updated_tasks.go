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

		// add field
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

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(9, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_3527180448",
			"hidden": false,
			"id": "relation1463054787",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "order_ref",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(10, []byte(`{
			"hidden": false,
			"id": "date3866337329",
			"max": "",
			"min": "",
			"name": "due_date",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "date"
		}`)); err != nil {
			return err
		}

		// add field
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

		// add field
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

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(13, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_4030889036",
			"hidden": false,
			"id": "relation2756210289",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "related_shipment",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
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

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2602490748")
		if err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("select1655102503")

		// remove field
		collection.Fields.RemoveById("relation1463054787")

		// remove field
		collection.Fields.RemoveById("date3866337329")

		// remove field
		collection.Fields.RemoveById("number133141322")

		// remove field
		collection.Fields.RemoveById("select1874629670")

		// remove field
		collection.Fields.RemoveById("relation2756210289")

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
				"pending",
				"in-progress",
				"complete",
				"rejected"
			]
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
