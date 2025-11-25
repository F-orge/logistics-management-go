package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"hidden": false,
			"id": "select3057528519",
			"maxSelect": 2,
			"name": "roles",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"admin",
				"developer",
				"user",
				"client",
				"client-admin",
				"end-customer",
				"inventory-manager",
				"warehouse-manager",
				"receiving-manager",
				"warehouse-operator",
				"picker",
				"packer",
				"returns-processor",
				"qc-manager",
				"logistics-coordinator",
				"logistics-manager",
				"logistics-planner",
				"dispatcher",
				"driver",
				"fleet-manager",
				"transport-manager",
				"account-manager",
				"pricing-analyst",
				"finance-manager",
				"accountant",
				"sdr",
				"sales-rep",
				"sales-manager",
				"marketing-manager",
				"customer-support-agent",
				"product-manager",
				"carrier"
			]
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("select3057528519")

		return app.Save(collection)
	})
}
