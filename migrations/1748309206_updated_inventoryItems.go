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
			"createRule": "@request.auth.role = \"warehouse_manager\" ||\n@request.auth.role = \"inventory_clerk\" || @request.auth.role = \"executive\"",
			"deleteRule": "@request.auth.role = \"warehouse_manager\" || @request.auth.role = \"executive\"",
			"updateRule": "@request.auth.role = \"warehouse_manager\" ||\n@request.auth.role = \"inventory_clerk\" || @request.auth.role = \"executive\""
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
			"createRule": "@request.auth.role = \"warehouse_manager\" ||\n@request.auth.role = \"inventory_clerk\"",
			"deleteRule": "@request.auth.role = \"warehouse_manager\"",
			"updateRule": "@request.auth.role = \"warehouse_manager\" ||\n@request.auth.role = \"inventory_clerk\""
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
