package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1494105500")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  warehouse as id,\n  warehouse as warehouseId,\n  sum(quantityOnHand) as totalQuantityInWarehouse\nfrom inventoryitems\ngroup by warehouse;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("json1350626526")

		// remove field
		collection.Fields.RemoveById("json1170329869")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "json3906886488",
			"maxSize": 1,
			"name": "warehouseId",
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
			"id": "json1695581844",
			"maxSize": 1,
			"name": "totalQuantityInWarehouse",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1494105500")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  warehouse as id,\n  warehouse as warehouse_id,\n  sum(quantity_on_hand) as total_quantity_in_warehouse\nfrom inventoryitems\ngroup by warehouse;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "json1350626526",
			"maxSize": 1,
			"name": "warehouse_id",
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
			"id": "json1170329869",
			"maxSize": 1,
			"name": "total_quantity_in_warehouse",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("json3906886488")

		// remove field
		collection.Fields.RemoveById("json1695581844")

		return app.Save(collection)
	})
}
