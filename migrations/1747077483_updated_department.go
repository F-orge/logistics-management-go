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
			"createRule": "@request.auth.role = \"executive\" && @request.body.employees.role = \"department_employee\" && @request.body.managers.role = \"department_manager\"",
			"deleteRule": "@request.auth.role = \"executive\"",
			"listRule": "@request.auth.id != \"\"",
			"updateRule": "@request.auth.role = \"executive\" && @request.body.employees.role = \"department_employee\" && @request.body.managers.role = \"department_manager\"",
			"viewRule": "@request.auth.id != \"\""
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
			"createRule": "  @request.auth.role = \"admin\" || @request.auth.role = \"manager\"",
			"deleteRule": "  @request.auth.role = \"admin\"",
			"listRule": "  @request.auth.role = \"admin\" || @request.auth.role = \"employee\"",
			"updateRule": "  @request.auth.role = \"admin\" || @request.auth.role = \"manager\"",
			"viewRule": "  @request.auth.role = \"admin\" || @request.auth.role = \"employee\""
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
