package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2010718506")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_BVugYQD2c6` + "`" + ` ON ` + "`" + `lms_transport_provider_rates` + "`" + ` (\n  ` + "`" + `provider` + "`" + `,\n  ` + "`" + `origin_zone` + "`" + `,\n  ` + "`" + `destination_zones` + "`" + `\n)"
			],
			"name": "lms_transport_provider_rates"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2010718506")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_BVugYQD2c6` + "`" + ` ON ` + "`" + `lms_provider_rates` + "`" + ` (\n  ` + "`" + `provider` + "`" + `,\n  ` + "`" + `origin_zone` + "`" + `,\n  ` + "`" + `destination_zones` + "`" + `\n)"
			],
			"name": "lms_provider_rates"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
