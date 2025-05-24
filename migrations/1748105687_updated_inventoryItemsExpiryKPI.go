package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1681104920")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as itemsExpiringSoonCount,\n  sum(quantityOnHand) as quantityExpiringSoon\nfrom inventoryitems\nwhere expiry_date is not null\n  and expiry_date between date('now') and date('now', '+30 days');"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number1174306186")

		// remove field
		collection.Fields.RemoveById("json1807749642")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number4123945986",
			"max": null,
			"min": null,
			"name": "itemsExpiringSoonCount",
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
			"id": "json4187385229",
			"maxSize": 1,
			"name": "quantityExpiringSoon",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1681104920")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as items_expiring_soon_count,\n  sum(quantity_on_hand) as quantity_expiring_soon\nfrom inventoryitems\nwhere expiry_date is not null\n  and expiry_date between date('now') and date('now', '+30 days');"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number1174306186",
			"max": null,
			"min": null,
			"name": "items_expiring_soon_count",
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
			"id": "json1807749642",
			"maxSize": 1,
			"name": "quantity_expiring_soon",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number4123945986")

		// remove field
		collection.Fields.RemoveById("json4187385229")

		return app.Save(collection)
	})
}
