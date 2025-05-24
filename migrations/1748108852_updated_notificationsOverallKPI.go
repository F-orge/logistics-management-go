package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_313455508")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as totalNotifications,\n  count(case when is_read = 1 then 1 end) as readNotifications,\n  count(case when is_read = 0 then 1 end) as unreadNotifications,\n  count(distinct type) as distinctNotificationTypes\nfrom notifications;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number3283065108")

		// remove field
		collection.Fields.RemoveById("number1835810472")

		// remove field
		collection.Fields.RemoveById("number505114085")

		// remove field
		collection.Fields.RemoveById("number1560342616")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number2584488685",
			"max": null,
			"min": null,
			"name": "totalNotifications",
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
			"id": "number2294406149",
			"max": null,
			"min": null,
			"name": "readNotifications",
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
			"id": "number595858050",
			"max": null,
			"min": null,
			"name": "unreadNotifications",
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
			"id": "number707745449",
			"max": null,
			"min": null,
			"name": "distinctNotificationTypes",
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
		collection, err := app.FindCollectionByNameOrId("pbc_313455508")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as total_notifications,\n  count(case when is_read = 1 then 1 end) as read_notifications,\n  count(case when is_read = 0 then 1 end) as unread_notifications,\n  count(distinct type) as distinct_notification_types\nfrom notifications;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number3283065108",
			"max": null,
			"min": null,
			"name": "total_notifications",
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
			"id": "number1835810472",
			"max": null,
			"min": null,
			"name": "read_notifications",
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
			"id": "number505114085",
			"max": null,
			"min": null,
			"name": "unread_notifications",
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
			"id": "number1560342616",
			"max": null,
			"min": null,
			"name": "distinct_notification_types",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number2584488685")

		// remove field
		collection.Fields.RemoveById("number2294406149")

		// remove field
		collection.Fields.RemoveById("number595858050")

		// remove field
		collection.Fields.RemoveById("number707745449")

		return app.Save(collection)
	})
}
