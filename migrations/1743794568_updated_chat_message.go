package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2905323536")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.id = @collection.users.id && @request.auth.verified = true",
			"deleteRule": "(@request.auth.id = @collection.users.id && @request.auth.verified = true) && (@request.auth.id = sender_id || @request.auth.id = receiver_id)",
			"listRule": "@request.auth.id = sender_id || @request.auth.id = receiver_id",
			"updateRule": "(@request.auth.id = @collection.users.id && @request.auth.verified = true) && (@request.auth.id = sender_id || @request.auth.id = receiver_id)",
			"viewRule": "@request.auth.id = sender_id || @request.auth.id = receiver_id"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2905323536")
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
