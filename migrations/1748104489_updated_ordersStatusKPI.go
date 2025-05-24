package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3420993311")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  status as id,\n  status,\n  count(*) as orderCountPerStatus,\n  sum(total_amount) as totalAmountPerStatus\nfrom orders\ngroup by status;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_8wUI")

		// remove field
		collection.Fields.RemoveById("number3486970514")

		// remove field
		collection.Fields.RemoveById("json1502458901")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "_clone_sS4x",
			"maxSelect": 1,
			"name": "status",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"pending_validation",
				"validated",
				"allocated",
				"picking",
				"packing",
				"ready_for_shipment",
				"shipped",
				"delivered",
				"cancelled",
				"on_hold"
			]
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "number3673828704",
			"max": null,
			"min": null,
			"name": "orderCountPerStatus",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"hidden": false,
			"id": "json1921284036",
			"maxSize": 1,
			"name": "totalAmountPerStatus",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3420993311")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  status as id,\n  status,\n  count(*) as order_count_per_status,\n  sum(total_amount) as total_amount_for_status\nfrom orders\ngroup by status;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "_clone_8wUI",
			"maxSelect": 1,
			"name": "status",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"pending_validation",
				"validated",
				"allocated",
				"picking",
				"packing",
				"ready_for_shipment",
				"shipped",
				"delivered",
				"cancelled",
				"on_hold"
			]
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "number3486970514",
			"max": null,
			"min": null,
			"name": "order_count_per_status",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"hidden": false,
			"id": "json1502458901",
			"maxSize": 1,
			"name": "total_amount_for_status",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_sS4x")

		// remove field
		collection.Fields.RemoveById("number3673828704")

		// remove field
		collection.Fields.RemoveById("json1921284036")

		return app.Save(collection)
	})
}
