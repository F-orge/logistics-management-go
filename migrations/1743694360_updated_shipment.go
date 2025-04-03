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

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"convertURLs": false,
			"hidden": false,
			"id": "editor223244161",
			"maxSize": 0,
			"name": "address",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "editor"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"cascadeDelete": false,
			"collectionId": "_pb_users_auth_",
			"hidden": false,
			"id": "relation4129600413",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "sender_id",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text1533686328",
			"max": 0,
			"min": 0,
			"name": "receiver_name",
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
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"hidden": false,
			"id": "number130897217",
			"max": null,
			"min": null,
			"name": "weight",
			"onlyInt": false,
			"presentable": false,
			"required": true,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(9, []byte(`{
			"hidden": false,
			"id": "select2660055695",
			"maxSelect": 1,
			"name": "weight_type",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"kgs",
				"gs",
				"lbs",
				"tons"
			]
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(10, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text373677737",
			"max": 0,
			"min": 0,
			"name": "transport_reference_id",
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
		if err := collection.Fields.AddMarshaledJSONAt(11, []byte(`{
			"hidden": false,
			"id": "number3735422472",
			"max": null,
			"min": null,
			"name": "delivery_attempts",
			"onlyInt": false,
			"presentable": false,
			"required": true,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(13, []byte(`{
			"hidden": false,
			"id": "file956727292",
			"maxSelect": 99,
			"maxSize": 0,
			"mimeTypes": [],
			"name": "proof_of_delivery",
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
		if err := collection.Fields.AddMarshaledJSONAt(14, []byte(`{
			"hidden": false,
			"id": "select2449473911",
			"maxSelect": 1,
			"name": "shipment_type",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"perishable",
				"non-perishable"
			]
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(15, []byte(`{
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
				"in-process",
				"in-transit",
				"delivered",
				"returned",
				"destroyed"
			]
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(16, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_2905323536",
			"hidden": false,
			"id": "relation4011903398",
			"maxSelect": 999,
			"minSelect": 0,
			"name": "chat_messages",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(17, []byte(`{
			"hidden": false,
			"id": "number3402113753",
			"max": null,
			"min": null,
			"name": "price",
			"onlyInt": false,
			"presentable": false,
			"required": true,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(18, []byte(`{
			"hidden": false,
			"id": "select199275304",
			"maxSelect": 1,
			"name": "price_currency",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"php",
				"usd",
				"euro"
			]
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(19, []byte(`{
			"hidden": false,
			"id": "select3058290911",
			"maxSelect": 1,
			"name": "payment_mode",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"cash",
				"credit",
				"e-wallet"
			]
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(20, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text1890937267",
			"max": 0,
			"min": 0,
			"name": "payment_reference_id",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
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

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"convertURLs": false,
			"hidden": false,
			"id": "editor223244161",
			"maxSize": 0,
			"name": "address",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "editor"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"cascadeDelete": false,
			"collectionId": "_pb_users_auth_",
			"hidden": false,
			"id": "relation4129600413",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "sender_id",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text1533686328",
			"max": 0,
			"min": 0,
			"name": "receiver_name",
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
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"hidden": false,
			"id": "number130897217",
			"max": null,
			"min": null,
			"name": "weight",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(9, []byte(`{
			"hidden": false,
			"id": "select2660055695",
			"maxSelect": 1,
			"name": "weight_type",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"kgs",
				"gs",
				"lbs",
				"tons"
			]
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(10, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text373677737",
			"max": 0,
			"min": 0,
			"name": "transport_reference_id",
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
		if err := collection.Fields.AddMarshaledJSONAt(11, []byte(`{
			"hidden": false,
			"id": "number3735422472",
			"max": null,
			"min": null,
			"name": "delivery_attempts",
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
			"hidden": false,
			"id": "file956727292",
			"maxSelect": 99,
			"maxSize": 0,
			"mimeTypes": [],
			"name": "proof_of_delivery",
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
		if err := collection.Fields.AddMarshaledJSONAt(14, []byte(`{
			"hidden": false,
			"id": "select2449473911",
			"maxSelect": 1,
			"name": "shipment_type",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"perishable",
				"non-perishable"
			]
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(15, []byte(`{
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
				"in-process",
				"in-transit",
				"delivered",
				"returned",
				"destroyed"
			]
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(16, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_2905323536",
			"hidden": false,
			"id": "relation4011903398",
			"maxSelect": 999,
			"minSelect": 0,
			"name": "chat_messages",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(17, []byte(`{
			"hidden": false,
			"id": "number3402113753",
			"max": null,
			"min": null,
			"name": "price",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(18, []byte(`{
			"hidden": false,
			"id": "select199275304",
			"maxSelect": 1,
			"name": "price_currency",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"php",
				"usd",
				"euro"
			]
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(19, []byte(`{
			"hidden": false,
			"id": "select3058290911",
			"maxSelect": 1,
			"name": "payment_mode",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"cash",
				"credit",
				"e-wallet"
			]
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(20, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text1890937267",
			"max": 0,
			"min": 0,
			"name": "payment_reference_id",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": false,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
