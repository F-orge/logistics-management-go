package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3254423341")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_FNpNJKarc9` + "`" + ` ON ` + "`" + `lms_transport_provider_service_max_dimensions` + "`" + ` (\n  ` + "`" + `provider` + "`" + `,\n  ` + "`" + `length` + "`" + `,\n  ` + "`" + `width` + "`" + `,\n  ` + "`" + `height` + "`" + `\n)"
			],
			"name": "lms_transport_provider_service_max_dimensions"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3254423341")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_FNpNJKarc9` + "`" + ` ON ` + "`" + `lms_provider_service_max_dimensions` + "`" + ` (\n  ` + "`" + `provider` + "`" + `,\n  ` + "`" + `length` + "`" + `,\n  ` + "`" + `width` + "`" + `,\n  ` + "`" + `height` + "`" + `\n)"
			],
			"name": "lms_provider_service_max_dimensions"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
