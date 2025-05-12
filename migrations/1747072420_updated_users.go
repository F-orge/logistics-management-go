package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": null,
			"deleteRule": null,
			"listRule": "@request.auth.id != \"\"",
			"updateRule": "@request.auth.id = id || (@request.auth.id ~ department.managers.id &&\n@request.auth.department.id = department.id)",
			"viewRule": "@request.auth.id = id || @request.auth.role = \"executive\" || (@request.auth.id ~\ndepartment.managers.id && @request.auth.department.id =\ndepartment.id)"
		}`), &collection); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"hidden": false,
			"id": "select1466534506",
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

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.role = \"it_admin\"",
			"deleteRule": "@request.auth.role = \"it_admin\"",
			"listRule": "@request.auth.id != \"\" && @request.auth.role = \"it_admin\"",
			"updateRule": "@request.auth.id = id || @request.auth.role = \"it_admin\"\n|| (@request.auth.id ~ department.managers.id &&\n@request.auth.department.id = department.id)",
			"viewRule": "@request.auth.id = id || @request.auth.role = \"it_admin\"\n|| @request.auth.role = \"executive\" || (@request.auth.id ~\ndepartment.managers.id && @request.auth.department.id =\ndepartment.id)"
		}`), &collection); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"hidden": false,
			"id": "select1466534506",
			"maxSelect": 1,
			"name": "role",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"admin",
				"employee",
				"manager"
			]
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
