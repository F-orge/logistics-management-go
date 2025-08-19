package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_174005470")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_g3VigEO70Z` + "`" + ` ON ` + "`" + `crm_contacts` + "`" + ` (` + "`" + `email` + "`" + `)",
				"CREATE INDEX ` + "`" + `idx_K5ghmSN3GD` + "`" + ` ON ` + "`" + `crm_contacts` + "`" + ` (` + "`" + `lead_source` + "`" + `)",
				"CREATE INDEX ` + "`" + `idx_VIfI8LKi7I` + "`" + ` ON ` + "`" + `crm_contacts` + "`" + ` (` + "`" + `status` + "`" + `)",
				"CREATE INDEX ` + "`" + `idx_2rscGvSelf` + "`" + ` ON ` + "`" + `crm_contacts` + "`" + ` (` + "`" + `company` + "`" + `)"
			]
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_174005470")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_g3VigEO70Z` + "`" + ` ON ` + "`" + `crm_contacts` + "`" + ` (` + "`" + `email` + "`" + `)",
				"CREATE INDEX ` + "`" + `idx_K5ghmSN3GD` + "`" + ` ON ` + "`" + `crm_contacts` + "`" + ` (\n  ` + "`" + `company` + "`" + `,\n  ` + "`" + `lead_source` + "`" + `,\n  ` + "`" + `status` + "`" + `\n)"
			]
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
