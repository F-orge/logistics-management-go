package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.role = \"it_admin\"",
			"deleteRule": "@request.auth.role = \"it_admin\"",
			"listRule": "@request.auth.id != \"\" && @request.auth.role = \"it_admin\"",
			"updateRule": "@request.auth.id = id || @request.auth.role = \"it_admin\"\n|| (@request.auth.id ~ department.managers.id &&\n@request.auth.department.id = department.id)",
			"viewRule": "@request.auth.id = id || @request.auth.role = \"it_admin\"\n|| @request.auth.role = \"executive\" || (@request.auth.id ~\ndepartment.managers.id && @request.auth.department.id =\ndepartment.id)"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "role = \"admin\"",
			"deleteRule": "id = @request.auth.id || role = \"admin\"",
			"listRule": "role = \"employee\" || role = \"admin\"",
			"updateRule": "id = @request.auth.id || role = \"admin\"",
			"viewRule": "role = \"employee\" || role = \"admin\""
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
