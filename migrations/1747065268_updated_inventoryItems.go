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
			"createRule": "@request.auth.role = \"warehouse_manager\" ||\n@request.auth.role = \"inventory_clerk\"",
			"deleteRule": "@request.auth.role = \"warehouse_manager\"",
			"listRule": "@request.auth.role = \"warehouse_manager\" ||\n@request.auth.role = \"inventory_clerk\" || @request.auth.role =\n\"executive\" || @request.auth.role = \"it_admin\"",
			"updateRule": "@request.auth.role = \"warehouse_manager\" ||\n@request.auth.role = \"inventory_clerk\"",
			"viewRule": "@request.auth.role = \"warehouse_manager\" ||\n@request.auth.role = \"inventory_clerk\" || @request.auth.role =\n\"executive\" || @request.auth.role = \"it_admin\""
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
