package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_790022244")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as totalLineItems,\n  sum(quantity) as totalQuantitySold,\n  sum(subtotal) as totalSubtotalRevenue,\n  avg(quantity) as averageQuantityPerLine,\n  avg(price_per_unit) as averagePricePerUnit\nfrom orderlineitems;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number3941770211")

		// remove field
		collection.Fields.RemoveById("json2081462908")

		// remove field
		collection.Fields.RemoveById("json3335211420")

		// remove field
		collection.Fields.RemoveById("json2851745785")

		// remove field
		collection.Fields.RemoveById("json1268053724")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number3833171705",
			"max": null,
			"min": null,
			"name": "totalLineItems",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "json2844617645",
			"maxSize": 1,
			"name": "totalQuantitySold",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"hidden": false,
			"id": "json4258319815",
			"maxSize": 1,
			"name": "totalSubtotalRevenue",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "json2907689268",
			"maxSize": 1,
			"name": "averageQuantityPerLine",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"hidden": false,
			"id": "json2431070507",
			"maxSize": 1,
			"name": "averagePricePerUnit",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_790022244")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as total_line_items,\n  sum(quantity) as total_quantity_sold,\n  sum(subtotal) as total_subtotal_revenue,\n  avg(quantity) as average_quantity_per_line,\n  avg(price_per_unit) as average_price_per_unit\nfrom orderlineitems;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number3941770211",
			"max": null,
			"min": null,
			"name": "total_line_items",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "json2081462908",
			"maxSize": 1,
			"name": "total_quantity_sold",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"hidden": false,
			"id": "json3335211420",
			"maxSize": 1,
			"name": "total_subtotal_revenue",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "json2851745785",
			"maxSize": 1,
			"name": "average_quantity_per_line",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"hidden": false,
			"id": "json1268053724",
			"maxSize": 1,
			"name": "average_price_per_unit",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number3833171705")

		// remove field
		collection.Fields.RemoveById("json2844617645")

		// remove field
		collection.Fields.RemoveById("json4258319815")

		// remove field
		collection.Fields.RemoveById("json2907689268")

		// remove field
		collection.Fields.RemoveById("json2431070507")

		return app.Save(collection)
	})
}
