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
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text1579384326",
					"max": 100,
					"min": 0,
					"name": "name",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text1997877400",
					"max": 10,
					"min": 0,
					"name": "code",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_1659436351",
					"hidden": false,
					"id": "relation223244161",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "address",
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
						"distribution",
						"fulfillment",
						"cross_dock",
						"cold_storage",
						"bonded"
					]
				},
				{
					"hidden": false,
					"id": "number3051925876",
					"max": null,
					"min": null,
					"name": "capacity",
					"onlyInt": true,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "bool458715613",
					"name": "is_active",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "bool"
				},
				{
					"cascadeDelete": false,
					"collectionId": "_pb_users_auth_",
					"hidden": false,
					"id": "relation4196672953",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "manager",
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
			"id": "pbc_3981867091",
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_mdRM2xCpUf` + "`" + ` ON ` + "`" + `lms_warehouses` + "`" + ` (` + "`" + `code` + "`" + `)"
			],
			"listRule": null,
			"name": "lms_warehouses",
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
		collection, err := app.FindCollectionByNameOrId("pbc_3981867091")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
