package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		jsonData := `{
			"createRule": null,
			"deleteRule": null,
			"fields": [
				{
					"autogeneratePattern": "[a-z0-9]{15}",
					"hidden": false,
					"id": "text3208210256",
					"max": 15,
					"min": 15,
					"name": "id",
					"pattern": "^[a-z0-9]+$",
					"presentable": false,
					"primaryKey": true,
					"required": true,
					"system": true,
					"type": "text"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_3317586480",
					"hidden": false,
					"id": "relation291929305",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "driver",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "geoPoint2551633526",
					"name": "coordinates",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "geoPoint"
				},
				{
					"hidden": false,
					"id": "geoPoint45367233",
					"name": "heading",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "geoPoint"
				},
				{
					"hidden": false,
					"id": "autodate2782324286",
					"name": "timestamp",
					"onCreate": true,
					"onUpdate": false,
					"presentable": false,
					"system": false,
					"type": "autodate"
				}
			],
			"id": "pbc_1355030704",
			"indexes": [],
			"listRule": null,
			"name": "delivery_management_driver_location",
			"system": false,
			"type": "base",
			"updateRule": null,
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1355030704")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
