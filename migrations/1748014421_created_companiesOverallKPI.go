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
					"hidden": false,
					"id": "number1050465836",
					"max": null,
					"min": null,
					"name": "total_companies",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number1327439904",
					"max": null,
					"min": null,
					"name": "distinct_company_types",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				}
			],
			"id": "pbc_412936457",
			"indexes": [],
			"listRule": null,
			"name": "companiesOverallKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as total_companies,\n  count(distinct type) as distinct_company_types\nfrom companies;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_412936457")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
