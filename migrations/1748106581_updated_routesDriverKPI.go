package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3123779425")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  driver_assigned as id,\n  driver_assigned as driverId,\n  count(*) as routeCountPerDriver\nfrom routes\nwhere driver_assigned is not null and driver_assigned != ''\ngroup by driver_assigned;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_48rO")

		// remove field
		collection.Fields.RemoveById("number2469695780")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"cascadeDelete": false,
			"collectionId": "_pb_users_auth_",
			"hidden": false,
			"id": "_clone_IEqv",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "driverId",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "number1311138055",
			"max": null,
			"min": null,
			"name": "routeCountPerDriver",
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
		collection, err := app.FindCollectionByNameOrId("pbc_3123779425")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  driver_assigned as id,\n  driver_assigned as driver_id,\n  count(*) as route_count_per_driver\nfrom routes\nwhere driver_assigned is not null and driver_assigned != ''\ngroup by driver_assigned;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"cascadeDelete": false,
			"collectionId": "_pb_users_auth_",
			"hidden": false,
			"id": "_clone_48rO",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "driver_id",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "number2469695780",
			"max": null,
			"min": null,
			"name": "route_count_per_driver",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_IEqv")

		// remove field
		collection.Fields.RemoveById("number1311138055")

		return app.Save(collection)
	})
}
