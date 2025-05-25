package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1364849191")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_Jn6y1vElhX` + "`" + ` ON ` + "`" + `warehouses` + "`" + ` (` + "`" + `name` + "`" + `)",
				"CREATE INDEX ` + "`" + `idx_e5MLuxRnhz` + "`" + ` ON ` + "`" + `warehouses` + "`" + ` (\n  ` + "`" + `longitude` + "`" + `,\n  ` + "`" + `latitude` + "`" + `\n)"
			]
		}`), &collection); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text2246143851",
			"max": 0,
			"min": 0,
			"name": "longitude",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text1092145443",
			"max": 0,
			"min": 0,
			"name": "latitude",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"cascadeDelete": false,
			"collectionId": "_pb_users_auth_",
			"hidden": false,
			"id": "relation4196672953",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "manager",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1364849191")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_Jn6y1vElhX` + "`" + ` ON ` + "`" + `warehouses` + "`" + ` (` + "`" + `name` + "`" + `)"
			]
		}`), &collection); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text2246143851",
			"max": 0,
			"min": 0,
			"name": "longitude",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": false,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text1092145443",
			"max": 0,
			"min": 0,
			"name": "latitude",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": false,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"cascadeDelete": false,
			"collectionId": "_pb_users_auth_",
			"hidden": false,
			"id": "relation4196672953",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "manager",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
