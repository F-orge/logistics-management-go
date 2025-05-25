package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_4030889036")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"listRule": "@request.auth.id != \"\" && (orderRef.customer.id =\n@request.auth.company.id || @request.auth.role != \"customer_rep\" ||\n@request.auth.id ~ departmentAssigned.managers.id ||\n@request.auth.id ~ departmentAssigned.employees.id)",
			"updateRule": "@request.auth.role = \"dispatch_coordinator\" ||\n@request.auth.role = \"warehouse_manager\" || (@request.auth.role =\n\"delivery_driver\" && driver.id = @request.auth.id) ||\n@request.auth.id ~ departmentAssigned.managers.id",
			"viewRule": "@request.auth.id != \"\" && (orderRef.customer.id =\n@request.auth.company.id || @request.auth.role != \"customer_rep\" ||\n@request.auth.id ~ departmentAssigned.managers.id ||\n@request.auth.id ~ departmentAssigned.employees.id)"
		}`), &collection); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_3527180448",
			"hidden": false,
			"id": "relation1463054787",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "orderRef",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text1042062360",
			"max": 0,
			"min": 0,
			"name": "trackingNumber",
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
			"hidden": false,
			"id": "date584007325",
			"max": "",
			"min": "",
			"name": "estimatedDeliveryDate",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "date"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"hidden": false,
			"id": "date3382179549",
			"max": "",
			"min": "",
			"name": "actualDeliveryDate",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "date"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"hidden": false,
			"id": "file956727292",
			"maxSelect": 99,
			"maxSize": 0,
			"mimeTypes": [
				"image/jpeg",
				"image/png",
				"image/vnd.mozilla.apng",
				"application/pdf"
			],
			"name": "proofOfDelivery",
			"presentable": false,
			"protected": false,
			"required": false,
			"system": false,
			"thumbs": [],
			"type": "file"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(9, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text961715783",
			"max": 0,
			"min": 0,
			"name": "currentLocationNotes",
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
		if err := collection.Fields.AddMarshaledJSONAt(10, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_867029274",
			"hidden": false,
			"id": "relation841275056",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "departmentAssigned",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_4030889036")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"listRule": "@request.auth.id != \"\" && (order_ref.customer.id =\n@request.auth.company.id || @request.auth.role != \"customer_rep\" ||\n@request.auth.id ~ department_assigned.managers.id ||\n@request.auth.id ~ department_assigned.employees.id)",
			"updateRule": "@request.auth.role = \"dispatch_coordinator\" ||\n@request.auth.role = \"warehouse_manager\" || (@request.auth.role =\n\"delivery_driver\" && driver.id = @request.auth.id) ||\n@request.auth.id ~ department_assigned.managers.id",
			"viewRule": "@request.auth.id != \"\" && (order_ref.customer.id =\n@request.auth.company.id || @request.auth.role != \"customer_rep\" ||\n@request.auth.id ~ department_assigned.managers.id ||\n@request.auth.id ~ department_assigned.employees.id)"
		}`), &collection); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_3527180448",
			"hidden": false,
			"id": "relation1463054787",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "order_ref",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text1042062360",
			"max": 0,
			"min": 0,
			"name": "tracking_number",
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
			"hidden": false,
			"id": "date584007325",
			"max": "",
			"min": "",
			"name": "estimated_delivered_date",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "date"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"hidden": false,
			"id": "date3382179549",
			"max": "",
			"min": "",
			"name": "actual_delivered_date",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "date"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"hidden": false,
			"id": "file956727292",
			"maxSelect": 99,
			"maxSize": 0,
			"mimeTypes": [
				"image/jpeg",
				"image/png",
				"image/vnd.mozilla.apng",
				"application/pdf"
			],
			"name": "proof_of_delivery",
			"presentable": false,
			"protected": false,
			"required": false,
			"system": false,
			"thumbs": [],
			"type": "file"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(9, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text961715783",
			"max": 0,
			"min": 0,
			"name": "current_location_notes",
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
		if err := collection.Fields.AddMarshaledJSONAt(10, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_867029274",
			"hidden": false,
			"id": "relation841275056",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "department_assigned",
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
