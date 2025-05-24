package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3205996750")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  customer as id,\n  customer as customerId,\n  count(*) as orderCountPerCustomer,\n  sum(total_amount) as totalSpentByCustomer\nfrom orders\ngroup by customer;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_16Dn")

		// remove field
		collection.Fields.RemoveById("number1246923261")

		// remove field
		collection.Fields.RemoveById("json3534258741")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_3866053794",
			"hidden": false,
			"id": "_clone_63K6",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "customerId",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "number2058670251",
			"max": null,
			"min": null,
			"name": "orderCountPerCustomer",
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
			"id": "json1021640019",
			"maxSize": 1,
			"name": "totalSpentByCustomer",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3205996750")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  customer as id,\n  customer as customer_id,\n  count(*) as order_count_per_customer,\n  sum(total_amount) as total_spent_by_customer\nfrom orders\ngroup by customer;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_3866053794",
			"hidden": false,
			"id": "_clone_16Dn",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "customer_id",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "number1246923261",
			"max": null,
			"min": null,
			"name": "order_count_per_customer",
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
			"id": "json3534258741",
			"maxSize": 1,
			"name": "total_spent_by_customer",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_63K6")

		// remove field
		collection.Fields.RemoveById("number2058670251")

		// remove field
		collection.Fields.RemoveById("json1021640019")

		return app.Save(collection)
	})
}
