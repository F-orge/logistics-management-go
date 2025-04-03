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

		// add field
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

		// add field
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

		// add field
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

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(12, []byte(`{
			"hidden": false,
			"id": "number2847735859",
			"max": null,
			"min": null,
			"name": "return_attempts",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
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
		collection.Fields.RemoveById("number130897217")

		// remove field
		collection.Fields.RemoveById("select2660055695")

		// remove field
		collection.Fields.RemoveById("text373677737")

		// remove field
		collection.Fields.RemoveById("number3735422472")

		// remove field
		collection.Fields.RemoveById("number2847735859")

		return app.Save(collection)
	})
}
