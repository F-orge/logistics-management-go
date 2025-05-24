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
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as totalTasks,\n  count(case when status = 'done' then 1 end) as completedTasks,\n  count(case when status = 'todo' then 1 end) as todoTasks,\n  count(case when status = 'in-progress' then 1 end) as in_progressTasks,\n  count(case when status = 'blocked' then 1 end) as blockedTasks,\n  count(case when dueDate < date('now') and status not in ('done', 'cancelled') then 1 end) as overdueTasks\nfrom tasks;"
		}`), &collection); err != nil {
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

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"hidden": false,
			"id": "number2473417879",
			"max": null,
			"min": null,
			"name": "todoTasks",
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
			"id": "number353548594",
			"max": null,
			"min": null,
			"name": "in_progressTasks",
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
			"id": "number815922678",
			"max": null,
			"min": null,
			"name": "blockedTasks",
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
			"id": "number996997995",
			"max": null,
			"min": null,
			"name": "overdueTasks",
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
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as total_tasks,\n  count(case when status = 'done' then 1 end) as completed_tasks,\n  count(case when status = 'todo' then 1 end) as todo_tasks,\n  count(case when status = 'in-progress' then 1 end) as in_progress_tasks,\n  count(case when status = 'blocked' then 1 end) as blocked_tasks,\n  count(case when dueDate < date('now') and status not in ('done', 'cancelled') then 1 end) as overdue_tasks\nfrom tasks;"
		}`), &collection); err != nil {
			return err
		}

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

		// remove field
		collection.Fields.RemoveById("number2997135733")

		// remove field
		collection.Fields.RemoveById("number2822688692")

		// remove field
		collection.Fields.RemoveById("number2473417879")

		// remove field
		collection.Fields.RemoveById("number353548594")

		// remove field
		collection.Fields.RemoveById("number815922678")

		// remove field
		collection.Fields.RemoveById("number996997995")

		return app.Save(collection)
	})
}
