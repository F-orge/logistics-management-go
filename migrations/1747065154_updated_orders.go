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
			"createRule": "@request.auth.role = \"customer_service_rep\" ||\n@request.auth.role = \"executive\" || @request.auth.role = \"it_admin\"",
			"deleteRule": "@request.auth.role = \"executive\" || @request.auth.role =\n\"it_admin\"",
			"listRule": "@request.auth.id != \"\" && (@request.auth.role =\n\"customer_service_rep\" || @request.auth.role = \"warehouse_manager\"\n|| @request.auth.role = \"dispatch_coordinator\" || @request.auth.role\n= \"finance_dept\" || @request.auth.role = \"executive\" ||\n@request.auth.role = \"it_admin\" || (@request.auth.role =\n\"customer_rep\" && customer.id = @request.auth.company.id))",
			"updateRule": "@request.auth.role = \"customer_service_rep\" ||\n@request.auth.role = \"warehouse_manager\" || @request.auth.role =\n\"dispatch_coordinator\" || @request.auth.role = \"executive\" ||\n@request.auth.role = \"it_admin\"",
			"viewRule": "(@request.auth.id != \"\" && (@request.auth.role =\n\"customer_service_rep\" || @request.auth.role = \"warehouse_manager\"\n|| @request.auth.role = \"dispatch_coordinator\" || @request.auth.role\n= \"finance_dept\" || @request.auth.role = \"executive\" ||\n@request.auth.role = \"it_admin\")) || (@request.auth.role =\n\"customer_rep\" && customer.id = @request.auth.company.id)"
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
