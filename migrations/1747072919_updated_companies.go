package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3866053794")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.role = \"executive\" || @request.auth.role = \"customer_service_rep\"",
			"deleteRule": "@request.auth.role = \"executive\"",
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_BQxkhXur6e` + "`" + ` ON ` + "`" + `companies` + "`" + ` (` + "`" + `name` + "`" + `)"
			],
			"updateRule": "@request.auth.role = \"executive\" || @request.auth.role = \"customer_service_rep\""
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3866053794")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.role = \"it_admin\" || @request.auth.role =\n\"executive\" || @request.auth.role = \"customer_service_rep\"",
			"deleteRule": "@request.auth.role = \"it_admin\" || @request.auth.role =\n\"executive\"",
			"indexes": [],
			"updateRule": "@request.auth.role = \"it_admin\" || @request.auth.role =\n\"executive\" || @request.auth.role = \"customer_service_rep\""
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
