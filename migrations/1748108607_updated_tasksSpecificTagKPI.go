package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3695913916")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over ()) as id,\n  'dispatch' as tagname,\n  count(*) as taskswithtagcount\nfrom\n  tasks,\n  json_each(tasks.tags) as tag_item\nwhere\n  tag_item.value = 'dispatch';"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("json2997113536")

		// remove field
		collection.Fields.RemoveById("number2323977432")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "json311885310",
			"maxSize": 1,
			"name": "tagname",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "number2852356722",
			"max": null,
			"min": null,
			"name": "taskswithtagcount",
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
		collection, err := app.FindCollectionByNameOrId("pbc_3695913916")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  'dispatch' as tagName,\n  count(*) as tasksWithTagCount\nfrom tasks, json_each(tasks.tags)\nwhere json_each.value = 'dispatch';"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "json2997113536",
			"maxSize": 1,
			"name": "tagName",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "number2323977432",
			"max": null,
			"min": null,
			"name": "tasksWithTagCount",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("json311885310")

		// remove field
		collection.Fields.RemoveById("number2852356722")

		return app.Save(collection)
	})
}
