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
			"listRule": "@request.auth.role = \"dispatch_coordinator\" ||\n(@request.auth.role = \"delivery_driver\" && driverAssigned = @request.auth.id) || @request.auth.role =\n\"executive\""
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
			"listRule": "@request.auth.role = \"dispatch_coordinator\" ||\n@request.auth.role = \"delivery_driver\" || @request.auth.role =\n\"executive\""
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
