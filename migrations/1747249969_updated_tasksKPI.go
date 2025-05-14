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
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as total_tasks,\n  count(case when status = 'Done' then 1 end) as completed_tasks,\n  count(case when status = 'Todo' then 1 end) as todo_tasks,\n  count(case when status = 'In Progress' then 1 end) as in_progress_tasks,\n  count(case when status = 'Blocked' then 1 end) as blocked_tasks,\n  count(case when due_date < date('now') and status not in ('Done', 'Cancelled') then 1 end) as overdue_tasks\nfrom tasks;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number2997135733")

		// remove field
		collection.Fields.RemoveById("number2822688692")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number2469065637",
			"max": null,
			"min": null,
			"name": "total_tasks",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "number2136185829",
			"max": null,
			"min": null,
			"name": "completed_tasks",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"hidden": false,
			"id": "number3708795140",
			"max": null,
			"min": null,
			"name": "todo_tasks",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "number2067108230",
			"max": null,
			"min": null,
			"name": "in_progress_tasks",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"hidden": false,
			"id": "number3877184619",
			"max": null,
			"min": null,
			"name": "blocked_tasks",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"hidden": false,
			"id": "number1772881556",
			"max": null,
			"min": null,
			"name": "overdue_tasks",
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

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number2997135733",
			"max": null,
			"min": null,
			"name": "totalTasks",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "number2822688692",
			"max": null,
			"min": null,
			"name": "completedTasks",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number2469065637")

		// remove field
		collection.Fields.RemoveById("number2136185829")

		// remove field
		collection.Fields.RemoveById("number3708795140")

		// remove field
		collection.Fields.RemoveById("number2067108230")

		// remove field
		collection.Fields.RemoveById("number3877184619")

		// remove field
		collection.Fields.RemoveById("number1772881556")

		return app.Save(collection)
	})
}
