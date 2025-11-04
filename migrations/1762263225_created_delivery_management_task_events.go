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
					"collectionId": "pbc_2766347546",
					"hidden": false,
					"id": "relation1384045349",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "task",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "select2063623452",
					"maxSelect": 1,
					"name": "status",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "select",
					"values": [
						"assigned",
						"started",
						"arrived",
						"delivered",
						"failed",
						"exception",
						"cancelled",
						"rescheduled"
					]
				},
				{
					"convertURLs": false,
					"hidden": false,
					"id": "editor1001949196",
					"maxSize": 0,
					"name": "reason",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "editor"
				},
				{
					"convertURLs": false,
					"hidden": false,
					"id": "editor18589324",
					"maxSize": 0,
					"name": "notes",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "editor"
				},
				{
					"hidden": false,
					"id": "geoPoint2551633526",
					"name": "coordinates",
					"presentable": false,
					"required": false,
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
			"id": "pbc_2065460486",
			"indexes": [],
			"listRule": null,
			"name": "delivery_management_task_events",
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
		collection, err := app.FindCollectionByNameOrId("pbc_2065460486")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
