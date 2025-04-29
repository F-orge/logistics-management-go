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
			"createRule": "role = \"admin\"",
			"deleteRule": "id = @request.auth.id || role = \"admin\"",
			"listRule": "role = \"employee\" || role = \"admin\"",
			"updateRule": "id = @request.auth.id || role = \"admin\"",
			"viewRule": "role = \"employee\" || role = \"admin\""
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
			"createRule": "",
			"deleteRule": "id = @request.auth.id",
			"listRule": "role = \"employee\"",
			"updateRule": "id = @request.auth.id",
			"viewRule": "id = @request.auth.id"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
