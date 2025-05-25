package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2602490748")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"indexes": [
				"CREATE INDEX ` + "`" + `idx_zdBYXcHOD8` + "`" + ` ON ` + "`" + `tasks` + "`" + ` (\n  ` + "`" + `title` + "`" + `,\n  ` + "`" + `status` + "`" + `,\n  ` + "`" + `department` + "`" + `,\n  ` + "`" + `priority` + "`" + `,\n  ` + "`" + `dueDate` + "`" + `,\n  ` + "`" + `tags` + "`" + `\n)"
			]
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number133141322")

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2602490748")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"indexes": []
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(11, []byte(`{
			"hidden": false,
			"id": "number133141322",
			"max": null,
			"min": 0,
			"name": "kanbanOrder",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
