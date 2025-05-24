package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2049536319")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  product as id,\n  product as productId,\n  sum(quantity) as totalQuantitySold,\n  sum(subtotal) as totalRevenueFromProduct\nfrom orderlineitems\ngroup by product\norder by totalQuantitySold desc;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("json1166304858")

		// remove field
		collection.Fields.RemoveById("json2081462908")

		// remove field
		collection.Fields.RemoveById("json3211609281")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "json913937925",
			"maxSize": 1,
			"name": "productId",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
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
			"id": "json797297818",
			"maxSize": 1,
			"name": "totalRevenueFromProduct",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2049536319")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  product as id,\n  product as product_id,\n  sum(quantity) as total_quantity_sold,\n  sum(subtotal) as total_revenue_from_product\nfrom orderlineitems\ngroup by product\norder by total_quantity_sold desc;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "json1166304858",
			"maxSize": 1,
			"name": "product_id",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
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
			"id": "json3211609281",
			"maxSize": 1,
			"name": "total_revenue_from_product",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("json913937925")

		// remove field
		collection.Fields.RemoveById("json2844617645")

		// remove field
		collection.Fields.RemoveById("json797297818")

		return app.Save(collection)
	})
}
