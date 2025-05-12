package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_4030889036")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.role = \"dispatch_coordinator\" ||\n@request.auth.role = \"warehouse_manager\"",
			"deleteRule": "@request.auth.role = \"dispatch_coordinator\" ||\n@request.auth.role = \"executive\"",
			"listRule": "@request.auth.id != \"\" && (order_ref.customer.id =\n@request.auth.company.id || @request.auth.role != \"customer_rep\" ||\n@request.auth.id ~ department_assigned.managers.id ||\n@request.auth.id ~ department_assigned.employees.id)",
			"updateRule": "@request.auth.role = \"dispatch_coordinator\" ||\n@request.auth.role = \"warehouse_manager\" || (@request.auth.role =\n\"delivery_driver\" && driver.id = @request.auth.id) ||\n@request.auth.id ~ department_assigned.managers.id",
			"viewRule": "@request.auth.id != \"\" && (order_ref.customer.id =\n@request.auth.company.id || @request.auth.role != \"customer_rep\" ||\n@request.auth.id ~ department_assigned.managers.id ||\n@request.auth.id ~ department_assigned.employees.id)"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_4030889036")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": null,
			"deleteRule": null,
			"listRule": null,
			"updateRule": null,
			"viewRule": null
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
