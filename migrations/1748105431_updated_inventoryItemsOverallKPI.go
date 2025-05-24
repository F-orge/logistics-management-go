package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3686538150")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as totalInventoryRecords,\n  sum(quantity_on_hand) as totalQuantityOnHandAllProducts,\n  count(distinct product) as distinctProductInInventory\nfrom inventoryitems;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number1742669598")

		// remove field
		collection.Fields.RemoveById("json2382295036")

		// remove field
		collection.Fields.RemoveById("number2137024785")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number102956073",
			"max": null,
			"min": null,
			"name": "totalInventoryRecords",
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
			"id": "json3614095915",
			"maxSize": 1,
			"name": "totalQuantityOnHandAllProducts",
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
			"id": "number4006996289",
			"max": null,
			"min": null,
			"name": "distinctProductInInventory",
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
		collection, err := app.FindCollectionByNameOrId("pbc_3686538150")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as total_inventory_records,\n  sum(quantity_on_hand) as total_quantity_on_hand_all_products,\n  count(distinct product) as distinct_products_in_inventory\nfrom inventoryitems;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number1742669598",
			"max": null,
			"min": null,
			"name": "total_inventory_records",
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
			"id": "json2382295036",
			"maxSize": 1,
			"name": "total_quantity_on_hand_all_products",
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
			"id": "number2137024785",
			"max": null,
			"min": null,
			"name": "distinct_products_in_inventory",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number102956073")

		// remove field
		collection.Fields.RemoveById("json3614095915")

		// remove field
		collection.Fields.RemoveById("number4006996289")

		return app.Save(collection)
	})
}
