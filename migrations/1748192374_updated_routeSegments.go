package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3130472683")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"listRule": "@request.auth.id != \"\" && (route.driverAssigned.id =\n@request.auth.id || @request.auth.role = \"dispatch_coordinator\" ||\n@request.auth.role = \"executive\")",
			"updateRule": "@request.auth.role = \"dispatch_coordinator\" ||\n(@request.auth.id = route.driverAssigned.id)",
			"viewRule": "@request.auth.id != \"\" && (route.driverAssigned.id =\n@request.auth.id || @request.auth.role = \"dispatch_coordinator\" ||\n@request.auth.role = \"executive\")"
		}`), &collection); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "number4068490045",
			"max": null,
			"min": 1,
			"name": "sequenceNumber",
			"onlyInt": false,
			"presentable": false,
			"required": true,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"hidden": false,
			"id": "select1400754292",
			"maxSelect": 1,
			"name": "segmentType",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"start-point",
				"pickup",
				"delivery",
				"waypoint"
			]
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text1187477292",
			"max": 0,
			"min": 0,
			"name": "addressText",
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
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text2246143851",
			"max": 0,
			"min": 0,
			"name": "longitude",
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
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text1092145443",
			"max": 0,
			"min": 0,
			"name": "latitude",
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
		if err := collection.Fields.AddMarshaledJSONAt(12, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_4030889036",
			"hidden": false,
			"id": "relation2756210289",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "relatedShipment",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3130472683")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"listRule": "@request.auth.id != \"\" && (route.driver_assigned.id =\n@request.auth.id || @request.auth.role = \"dispatch_coordinator\" ||\n@request.auth.role = \"executive\")",
			"updateRule": "@request.auth.role = \"dispatch_coordinator\" ||\n(@request.auth.id = route.driver_assigned.id)",
			"viewRule": "@request.auth.id != \"\" && (route.driver_assigned.id =\n@request.auth.id || @request.auth.role = \"dispatch_coordinator\" ||\n@request.auth.role = \"executive\")"
		}`), &collection); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "number4068490045",
			"max": null,
			"min": 0,
			"name": "sequenceNumber",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"hidden": false,
			"id": "select1400754292",
			"maxSelect": 1,
			"name": "segmentType",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"start_point",
				"pickup",
				"delivery",
				"waypoint"
			]
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text1187477292",
			"max": 0,
			"min": 0,
			"name": "addressText",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": false,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text2246143851",
			"max": 0,
			"min": 0,
			"name": "longitude",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": false,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text1092145443",
			"max": 0,
			"min": 0,
			"name": "latitude",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": false,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(12, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_4030889036",
			"hidden": false,
			"id": "relation2756210289",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "relatedShipment",
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
