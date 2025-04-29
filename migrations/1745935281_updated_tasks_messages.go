package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_4167172206")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "task_id.assignees.id = @request.auth.id || task_id.assigner.id = @request.auth.id",
			"listRule": "@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"employee\"",
			"updateRule": "(task_id.assignees.id = @request.auth.id || task_id.assigner.id = @request.auth.id) && sender_id.id = @request.auth.id",
			"viewRule": "@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"employee\""
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_4167172206")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": null,
			"listRule": null,
			"updateRule": null,
			"viewRule": null
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
