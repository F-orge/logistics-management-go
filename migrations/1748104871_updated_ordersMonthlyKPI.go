package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3565107344")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  strftime('%Y-%m', order_date) as id,\n  strftime('%Y-%m', order_date) as yearMonth,\n  count(*) as montlyOrderCount,\n  sum(total_amount) as montlyRevenue\nfrom orders\ngroup by yearMonth\norder by yearMonth desc;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("json769146577")

		// remove field
		collection.Fields.RemoveById("number2606520912")

		// remove field
		collection.Fields.RemoveById("json3846493998")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "json3229412475",
			"maxSize": 1,
			"name": "yearMonth",
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
			"id": "number2804009341",
			"max": null,
			"min": null,
			"name": "montlyOrderCount",
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
			"id": "json1407575403",
			"maxSize": 1,
			"name": "montlyRevenue",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3565107344")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  strftime('%Y-%m', order_date) as id,\n  strftime('%Y-%m', order_date) as year_month,\n  count(*) as monthly_order_count,\n  sum(total_amount) as monthly_revenue\nfrom orders\ngroup by year_month\norder by year_month desc;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "json769146577",
			"maxSize": 1,
			"name": "year_month",
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
			"id": "number2606520912",
			"max": null,
			"min": null,
			"name": "monthly_order_count",
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
			"id": "json3846493998",
			"maxSize": 1,
			"name": "monthly_revenue",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("json3229412475")

		// remove field
		collection.Fields.RemoveById("number2804009341")

		// remove field
		collection.Fields.RemoveById("json1407575403")

		return app.Save(collection)
	})
}
