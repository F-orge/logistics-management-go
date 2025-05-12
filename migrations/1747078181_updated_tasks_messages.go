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
			"createRule": "@request.auth.id != \"\" && @request.auth.id = sender.id &&\n(@request.auth.id ~ task.assignees.id || @request.auth.id =\ntask.assigner.id || @request.auth.id ~ task.department.managers.id\n|| @request.auth.id ~ task.department.employees.id)",
			"deleteRule": "@request.auth.id = sender.id || @request.auth.id =\ntask.assigner.id || @request.auth.id ~ task.department.managers.id",
			"listRule": "@request.auth.id != \"\" && (@request.auth.id ~\ntask.assignees.id || @request.auth.id = task.assigner.id ||\n@request.auth.id ~ task.department.managers.id || @request.auth.id ~\ntask.department.employees.id)",
			"name": "tasksMessages",
			"updateRule": "@request.auth.id = sender.id",
			"viewRule": "@request.auth.id != \"\" && (@request.auth.id ~\ntask.assignees.id || @request.auth.id = task.assigner.id ||\n@request.auth.id ~ task.department.managers.id || @request.auth.id ~\ntask.department.employees.id)"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"cascadeDelete": false,
			"collectionId": "_pb_users_auth_",
			"hidden": false,
			"id": "relation3074823948",
			"maxSelect": 999,
			"minSelect": 0,
			"name": "read_by",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_2602490748",
			"hidden": false,
			"id": "relation2377515398",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "task",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"cascadeDelete": false,
			"collectionId": "_pb_users_auth_",
			"hidden": false,
			"id": "relation4129600413",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "sender",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "file1204091606",
			"maxSelect": 99,
			"maxSize": 0,
			"mimeTypes": [
				"image/jpeg",
				"image/png",
				"application/pdf",
				"text/plain",
				"application/msword",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
				"application/vnd.ms-excel",
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
			],
			"name": "attachments",
			"presentable": false,
			"protected": false,
			"required": false,
			"system": false,
			"thumbs": [],
			"type": "file"
		}`)); err != nil {
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
			"createRule": "task_id.assignees.id = @request.auth.id || task_id.assigner.id = @request.auth.id",
			"deleteRule": null,
			"listRule": "@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"employee\"",
			"name": "tasks_messages",
			"updateRule": "(task_id.assignees.id = @request.auth.id || task_id.assigner.id = @request.auth.id) && sender_id.id = @request.auth.id",
			"viewRule": "@request.auth.role = \"admin\" || @request.auth.role = \"manager\" || @request.auth.role = \"employee\""
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("relation3074823948")

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_2602490748",
			"hidden": false,
			"id": "relation2377515398",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "task_id",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"cascadeDelete": false,
			"collectionId": "_pb_users_auth_",
			"hidden": false,
			"id": "relation4129600413",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "sender_id",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "file1204091606",
			"maxSelect": 99,
			"maxSize": 0,
			"mimeTypes": [],
			"name": "attachments",
			"presentable": false,
			"protected": false,
			"required": false,
			"system": false,
			"thumbs": [],
			"type": "file"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
