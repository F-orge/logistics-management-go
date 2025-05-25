package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_4030889036")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text1042062360",
			"max": 0,
			"min": 0,
			"name": "trackingNumber",
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
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_3866053794",
			"hidden": false,
			"id": "relation1194979612",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "carrier",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
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
				"label-created",
				"pending-pickup",
				"in-transit",
				"out-for-delivery",
				"delivered",
				"exception",
				"returned"
			]
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"hidden": false,
			"id": "date584007325",
			"max": "",
			"min": "",
			"name": "estimatedDeliveryDate",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "date"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"hidden": false,
			"id": "file956727292",
			"maxSelect": 99,
			"maxSize": 0,
			"mimeTypes": [
				"image/jpeg",
				"image/png",
				"image/vnd.mozilla.apng",
				"application/pdf"
			],
			"name": "proofOfDelivery",
			"presentable": false,
			"protected": false,
			"required": true,
			"system": false,
			"thumbs": [],
			"type": "file"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"cascadeDelete": false,
			"collectionId": "_pb_users_auth_",
			"hidden": false,
			"id": "relation291929305",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "driver",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(10, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_867029274",
			"hidden": false,
			"id": "relation841275056",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "departmentAssigned",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_4030889036")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text1042062360",
			"max": 0,
			"min": 0,
			"name": "trackingNumber",
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
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_3866053794",
			"hidden": false,
			"id": "relation1194979612",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "carrier",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
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
				"label_created",
				"pending_pickup",
				"in_transit",
				"out_for_delivery",
				"delivered",
				"exception",
				"returned"
			]
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"hidden": false,
			"id": "date584007325",
			"max": "",
			"min": "",
			"name": "estimatedDeliveryDate",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "date"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"hidden": false,
			"id": "file956727292",
			"maxSelect": 99,
			"maxSize": 0,
			"mimeTypes": [
				"image/jpeg",
				"image/png",
				"image/vnd.mozilla.apng",
				"application/pdf"
			],
			"name": "proofOfDelivery",
			"presentable": false,
			"protected": false,
			"required": false,
			"system": false,
			"thumbs": [],
			"type": "file"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"cascadeDelete": false,
			"collectionId": "_pb_users_auth_",
			"hidden": false,
			"id": "relation291929305",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "driver",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(10, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_867029274",
			"hidden": false,
			"id": "relation841275056",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "departmentAssigned",
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
