package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2018073632")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_zIPJSpiVOM` + "`" + ` ON ` + "`" + `lms_transport_provider_performance` + "`" + ` (\n  ` + "`" + `provider` + "`" + `,\n  ` + "`" + `shipment` + "`" + `\n)"
			],
			"name": "lms_transport_provider_performance"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2018073632")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_zIPJSpiVOM` + "`" + ` ON ` + "`" + `lms_provider_performance` + "`" + ` (\n  ` + "`" + `provider` + "`" + `,\n  ` + "`" + `shipment` + "`" + `\n)"
			],
			"name": "lms_provider_performance"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
