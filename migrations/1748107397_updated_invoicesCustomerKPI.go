package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_536973275")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  customer as id,\n  customer as customerId,\n  count(*) as invoiceCountPerCustomer,\n  sum(total_amount) as totalInvoicedToCustomer\nfrom invoices\ngroup by customer;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_IHFq")

		// remove field
		collection.Fields.RemoveById("number1078327899")

		// remove field
		collection.Fields.RemoveById("json3373962486")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_3866053794",
			"hidden": false,
			"id": "_clone_mLEp",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "customerId",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "number4116298938",
			"max": null,
			"min": null,
			"name": "invoiceCountPerCustomer",
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
			"id": "json351303861",
			"maxSize": 1,
			"name": "totalInvoicedToCustomer",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_536973275")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  customer as id,\n  customer as customer_id,\n  count(*) as invoice_count_per_customer,\n  sum(total_amount) as total_invoiced_to_customer\nfrom invoices\ngroup by customer;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_3866053794",
			"hidden": false,
			"id": "_clone_IHFq",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "customer_id",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "number1078327899",
			"max": null,
			"min": null,
			"name": "invoice_count_per_customer",
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
			"id": "json3373962486",
			"maxSize": 1,
			"name": "total_invoiced_to_customer",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_mLEp")

		// remove field
		collection.Fields.RemoveById("number4116298938")

		// remove field
		collection.Fields.RemoveById("json351303861")

		return app.Save(collection)
	})
}
