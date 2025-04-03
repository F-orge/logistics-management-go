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

		// add field
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

		// add field
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

		// add field
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

		// add field
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

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1116043461")
		if err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number3402113753")

		// remove field
		collection.Fields.RemoveById("select199275304")

		// remove field
		collection.Fields.RemoveById("select3058290911")

		// remove field
		collection.Fields.RemoveById("text1890937267")

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(10, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text373677737",
			"max": 0,
			"min": 0,
			"name": "reference_id",
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
