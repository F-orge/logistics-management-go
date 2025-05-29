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
			"listRule": "@request.auth.id != \"\" && (@request.auth.id ~\nassignees.id || @request.auth.id = assigner.id ||\n@request.auth.id ~ department.managers.id || @request.auth.id ~\ndepartment.employees.id ||\n@request.auth.role = \"dispatch_coordinator\" || @request.auth.role =\n\"warehouse_manager\") || @request.auth.role = \"executive\"\n",
			"viewRule": "@request.auth.id != \"\" && (@request.auth.id ~\nassignees.id || @request.auth.id = assigner.id ||\n@request.auth.id ~ department.managers.id || @request.auth.id ~\ndepartment.employees.id ||\n@request.auth.role = \"dispatch_coordinator\" || @request.auth.role =\n\"warehouse_manager\") || @request.auth.role = \"executive\""
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
			"listRule": "@request.auth.id != \"\" && (@request.auth.id ~\nassignees.id || @request.auth.id = assigner.id ||\n@request.auth.id ~ department.managers.id || @request.auth.id ~\ndepartment.employees.id || @request.auth.role = \"executive\" ||\n@request.auth.role = \"dispatch_coordinator\" || @request.auth.role =\n\"warehouse_manager\")\n",
			"viewRule": "@request.auth.id != \"\" && (@request.auth.id ~\nassignees.id || @request.auth.id = assigner.id ||\n@request.auth.id ~ department.managers.id || @request.auth.id ~\ndepartment.employees.id || @request.auth.role = \"executive\" ||\n@request.auth.role = \"dispatch_coordinator\" || @request.auth.role =\n\"warehouse_manager\")\n"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
