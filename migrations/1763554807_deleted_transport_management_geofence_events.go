package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_3858826184")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	}, func(app core.App) error {
		jsonData := `{
			"createRule": "@request.auth.id != ''",
			"deleteRule": "@request.auth.id != ''",
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
					"collectionId": "pbc_2807194220",
					"hidden": false,
					"id": "relation461431942",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "vehicle",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_209153493",
					"hidden": false,
					"id": "relation3035326019",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "geofence",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "select2363381545",
					"maxSelect": 1,
					"name": "type",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "select",
					"values": [
						"enter",
						"exit"
					]
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
			"id": "pbc_3858826184",
			"indexes": [],
			"listRule": "@request.auth.id != ''",
			"name": "transport_management_geofence_events",
			"system": false,
			"type": "base",
			"updateRule": "@request.auth.id != ''",
			"viewRule": "@request.auth.id != ''"
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
