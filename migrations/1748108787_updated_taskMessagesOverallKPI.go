package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3957208698")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as totalTaskMessages,\n  count(distinct task) as tasksWithMessages,\n  count(distinct sender) as distinctTaskMessageSenders,\n  count(case when attachments is not null and attachments != '' then 1 end) as taskMessagesWithAttachments\nfrom taskmessages;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number946724125")

		// remove field
		collection.Fields.RemoveById("number2621563281")

		// remove field
		collection.Fields.RemoveById("number1469324243")

		// remove field
		collection.Fields.RemoveById("number2234037325")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number1249569353",
			"max": null,
			"min": null,
			"name": "totalTaskMessages",
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
			"id": "number2796924549",
			"max": null,
			"min": null,
			"name": "tasksWithMessages",
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
			"id": "number4102069947",
			"max": null,
			"min": null,
			"name": "distinctTaskMessageSenders",
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
			"id": "number100287848",
			"max": null,
			"min": null,
			"name": "taskMessagesWithAttachments",
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
		collection, err := app.FindCollectionByNameOrId("pbc_3957208698")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as total_task_messages,\n  count(distinct task) as tasks_with_messages,\n  count(distinct sender) as distinct_task_message_senders,\n  count(case when attachments is not null and attachments != '' then 1 end) as task_messages_with_attachments\nfrom taskmessages;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number946724125",
			"max": null,
			"min": null,
			"name": "total_task_messages",
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
			"id": "number2621563281",
			"max": null,
			"min": null,
			"name": "tasks_with_messages",
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
			"id": "number1469324243",
			"max": null,
			"min": null,
			"name": "distinct_task_message_senders",
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
			"id": "number2234037325",
			"max": null,
			"min": null,
			"name": "task_messages_with_attachments",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number1249569353")

		// remove field
		collection.Fields.RemoveById("number2796924549")

		// remove field
		collection.Fields.RemoveById("number4102069947")

		// remove field
		collection.Fields.RemoveById("number100287848")

		return app.Save(collection)
	})
}
