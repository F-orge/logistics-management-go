package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3527180448")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"listRule": "@request.auth.id != \"\" && (@request.auth.role =\n\"customer_service_rep\" || @request.auth.role = \"warehouse_manager\"\n|| @request.auth.role = \"dispatch_coordinator\" || @request.auth.role\n= \"finance_dept\" || @request.auth.role = \"executive\" || @request.auth.role = \"delivery_driver\" || (@request.auth.role =\n\"customer_rep\" && customer.id = @request.auth.company.id))",
			"viewRule": "@request.auth.id != \"\" && (@request.auth.role =\n\"customer_service_rep\" || @request.auth.role = \"warehouse_manager\"\n|| @request.auth.role = \"dispatch_coordinator\" || @request.auth.role\n= \"finance_dept\" || @request.auth.role = \"executive\" || @request.auth.role = \"delivery_driver\" || (@request.auth.role =\n\"customer_rep\" && customer.id = @request.auth.company.id))"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3527180448")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"listRule": "@request.auth.id != \"\" && (@request.auth.role =\n\"customer_service_rep\" || @request.auth.role = \"warehouse_manager\"\n|| @request.auth.role = \"dispatch_coordinator\" || @request.auth.role\n= \"finance_dept\" || @request.auth.role = \"executive\" || (@request.auth.role =\n\"customer_rep\" && customer.id = @request.auth.company.id))",
			"viewRule": "(@request.auth.id != \"\" && (@request.auth.role =\n\"customer_service_rep\" || @request.auth.role = \"warehouse_manager\"\n|| @request.auth.role = \"dispatch_coordinator\" || @request.auth.role\n= \"finance_dept\" || @request.auth.role = \"executive\")) || (@request.auth.role =\n\"customer_rep\" && customer.id = @request.auth.company.id)"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
