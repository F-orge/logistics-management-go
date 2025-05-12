package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3130472683")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.role = \"dispatch_coordinator\"",
			"deleteRule": "@request.auth.role = \"dispatch_coordinator\"",
			"listRule": "@request.auth.id != \"\" && (route.driver_assigned.id =\n@request.auth.id || @request.auth.role = \"dispatch_coordinator\" ||\n@request.auth.role = \"executive\")",
			"updateRule": "@request.auth.role = \"dispatch_coordinator\" ||\n(@request.auth.id = route.driver_assigned.id)",
			"viewRule": "@request.auth.id != \"\" && (route.driver_assigned.id =\n@request.auth.id || @request.auth.role = \"dispatch_coordinator\" ||\n@request.auth.role = \"executive\")"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3130472683")
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
