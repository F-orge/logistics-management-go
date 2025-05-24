package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2080748545")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n    d.id as id,\n    d.name as departmentName,\n    count(distinct case when u.role = 'department_manager' then u.id end) as managerCount,\n    count(distinct case when u.role = 'department_employee' then u.id end) as employeeCount\nfrom departments d\nleft join users u on u.department = d.id\ngroup by d.id, d.name;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_EQUu")

		// remove field
		collection.Fields.RemoveById("number2886108248")

		// remove field
		collection.Fields.RemoveById("number1842628891")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_jy1q",
			"max": 0,
			"min": 0,
			"name": "departmentName",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "number523548932",
			"max": null,
			"min": null,
			"name": "managerCount",
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
			"id": "number2900644154",
			"max": null,
			"min": null,
			"name": "employeeCount",
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
		collection, err := app.FindCollectionByNameOrId("pbc_2080748545")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n    d.id as id,\n    d.name as department_name,\n    count(distinct case when u.role = 'department_manager' then u.id end) as manager_count,\n    count(distinct case when u.role = 'department_employee' then u.id end) as employee_count\nfrom departments d\nleft join users u on u.department = d.id\ngroup by d.id, d.name;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_EQUu",
			"max": 0,
			"min": 0,
			"name": "department_name",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "number2886108248",
			"max": null,
			"min": null,
			"name": "manager_count",
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
			"id": "number1842628891",
			"max": null,
			"min": null,
			"name": "employee_count",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_jy1q")

		// remove field
		collection.Fields.RemoveById("number523548932")

		// remove field
		collection.Fields.RemoveById("number2900644154")

		return app.Save(collection)
	})
}
