package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_96911357")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"updateRule": "@request.auth.role = \"dispatch_coordinator\" ||\n(@request.auth.role = \"delivery_driver\" && driverAssigned.id =\n@request.auth.id)",
			"viewRule": "@request.auth.role = \"dispatch_coordinator\" ||\n(@request.auth.role = \"delivery_driver\" && driverAssigned.id =\n@request.auth.id) || @request.auth.role = \"executive\""
		}`), &collection); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text4083580803",
			"max": 0,
			"min": 0,
			"name": "routeName",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_1602236899",
			"hidden": false,
			"id": "relation3599287054",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "vehicleAssigned",
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
			"id": "relation1189958310",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "driverAssigned",
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
			"id": "date1472558426",
			"max": "",
			"min": "",
			"name": "plannedStartTime",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "date"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"hidden": false,
			"id": "date1621280851",
			"max": "",
			"min": "",
			"name": "plannedEndTime",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "date"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(9, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_4030889036",
			"hidden": false,
			"id": "relation3488389007",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "shipmentsOnRoute",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_96911357")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"updateRule": "@request.auth.role = \"dispatch_coordinator\" ||\n(@request.auth.role = \"delivery_driver\" && driver_assigned.id =\n@request.auth.id)",
			"viewRule": "@request.auth.role = \"dispatch_coordinator\" ||\n(@request.auth.role = \"delivery_driver\" && driver_assigned.id =\n@request.auth.id) || @request.auth.role = \"executive\""
		}`), &collection); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text4083580803",
			"max": 0,
			"min": 0,
			"name": "route_name",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_1602236899",
			"hidden": false,
			"id": "relation3599287054",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "vehicle_assigned",
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
			"id": "relation1189958310",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "driver_assigned",
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
			"id": "date1472558426",
			"max": "",
			"min": "",
			"name": "planned_start_time",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "date"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"hidden": false,
			"id": "date1621280851",
			"max": "",
			"min": "",
			"name": "planned_end_time",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "date"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(9, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_4030889036",
			"hidden": false,
			"id": "relation3488389007",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "shipments_on_route",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
