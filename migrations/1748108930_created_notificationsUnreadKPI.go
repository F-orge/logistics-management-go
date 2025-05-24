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
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text3208210256",
					"max": 0,
					"min": 0,
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
					"collectionId": "_pb_users_auth_",
					"hidden": false,
					"id": "_clone_Ymmt",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "userId",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "number3094805739",
					"max": null,
					"min": null,
					"name": "unreadNotificationCount",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				}
			],
			"id": "pbc_159505908",
			"indexes": [],
			"listRule": null,
			"name": "notificationsUnreadKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  user as id,\n  user as userId,\n  count(*) as unreadNotificationCount\nfrom notifications\nwhere is_read = 0\ngroup by user\norder by unreadNotificationCount desc;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_159505908")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
