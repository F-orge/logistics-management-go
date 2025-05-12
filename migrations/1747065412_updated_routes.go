package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_96911357")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.role = \"dispatch_coordinator\"",
			"deleteRule": "@request.auth.role = \"dispatch_coordinator\"",
			"listRule": "@request.auth.role = \"dispatch_coordinator\" ||\n@request.auth.role = \"delivery_driver\" || @request.auth.role =\n\"executive\"",
			"updateRule": "@request.auth.role = \"dispatch_coordinator\" ||\n(@request.auth.role = \"delivery_driver\" && driver_assigned.id =\n@request.auth.id)",
			"viewRule": "@request.auth.role = \"dispatch_coordinator\" ||\n(@request.auth.role = \"delivery_driver\" && driver_assigned.id =\n@request.auth.id) || @request.auth.role = \"executive\""
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_96911357")
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
