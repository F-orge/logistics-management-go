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
			"createRule": "  @request.auth.role = \"admin\" || @request.auth.role = \"manager\"",
			"deleteRule": "  @request.auth.role = \"admin\"",
			"updateRule": "  @request.auth.role = \"admin\" || @request.auth.role = \"manager\""
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
			"createRule": "  @request.auth.role = \"admin\"",
			"deleteRule": "",
			"updateRule": "  @request.auth.role = \"admin\""
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
