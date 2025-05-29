package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_631030571")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.role = \"finance_dept\" || @request.auth.role\n= \"executive\"",
			"deleteRule": "@request.auth.role = \"finance_dept\" || @request.auth.role\n= \"executive\"",
			"updateRule": "@request.auth.role = \"finance_dept\" || @request.auth.role\n= \"executive\""
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_631030571")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.role = \"finance_dept\"",
			"deleteRule": "@request.auth.role = \"finance_dept\"",
			"updateRule": "@request.auth.role = \"finance_dept\""
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
