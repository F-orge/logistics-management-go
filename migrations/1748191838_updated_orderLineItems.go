package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2627016046")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.role = \"customer_service_rep\" ||\n@request.auth.id = order.createdBy.id",
			"deleteRule": "@request.auth.role = \"customer_service_rep\" ||\n@request.auth.id = order.createdBy.id",
			"updateRule": "@request.auth.role = \"customer_service_rep\" ||\n@request.auth.id = order.createdBy.id"
		}`), &collection); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "number1931227443",
			"max": null,
			"min": 0,
			"name": "pricePerUnit",
			"onlyInt": false,
			"presentable": false,
			"required": true,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"hidden": false,
			"id": "number3097235076",
			"max": null,
			"min": 0,
			"name": "subtotal",
			"onlyInt": false,
			"presentable": false,
			"required": true,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2627016046")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.role = \"customer_service_rep\" ||\n@request.auth.id = order.created_by.id",
			"deleteRule": "@request.auth.role = \"customer_service_rep\" ||\n@request.auth.id = order.created_by.id",
			"updateRule": "@request.auth.role = \"customer_service_rep\" ||\n@request.auth.id = order.created_by.id"
		}`), &collection); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "number1931227443",
			"max": null,
			"min": 0,
			"name": "pricePerUnit",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"hidden": false,
			"id": "number3097235076",
			"max": null,
			"min": 0,
			"name": "subtotal",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
