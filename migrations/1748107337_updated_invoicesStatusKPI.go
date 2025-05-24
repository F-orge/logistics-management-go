package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1969198537")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  status as id,\n  status,\n  count(*) as invoiceCountPerStatus,\n  sum(total_amount) as totalAmountForStatus\nfrom invoices\ngroup by status;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_kkYW")

		// remove field
		collection.Fields.RemoveById("number2783526668")

		// remove field
		collection.Fields.RemoveById("json1502458901")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "_clone_CpVS",
			"maxSelect": 1,
			"name": "status",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"draft",
				"sent",
				"paid",
				"partially_paid",
				"overdue",
				"void"
			]
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "number541988792",
			"max": null,
			"min": null,
			"name": "invoiceCountPerStatus",
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
			"id": "json1017008375",
			"maxSize": 1,
			"name": "totalAmountForStatus",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1969198537")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  status as id,\n  status,\n  count(*) as invoice_count_per_status,\n  sum(total_amount) as total_amount_for_status\nfrom invoices\ngroup by status;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "_clone_kkYW",
			"maxSelect": 1,
			"name": "status",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"draft",
				"sent",
				"paid",
				"partially_paid",
				"overdue",
				"void"
			]
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "number2783526668",
			"max": null,
			"min": null,
			"name": "invoice_count_per_status",
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
		collection.Fields.RemoveById("_clone_CpVS")

		// remove field
		collection.Fields.RemoveById("number541988792")

		// remove field
		collection.Fields.RemoveById("json1017008375")

		return app.Save(collection)
	})
}
