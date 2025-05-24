package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_322368572")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as totalRoutes,\n  count(case when status = 'completed' then 1 end) as completedRoutes,\n  count(case when status = 'in-progress' then 1 end) as routesInProgress,\n  count(case when status = 'planned' then 1 end) as plannedRoutes\nfrom routes;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number4207010213")

		// remove field
		collection.Fields.RemoveById("number2364660061")

		// remove field
		collection.Fields.RemoveById("number2014285336")

		// remove field
		collection.Fields.RemoveById("number3308884057")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number2083765547",
			"max": null,
			"min": null,
			"name": "totalRoutes",
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
			"id": "number2420823403",
			"max": null,
			"min": null,
			"name": "completedRoutes",
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
			"id": "number689997476",
			"max": null,
			"min": null,
			"name": "routesInProgress",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "number826580109",
			"max": null,
			"min": null,
			"name": "plannedRoutes",
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
		collection, err := app.FindCollectionByNameOrId("pbc_322368572")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as total_routes,\n  count(case when status = 'completed' then 1 end) as completed_routes,\n  count(case when status = 'in-progress' then 1 end) as routes_in_progress,\n  count(case when status = 'planned' then 1 end) as planned_routes\nfrom routes;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number4207010213",
			"max": null,
			"min": null,
			"name": "total_routes",
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
			"id": "number2364660061",
			"max": null,
			"min": null,
			"name": "completed_routes",
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
			"id": "number2014285336",
			"max": null,
			"min": null,
			"name": "routes_in_progress",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "number3308884057",
			"max": null,
			"min": null,
			"name": "planned_routes",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number2083765547")

		// remove field
		collection.Fields.RemoveById("number2420823403")

		// remove field
		collection.Fields.RemoveById("number689997476")

		// remove field
		collection.Fields.RemoveById("number826580109")

		return app.Save(collection)
	})
}
