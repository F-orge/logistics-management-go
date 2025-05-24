package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_848547135")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  sum(case when actual_delivered_date is not null and estimated_delivered_date is not null and actual_delivered_date <= estimated_delivered_date then 1 else 0 end) as onTimeShipments,\n  count(case when status = 'delivered' and actual_delivered_date is not null and estimated_delivered_date is not null then 1 end) as totalComparableDeliveredShipments,\n  (sum(case when actual_delivered_date is not null and estimated_delivered_date is not null and actual_delivered_date <= estimated_delivered_date then 1.0 else 0.0 end) * 100.0 / count(case when status = 'delivered' and actual_delivered_date is not null and estimated_delivered_date is not null then 1 end)) as onTimeDeliveryPercentage\nfrom shipments\nwhere status = 'delivered';"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("json1761485102")

		// remove field
		collection.Fields.RemoveById("number3729500994")

		// remove field
		collection.Fields.RemoveById("json3330963535")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "json2801028252",
			"maxSize": 1,
			"name": "onTimeShipments",
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
			"id": "number3765536208",
			"max": null,
			"min": null,
			"name": "totalComparableDeliveredShipments",
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
			"id": "json3074081215",
			"maxSize": 1,
			"name": "onTimeDeliveryPercentage",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_848547135")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  sum(case when actual_delivered_date is not null and estimated_delivered_date is not null and actual_delivered_date <= estimated_delivered_date then 1 else 0 end) as on_time_shipments,\n  count(case when status = 'delivered' and actual_delivered_date is not null and estimated_delivered_date is not null then 1 end) as total_comparable_delivered_shipments,\n  (sum(case when actual_delivered_date is not null and estimated_delivered_date is not null and actual_delivered_date <= estimated_delivered_date then 1.0 else 0.0 end) * 100.0 / count(case when status = 'delivered' and actual_delivered_date is not null and estimated_delivered_date is not null then 1 end)) as on_time_delivery_percentage\nfrom shipments\nwhere status = 'delivered';"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "json1761485102",
			"maxSize": 1,
			"name": "on_time_shipments",
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
			"id": "number3729500994",
			"max": null,
			"min": null,
			"name": "total_comparable_delivered_shipments",
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
			"id": "json3330963535",
			"maxSize": 1,
			"name": "on_time_delivery_percentage",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("json2801028252")

		// remove field
		collection.Fields.RemoveById("number3765536208")

		// remove field
		collection.Fields.RemoveById("json3074081215")

		return app.Save(collection)
	})
}
