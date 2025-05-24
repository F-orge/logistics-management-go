package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3876436222")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as totalChatMessages,\n  count(distinct room) as roomsWithMessages,\n  count(distinct sender) as distinctSenders,\n  count(case when attachments is not null and attachments != '' then 1 end) as messagesWithAttachements\nfrom chatmessages;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number1284497505")

		// remove field
		collection.Fields.RemoveById("number3379060931")

		// remove field
		collection.Fields.RemoveById("number4175605804")

		// remove field
		collection.Fields.RemoveById("number431759232")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number429198538",
			"max": null,
			"min": null,
			"name": "totalChatMessages",
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
			"id": "number3629552187",
			"max": null,
			"min": null,
			"name": "roomsWithMessages",
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
			"id": "number4134580536",
			"max": null,
			"min": null,
			"name": "distinctSenders",
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
			"id": "number3887519538",
			"max": null,
			"min": null,
			"name": "messagesWithAttachements",
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
		collection, err := app.FindCollectionByNameOrId("pbc_3876436222")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as total_chat_messages,\n  count(distinct room) as rooms_with_messages,\n  count(distinct sender) as distinct_senders,\n  count(case when attachments is not null and attachments != '' then 1 end) as messages_with_attachments\nfrom chatmessages;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number1284497505",
			"max": null,
			"min": null,
			"name": "total_chat_messages",
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
			"id": "number3379060931",
			"max": null,
			"min": null,
			"name": "rooms_with_messages",
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
			"id": "number4175605804",
			"max": null,
			"min": null,
			"name": "distinct_senders",
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
			"id": "number431759232",
			"max": null,
			"min": null,
			"name": "messages_with_attachments",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number429198538")

		// remove field
		collection.Fields.RemoveById("number3629552187")

		// remove field
		collection.Fields.RemoveById("number4134580536")

		// remove field
		collection.Fields.RemoveById("number3887519538")

		return app.Save(collection)
	})
}
