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
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_v283WsQeAP` + "`" + ` ON ` + "`" + `departments` + "`" + ` (` + "`" + `name` + "`" + `)"
			],
			"name": "departments"
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
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_v283WsQeAP` + "`" + ` ON ` + "`" + `department` + "`" + ` ('name')"
			],
			"name": "department"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
