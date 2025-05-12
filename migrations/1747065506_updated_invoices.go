package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_711030668")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.role = \"finance_dept\"",
			"deleteRule": "@request.auth.role = \"finance_dept\"",
			"listRule": "@request.auth.role = \"finance_dept\" || @request.auth.role =\n\"executive\" || @request.auth.role = \"it_admin\" ||\n(@request.auth.role = \"customer_rep\" && customer.id =\n@request.auth.company.id)",
			"updateRule": "@request.auth.role = \"finance_dept\"",
			"viewRule": "@request.auth.role = \"finance_dept\" || @request.auth.role\n= \"executive\" || @request.auth.role = \"it_admin\" ||\n(@request.auth.role = \"customer_rep\" && customer.id =\n@request.auth.company.id)"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_711030668")
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
