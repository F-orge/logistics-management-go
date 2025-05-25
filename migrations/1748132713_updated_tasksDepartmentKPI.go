package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1452701499")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  department as id,\n  department,\n  count(*) as taskCountPerDepartment\nfrom tasks\nwhere department is not null and department != ''\ngroup by department;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_RB9S")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_867029274",
			"hidden": false,
			"id": "_clone_nqPG",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "department",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1452701499")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  department as id,\n  department as departmentId,\n  count(*) as taskCountPerDepartment\nfrom tasks\nwhere department is not null and department != ''\ngroup by department;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_867029274",
			"hidden": false,
			"id": "_clone_RB9S",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "departmentId",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_nqPG")

		return app.Save(collection)
	})
}
