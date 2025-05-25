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
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_BQxkhXur6e` + "`" + ` ON ` + "`" + `companies` + "`" + ` (` + "`" + `name` + "`" + `)",
				"CREATE UNIQUE INDEX ` + "`" + `idx_OpmlUh5xE1` + "`" + ` ON ` + "`" + `companies` + "`" + ` (\n  ` + "`" + `contactEmail` + "`" + `,\n  ` + "`" + `contactPhone` + "`" + `,\n  ` + "`" + `primaryContactPerson` + "`" + `\n)"
			]
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
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_BQxkhXur6e` + "`" + ` ON ` + "`" + `companies` + "`" + ` (` + "`" + `name` + "`" + `)"
			]
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
