package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_122713032")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as totalInvoices,\n  sum(total_amount) as totalInvoiceAmount,\n  count(case when status = 'paid' then 1 end) as paidInvoicesCount,\n  sum(case when status = 'paid' then total_amount else 0 end) as totalAmountFromPaidInvoice,\n  count(case when status = 'overdue' then 1 end) as overdueInvoicesCount,\n  sum(case when status = 'overdue' then total_amount else 0 end) as totalOverdueAmount\nfrom invoices;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number3570410276")

		// remove field
		collection.Fields.RemoveById("json2615514227")

		// remove field
		collection.Fields.RemoveById("number3793501206")

		// remove field
		collection.Fields.RemoveById("json2099451635")

		// remove field
		collection.Fields.RemoveById("number1751627127")

		// remove field
		collection.Fields.RemoveById("json305278369")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number319622604",
			"max": null,
			"min": null,
			"name": "totalInvoices",
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
			"id": "json3303232355",
			"maxSize": 1,
			"name": "totalInvoiceAmount",
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
			"id": "number787055247",
			"max": null,
			"min": null,
			"name": "paidInvoicesCount",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "json3929862645",
			"maxSize": 1,
			"name": "totalAmountFromPaidInvoice",
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
			"id": "number1872163101",
			"max": null,
			"min": null,
			"name": "overdueInvoicesCount",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"hidden": false,
			"id": "json3234685141",
			"maxSize": 1,
			"name": "totalOverdueAmount",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_122713032")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as total_invoices,\n  sum(total_amount) as total_invoiced_amount,\n  count(case when status = 'paid' then 1 end) as paid_invoices_count,\n  sum(case when status = 'paid' then total_amount else 0 end) as total_amount_from_paid_invoices,\n  count(case when status = 'overdue' then 1 end) as overdue_invoices_count,\n  sum(case when status = 'overdue' then total_amount else 0 end) as total_overdue_amount\nfrom invoices;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number3570410276",
			"max": null,
			"min": null,
			"name": "total_invoices",
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
			"id": "json2615514227",
			"maxSize": 1,
			"name": "total_invoiced_amount",
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
			"id": "number3793501206",
			"max": null,
			"min": null,
			"name": "paid_invoices_count",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "json2099451635",
			"maxSize": 1,
			"name": "total_amount_from_paid_invoices",
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
			"id": "number1751627127",
			"max": null,
			"min": null,
			"name": "overdue_invoices_count",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"hidden": false,
			"id": "json305278369",
			"maxSize": 1,
			"name": "total_overdue_amount",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number319622604")

		// remove field
		collection.Fields.RemoveById("json3303232355")

		// remove field
		collection.Fields.RemoveById("number787055247")

		// remove field
		collection.Fields.RemoveById("json3929862645")

		// remove field
		collection.Fields.RemoveById("number1872163101")

		// remove field
		collection.Fields.RemoveById("json3234685141")

		return app.Save(collection)
	})
}
