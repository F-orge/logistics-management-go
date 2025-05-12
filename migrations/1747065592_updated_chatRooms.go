package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_586301008")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.id != \"\"",
			"deleteRule": "@request.auth.id != \"\" && @request.auth.id ~\nparticipants.id",
			"listRule": "@request.auth.id != \"\" && @request.auth.id ~\nparticipants.id",
			"updateRule": "@request.auth.id != \"\" && @request.auth.id ~\nparticipants.id",
			"viewRule": "@request.auth.id != \"\" && @request.auth.id ~\nparticipants.id"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_586301008")
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
