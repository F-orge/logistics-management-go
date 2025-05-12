package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2602490748")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.role = \"warehouse_manager\" ||\n@request.auth.role = \"dispatch_coordinator\" || @request.auth.role =\n\"customer_service_rep\" || @request.auth.role = \"executive\" ||\n@request.auth.id ~ department.managers.id\n",
			"deleteRule": "@request.auth.id = assigner.id || @request.auth.role =\n\"executive\" || @request.auth.id ~ department.managers.id",
			"listRule": "@request.auth.id != \"\" && (@request.auth.id ~\nassignees.id || @request.auth.id = assigner.id ||\n@request.auth.id ~ department.managers.id || @request.auth.id ~\ndepartment.employees.id || @request.auth.role = \"executive\" ||\n@request.auth.role = \"dispatch_coordinator\" || @request.auth.role =\n\"warehouse_manager\")\n",
			"updateRule": "@request.auth.id != \"\" && (@request.auth.id =\nassigner.id || @request.auth.id ~ assignees.id ||\n@request.auth.id ~ department.managers.id || @request.auth.role =\n\"warehouse_manager\" || @request.auth.role = \"dispatch_coordinator\"\n|| @request.auth.role = \"executive\")",
			"viewRule": "@request.auth.id != \"\" && (@request.auth.id ~\nassignees.id || @request.auth.id = assigner.id ||\n@request.auth.id ~ department.managers.id || @request.auth.id ~\ndepartment.employees.id || @request.auth.role = \"executive\" ||\n@request.auth.role = \"dispatch_coordinator\" || @request.auth.role =\n\"warehouse_manager\")\n"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2602490748")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.role = \"admin\" || @request.auth.role = \"manager\"",
			"deleteRule": null,
			"listRule": "@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"employee\"",
			"updateRule": "@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"employee\"",
			"viewRule": "@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"employee\""
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
