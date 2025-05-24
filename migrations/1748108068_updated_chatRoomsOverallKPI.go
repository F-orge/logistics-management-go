package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3596778200")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as totalChatRooms,\n  count(distinct type) as distinctRoomTypes,\n  count(case when last_message_at >= date('now', '-7 days') then 1 end) as roomsActiveLast7Days\nfrom chatrooms;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number2310314528")

		// remove field
		collection.Fields.RemoveById("number2271349076")

		// remove field
		collection.Fields.RemoveById("number3842309847")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number1410798522",
			"max": null,
			"min": null,
			"name": "totalChatRooms",
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
			"id": "number1969462931",
			"max": null,
			"min": null,
			"name": "distinctRoomTypes",
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
			"id": "number3651077609",
			"max": null,
			"min": null,
			"name": "roomsActiveLast7Days",
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
		collection, err := app.FindCollectionByNameOrId("pbc_3596778200")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as total_chat_rooms,\n  count(distinct type) as distinct_room_types,\n  count(case when last_message_at >= date('now', '-7 days') then 1 end) as rooms_active_last_7_days\nfrom chatrooms;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number2310314528",
			"max": null,
			"min": null,
			"name": "total_chat_rooms",
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
			"id": "number2271349076",
			"max": null,
			"min": null,
			"name": "distinct_room_types",
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
			"id": "number3842309847",
			"max": null,
			"min": null,
			"name": "rooms_active_last_7_days",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number1410798522")

		// remove field
		collection.Fields.RemoveById("number1969462931")

		// remove field
		collection.Fields.RemoveById("number3651077609")

		return app.Save(collection)
	})
}
