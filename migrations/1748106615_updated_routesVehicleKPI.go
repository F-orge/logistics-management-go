package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2480673742")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  vehicle_assigned as id,\n  vehicle_assigned as vehicleId,\n  count(*) as routeCountPerVehicle\nfrom routes\nwhere vehicle_assigned is not null and vehicle_assigned != ''\ngroup by vehicle_assigned;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_ueYs")

		// remove field
		collection.Fields.RemoveById("number3624810698")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_1602236899",
			"hidden": false,
			"id": "_clone_fo57",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "vehicleId",
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
			"id": "number2058640200",
			"max": null,
			"min": null,
			"name": "routeCountPerVehicle",
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
		collection, err := app.FindCollectionByNameOrId("pbc_2480673742")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  vehicle_assigned as id,\n  vehicle_assigned as vehicle_id,\n  count(*) as route_count_per_vehicle\nfrom routes\nwhere vehicle_assigned is not null and vehicle_assigned != ''\ngroup by vehicle_assigned;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_1602236899",
			"hidden": false,
			"id": "_clone_ueYs",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "vehicle_id",
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
			"id": "number3624810698",
			"max": null,
			"min": null,
			"name": "route_count_per_vehicle",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_fo57")

		// remove field
		collection.Fields.RemoveById("number2058640200")

		return app.Save(collection)
	})
}
