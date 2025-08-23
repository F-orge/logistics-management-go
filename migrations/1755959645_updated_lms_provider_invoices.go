package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3445226520")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_eRUuTSVhMV` + "`" + ` ON ` + "`" + `lms_transport_provider_invoices` + "`" + ` (\n  ` + "`" + `provider` + "`" + `,\n  ` + "`" + `invoice_number` + "`" + `\n)"
			],
			"name": "lms_transport_provider_invoices"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3445226520")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_eRUuTSVhMV` + "`" + ` ON ` + "`" + `lms_provider_invoices` + "`" + ` (\n  ` + "`" + `provider` + "`" + `,\n  ` + "`" + `invoice_number` + "`" + `\n)"
			],
			"name": "lms_provider_invoices"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
