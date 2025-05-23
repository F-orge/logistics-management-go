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
					"collectionId": "pbc_3866053794",
					"hidden": false,
					"id": "_clone_TUeZ",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "company_id",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "number2843181199",
					"max": null,
					"min": null,
					"name": "user_count_per_company",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				}
			],
			"id": "pbc_4052113511",
			"indexes": [],
			"listRule": null,
			"name": "usersCompanyKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  company as id,\n  company as company_id,\n  count(*) as user_count_per_company\nfrom users\nwhere company is not null and company != ''\ngroup by company;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_4052113511")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
