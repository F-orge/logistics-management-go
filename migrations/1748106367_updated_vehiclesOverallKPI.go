package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2065599691")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as totalVehicles,\n  avg(capacity_volume) as averageVolumeCapacity,\n  avg(capacity_weight) as averageWeightCapacity,\n  count(case when status = 'available' then 1 end) as availableVehicles,\n  count(case when status = 'in-use' then 1 end) as vehiclesInUse,\n  count(case when status = 'maintenance' then 1 end) as vehiclesInMaintainance\nfrom vehicles;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number2704368971")

		// remove field
		collection.Fields.RemoveById("json3770556600")

		// remove field
		collection.Fields.RemoveById("json3477448495")

		// remove field
		collection.Fields.RemoveById("number71604906")

		// remove field
		collection.Fields.RemoveById("number138211653")

		// remove field
		collection.Fields.RemoveById("number1164108638")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number1726761891",
			"max": null,
			"min": null,
			"name": "totalVehicles",
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
			"id": "json1641547091",
			"maxSize": 1,
			"name": "averageVolumeCapacity",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"hidden": false,
			"id": "json4112717167",
			"maxSize": 1,
			"name": "averageWeightCapacity",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "number430358916",
			"max": null,
			"min": null,
			"name": "availableVehicles",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"hidden": false,
			"id": "number155474701",
			"max": null,
			"min": null,
			"name": "vehiclesInUse",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"hidden": false,
			"id": "number1152111617",
			"max": null,
			"min": null,
			"name": "vehiclesInMaintainance",
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
		collection, err := app.FindCollectionByNameOrId("pbc_2065599691")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as total_vehicles,\n  avg(capacity_volume) as average_volume_capacity,\n  avg(capacity_weight) as average_weight_capacity,\n  count(case when status = 'available' then 1 end) as available_vehicles,\n  count(case when status = 'in-use' then 1 end) as vehicles_in_use,\n  count(case when status = 'maintenance' then 1 end) as vehicles_in_maintenance\nfrom vehicles;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number2704368971",
			"max": null,
			"min": null,
			"name": "total_vehicles",
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
			"id": "json3770556600",
			"maxSize": 1,
			"name": "average_volume_capacity",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"hidden": false,
			"id": "json3477448495",
			"maxSize": 1,
			"name": "average_weight_capacity",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "number71604906",
			"max": null,
			"min": null,
			"name": "available_vehicles",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"hidden": false,
			"id": "number138211653",
			"max": null,
			"min": null,
			"name": "vehicles_in_use",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"hidden": false,
			"id": "number1164108638",
			"max": null,
			"min": null,
			"name": "vehicles_in_maintenance",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number1726761891")

		// remove field
		collection.Fields.RemoveById("json1641547091")

		// remove field
		collection.Fields.RemoveById("json4112717167")

		// remove field
		collection.Fields.RemoveById("number430358916")

		// remove field
		collection.Fields.RemoveById("number155474701")

		// remove field
		collection.Fields.RemoveById("number1152111617")

		return app.Save(collection)
	})
}
