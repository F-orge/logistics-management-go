package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3413803651")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as totalPaymentsRecorded,\n  sum(amount_paid) as totalAmountPaid,\n  avg(amount_paid) as averagePaymentAmount,\n  count(case when status = 'completed' then 1 end) as completedPayments,\n  count(case when status = 'failed' then 1 end) as failedPayments,\n  count(case when status = 'refunded' then 1 end) as refundedPayments\nfrom payments;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number2577987156")

		// remove field
		collection.Fields.RemoveById("json3510027804")

		// remove field
		collection.Fields.RemoveById("json2467376187")

		// remove field
		collection.Fields.RemoveById("number793391768")

		// remove field
		collection.Fields.RemoveById("number1450137882")

		// remove field
		collection.Fields.RemoveById("number3215091380")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number1795043764",
			"max": null,
			"min": null,
			"name": "totalPaymentsRecorded",
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
			"id": "json995426740",
			"maxSize": 1,
			"name": "totalAmountPaid",
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
			"id": "json3171096694",
			"maxSize": 1,
			"name": "averagePaymentAmount",
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
			"id": "number2950755197",
			"max": null,
			"min": null,
			"name": "completedPayments",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"hidden": false,
			"id": "number1446237556",
			"max": null,
			"min": null,
			"name": "failedPayments",
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
			"id": "number4171845234",
			"max": null,
			"min": null,
			"name": "refundedPayments",
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
		collection, err := app.FindCollectionByNameOrId("pbc_3413803651")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as total_payments_recorded,\n  sum(amount_paid) as total_amount_paid,\n  avg(amount_paid) as average_payment_amount,\n  count(case when status = 'completed' then 1 end) as completed_payments,\n  count(case when status = 'failed' then 1 end) as failed_payments,\n  count(case when status = 'refunded' then 1 end) as refunded_payments\nfrom payments;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number2577987156",
			"max": null,
			"min": null,
			"name": "total_payments_recorded",
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
			"id": "json3510027804",
			"maxSize": 1,
			"name": "total_amount_paid",
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
			"id": "json2467376187",
			"maxSize": 1,
			"name": "average_payment_amount",
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
			"id": "number793391768",
			"max": null,
			"min": null,
			"name": "completed_payments",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"hidden": false,
			"id": "number1450137882",
			"max": null,
			"min": null,
			"name": "failed_payments",
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
			"id": "number3215091380",
			"max": null,
			"min": null,
			"name": "refunded_payments",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number1795043764")

		// remove field
		collection.Fields.RemoveById("json995426740")

		// remove field
		collection.Fields.RemoveById("json3171096694")

		// remove field
		collection.Fields.RemoveById("number2950755197")

		// remove field
		collection.Fields.RemoveById("number1446237556")

		// remove field
		collection.Fields.RemoveById("number4171845234")

		return app.Save(collection)
	})
}
