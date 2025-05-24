package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2997138066")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as totalUsers,\n  count(case when verified = true then 1 end) as verifiedUsers,\n  count(case when verified = false then 1 end) as unverifiedUsers,\n  count(distinct role) as distinctRoles\nfrom users;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number3622908891")

		// remove field
		collection.Fields.RemoveById("number3616551576")

		// remove field
		collection.Fields.RemoveById("number3772920723")

		// remove field
		collection.Fields.RemoveById("number2723651106")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number4135545099",
			"max": null,
			"min": null,
			"name": "totalUsers",
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
			"id": "number2541627915",
			"max": null,
			"min": null,
			"name": "verifiedUsers",
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
			"id": "number1027920352",
			"max": null,
			"min": null,
			"name": "unverifiedUsers",
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
			"id": "number1110891460",
			"max": null,
			"min": null,
			"name": "distinctRoles",
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
		collection, err := app.FindCollectionByNameOrId("pbc_2997138066")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as total_users,\n  count(case when verified = true then 1 end) as verified_users,\n  count(case when verified = false then 1 end) as unverified_users,\n  count(distinct role) as distinct_roles\nfrom users;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number3622908891",
			"max": null,
			"min": null,
			"name": "total_users",
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
			"id": "number3616551576",
			"max": null,
			"min": null,
			"name": "verified_users",
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
			"id": "number3772920723",
			"max": null,
			"min": null,
			"name": "unverified_users",
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
			"id": "number2723651106",
			"max": null,
			"min": null,
			"name": "distinct_roles",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number4135545099")

		// remove field
		collection.Fields.RemoveById("number2541627915")

		// remove field
		collection.Fields.RemoveById("number1027920352")

		// remove field
		collection.Fields.RemoveById("number1110891460")

		return app.Save(collection)
	})
}
