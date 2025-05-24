package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1597126291")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  role as id,\n  role,\n  count(*) as userCountPerRole\nfrom users\ngroup by role;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_wcNQ")

		// remove field
		collection.Fields.RemoveById("number1884926188")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "_clone_IONI",
			"maxSelect": 1,
			"name": "role",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"executive",
				"warehouse_manager",
				"dispatch_coordinator",
				"delivery_driver",
				"customer_service_rep",
				"finance_dept",
				"customer_rep",
				"department_manager",
				"department_employee"
			]
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "number2325221315",
			"max": null,
			"min": null,
			"name": "userCountPerRole",
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
		collection, err := app.FindCollectionByNameOrId("pbc_1597126291")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  role as id,\n  role,\n  count(*) as user_count_per_role\nfrom users\ngroup by role;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "_clone_wcNQ",
			"maxSelect": 1,
			"name": "role",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"executive",
				"warehouse_manager",
				"dispatch_coordinator",
				"delivery_driver",
				"customer_service_rep",
				"finance_dept",
				"customer_rep",
				"department_manager",
				"department_employee"
			]
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "number1884926188",
			"max": null,
			"min": null,
			"name": "user_count_per_role",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_IONI")

		// remove field
		collection.Fields.RemoveById("number2325221315")

		return app.Save(collection)
	})
}
