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
		if err := collection.Fields.AddMarshaledJSONAt(9, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_3527180448",
			"hidden": false,
			"id": "relation1463054787",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "orderRef",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(10, []byte(`{
			"hidden": false,
			"id": "date3866337329",
			"max": "",
			"min": "",
			"name": "dueDate",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "date"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(11, []byte(`{
			"hidden": false,
			"id": "number133141322",
			"max": null,
			"min": 0,
			"name": "kanbanOrder",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(13, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_4030889036",
			"hidden": false,
			"id": "relation2756210289",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "relatedShipment",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
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

		// update field
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

		return app.Save(collection)
	})
}
