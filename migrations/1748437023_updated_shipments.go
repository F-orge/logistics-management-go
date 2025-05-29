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
			"createRule": "@request.body.carrier.type = \"carrier\" && @request.body.driver.role = \"delivery_driver\" && (@request.auth.role = \"dispatch_coordinator\" ||\n@request.auth.role = \"warehouse_manager\" || @request.auth.role = \"executive\") ",
			"updateRule": "@request.auth.role = \"dispatch_coordinator\" ||\n@request.auth.role = \"warehouse_manager\" || @request.auth.role = \"executive\" ||(@request.auth.role =\n\"delivery_driver\" && driver.id = @request.auth.id) ||\n@request.auth.id ~ departmentAssigned.managers.id"
		}`), &collection); err != nil {
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
			"createRule": "@request.body.carrier.type = \"carrier\" && @request.body.driver.role = \"delivery_driver\" && (@request.auth.role = \"dispatch_coordinator\" ||\n@request.auth.role = \"warehouse_manager\")",
			"updateRule": "@request.auth.role = \"dispatch_coordinator\" ||\n@request.auth.role = \"warehouse_manager\" || (@request.auth.role =\n\"delivery_driver\" && driver.id = @request.auth.id) ||\n@request.auth.id ~ departmentAssigned.managers.id"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
