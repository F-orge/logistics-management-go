package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2273442866")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_swoEko0hoS` + "`" + ` ON ` + "`" + `lms_transport_provider_service_destination_countries` + "`" + ` (\n  ` + "`" + `provider` + "`" + `,\n  ` + "`" + `country_code` + "`" + `\n)"
			],
			"name": "lms_transport_provider_service_destination_countries"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2273442866")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_swoEko0hoS` + "`" + ` ON ` + "`" + `lms_provider_service_destination_countries` + "`" + ` (\n  ` + "`" + `provider` + "`" + `,\n  ` + "`" + `country_code` + "`" + `\n)"
			],
			"name": "lms_provider_service_destination_countries"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
