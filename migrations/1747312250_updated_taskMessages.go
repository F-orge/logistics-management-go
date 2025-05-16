package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_4167172206")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.id != \"\" && @request.auth.id = sender.id &&\n(@request.auth.id ~ task.assignees.id || @request.auth.id =\ntask.assigner.id || @request.auth.id ~ task.department.managers.id\n|| @request.auth.id ~ task.department.employees.id) || @request.auth.role = \"executive\"",
			"deleteRule": "@request.auth.id = sender.id || @request.auth.id =\ntask.assigner.id || @request.auth.id ~ task.department.managers.id || @request.auth.role = \"executive\"",
			"listRule": "@request.auth.id != \"\" && (@request.auth.id ~\ntask.assignees.id || @request.auth.id = task.assigner.id ||\n@request.auth.id ~ task.department.managers.id || @request.auth.id ~\ntask.department.employees.id) || @request.auth.role = \"executive\"",
			"viewRule": "@request.auth.id != \"\" && (@request.auth.id ~\ntask.assignees.id || @request.auth.id = task.assigner.id ||\n@request.auth.id ~ task.department.managers.id || @request.auth.id ~\ntask.department.employees.id) || @request.auth.role = \"executive\""
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_4167172206")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.id != \"\" && @request.auth.id = sender.id &&\n(@request.auth.id ~ task.assignees.id || @request.auth.id =\ntask.assigner.id || @request.auth.id ~ task.department.managers.id\n|| @request.auth.id ~ task.department.employees.id)",
			"deleteRule": "@request.auth.id = sender.id || @request.auth.id =\ntask.assigner.id || @request.auth.id ~ task.department.managers.id",
			"listRule": "@request.auth.id != \"\" && (@request.auth.id ~\ntask.assignees.id || @request.auth.id = task.assigner.id ||\n@request.auth.id ~ task.department.managers.id || @request.auth.id ~\ntask.department.employees.id)",
			"viewRule": "@request.auth.id != \"\" && (@request.auth.id ~\ntask.assignees.id || @request.auth.id = task.assigner.id ||\n@request.auth.id ~ task.department.managers.id || @request.auth.id ~\ntask.department.employees.id)"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
