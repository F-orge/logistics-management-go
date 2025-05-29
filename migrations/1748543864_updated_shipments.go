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
			"listRule": "@request.auth.id != \"\" && (orderRef.customer.id =\n@request.auth.company.id || @request.auth.role != \"customer_rep\" ||\n@request.auth.id ~ departmentAssigned.managers.id ||\n@request.auth.id ~ departmentAssigned.employees.id) || @request.auth.role = \"executive\" || (@request.auth.role = \"delivery_driver\" && driver.id = @request.auth.id)",
			"viewRule": "@request.auth.id != \"\" && (orderRef.customer.id =\n@request.auth.company.id || @request.auth.role != \"customer_rep\" ||\n@request.auth.id ~ departmentAssigned.managers.id ||\n@request.auth.id ~ departmentAssigned.employees.id) || @request.auth.role = \"executive\" || (@request.auth.role = \"delivery_driver\" && driver.id = @request.auth.id)"
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
			"listRule": "@request.auth.id != \"\" && (orderRef.customer.id =\n@request.auth.company.id || @request.auth.role != \"customer_rep\" ||\n@request.auth.id ~ departmentAssigned.managers.id ||\n@request.auth.id ~ departmentAssigned.employees.id) || @request.auth.role = \"executive\"",
			"viewRule": "@request.auth.id != \"\" && (orderRef.customer.id =\n@request.auth.company.id || @request.auth.role != \"customer_rep\" ||\n@request.auth.id ~ departmentAssigned.managers.id ||\n@request.auth.id ~ departmentAssigned.employees.id) || @request.auth.role = \"executive\""
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
