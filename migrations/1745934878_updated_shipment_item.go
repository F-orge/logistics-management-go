package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3908128305")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"employee\"",
			"deleteRule": "@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"employee\"",
			"listRule": "@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"employee\"",
			"updateRule": "@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"employee\"",
			"viewRule": "@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"employee\""
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3908128305")
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
