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
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_OVvUUgGQYB` + "`" + ` ON ` + "`" + `inventoryItems` + "`" + ` (` + "`" + `serial_number` + "`" + `)"
			],
			"listRule": "@request.auth.role = \"warehouse_manager\" ||\n@request.auth.role = \"inventory_clerk\" || @request.auth.role =\n\"executive\"",
			"viewRule": "@request.auth.role = \"warehouse_manager\" ||\n@request.auth.role = \"inventory_clerk\" || @request.auth.role =\n\"executive\""
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
			"indexes": [],
			"listRule": "@request.auth.role = \"warehouse_manager\" ||\n@request.auth.role = \"inventory_clerk\" || @request.auth.role =\n\"executive\" || @request.auth.role = \"it_admin\"",
			"viewRule": "@request.auth.role = \"warehouse_manager\" ||\n@request.auth.role = \"inventory_clerk\" || @request.auth.role =\n\"executive\" || @request.auth.role = \"it_admin\""
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
