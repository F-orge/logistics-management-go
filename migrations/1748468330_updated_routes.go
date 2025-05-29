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
			"createRule": "@request.auth.role = \"dispatch_coordinator\" || @request.auth.role = \"executive\"",
			"deleteRule": "@request.auth.role = \"dispatch_coordinator\" || @request.auth.role = \"executive\"",
			"updateRule": "@request.auth.role = \"dispatch_coordinator\" ||\n(@request.auth.role = \"delivery_driver\" && driverAssigned.id =\n@request.auth.id) || @request.auth.role = \"executive\""
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
			"createRule": "@request.auth.role = \"dispatch_coordinator\"",
			"deleteRule": "@request.auth.role = \"dispatch_coordinator\"",
			"updateRule": "@request.auth.role = \"dispatch_coordinator\" ||\n(@request.auth.role = \"delivery_driver\" && driverAssigned.id =\n@request.auth.id)"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
