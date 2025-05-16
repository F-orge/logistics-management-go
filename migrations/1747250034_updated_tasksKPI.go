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
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as total_tasks,\n  count(case when status = 'done' then 1 end) as completed_tasks,\n  count(case when status = 'todo' then 1 end) as todo_tasks,\n  count(case when status = 'in-progress' then 1 end) as in_progress_tasks,\n  count(case when status = 'blocked' then 1 end) as blocked_tasks,\n  count(case when due_date < date('now') and status not in ('done', 'cancelled') then 1 end) as overdue_tasks\nfrom tasks;"
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
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as total_tasks,\n  count(case when status = 'Done' then 1 end) as completed_tasks,\n  count(case when status = 'Todo' then 1 end) as todo_tasks,\n  count(case when status = 'In Progress' then 1 end) as in_progress_tasks,\n  count(case when status = 'Blocked' then 1 end) as blocked_tasks,\n  count(case when due_date < date('now') and status not in ('Done', 'Cancelled') then 1 end) as overdue_tasks\nfrom tasks;"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
