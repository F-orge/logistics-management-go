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
					"collectionId": "pbc_609858025",
					"hidden": false,
					"id": "relation3343123541",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "client",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"convertURLs": false,
					"hidden": false,
					"id": "editor3815934248",
					"maxSize": 0,
					"name": "originDetails",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "editor"
				},
				{
					"convertURLs": false,
					"hidden": false,
					"id": "editor378620418",
					"maxSize": 0,
					"name": "destinationDetails",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "editor"
				},
				{
					"hidden": false,
					"id": "number130897217",
					"max": null,
					"min": null,
					"name": "weight",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number25009842",
					"max": null,
					"min": null,
					"name": "length",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number2350531887",
					"max": null,
					"min": null,
					"name": "width",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number4115522831",
					"max": null,
					"min": null,
					"name": "height",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number3301646924",
					"max": null,
					"min": null,
					"name": "quotePrice",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text3360499680",
					"max": 0,
					"min": 0,
					"name": "serviceLevel",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": false,
					"system": false,
					"type": "text"
				},
				{
					"hidden": false,
					"id": "date853919962",
					"max": "",
					"min": "",
					"name": "expiredAt",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "select2063623452",
					"maxSelect": 1,
					"name": "status",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "select",
					"values": [
						"pending",
						"accepted",
						"expired",
						"cancelled",
						"converted"
					]
				},
				{
					"autogeneratePattern": "QUOTE-[A-Z]{10}-[0-9]{10}",
					"hidden": false,
					"id": "text385579935",
					"max": 0,
					"min": 0,
					"name": "quoteNumber",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": false,
					"system": false,
					"type": "text"
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
					"cascadeDelete": false,
					"collectionId": "_pb_users_auth_",
					"hidden": false,
					"id": "relation3545646658",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "createdBy",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "autodate2990389176",
					"name": "created",
					"onCreate": true,
					"onUpdate": false,
					"presentable": false,
					"system": false,
					"type": "autodate"
				},
				{
					"hidden": false,
					"id": "autodate3332085495",
					"name": "updated",
					"onCreate": true,
					"onUpdate": true,
					"presentable": false,
					"system": false,
					"type": "autodate"
				}
			],
			"id": "pbc_11546788",
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_11jP8DSCih` + "`" + ` ON ` + "`" + `billing_management_quotes` + "`" + ` (` + "`" + `quoteNumber` + "`" + `)"
			],
			"listRule": null,
			"name": "billing_management_quotes",
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
		collection, err := app.FindCollectionByNameOrId("pbc_11546788")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
