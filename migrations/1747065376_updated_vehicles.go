package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1602236899")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.role = \"dispatch_coordinator\" ||\n@request.auth.role = \"executive\"",
			"deleteRule": "@request.auth.role = \"executive\"",
			"listRule": "@request.auth.role = \"dispatch_coordinator\" ||\n@request.auth.role = \"executive\" || @request.auth.role = \"it_admin\"",
			"updateRule": "@request.auth.role = \"dispatch_coordinator\" ||\n@request.auth.role = \"executive\"",
			"viewRule": "@request.auth.role = \"dispatch_coordinator\" ||\n@request.auth.role = \"executive\" || @request.auth.role = \"it_admin\""
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1602236899")
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
