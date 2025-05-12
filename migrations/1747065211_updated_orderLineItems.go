package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2627016046")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.role = \"customer_service_rep\" ||\n@request.auth.id = order.created_by.id",
			"deleteRule": "@request.auth.role = \"customer_service_rep\" ||\n@request.auth.id = order.created_by.id",
			"listRule": "@request.auth.id != \"\" && (order.customer.id =\n@request.auth.company.id || @request.auth.role != \"customer_rep\")",
			"updateRule": "@request.auth.role = \"customer_service_rep\" ||\n@request.auth.id = order.created_by.id",
			"viewRule": "@request.auth.id != \"\" && (order.customer.id =\n@request.auth.company.id || @request.auth.role != \"customer_rep\")"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2627016046")
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
