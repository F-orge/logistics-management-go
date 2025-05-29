package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_280431851")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.role = \"warehouse_manager\" ||\n@request.auth.role = \"dispatch_coordinator\" || @request.auth.role = \"executive\"",
			"listRule": "@request.auth.role = \"warehouse_manager\" ||\n@request.auth.role = \"dispatch_coordinator\" || @request.auth.role =\n\"executive\"",
			"updateRule": "@request.auth.role = \"warehouse_manager\" ||\n@request.auth.role = \"dispatch_coordinator\" || @request.auth.role = \"executive\"",
			"viewRule": "@request.auth.role = \"warehouse_manager\" ||\n@request.auth.role = \"dispatch_coordinator\" || @request.auth.role =\n\"executive\""
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_280431851")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.role = \"warehouse_manager\" ||\n@request.auth.role = \"inventory_clerk\" || @request.auth.role = \"executive\"",
			"listRule": "@request.auth.role = \"warehouse_manager\" ||\n@request.auth.role = \"inventory_clerk\" || @request.auth.role =\n\"executive\"",
			"updateRule": "@request.auth.role = \"warehouse_manager\" ||\n@request.auth.role = \"inventory_clerk\" || @request.auth.role = \"executive\"",
			"viewRule": "@request.auth.role = \"warehouse_manager\" ||\n@request.auth.role = \"inventory_clerk\" || @request.auth.role =\n\"executive\""
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
