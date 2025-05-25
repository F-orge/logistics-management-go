package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_867029274")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.role = \"executive\"",
			"updateRule": "@request.auth.role = \"executive\""
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_867029274")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.role = \"executive\" && @request.body.employees.role = \"department_employee\" && @request.body.managers.role = \"department_manager\"",
			"updateRule": "@request.auth.role = \"executive\" && @request.body.employees.role = \"department_employee\" && @request.body.managers.role = \"department_manager\""
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
