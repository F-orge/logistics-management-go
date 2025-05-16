package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3997565909")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select \n  id,\n  COUNT(*) as totalTasks,\n  COUNT(CASE WHEN status = 'done' THEN 1 END) AS completedTasks\nfrom tasks;"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3997565909")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select \n  id,\n  COUNT(*) as totalTasks,\n  COUNT(CASE WHEN status = 'complete' THEN 1 END) AS completedTasks\nfrom tasks;"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
