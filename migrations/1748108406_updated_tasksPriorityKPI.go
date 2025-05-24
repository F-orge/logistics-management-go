package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2659876189")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  priority as id,\n  priority,\n  count(*) as taskCountPerPriority\nfrom tasks\nwhere priority is not null and priority != ''\ngroup by priority;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_jVIJ")

		// remove field
		collection.Fields.RemoveById("number1079242480")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "_clone_xEgk",
			"maxSelect": 1,
			"name": "priority",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"low",
				"medium",
				"high",
				"urgent"
			]
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "number341300950",
			"max": null,
			"min": null,
			"name": "taskCountPerPriority",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2659876189")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  priority as id,\n  priority,\n  count(*) as task_count_per_priority\nfrom tasks\nwhere priority is not null and priority != ''\ngroup by priority;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "_clone_jVIJ",
			"maxSelect": 1,
			"name": "priority",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"low",
				"medium",
				"high",
				"urgent"
			]
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "number1079242480",
			"max": null,
			"min": null,
			"name": "task_count_per_priority",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_xEgk")

		// remove field
		collection.Fields.RemoveById("number341300950")

		return app.Save(collection)
	})
}
