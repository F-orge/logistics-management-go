package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1364849191")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.role = \"executive\" || @request.auth.role = \"warehouse_manager\"",
			"deleteRule": "@request.auth.role = \"executive\"",
			"updateRule": "@request.auth.role = \"executive\" || @request.auth.id = manager.id"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1364849191")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.role = \"executive\" || @request.auth.role =\n\"it_admin\"",
			"deleteRule": "@request.auth.role = \"executive\" || @request.auth.role =\n\"it_admin\"",
			"updateRule": "@request.auth.role = \"executive\" || @request.auth.role =\n\"it_admin\" || @request.auth.id = manager.id"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
